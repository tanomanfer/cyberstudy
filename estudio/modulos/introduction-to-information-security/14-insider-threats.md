# 14 de 24 — Insider Threats

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Una **amenaza interna** proviene de una persona o cuenta que posee acceso legítimo a los sistemas, datos o instalaciones de una organización. El daño puede ser intencional, accidental o provocado por un atacante externo que robó las credenciales de alguien autorizado.

Estas amenazas son especialmente peligrosas porque se mezclan con la actividad normal. Un interno conoce los procesos, la ubicación de la información valiosa y los controles existentes, por lo que puede evitar alertas que sí detectarían a un intruso externo.

## Conceptos importantes

### Interno malicioso

Actúa con intención de causar daño. Puede robar datos, sabotear sistemas o cometer fraude por dinero, venganza, beneficio personal o para ayudar a otra organización.

### Interno negligente

No desea causar daño, pero lo provoca por descuido o falta de conocimiento. Ejemplos: enviar información confidencial a un destinatario incorrecto, usar prácticas inseguras o caer en phishing.

### Interno comprometido

Un atacante externo obtiene las credenciales de una persona autorizada mediante hacking o ingeniería social. Después opera con esa identidad dentro de los sistemas, por lo que sus acciones pueden parecer legítimas.

### Cadena de amenaza interna

1. **Motivación:** surge una razón para actuar, como un conflicto personal, dinero o coerción externa.
2. **Planificación:** el interno evalúa sus privilegios y localiza activos valiosos.
3. **Preparación:** reúne herramientas o información y aprende cómo evitar controles.
4. **Ejecución:** realiza el robo, sabotaje o divulgación no autorizada.
5. **Ocultamiento:** intenta borrar registros, usar cuentas ajenas o disfrazar la actividad como trabajo rutinario.

### Impacto

Una amenaza interna puede producir pérdidas económicas, filtraciones, interrupciones, robo de propiedad intelectual, pérdida de ventaja competitiva y daño reputacional. También puede deteriorar la confianza entre empleados y provocar multas, demandas, auditorías o sanciones por incumplimiento de leyes y estándares aplicables.

## Comandos y opciones

Esta sección es conceptual y no incluye comandos. En un entorno real, la detección utiliza registros y herramientas autorizadas, pero debe combinarse con mínimo privilegio, separación de funciones, revisiones de acceso y procedimientos claros de alta, cambio y baja de personal.

## Diferencias que hay que recordar

- **Malicioso vs negligente:** el malicioso tiene intención de dañar; el negligente causa el daño sin buscarlo.
- **Negligente vs comprometido:** el negligente comete el error personalmente; en el comprometido, un tercero utiliza sus credenciales o sesión.
- **Acceso legítimo vs acción legítima:** poseer permiso para entrar a un sistema no autoriza cualquier uso de sus datos.
- **Preparación vs ejecución:** preparar es reunir medios o estudiar controles; ejecutar es realizar efectivamente el robo, sabotaje o divulgación.
- **Ejecución vs ocultamiento:** la primera produce el daño; el segundo intenta evitar que se descubra.

## Ejemplos prácticos

- Un empleado copia recetas comerciales y las vende a un competidor: interno malicioso.
- Una persona envía por error datos confidenciales al correo equivocado: interno negligente.
- Un atacante roba una contraseña mediante phishing y usa la cuenta corporativa: interno comprometido.
- Alguien analiza qué carpetas puede abrir y reúne archivos antes de extraerlos: planificación y preparación.
- Después del robo, elimina registros o usa las credenciales de un compañero: ocultamiento.

## Errores y precauciones

- No asumir que todo acceso autenticado es seguro o legítimo.
- No otorgar permisos mayores que los necesarios para cada función.
- No ignorar comportamientos anómalos por tratarse de una persona conocida.
- No confundir vigilancia generalizada con prevención: los controles deben ser proporcionales, autorizados y respetar la privacidad y las normas aplicables.
- Revisar y retirar rápidamente accesos cuando una persona cambia de rol o deja la organización.
- Investigar sin destruir evidencia y siguiendo el procedimiento autorizado de respuesta a incidentes.

## Inglés técnico del módulo

- `insider threat` → amenaza originada desde una persona o cuenta con acceso interno legítimo.
- `malicious insider` → interno que causa daño deliberadamente.
- `negligent insider` → interno que causa daño por descuido.
- `compromised insider` → persona cuya cuenta o credenciales controla un atacante externo.
- `access privileges` → permisos concedidos a una identidad.
- `intellectual property` → propiedad intelectual, como diseños, fórmulas o secretos comerciales.
- `concealment` → ocultamiento de acciones o evidencias.
- `regulatory compliance` → cumplimiento de leyes, reglamentos y estándares aplicables.

## Lo que más costó

No hubo errores en el cuestionario: las seis respuestas fueron correctas. Conviene recordar que “interno comprometido” describe una identidad interna usada por un atacante externo; no implica necesariamente mala intención ni negligencia de la persona propietaria de la cuenta.

## Qué aprendí

Entendí que una amenaza interna puede ser maliciosa, negligente o comprometida. Puedo reconocer las cinco etapas de su cadena, explicar por qué el acceso legítimo dificulta la detección y relacionar estos incidentes con consecuencias operativas, económicas, legales y reputacionales.

## Para repasar o practicar

- Clasificar casos nuevos como maliciosos, negligentes o comprometidos.
- Ordenar las cinco etapas de la cadena de amenaza interna.
- Diferenciar preparación, ejecución y ocultamiento.
- Pensar controles preventivos y detectivos sin vulnerar la privacidad.
- Relacionar mínimo privilegio y revisión de accesos con la reducción del riesgo.

## Cuestionario de repaso

1. Un empleado roba información deliberadamente para venderla, ¿qué tipo de amenaza es? — **Respuesta:** Interno malicioso.
2. Una empleada envía accidentalmente información confidencial al destinatario equivocado, ¿qué tipo es? — **Respuesta:** Interno negligente.
3. Un atacante roba la contraseña de un empleado y utiliza su cuenta, ¿cómo se clasifica esa identidad interna? — **Respuesta:** Interno comprometido.
4. ¿Por qué las amenazas internas son difíciles de detectar? — **Respuesta:** Porque poseen acceso legítimo y sus acciones pueden parecer normales.
5. ¿En qué etapa se realiza el robo o sabotaje? — **Respuesta:** Ejecución.
6. Borrar registros para evitar ser descubierto, ¿a qué etapa pertenece? — **Respuesta:** Ocultamiento.
