# Arquitectura y decisiones

## Decisión 001 — Local primero

**Fecha:** 2026-09-09  
**Estado:** aceptada

CyberStudy debe ser usable el mismo día de su creación. La autenticación por Google necesita configuración externa y Supabase agrega una dependencia operativa antes de poder guardar la primera sesión.

Por eso `v0.1` trabaja en modo personal local. No simula seguridad multiusuario: simplemente no envía datos a ningún servidor. El modelo de TypeScript coincide conceptualmente con el esquema futuro para facilitar la migración.

Consecuencia: los datos actuales viven sólo en el navegador. El respaldo ya está implementado y el código de Supabase está preparado; antes de usar varios dispositivos todavía hay que configurar y probar el proyecto remoto.

## Decisión 002 — HTB primero, plataforma abierta

La interfaz sugiere `Hack The Box Academy` porque es el uso actual, pero `platform`, `category` y `difficulty` son campos abiertos. No se modelan tiers de HTB como una restricción universal. Esto permite registrar después TryHackMe, PortSwigger, Linux, redes, Python u otra materia sin rehacer la base.

## Decisión 003 — React + Vite para el primer MVP

El documento maestro proponía TanStack Start. Para una aplicación local sin servidor, Vite y React reducen piezas y tiempo de puesta en marcha. Cuando se active Supabase, se evaluará TanStack Router/Start si las rutas protegidas y operaciones de servidor lo justifican.

No es una renuncia al stack previsto: es una implementación incremental orientada a uso inmediato.

## Flujo de datos actual

1. `App.tsx` mantiene el estado de la aplicación.
2. Cada cambio persiste el objeto completo mediante `src/lib/storage.ts`.
3. La clave incluye versión para poder migrar el formato más adelante.
4. Las exportaciones se generan localmente en `src/lib/markdown.ts`.

## Decisión 004 — Cursos padre y módulos hijos

**Fecha:** 2026-09-13  
**Estado:** aceptada

`modules` conserva los cursos principales por compatibilidad interna y se agrega `sections` para sus módulos hijos. La interfaz utiliza los nombres “Cursos” y “Módulos” para evitar la ambigüedad de HTB Academy.

La versión 2 del almacenamiento migra automáticamente registros antiguos cuyo título siga el patrón `N de TOTAL — título`. El registro antiguo queda intacto en la clave v1 y el nuevo modelo se guarda en una clave v2 con copia secundaria. De esta manera, el módulo 12 existente se convierte en hijo de Linux Fundamentals sin borrar sus notas, aprendizajes, dudas, estado ni progreso.

## Decisión 005 — Lectura separada de edición

**Fecha:** 2026-09-13  
**Estado:** aceptada

Las cajas de texto son adecuadas para editar, pero no para estudiar documentos largos. Por eso **Abrir** muestra un modal ancho de lectura y **Editar** mantiene el formulario existente.

El lector separa resumen, apuntes y dudas. Incluye búsqueda local con contador y resaltado. Interpreta un subconjunto de Markdown (encabezados, listas y bloques de código) directamente con componentes React, sin convertir ni inyectar HTML. Esto conserva una superficie segura frente a XSS y evita agregar una dependencia antes de necesitar soporte CommonMark completo.

## Estructura

```text
src/
├── App.tsx          # interfaz y flujos del MVP
├── types.ts         # modelo del dominio
├── lib/
│   ├── dates.ts     # fechas locales, duración y semana
│   ├── markdown.ts  # exportación Obsidian
│   ├── supabase.ts  # autenticación y sincronización remota
│   ├── storage.ts   # persistencia local versionada
│   └── tutor.ts     # cliente del Tutor IA
├── main.tsx         # inicio de React
├── styles.css       # sistema visual base responsive
└── enhancements.css # cursos, buscador, cuaderno y lector
```

## Decisión 006 — Tutor IA contextual, temporal y protegido

**Fecha:** 2026-09-20
**Estado:** implementada; pendiente prueba manual completa

El tutor utiliza como fuente el contenido del módulo abierto (`notes`, `learnings` y `questions`). React nunca llama directamente a DeepSeek. El frontend autenticado invoca la Edge Function `tutor`, que valida la sesión, consume de forma atómica una de las 15 consultas diarias y recién después llama al modelo `deepseek-flash`.

`DEEPSEEK_API_KEY` está guardada como secreto de Supabase. No existe en variables `VITE_*`, en el bundle, en `localStorage` ni en Git.

El historial se conserva solamente en el estado del componente `TutorPanel`. Al cerrar el lector o recargar la página, el componente se desmonta y la conversación desaparece. La base guarda únicamente el contador diario, no las preguntas ni las respuestas.

El enfoque pedagógico toma de NotebookLM el principio de trabajar desde fuentes propias. Los accesos rápidos no envían solicitudes automáticamente: preparan prompts de explicación, práctica, diagrama ASCII o examen y dejan que Tano los revise antes de confirmar. Los diagramas son texto estructurado porque resultan más precisos y económicos para conceptos técnicos que una imagen generativa.

Flujo:

```text
SectionReader / TutorPanel
          ↓ supabase.functions.invoke + sesión
Supabase Edge Function tutor
          ↓ autenticación + cuota diaria
DeepSeek Chat Completions
          ↓ respuesta acotada
TutorPanel temporal
```

## Seguridad

- Markdown se guarda como texto plano y el lector crea elementos React para un subconjunto permitido; no se inyecta HTML.
- Si en el futuro se usa un conversor Markdown→HTML completo, su salida deberá sanitizarse con una biblioteca mantenida.
- Supabase Auth gestionará contraseñas y sesiones. CyberStudy nunca recibirá contraseñas en tablas propias.
- Toda consulta futura debe ejecutarse con el cliente oficial, sin concatenar SQL.
- Cada tabla privada tiene RLS y políticas basadas en `auth.uid()`.
