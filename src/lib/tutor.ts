import { supabase } from "./supabase";

export interface TutorMessage {
  role: "user" | "assistant";
  content: string;
}

interface TutorResponse {
  answer?: string;
  error?: string;
  remaining?: number;
}

export async function askTutor(input: {
  question: string;
  moduleTitle: string;
  moduleNotes: string;
  messages: TutorMessage[];
}) {
  if (!supabase) throw new Error("Supabase no está configurado en este equipo.");

  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) throw new Error("Iniciá sesión desde el botón Nube para utilizar el tutor.");

  const { data, error } = await supabase.functions.invoke<TutorResponse>("tutor", {
    body: input,
  });

  if (error) {
    let message = "No se pudo consultar al tutor.";
    const context = "context" in error ? error.context : null;
    if (context instanceof Response) {
      const payload = await context.clone().json().catch(() => null) as TutorResponse | null;
      if (payload?.error) message = payload.error;
    }
    throw new Error(message);
  }
  if (!data?.answer) throw new Error(data?.error || "El tutor no devolvió una respuesta.");

  return { answer: data.answer, remaining: data.remaining };
}
