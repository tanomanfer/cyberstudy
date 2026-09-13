---
proyecto: CyberStudy
version: 1.0
fecha: 2026-08-13
autor: Fernando "Tano"
---

# CyberStudy — Documento Maestro

## 1. Descripción del producto

CyberStudy es una aplicación web personal de seguimiento de estudio, diseñada para acompañar la reconversión profesional de Tano hacia ciberseguridad e IT (perfil objetivo: SOC Analyst / Blue Team / Linux / Networking / Security Operations).

No es una app de notas ni de productividad genérica. Es un sistema que transforma horas de estudio diario (~2 horas) en conocimiento medible, acumulativo y demostrable, centrado en HTB Academy como fuente principal de aprendizaje práctico.

### Problema que resuelve

Tano estudia ciberseguridad diariamente usando HTB Academy y otras fuentes (Linux, networking, Python, bash, Windows, PowerShell), pero no tiene una forma centralizada de ver:

- Qué estudió y cuánto tiempo.
- Qué aprendió realmente vs. qué quedó pendiente de repasar.
- En qué módulos de HTB Academy está y cuánto avanzó.
- Cuáles son sus puntos débiles.
- Cómo se traduce ese estudio disperso en progreso hacia un perfil profesional concreto.
- Qué puede mostrar como evidencia de aprendizaje (portfolio).

Sin esta herramienta, el estudio queda fragmentado entre HTB, notas sueltas y memoria, sin métricas ni continuidad visible.

### Propuesta de valor diferencial

Investigando apps similares (trackers de estudio, apps de spaced repetition, trackers de progreso genéricos), ninguna combina:

1. Seguimiento específico de una plataforma de práctica técnica (HTB Academy: tiers, módulos, estados).
2. Documentación de laboratorios/máquinas resueltas con metodología propia.
3. Conexión explícita entre horas estudiadas → progreso hacia un perfil profesional (SOC/Blue Team/Linux).
4. Compatibilidad nativa con Markdown/Obsidian para que el conocimiento generado sea reutilizable fuera de la app.

Ese cruce es el diferencial real de CyberStudy.

---

## 2. Usuarios y roles

**Fase actual:** usuario único (Tano).

**Diseño:** multi-usuario desde el modelo de datos (Row Level Security en Supabase desde el día 1), aunque no haya registro público ni gestión de roles todavía. Esto no agrega trabajo de desarrollo relevante ahora, pero evita una migración dolorosa si en el futuro se abre a más usuarios.

No hay roles diferenciados (admin/usuario) en esta etapa — un usuario ve y gestiona únicamente sus propios datos.

---

## 3. Situación real de estudio (contexto que condiciona prioridades)

Tano tiene actualmente suscripción **estudiantil de HTB Academy**, que da acceso solo a la parte de Academy (Tier 0, 1 y 2 — módulos teórico-prácticos guiados). No tiene todavía acceso a máquinas/laboratorios independientes (eso requiere otra suscripción, que pagará más adelante).

**Consecuencia directa para el diseño:**
- El módulo de mayor uso inmediato es el **tracker de HTB Academy** (módulos, tiers, estado, progreso).
- El módulo de "Laboratorios propios / máquinas resueltas" no tiene datos que cargar todavía — se construye igual, pero no es la prioridad del MVP.
- Todo el diseño de datos debe dejar espacio para que, cuando Tano actualice su suscripción, el módulo de laboratorios se active sin fricción.

---

## 4. Funcionalidades — MVP (Fase 1)

Orden de construcción confirmado, de mayor a menor prioridad inmediata:

1. **Autenticación** — email/contraseña + Google OAuth (vía Supabase Auth).
2. **HTB Academy tracker jerárquico** — los cursos principales (por ejemplo, Linux Fundamentals o Network Foundations) funcionan como carpetas padre. Dentro se registran sus módulos/secciones numerados (por ejemplo, 12 de 30), con estado, porcentaje, notas Markdown, aprendizajes y dudas.
3. **Sesiones de estudio genéricas** — para estudio fuera de HTB (Python, Linux, networking por cuenta propia): fecha, hora inicio/fin, duración, tema, categoría, plataforma, qué aprendí, dificultades, dudas, nivel de comprensión (1-5), tags. Registro tanto por timer en vivo como por carga manual (según el momento).
4. **Dashboard básico** — tiempo estudiado hoy, objetivo diario (2hs), progreso diario/semanal, racha (con posibilidad de "congelar" un día justificado sin romper la racha), último tema estudiado, módulos HTB en progreso.

### Restricción importante — HTB Academy

- No existe una API oficial documentada de HTB Academy para automatizar datos. El registro es **manual, por diseño**.
- No se automatiza scraping de la plataforma de HTB bajo ninguna circunstancia (viola sus Términos de Servicio).
- No se almacenan ni publican flags, soluciones completas o walkthroughs de módulos/máquinas protegidas por política de HTB.
- Documentación de metodología propia, herramientas usadas y aprendizajes: sí, siempre, es contenido propio de Tano.

---

## 5. Funcionalidades — Fase 2

- **Diario de estudio** en Markdown (qué estudié / qué aprendí / qué me costó / qué debo investigar / próximo paso).
- **Base de conocimientos** (conceptos: TCP/IP, DNS, SSH, Nmap, SIEM, MITRE ATT&CK, etc. con nivel de dominio y fecha de última revisión).
- **Sistema de repaso espaciado simple** (intervalos 1/3/7/14/30 días, con autoevaluación: lo recuerdo bien / parcialmente / lo olvidé).
- **Estadísticas ampliadas** (progreso semanal/mensual con más detalle, heatmap tipo calendario de constancia).
- **Barra de progreso hacia el perfil profesional** (SOC/Blue Team/Linux/Networking) calculada en base a categorías de conocimiento cubiertas — requiere datos acumulados para tener sentido, por eso va después del MVP.

---

## 6. Funcionalidades — Fase 3

- **Laboratorios / máquinas resueltas** — módulo ampliado con: nombre, plataforma, estado de la máquina (Activa/Retirada/N/A — relevante solo si algún día se decide publicar algo afuera), sistemas/tecnologías, metodología aplicada, walkthrough propio en Markdown, herramientas usadas, aprendizajes, checkbox "apto para portfolio público" (solo aplicable si la máquina está retirada). Se activa con más fuerza cuando Tano actualice su suscripción de HTB.
- **Proyectos de programación** (port scanner, log analyzer, hash checker, etc.): nombre, descripción, lenguaje, tecnologías, estado, repo GitHub, conocimientos usados/adquiridos.
- **Integración con IA (Claude API)** — mayor prioridad dentro de esta fase:
  - Generación de exámenes/cuestionarios semanales basados en progreso real de HTB y sesiones registradas.
  - Detección de puntos débiles a partir de niveles de comprensión y repasos.
  - Recomendación de qué estudiar en la próxima sesión.
  - Resúmenes de notas propias.
  - Requiere volumen mínimo de datos reales cargados (~2-3 semanas de uso) para que las recomendaciones tengan sentido.

---

## 7. Funcionalidades — Fase 4

- **Integración con Telegram** — recordatorios inteligentes (sesión no registrada hoy, repaso pendiente, resumen semanal de horas), configurables (horario, frecuencia, activar/desactivar), evitando spam.

---

## 8. Funcionalidades — Fase 5

- **Portfolio profesional** — selección curada de proyectos, laboratorios, conocimientos y logros para uso en GitHub/LinkedIn/CV. Nunca se publica nada automáticamente sin confirmación explícita.
- **Deployment productivo, hardening, optimización.**

---

## 9. Formato de contenido — Markdown + compatibilidad Obsidian

Todos los campos de texto largo (walkthroughs, diario, notas de HTB, entradas de conocimiento) se almacenan como **Markdown plano**.

Cada entrada exportable incluye **frontmatter YAML** al inicio del archivo `.md`, compatible con el sistema de metadata/tags que usa Obsidian:

```markdown
---
title: Nibbles - HTB Machine
fecha: 2026-08-11
categoria: linux-privesc
dificultad: facil
tags: [htb, linux, ssh, privesc]
---

## Metodología
...
```

**Nivel 1 (incluido desde MVP):** exportación de cualquier entrada como archivo `.md` individual con frontmatter, listo para copiar a un vault de Obsidian.

### Jerarquía de estudio confirmada

```text
Plataforma
└── Curso padre: Linux Fundamentals
    ├── Módulo 12 de 30: Filtrado de contenido en Linux
    ├── Módulo 13 de 30: ...
    └── Módulo 14 de 30: ...
```

Los módulos hijos no deben mezclarse visualmente con módulos pertenecientes a Redes, Web u otros cursos. El buscador es global y puede encontrar conceptos, notas y dudas en toda la biblioteca.

Las dudas pendientes de todos los módulos aparecen además en una vista central de práctica. El cuaderno global reúne aprendizajes y notas sin perder la relación con su curso padre.

Cada módulo se abre en un lector amplio separado del formulario de edición. El lector muestra resumen, apuntes completos y dudas; representa encabezados, listas y bloques de código, y permite buscar y resaltar texto dentro del documento.

**Nivel 2 (evaluación futura, no comprometido):** sincronización automática con una carpeta/vault local o repo Git. Se evalúa solo si, tras un tiempo de uso, resulta realmente necesario — Obsidian no ofrece API en la nube, por lo que cualquier automatización sería vía filesystem local o Git, nunca una integración "oficial".

---

## 10. Consideraciones de seguridad y datos

- Row Level Security (RLS) en Supabase desde el primer schema, aunque el uso actual sea single-user.
- Contraseñas gestionadas por Supabase Auth (nunca en texto plano, nunca en el repo).
- Credenciales y claves (Supabase, futura API de Claude, etc.) siempre en Bitwarden, nunca en el código.
- `.env.example` versionado, `.env.local` en `.gitignore`.
- Validación de entradas en formularios y en policies de base de datos.
- Sanitización de Markdown renderizado en frontend (para evitar XSS al mostrar contenido propio como HTML).
- No se automatiza ni se scrapea contenido de HTB Academy bajo ninguna circunstancia.
- No se publica contenido de portfolio sin confirmación manual explícita del usuario.

---

## 11. Stack técnico (definido, detalle técnico completo en documento aparte)

Frontend: TanStack Start/Router + React Query + Tailwind + shadcn/ui + TypeScript.
Backend: Supabase (Postgres + Auth + RLS + Edge Functions).
Hosting: Vercel.
Prototipado UI: Lovable (uso único inicial, después clonado localmente).
Dirección visual: estética "hacker de película" — paleta oscura, tipografía monospace/terminal, acentos verde o ámbar.

*(El detalle técnico completo — schema SQL, políticas RLS, estructura de carpetas — se desarrolla en un documento aparte, fuera de este documento maestro, para trabajar con Antigravity + Claude Code.)*

---

## 12. Roadmap resumido

| Fase | Contenido | Estado |
|---|---|---|
| Fase 1 (MVP) | Auth, HTB tracker, sesiones de estudio, dashboard básico | Funcional en local; nube sin activar |
| Fase 2 | Diario, base de conocimientos, repaso espaciado, estadísticas, barra de progreso profesional | Planeada |
| Fase 3 | Laboratorios/máquinas resueltas, proyectos de programación, IA (exámenes, recomendaciones, resúmenes) | Planeada |
| Fase 4 | Telegram (recordatorios inteligentes) | Planeada |
| Fase 5 | Portfolio profesional, deployment, hardening avanzado | Planeada |

---

## 13. KPIs de éxito (para el propio Tano, no de negocio)

- Uso diario sostenido (¿registra estudio la mayoría de los días?).
- Racha de estudio creciente o estable.
- Al menos 1 módulo de HTB Academy Tier 0 completado y documentado dentro del primer mes de uso.
- Capacidad de responder, mirando el dashboard, las preguntas planteadas en el objetivo original: qué estudió, qué aprendió, qué falta repasar, qué sigue mañana.
