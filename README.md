# CyberStudy

Aplicación personal para registrar estudio técnico, con foco inicial en Hack The Box Academy y una estructura abierta a otras plataformas como TryHackMe, PortSwigger Academy o cursos propios.

## Estado actual

Aplicación local-first funcional (`v0.2.0`):

- Dashboard con objetivo diario, resumen semanal, racha y módulos activos.
- Tracker de módulos con plataforma, categoría, dificultad, estado y progreso.
- Sesiones manuales con aprendizajes, dificultades, comprensión y tags.
- Timer en vivo que convierte el tiempo medido en una sesión editable.
- Congelamiento justificado de días para conservar la racha.
- Exportación individual a Markdown con frontmatter compatible con Obsidian.
- Persistencia local con copia secundaria de recuperación.
- Respaldo e importación de todos los datos en JSON.
- Edición y eliminación confirmada de módulos y sesiones.
- Temporizador recuperable después de recargar o cerrar la pestaña.
- Sincronización multi-dispositivo con Supabase mediante cuenta de email y contraseña.
- Cuaderno con lector amplio, secciones de resumen/apuntes/dudas y búsqueda dentro de cada módulo.
- Tutor IA contextual dentro de cada módulo, conectado a DeepSeek mediante una Supabase Edge Function.
- Chat temporal, límite de 15 preguntas diarias y respuestas basadas en los apuntes abiertos.
- Herramientas de estudio inspiradas en NotebookLM: explicación simple, ejemplo práctico, vista visual y examen guiado.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir `http://localhost:4173`.

## Importante sobre los datos

La aplicación guarda primero en `localStorage`, bajo la clave actual `cyberstudy:data:v2`, y conserva una copia secundaria. La clave v1 se mantiene para recuperación durante la migración. Usá siempre `http://localhost:4173`: otro host, navegador o perfil tiene un almacenamiento diferente. El botón **Respaldo** descarga una copia completa y **Importar** permite recuperarla.

Supabase está configurado y conectado al proyecto remoto. Para instalar CyberStudy en otro entorno, aplicá las migraciones de `supabase/migrations/`, copiá `.env.example` como `.env.local` y completá la URL y la clave pública `anon`. Nunca coloques una clave secreta o `service_role` en el frontend.

La sincronización combina los registros locales y remotos por identificador antes de subirlos. De esta forma, conectar una cuenta por primera vez no borra lo que ya estaba guardado en el navegador.

## Seguridad

- Las contraseñas son gestionadas por Supabase Auth; CyberStudy no las almacena en tablas propias.
- Los archivos `.env*` reales están ignorados; `.env.example` documenta las variables esperadas.
- Las notas se almacenan como Markdown plano. El lector representa un subconjunto mediante componentes React y nunca inyecta el contenido como HTML.
- Supabase usa `user_id` y RLS en los datos personales.
- `DEEPSEEK_API_KEY` vive únicamente como secreto de la Edge Function y nunca llega a React, `VITE_*`, `localStorage` o Git.
- El historial del Tutor IA vive solamente en memoria: cerrar el lector o recargar la página lo elimina.
- El servidor limita el tutor a 15 preguntas diarias por usuario y restringe el tamaño de preguntas, contexto y respuestas.
- No se scrapea HTB ni se almacenan flags, contraseñas o soluciones protegidas. El progreso de HTB se actualiza manualmente porque no existe una integración oficial configurada.

## Tutor IA

El tutor aparece dentro del lector de cada módulo y utiliza como contexto sus apuntes, aprendizajes y dudas. La llamada sigue este recorrido:

```text
CyberStudy autenticado
        ↓ JWT de Supabase
Edge Function tutor
        ↓ clave protegida
DeepSeek deepseek-flash
```

Funciones disponibles:

- Preguntas libres sobre el módulo abierto.
- **Explicación simple** con pasos y analogías.
- **Ejemplo práctico** seguro y comentado.
- **Vista visual** mediante diagramas ASCII precisos.
- **Examen guiado** de una pregunta por turno, con corrección posterior.
- Copiar una respuesta o agregarla al cuaderno mediante una acción explícita.

La Edge Function está en `supabase/functions/tutor/index.ts`. La cuota se aplica de forma atómica mediante `consume_tutor_question` y la tabla `tutor_daily_usage`, creadas por la migración `20260920193000_tutor_daily_quota.sql`. La tabla guarda únicamente usuario, fecha y cantidad de preguntas; no almacena el contenido del chat.

## Documentación

- [`docs/01-documento-maestro-cyberstudy.md`](docs/01-documento-maestro-cyberstudy.md): visión y roadmap.
- [`docs/02-arquitectura-y-decisiones.md`](docs/02-arquitectura-y-decisiones.md): arquitectura actual y razones.
- [`docs/03-guia-de-uso.md`](docs/03-guia-de-uso.md): uso cotidiano.
- [`docs/04-proximos-pasos.md`](docs/04-proximos-pasos.md): trabajo pendiente y orden sugerido.
- [`ESTADO_PROYECTO.md`](ESTADO_PROYECTO.md): estado canónico para retomar el trabajo.
- [`estudio/README_IA.md`](estudio/README_IA.md): procedimiento obligatorio para conservar cada resumen fuera del chat.
- [`estudio/INDICE.md`](estudio/INDICE.md): progreso y cuadernos disponibles.
- [`estudio/cyberstudy-import.json`](estudio/cyberstudy-import.json): respaldo canónico listo para importar en la aplicación.

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # chequeo TypeScript y build productivo
npm run preview  # previsualizar el build
```
