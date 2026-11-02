# 17 de 24 — Red Team

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Un **Red Team** es un grupo autorizado de profesionales que simula ataques reales contra los sistemas, redes, personas e instalaciones de una organización. Su finalidad no es causar daño, sino descubrir debilidades antes de que las aproveche un adversario verdadero y comprobar si la organización puede detectar, detener y responder a una campaña sofisticada.

La analogía del castillo ayuda a entenderlo: el rey contrata especialistas para que se disfracen de invasores, busquen caminos ocultos y traten de engañar a los guardias. Aunque imitan al enemigo, su misión es revelar fallas para reforzar el castillo.

## Conceptos importantes

### Enfoque integral

Una prueba técnica común puede concentrarse en vulnerabilidades de software o red. Un Red Team combina varios vectores:

- Ataques técnicos contra sistemas, aplicaciones y redes.
- Phishing y otras formas de ingeniería social.
- Pruebas de controles físicos, puertas, vigilancia y procedimientos.
- Evaluación de detección, respuesta y comunicación interna.
- Revisión de políticas, capacitación y concientización.
- Riesgos de proveedores y cadena de suministro.
- Exposición de información en sitios web, perfiles y redes sociales.

Esta combinación permite descubrir cadenas de fallas que por separado parecerían menores. Por ejemplo, información pública sobre un empleado puede permitir un phishing creíble; la cuenta obtenida puede abrir un sistema; y ese sistema puede conducir a información más sensible.

### Composición del equipo

El equipo reúne especialistas técnicos, ingenieros sociales y expertos en seguridad física. Un integrante puede buscar vulnerabilidades; otro enviar correos convincentes; otro intentar ingresar a un área restringida. La coordinación reproduce la forma en que un atacante real adapta sus técnicas y cambia de vector cuando encuentra resistencia.

### Desarrollo de un ejercicio

Los ejercicios suelen durar semanas o meses:

1. **Reconocimiento:** estudian sitios, perfiles, empleados, tecnologías e información pública.
2. **Planificación:** eligen objetivos y vías de entrada dentro del alcance autorizado.
3. **Ejecución encubierta:** simulan ataques técnicos, humanos o físicos.
4. **Evaluación defensiva:** observan si la organización detecta, comunica, contiene y responde.
5. **Documentación:** registran cada intento, qué funcionó, qué falló y por qué.
6. **Informe y mejora:** presentan hallazgos, impacto posible y recomendaciones.

La mayoría de los empleados puede desconocer el ejercicio para que la reacción sea auténtica. Esto no significa ausencia de permiso: la dirección responsable autorizó previamente la operación, definió límites y conoce cómo detenerla si fuera necesario.

### Preguntas que busca responder

- ¿Es posible ingresar a los sistemas o instalaciones?
- ¿Cuánto tarda la organización en detectar una intrusión?
- ¿Puede contenerla antes de que alcance información sensible?
- ¿Los empleados reconocen phishing y manipulación?
- ¿Los controles físicos y las políticas funcionan en la práctica?
- ¿Los proveedores o la presencia pública crean nuevas vías de entrada?

### Informe final

El Red Team documenta cómo ingresó, qué sistemas o datos pudo alcanzar, qué controles funcionaron y cuáles fallaron. También propone mejoras. El informe suele llegar al CISO y a la dirección para priorizar capacitación, tecnología, procedimientos, controles físicos o seguridad de terceros según el riesgo demostrado.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. Las técnicas de Red Team solo deben ejecutarse con autorización escrita, alcance definido, reglas de enfrentamiento y canales de emergencia.

## Diferencias que hay que recordar

- **Threat actor vs Red Team:** ambos pueden usar técnicas similares, pero el actor real actúa maliciosamente; el Red Team tiene autorización y finalidad defensiva.
- **Red Team vs Blue Team:** el Red Team simula al adversario; el Blue Team monitorea, detecta, contiene y responde.
- **Prueba puntual vs Red Team:** una prueba puntual busca fallas concretas; el Red Team simula una campaña coordinada de varios vectores.
- **Secreto vs falta de autorización:** los empleados pueden desconocer el ejercicio, pero las autoridades responsables sí lo aprobaron.
- **Hallazgo vs mejora:** encontrar una falla no es el resultado final; debe documentarse, priorizarse y corregirse.

## Ejemplos prácticos

- Recopilar información pública sobre empleados para preparar un phishing personalizado.
- Probar una vulnerabilidad de red dentro del alcance acordado.
- Intentar persuadir a un guardia o probar un control de acceso físico autorizado.
- Combinar una cuenta obtenida en phishing con una mala configuración para llegar a datos sensibles.
- Medir cuánto tarda el Blue Team en detectar y contener la actividad.
- Recomendar capacitación si el problema principal fue humano o mejorar controles si fue técnico o físico.

## Errores y precauciones

- Nunca realizar una simulación ofensiva sin autorización y alcance claros.
- Respetar las reglas de enfrentamiento y evitar daños innecesarios.
- No conservar ni reutilizar credenciales o datos obtenidos durante la prueba.
- Registrar también los intentos fallidos, porque muestran controles que funcionaron.
- No convertir el informe en una lista de culpas personales; debe orientar mejoras del sistema.
- Proteger el informe final, ya que describe debilidades reales de la organización.

## Inglés técnico del módulo

- `Red Team` → equipo que simula al adversario de manera autorizada.
- `Blue Team` → equipo que defiende, detecta y responde.
- `engagement` → ejercicio o trabajo autorizado con alcance y duración definidos.
- `scope` → sistemas, personas y acciones incluidos en la autorización.
- `rules of engagement` → límites, procedimientos y condiciones de la simulación.
- `covert operation` → operación realizada de forma encubierta.
- `attack vector` → vía utilizada para intentar comprometer el objetivo.
- `security posture` → capacidad general de una organización para prevenir y responder.
- `digital footprint` → información y rastros públicos asociados a la organización.
- `findings` → hallazgos documentados durante la evaluación.

## Lo que más costó

No hubo errores en el cuestionario: las seis respuestas fueron correctas. El punto importante es no confundir el carácter encubierto con una actividad ilegal: el ejercicio cuenta con autorización, aunque la mayoría de los empleados no conozca su existencia.

## Qué aprendí

Entendí que un Red Team realiza una simulación autorizada, realista e integral. Puedo explicar sus etapas, diferenciarlo de un threat actor, un Blue Team y una prueba técnica puntual, y describir cómo sus hallazgos orientan inversiones y mejoras.

## Para repasar o practicar

- Explicar por qué un Red Team evalúa tecnología, personas y seguridad física.
- Diferenciar autorización general de conocimiento de todos los empleados.
- Ordenar las etapas de un engagement.
- Identificar qué información debe incluir el informe final.
- Relacionar cada hallazgo con una mejora concreta.

## Cuestionario de repaso

1. ¿Cuál es la finalidad principal de un Red Team? — **Respuesta:** Simular ataques autorizados para encontrar debilidades y mejorar las defensas.
2. ¿Qué diferencia una evaluación Red Team de una prueba técnica limitada? — **Respuesta:** Evalúa en conjunto tecnología, personas y seguridad física.
3. ¿Por qué la mayoría de los empleados puede desconocer el ejercicio? — **Respuesta:** Para observar una respuesta auténtica y no condicionada.
4. ¿Qué debe documentar el Red Team durante la operación? — **Respuesta:** Lo que intentó, qué funcionó, qué falló y por qué.
5. ¿Qué contiene el informe final? — **Respuesta:** Las vías utilizadas, el alcance conseguido, los hallazgos y recomendaciones.
6. ¿Cuál es una diferencia correcta entre Red Team y Blue Team? — **Respuesta:** Red Team simula al atacante; Blue Team detecta y responde.
