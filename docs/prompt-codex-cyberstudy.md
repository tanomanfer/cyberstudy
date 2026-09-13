# Prompt para Codex — Inicio del proyecto CyberStudy

Copiar y pegar todo este documento como primer mensaje a Codex.

---

## Quién soy y cómo quiero trabajar

Soy Fernando (Tano), 46 años, en reconversión profesional hacia ciberseguridad/IT. Estoy aprendiendo desarrollo mientras construyo. Uso **Obsidian** para mis apuntes personales, así que todo el contenido de texto largo que genere esta app me importa que sea compatible con Markdown.

**Reglas de trabajo — importante:**

1. **Antes de generar nada, si ves una decisión donde tengas una idea mejor, distinta, o una alternativa que valga la pena considerar — preguntame primero.** No asumas mi decisión es la única opción; si hay algo técnico o de producto que como especialista recomendarías distinto, decímelo y esperá mi respuesta antes de construir.
2. Quiero empezar a usar la app **hoy**. Priorizá velocidad para tener algo funcional ya, no perfección arquitectónica.
3. Explicame las decisiones técnicas en español simple — estoy aprendiendo.
4. **Documentación obligatoria desde el primer commit:** todo lo que construyas tiene que quedar documentado en el repo (carpeta `docs/`, un `README.md` claro, y comentarios donde haga falta) de forma que **cualquier otra IA o persona pueda retomar el proyecto sin que yo tenga que explicarle de nuevo qué se hizo y por qué.** Esto es una regla fija para todos mis proyectos, no solo este.

---

## Qué es CyberStudy

App web personal de seguimiento de estudio para mi reconversión a ciberseguridad (perfil objetivo: SOC Analyst / Blue Team / Linux / Networking / Security Operations). Uso HTB Academy (Tier 0-2 por ahora, suscripción estudiantil) como fuente principal de práctica.

**Problema que resuelve:** estudio ~2 horas diarias entre HTB Academy y otras fuentes (Linux, networking, Python, bash), pero no tengo forma centralizada de ver qué estudié, qué aprendí, qué me falta repasar, en qué módulo de HTB estoy, y cómo se traduce eso en progreso hacia un perfil profesional concreto.

**No es** una app de notas genérica ni un clon de gestor de tareas — el foco es el seguimiento de aprendizaje técnico específico de ciberseguridad.

---

## Situación real que condiciona prioridades

Mi suscripción actual de HTB solo da acceso a Academy (módulos guiados Tier 0/1/2), **no** a máquinas/laboratorios independientes todavía (eso lo pagaré más adelante). Por eso:

- El módulo que más voy a usar desde el día 1 es el **tracker de HTB Academy**, no un módulo genérico de "laboratorios".
- El módulo de "máquinas resueltas / laboratorios propios" se diseña, pero no es prioridad ahora — se activa con más fuerza cuando actualice mi suscripción.

---

## MVP — orden de prioridad (quiero esto funcionando ya)

1. **Autenticación** — email/contraseña + Google OAuth.
2. **HTB Academy tracker** — registro manual de módulos: nombre, categoría, dificultad, estado (Pendiente / En progreso / Completado / Repasar), porcentaje, fecha inicio/fin, notas, aprendizajes, dudas, enlace al módulo.
3. **Sesiones de estudio genéricas** (para lo que estudio fuera de HTB: Python, Linux, networking por mi cuenta): fecha, hora inicio/fin, duración, tema, categoría, plataforma, qué aprendí, dificultades, dudas, nivel de comprensión (1-5), tags. Registro tanto con timer en vivo como con carga manual, según el momento.
4. **Dashboard básico**: tiempo estudiado hoy, objetivo diario (2 horas), progreso diario/semanal, racha (con opción de "congelar" un día justificado sin romper la racha), último tema estudiado, módulos HTB en progreso.

### Restricción importante sobre HTB

- No existe API oficial de HTB Academy para automatizar datos — el registro es **manual, por diseño**.
- **No** automatizar scraping de la plataforma bajo ninguna circunstancia (viola sus Términos de Servicio).
- **No** almacenar ni exponer públicamente flags, soluciones completas o walkthroughs de contenido protegido de HTB.
- Documentar metodología propia, herramientas usadas y aprendizajes: sí, siempre — es contenido mío.

---

## Fases siguientes (no need ahora, pero deben quedar contempladas en el diseño de datos)

- **Fase 2:** Diario de estudio en Markdown, base de conocimientos (conceptos con nivel de dominio), repaso espaciado simple (intervalos 1/3/7/14/30 días), estadísticas ampliadas, barra de progreso hacia el perfil profesional.
- **Fase 3:** Laboratorios/máquinas resueltas (con estado activa/retirada y checkbox de apto-portfolio), proyectos de programación propios, integración con IA (exámenes semanales, detección de puntos débiles, recomendaciones de estudio) vía API de Claude.
- **Fase 4:** Integración con Telegram (recordatorios inteligentes, configurables, sin spam).
- **Fase 5:** Portfolio profesional exportable (nunca se publica nada sin confirmación mía explícita).

---

## Markdown + Obsidian

Todo el contenido de texto largo (notas, diario, walkthroughs) se guarda como **Markdown plano**, con la posibilidad de exportarlo como archivo `.md` individual con **frontmatter YAML** al inicio, compatible con el sistema de tags/metadata de Obsidian:

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

No hace falta sincronización automática con mi vault de Obsidian por ahora — con poder exportar el `.md` alcanza.

---

## Ilustraciones / diseño visual

Me gustan las **ilustraciones** — si se te ocurre una forma de incorporar elementos ilustrados o visuales (íconos temáticos, ilustraciones simples, badges visuales de progreso, etc.) que le den vida a la app sin comprometer usabilidad, proponémelo antes de aplicarlo. Dirección estética general: algo con onda "hacker", visualmente atractivo, no una plantilla genérica de dashboard SaaS aburrido.

---

## Seguridad (no negociable desde el día 1)

- Contraseñas nunca en texto plano, gestión de sesión segura.
- Ninguna API key, password, token ni secreto en el código o en el repositorio — todo en variables de entorno (`.env`), con `.env.example` versionado y `.env` real en `.gitignore`.
- Validación de entradas en formularios y en la base de datos.
- Protección contra XSS al renderizar contenido Markdown como HTML (sanitización).
- Consultas parametrizadas / uso de ORM — nunca SQL armado con concatenación de strings.
- Diseño multi-usuario desde el modelo de datos (aislamiento de datos por usuario), aunque hoy lo use solo yo.

---

## Antes de generar código

1. Si tenés dudas sobre alguna decisión de producto o técnica, o creés que hay una alternativa mejor a lo que planteé acá, **preguntame primero.**
2. Confirmame el plan de estructura de archivos y el orden de construcción antes de generar todo de una.
3. Recordá: la prioridad es tener el MVP (auth + HTB tracker + sesiones + dashboard) funcionando hoy, con buena documentación desde el primer commit.
