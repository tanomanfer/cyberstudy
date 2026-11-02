# 19 de 24 — Purple Team

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

El **Purple Teaming** es un enfoque colaborativo que integra la experiencia ofensiva del Red Team con la experiencia defensiva del Blue Team. Red explica cómo atacó; Blue muestra qué detectó y cómo respondió; ambos ajustan técnicas y controles, repiten las pruebas y comprueban si la seguridad realmente mejoró.

La analogía medieval presenta al Blue Team como los caballeros que protegen el castillo y al Red Team como atacantes autorizados que simulan invasiones. Purple Teaming aparece cuando ambos comparten conocimientos para mejorar continuamente las estrategias ofensivas y defensivas.

## Conceptos importantes

### Composición

Participan integrantes de ambos equipos:

- **Penetration Testers y Ethical Hackers:** reproducen técnicas de adversarios y explican cómo identificaron y explotaron las vulnerabilidades.
- **Security Analysts e Incident Responders:** observan las señales, detectan la actividad, contienen el incidente y explican qué controles funcionaron o fallaron.

Purple Team no siempre es un tercer equipo permanente. Puede ser una forma de trabajo entre Red y Blue, facilitada para garantizar comunicación, objetivos compartidos y seguimiento de las mejoras.

### Ciclo colaborativo

1. Red ejecuta una técnica específica.
2. Blue intenta detectarla y responder.
3. Ambos comparan lo ocurrido con lo esperado.
4. Red explica los detalles de la técnica y Blue identifica puntos ciegos.
5. Se ajustan reglas, registros, herramientas o procedimientos.
6. Red repite la técnica para verificar la mejora.

La repetición es esencial: una recomendación escrita no demuestra que el nuevo control funcione. La segunda prueba aporta evidencia.

### Propósitos

- **Mejorar defensas:** Red aporta conocimiento sobre técnicas reales para que Blue cree mejores controles.
- **Mejorar detección y respuesta:** Blue explica las señales observadas y ayuda a que las simulaciones sean útiles y medibles.
- **Compartir conocimiento:** ambos equipos entienden mejor los métodos, herramientas y limitaciones del otro.
- **Adaptarse continuamente:** se actualizan frente a nuevas amenazas, vulnerabilidades y mecanismos defensivos.
- **Responder mejor:** la práctica conjunta mejora coordinación, velocidad y priorización durante incidentes reales.

### Pruebas colaborativas

En un ejercicio Purple Team, Red puede ejecutar ataques mientras Blue observa y defiende en tiempo real. La comunicación directa permite detectar rápidamente por qué una técnica no produjo alertas o por qué una respuesta fue ineficaz.

Esto contrasta con un ejercicio Red Team completamente encubierto, donde se evalúa la respuesta sin aviso. Ambos enfoques son útiles, pero persiguen dinámicas diferentes.

### Uso eficiente de recursos

Al compartir resultados, los equipos concentran tiempo y presupuesto en debilidades comprobadas. Pueden priorizar vulnerabilidades críticas y dejar en segundo plano hallazgos con poco impacto real.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. Las simulaciones ofensivas requieren autorización, alcance definido y reglas de enfrentamiento, incluso cuando Red y Blue trabajan de manera abierta.

## Diferencias que hay que recordar

- **Red Team:** reproduce técnicas del adversario y busca vías de explotación.
- **Blue Team:** previene, monitorea, detecta, contiene y responde.
- **Purple Team:** conecta ambos conocimientos en un ciclo de prueba y mejora.
- **Equipo permanente vs enfoque:** Purple puede ser un grupo formal o una modalidad de colaboración.
- **Ejercicio encubierto vs Purple Teaming:** el encubierto busca una reacción sin aviso; Purple prioriza comunicación, enseñanza y repetición inmediata.
- **Recomendación vs validación:** sugerir un control no basta; repetir el ataque demuestra si funciona.

## Ejemplos prácticos

Red ejecuta movimiento lateral y Blue no genera una alerta. Ambos revisan qué registros existían, qué datos no llegaron al SIEM y qué regla faltaba. Blue configura la detección y Red repite exactamente la técnica. Si aparece una alerta útil y el equipo responde correctamente, la mejora queda validada.

Otro ejemplo es un phishing simulado: Red explica qué elementos hicieron creíble el mensaje; Blue revisa controles de correo, alertas y respuesta; luego se actualizan filtros y capacitación y se realiza una nueva simulación.

## Errores y precauciones

- No convertir el ejercicio en una competencia entre equipos.
- No ocultar a Blue los detalles necesarios una vez iniciada la fase colaborativa.
- No confundir comunicación con falta de realismo: se pueden probar técnicas reales de forma controlada.
- No cerrar un hallazgo sin volver a probarlo.
- No realizar técnicas ofensivas fuera del alcance autorizado.
- Documentar tanto la técnica como la detección y la mejora aplicada.

## Inglés técnico del módulo

- `Purple Teaming` → colaboración estructurada entre capacidades ofensivas y defensivas.
- `Penetration Tester` → profesional autorizado que intenta explotar vulnerabilidades.
- `Ethical Hacker` → especialista que utiliza técnicas ofensivas con autorización.
- `collaborative security testing` → pruebas de seguridad realizadas conjuntamente.
- `knowledge sharing` → intercambio de conocimientos entre equipos.
- `detection gap` → actividad maliciosa que los controles no detectan.
- `feedback loop` → ciclo de ejecución, análisis, ajuste y nueva prueba.
- `real-time defense` → defensa y observación durante la ejecución de la técnica.
- `continuous improvement` → mejora continua basada en aprendizaje y verificación.

## Lo que más costó

Las seis respuestas fueron correctas. Tano señaló que la pregunta 3 era ambigua porque “qué deberían hacer” no indicaba claramente quiénes. Se reformuló para preguntar por el siguiente paso conjunto de Red y Blue dentro de un ejercicio Purple Team.

## Qué aprendí

Entendí que Purple Teaming no busca un ganador entre Red y Blue. Su valor está en compartir técnicas, detectar puntos ciegos, ajustar defensas y repetir las pruebas para demostrar la mejora.

## Para repasar o practicar

- Explicar el ciclo completo desde el ataque hasta la repetición.
- Diferenciar un Red Team encubierto de Purple Teaming.
- Identificar qué aporta cada equipo.
- Pensar cómo comprobar una nueva regla de detección.
- Recordar que Purple Team puede ser un enfoque y no necesariamente un equipo permanente.

## Cuestionario de repaso

1. ¿Cuál es el propósito principal del enfoque Purple Team? — **Respuesta:** Integrar conocimientos ofensivos y defensivos para mejorar la seguridad.
2. ¿Quiénes suelen participar en Purple Teaming? — **Respuesta:** Integrantes de Red Team y Blue Team.
3. Red ejecuta una técnica que Blue no detecta. Dentro de un ejercicio Purple Team, ¿cuál debería ser el siguiente paso conjunto? — **Respuesta:** Analizar por qué falló la detección, mejorar los controles y repetir la prueba.
4. ¿Qué aporta principalmente el Red Team durante la colaboración? — **Respuesta:** Conocimiento sobre técnicas de ataque y explotación.
5. ¿Qué aporta principalmente el Blue Team? — **Respuesta:** Experiencia en monitoreo, detección y respuesta.
6. ¿Qué diferencia a Purple Teaming de un ejercicio Red Team completamente encubierto? — **Respuesta:** Favorece la comunicación, el aprendizaje conjunto y la repetición de pruebas.
