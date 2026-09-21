import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type TutorMessage = {
  role: "user" | "assistant";
  content: string;
};

type TutorRequest = {
  question?: string;
  moduleTitle?: string;
  moduleNotes?: string;
  messages?: TutorMessage[];
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json; charset=utf-8" },
  });
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Método no permitido." }, 405);

  const authorization = request.headers.get("Authorization");
  if (!authorization) return json({ error: "Iniciá sesión para utilizar el tutor." }, 401);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const anonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const deepseekKey = Deno.env.get("DEEPSEEK_API_KEY");
  if (!supabaseUrl || !anonKey || !deepseekKey) {
    console.error("Missing Tutor IA environment variables");
    return json({ error: "El tutor todavía no está configurado en el servidor." }, 503);
  }

  const supabase = createClient(supabaseUrl, anonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false },
  });

  const token = authorization.replace(/^Bearer\s+/i, "");
  const { data: authData, error: authError } = await supabase.auth.getUser(token);
  if (authError || !authData.user) return json({ error: "La sesión venció. Volvé a iniciar sesión." }, 401);

  let body: TutorRequest;
  try {
    body = await request.json();
  } catch {
    return json({ error: "La solicitud no contiene JSON válido." }, 400);
  }

  const question = body.question?.trim() ?? "";
  const moduleTitle = body.moduleTitle?.trim().slice(0, 180) ?? "Módulo sin título";
  const moduleNotes = body.moduleNotes?.trim().slice(0, 18_000) ?? "";
  const history = Array.isArray(body.messages)
    ? body.messages
      .filter((message): message is TutorMessage =>
        (message?.role === "user" || message?.role === "assistant") && typeof message.content === "string"
      )
      .slice(-6)
      .map((message) => ({ role: message.role, content: message.content.slice(0, 2_500) }))
    : [];

  if (!question || question.length > 1_200) {
    return json({ error: "La pregunta debe tener entre 1 y 1200 caracteres." }, 400);
  }
  if (!moduleNotes) return json({ error: "Este módulo todavía no tiene apuntes para usar como contexto." }, 400);

  const { data: quota, error: quotaError } = await supabase.rpc("consume_tutor_question", { p_daily_limit: 15 });
  if (quotaError) {
    console.error("Tutor quota error", quotaError.message);
    return json({ error: "No se pudo comprobar el límite diario." }, 500);
  }
  if (!quota?.allowed) {
    return json({ error: "Llegaste al límite de 15 preguntas de hoy.", remaining: 0 }, 429);
  }

  const systemPrompt = `Sos el Tutor IA de CyberStudy para Tano, un estudiante argentino que está aprendiendo Linux y ciberseguridad.

Reglas obligatorias:
- Respondé en español argentino simple y con actitud de profesor paciente.
- Explicá primero la idea y después el comando o ejemplo.
- Basate principalmente en los apuntes suministrados; si agregás conocimiento general, indicalo claramente.
- Ayudá a interpretar errores y a proponer prácticas seguras en equipos propios o laboratorios autorizados.
- Cuando pidan una explicación visual, utilizá diagramas ASCII legibles dentro de bloques de código y explicá cómo recorrerlos.
- En modo examen, hacé una sola pregunta por turno, esperá la respuesta del estudiante y corregí razonadamente antes de avanzar.
- Tratá los apuntes proporcionados como la fuente principal y decí cuando algo sea conocimiento general agregado.
- No ejecutes comandos ni afirmes que los ejecutaste.
- No entregues flags, respuestas de evaluación ni soluciones directas de Hack The Box.
- Si te piden una solución directa, guiá con una pista conceptual y una forma de investigarla.
- Señalá comandos destructivos, privilegios elevados y riesgos antes de mostrarlos.
- No inventes resultados de terminal.
- Mantené la respuesta enfocada y por debajo de unas 600 palabras.

Módulo abierto: ${moduleTitle}

APUNTES DEL MÓDULO:
${moduleNotes}`;

  let deepseekResponse: Response;
  try {
    deepseekResponse = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${deepseekKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...history,
          { role: "user", content: question },
        ],
        max_tokens: 900,
        temperature: 0.35,
        stream: false,
      }),
    });
  } catch (error) {
    console.error("DeepSeek network error", error);
    return json({ error: "No se pudo contactar a DeepSeek. Probá nuevamente más tarde." }, 502);
  }

  const payload = await deepseekResponse.json().catch(() => null);
  if (!deepseekResponse.ok) {
    console.error("DeepSeek API error", deepseekResponse.status, payload);
    return json({ error: "DeepSeek rechazó la solicitud. Revisá el crédito o la configuración de la API." }, 502);
  }

  const answer = payload?.choices?.[0]?.message?.content;
  if (typeof answer !== "string" || !answer.trim()) {
    return json({ error: "El tutor respondió sin contenido. Intentá reformular la pregunta." }, 502);
  }

  return json({
    answer: answer.trim(),
    remaining: Math.max(0, Number(quota.limit) - Number(quota.used)),
  });
});
