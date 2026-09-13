# ESTADO_PROYECTO — CyberStudy

> Archivo canónico de estado. Complementa `README.md` y los documentos de `docs/`.

## Última actualización
2026-09-13 — Se inicializó git y se publicó el repositorio en GitHub (ver "Estado observado"). Antes: Codex agregó y verificó el lector amplio de apuntes, documentó su funcionamiento y corrigió inconsistencias entre los documentos del proyecto.

## Resumen rápido para retomar
- App personal de seguimiento de estudio para la reconversión de Fernando (Tano) a ciberseguridad/IT (perfil objetivo: SOC Analyst / Blue Team / Linux / Networking).
- Foco principal: tracker de HTB Academy (cursos padre + módulos hijos numerados), sesiones de estudio genéricas (con timer en vivo o carga manual) y dashboard con racha/objetivo diario.
- Exportación de notas a Markdown con frontmatter compatible con Obsidian.
- Cuaderno con lector amplio por módulo, búsqueda interna, contador y resaltado de coincidencias.
- Versión actual: `0.2.0`.

## Cómo se pidió trabajar (de `docs/prompt-codex-cyberstudy.md`)
- Ante cualquier decisión técnica/producto donde exista una alternativa mejor, **preguntar primero**, no asumir.
- Priorizar velocidad para tener algo usable ya, no arquitectura perfecta.
- Explicar decisiones técnicas en español simple (Tano está aprendiendo).
- **Documentación obligatoria desde el primer commit** en `docs/` y `README.md` para que cualquier otra IA o persona retome el proyecto sin reexplicación — regla fija para todos los proyectos de Tano, no solo este. Este archivo (`ESTADO_PROYECTO.md`) es parte de esa regla y no existía hasta ahora.
- No automatizar scraping de HTB Academy ni almacenar/publicar flags o soluciones protegidas bajo ninguna circunstancia.
- Seguridad no negociable: nada de secretos en el repo (`.env.example` versionado, `.env*` real en `.gitignore`), validación de entradas, Markdown sin inyección de HTML, `service_role` de Supabase nunca en el frontend.

## Stack real (distinto de lo que pedía el documento maestro)
- El documento maestro (`docs/01-documento-maestro-cyberstudy.md`) especifica TanStack Start/Router + shadcn/ui.
- Lo que realmente se construyó: **React 19 + Vite + TypeScript puro**, sin shadcn ni TanStack — ver `docs/02-arquitectura-y-decisiones.md`, Decisión 003. Motivo documentado: reducir piezas para tener algo funcionando el mismo día. Queda pendiente evaluar TanStack si en algún momento se justifican rutas protegidas/operaciones de servidor.
- Backend opcional: Supabase (Postgres + Auth + RLS), con 2 migraciones en `supabase/migrations/` (`0001_initial_schema.sql`, `0002_app_state_sync.sql`).

## Estado observado
- **Repositorio git inicializado y publicado**: rama `main`, primer commit `6ee4f40` (2026-09-13), remoto en `https://github.com/tanomanfer/cyberstudy` (privado). Codex había reportado que no podía correr `git init` (carpeta `.git` vacía montada) y que la sesión de `gh` estaba vencida; ninguna de las dos cosas era real al verificarlo desde otra sesión — no había bloqueo ni sesión vencida, y se completó sin inconvenientes. Se excluyeron del commit archivos de build (`vite.config.js`, `vite.config.d.ts`, `*.tsbuildinfo`), agregados ahora a `.gitignore`.
- Persistencia principal: `localStorage` del navegador (clave actual `cyberstudy:data:v2`; v1 se conserva como origen de migración, con copia secundaria de recuperación). **Esto es lo que se usa hoy día a día.**
- Supabase está **implementado en código** (cliente, auth por email, lógica de sync que combina registros locales y remotos por id) pero **no está conectado**: no existe `.env.local` en el proyecto, solo `.env.example`. O sea, la sincronización a la nube es opcional y hoy está apagada — todo vive únicamente en el navegador donde se usó.
- Carpeta `ovpn/` con archivos `.ovpn` (configs de VPN de HTB Academy) — correctamente ignorada en `.gitignore` (`ovpn/`, `*.ovpn`), así que no hay riesgo de filtrarlos si se inicializa git.
- El lector Markdown muestra un subconjunto seguro y suficiente para estudiar: encabezados, párrafos, listas numeradas/no numeradas y bloques de código. Se construye con componentes React y no inyecta HTML.

## Documentación existente y su fiabilidad
- `docs/01-documento-maestro-cyberstudy.md` — visión y roadmap original. La propuesta de stack es histórica; el stack real está documentado en Decisión 003.
- `docs/02-arquitectura-y-decisiones.md` — el más confiable; documenta las decisiones reales tomadas y por qué se desvió del plan original.
- `docs/03-guia-de-uso.md` — uso cotidiano.
- `docs/04-proximos-pasos.md` — orden de trabajo pendiente, diferenciando lo implementado de lo activado y probado.
- `docs/05-configurar-supabase.md` — guía correcta para activar Supabase cuando se decida usarlo.
- `README.md` — resumen operativo actualizado; aclara que Supabase está implementado pero todavía no configurado ni probado.

## Pendiente inmediato
- Si se va a usar Supabase: aplicar migraciones, crear `.env.local`, probar registro/login/sync desde dos navegadores (paso 1-2 de `docs/04-proximos-pasos.md`).
- Completar el soporte Markdown si se necesitan tablas, enlaces u otros elementos; los tests automáticos de racha/fechas/importación siguen pendientes.
- Fase 2 completa (diario, repaso espaciado, base de conocimientos) no empezada.

## Reglas de trabajo
- Español argentino simple; Tano está aprendiendo, explicar los cambios técnicos sin tecnicismos innecesarios.
- Una tarea a la vez, esperar confirmación antes de encadenar la siguiente.
- No hacer `git commit` ni `git push` sin permiso explícito de Fernando (aplica también a un futuro `git init`).
- No automatizar scraping de HTB Academy ni almacenar contenido protegido (flags, soluciones) bajo ninguna circunstancia.
- Cualquier decisión técnica/producto con alternativas: preguntar antes de construir, no asumir.
- Registrar acá (no solo en `docs/`) decisiones, cambios de estado real y bloqueos, para que Codex, Claude Code o Code Cloud puedan retomar sin repreguntar.

## Último cambio funcional verificado

**Fecha:** 2026-09-13

- Se separó la lectura de la edición de módulos.
- **Abrir** desde Cuaderno, Dudas, Cursos o resultados globales muestra un lector ancho.
- El lector organiza `Qué aprendí`, `Apuntes completos` y `Dudas para practicar`.
- Incluye búsqueda dentro del módulo, cantidad de coincidencias y resaltado visual.
- Desde el lector se puede pasar al formulario de edición o descargar el `.md`.
- Verificación realizada en navegador con un módulo de prueba: renderizado de encabezados, listas y bloque Bash; búsqueda de `grep` con 2 coincidencias; transición a edición; cero errores o advertencias de consola.
- `npm run build` completó correctamente.
