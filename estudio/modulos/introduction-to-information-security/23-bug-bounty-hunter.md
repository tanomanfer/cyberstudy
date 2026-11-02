# 23 de 24 — Bug Bounty Hunter

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Un **Bug Bounty Hunter** es un investigador independiente que busca vulnerabilidades en activos expresamente autorizados por una organización. Reporta las fallas mediante el canal establecido para que puedan corregirse antes de que las aprovechen atacantes maliciosos.

La autorización nunca es general: está limitada por el alcance y las reglas de cada programa.

## Conceptos importantes

### Programas de bug bounty

Una organización invita a investigadores externos a revisar sitios, aplicaciones, APIs u otros activos. A cambio de reportes válidos puede ofrecer reconocimiento o dinero. Los programas pueden ser públicos o privados por invitación.

### Alcance

El **scope** distingue los activos autorizados de los excluidos. Que un sistema sea accesible desde Internet o pertenezca a la misma empresa no lo vuelve automáticamente válido. Probar activos fuera del alcance puede invalidar el reporte y generar consecuencias legales.

### Rules of Engagement

Las reglas describen técnicas permitidas y prohibidas. Pueden excluir denegación de servicio, ingeniería social, modificación de datos, afectación de usuarios o divulgación pública anticipada.

### Reporte responsable

Un buen informe identifica el activo, describe la vulnerabilidad, ofrece pasos reproducibles y evidencia mínima, explica el impacto y evita exponer información sensible. La organización valida si el hallazgo es real, reproducible, original y está dentro del alcance.

### Recompensas

La recompensa depende de la gravedad, el impacto y las condiciones del programa. No todo reporte recibe dinero: puede ser duplicado, estar fuera del alcance, describir un comportamiento esperado o carecer de impacto demostrable.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. Las técnicas concretas siempre deben ajustarse al alcance y a las reglas del programa; una herramienta no otorga autorización.

## Diferencias que hay que recordar

- **Bug bounty vs ataque malicioso:** el hunter trabaja con autorización, reglas y divulgación responsable.
- **Bug bounty vs pentest:** el pentest suele contratarse por un período y alcance; el bounty puede quedar abierto y recompensa hallazgos válidos.
- **Hallazgo vs reporte válido:** observar algo extraño no alcanza; hay que demostrar impacto y cumplir las reglas.
- **Público vs privado:** cambia quién puede participar, no la obligación de respetar el alcance.
- **Divulgación responsable vs publicación inmediata:** primero se reporta por el canal autorizado y se permite investigar y corregir.

## Ejemplos prácticos

- El programa autoriza `app.ejemplo.com` pero excluye otros subdominios: solamente el activo indicado está permitido.
- Dos investigadores reportan la misma falla; el segundo informe puede clasificarse como duplicado.
- Una vulnerabilidad que permite comprometer cuentas recibe mayor prioridad que un detalle sin impacto práctico.
- El investigador demuestra acceso con la evidencia mínima y se detiene antes de consultar datos reales innecesarios.

## Errores y precauciones

- Leer el alcance y las reglas antes de comenzar.
- No interpretar “programa público” como permiso para probar toda la empresa.
- No usar denegación de servicio o ingeniería social si están prohibidas.
- No acceder, modificar ni conservar más datos de los necesarios.
- No publicar una falla antes del proceso de divulgación acordado.
- No asumir que todo reporte válido tendrá recompensa.

## Inglés técnico del módulo

- `bug bounty hunter` → investigador que busca fallas mediante programas autorizados.
- `scope` → activos y límites autorizados.
- `in scope` / `out of scope` → dentro o fuera del alcance.
- `rules of engagement` → condiciones y técnicas permitidas.
- `responsible disclosure` → comunicación controlada de una vulnerabilidad para facilitar su corrección.
- `duplicate` → vulnerabilidad ya reportada previamente.
- `severity` → gravedad técnica del hallazgo.
- `reward structure` → reglas que determinan reconocimiento o pago.

## Lo que más costó

No hubo errores en el cuestionario: las seis respuestas fueron correctas. La regla esencial es que la autorización siempre se limita a los activos y acciones expresamente definidos por el programa.

## Qué aprendí

Entendí cómo funciona un programa de bug bounty, por qué debo respetar alcance y reglas, qué necesita un reporte reproducible y por qué un hallazgo puede no recibir recompensa aunque parezca interesante.

## Para repasar o practicar

- Leer un scope e identificar activos permitidos y excluidos.
- Diferenciar severidad técnica de impacto real.
- Practicar la estructura de un reporte reproducible.
- Comparar bug bounty y pentest.
- Recordar las condiciones que producen duplicados o reportes inválidos.

## Cuestionario de repaso

1. ¿Qué autoriza a un Bug Bounty Hunter a probar sistemas? — **Respuesta:** El alcance y las reglas definidos por el programa.
2. ¿Qué significa que un activo esté fuera del alcance? — **Respuesta:** No está autorizado probarlo bajo ese programa.
3. ¿Qué debería incluir un buen reporte? — **Respuesta:** Pasos reproducibles, evidencia, activo afectado e impacto.
4. ¿Por qué un reporte válido podría no recibir una recompensa nueva? — **Respuesta:** Puede ser un duplicado ya informado.
5. ¿Cuál es una diferencia habitual entre bug bounty y pentest? — **Respuesta:** El pentest suele contratarse por un período y alcance; el bounty recompensa hallazgos válidos según el programa.
6. ¿Qué es la divulgación responsable? — **Respuesta:** Reportar por el canal autorizado, minimizar el daño y permitir la corrección.
