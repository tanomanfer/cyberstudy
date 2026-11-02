# 22 de 24 — Security Operations Center

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Un **Security Operations Center (SOC)** es la unidad central que monitorea, detecta, analiza y responde continuamente a amenazas e incidentes. Convierte registros y alertas en investigaciones y decisiones para contener ataques antes de que causen un daño mayor.

El SOC combina personas, procesos y tecnología. No es solamente una sala con pantallas ni un conjunto de herramientas automáticas.

## Conceptos importantes

### Ciclo operativo

El equipo monitorea sistemas y redes, detecta actividad sospechosa, analiza si representa una amenaza real, responde para contenerla y aprende del incidente para mejorar las defensas.

### Niveles de analistas

- **Tier 1:** realiza el triage inicial, descarta falsos positivos evidentes, reúne información y escala lo necesario.
- **Tier 2:** investiga incidentes complejos, relaciona evidencias y guía a analistas junior.
- **Tier 3:** trata casos críticos, realiza análisis avanzado y suele cumplir funciones de respuesta a incidentes.

Una alerta sencilla puede resolverse en Tier 1; no todo caso debe recorrer obligatoriamente los tres niveles.

### Roles complementarios

El **SOC Manager** dirige la operación diaria y administra el equipo. Los **Incident Responders** contienen, erradican y ayudan a recuperar sistemas. Los **Threat Hunters** buscan amenazas ocultas que no generaron alertas. Los **Security Engineers y Architects** mantienen y mejoran la infraestructura y las herramientas.

### Reactivo y proactivo

Responder a una alerta es un trabajo reactivo. Buscar patrones anómalos sin una alarma previa es proactivo. El SOC necesita ambos enfoques: las detecciones automáticas no encuentran todas las amenazas.

### Colaboración

El SOC trabaja con IT para aplicar parches, corregir configuraciones, aislar equipos y recuperar servicios. También informa riesgos e incidentes a la dirección. El SOC Manager coordina la operación diaria; el CISO dirige la estrategia general.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. En un SOC real se consultan logs, SIEM, EDR y otras fuentes, pero cada entorno utiliza herramientas y procedimientos propios.

## Diferencias que hay que recordar

- **Alerta vs incidente:** una alerta es una señal a investigar; un incidente es un evento confirmado que amenaza o afecta la seguridad.
- **Tier 1 vs Tier 2:** Tier 1 clasifica inicialmente; Tier 2 profundiza la investigación.
- **SOC Analyst vs Threat Hunter:** el analista suele responder a alertas; el hunter busca amenazas ocultas de manera proactiva.
- **SOC Manager vs CISO:** el manager dirige la operación diaria; el CISO dirige la estrategia general.
- **Detección vs respuesta:** detectar descubre la amenaza; responder la contiene y reduce su impacto.

## Ejemplos prácticos

- Un EDR genera una alerta: Tier 1 revisa contexto y decide si es falso positivo o debe escalarse.
- Tier 2 relaciona autenticaciones, procesos y conexiones de varios equipos para reconstruir un incidente.
- Un Threat Hunter busca conexiones inusuales que todavía no activaron reglas automáticas.
- IT aplica un parche y el SOC verifica si cesó la actividad relacionada.

## Errores y precauciones

- No tratar todas las alertas como ataques confirmados.
- No cerrar alertas sin reunir contexto suficiente.
- No depender solamente de herramientas automáticas.
- No confundir el escalamiento con transferir toda responsabilidad.
- No aislar al SOC: la respuesta necesita colaboración con IT, dirección y otras áreas.
- No medir el rendimiento solamente por cantidad de alertas cerradas.

## Inglés técnico del módulo

- `Security Operations Center (SOC)` → centro de operaciones de seguridad.
- `triage` → clasificación y evaluación inicial de una alerta.
- `alert` → señal que requiere análisis.
- `incident` → evento de seguridad confirmado.
- `escalation` → transferencia de un caso a un nivel con más experiencia o autoridad.
- `threat hunting` → búsqueda proactiva de amenazas ocultas.
- `containment` → acciones para limitar el alcance de un incidente.
- `security posture` → nivel general de preparación y protección de una organización.

## Lo que más costó

No hubo errores en el cuestionario: las seis respuestas fueron correctas. El punto central para conservar es que una alerta todavía necesita análisis; no equivale automáticamente a un incidente confirmado.

## Qué aprendí

Entendí cómo un SOC monitorea, investiga y responde continuamente, cómo se dividen los niveles de analistas y por qué la detección reactiva debe complementarse con threat hunting y colaboración con otras áreas.

## Para repasar o practicar

- Diferenciar alerta, evento e incidente.
- Explicar el trabajo de Tier 1, Tier 2 y Tier 3.
- Comparar respuesta reactiva con threat hunting proactivo.
- Recordar las funciones del SOC Manager y del CISO.
- Practicar un flujo simple desde alerta hasta contención.

## Cuestionario de repaso

1. ¿Cuál es la función principal de un SOC? — **Respuesta:** Monitorear, detectar, analizar y responder a amenazas.
2. ¿Qué hace normalmente un analista Tier 1? — **Respuesta:** Realiza el triage inicial y escala los casos necesarios.
3. ¿Cuál es la diferencia principal entre un SOC Analyst y un Threat Hunter? — **Respuesta:** El Threat Hunter busca amenazas ocultas de manera proactiva.
4. ¿Quién coordina las operaciones diarias del SOC? — **Respuesta:** El SOC Manager.
5. ¿Una alerta confirma automáticamente un incidente? — **Respuesta:** No; debe analizarse para determinar si es real y cuál es su impacto.
6. ¿Por qué colabora el SOC con IT? — **Respuesta:** Para aplicar parches, corregir configuraciones y recuperar sistemas.
