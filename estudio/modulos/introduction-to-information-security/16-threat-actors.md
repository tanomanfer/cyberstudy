# 16 de 24 — Threat Actors

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Un **threat actor** es una persona o grupo que intenta comprometer sistemas, redes, datos o personas con una finalidad dañina. Puede actuar individualmente o como un equipo organizado con especialistas que colaboran durante distintas etapas del ataque.

Sus técnicas pueden parecerse a las utilizadas por profesionales defensivos, pero la intención y la autorización son diferentes. Un actor de amenaza busca perjudicar o beneficiarse sin permiso; un Red Team imita al adversario dentro de un ejercicio autorizado para mejorar la seguridad; el Blue Team protege, detecta y responde.

## Conceptos importantes

### Integrantes de un equipo atacante

- **Programadores expertos:** crean malware, scripts o herramientas adaptadas al objetivo.
- **Especialistas en redes:** estudian infraestructuras, configuraciones y puntos débiles para ingresar o moverse.
- **Ingenieros sociales:** manipulan personas para conseguir información, credenciales o acciones.
- **Analistas de datos:** procesan la información robada para localizar inteligencia financiera, estratégica o comercial.
- **Especialistas en exfiltración:** extraen datos o despliegan cargas intentando ocultar el recorrido y las evidencias.
- **Líderes o estrategas:** fijan objetivos, coordinan integrantes y planifican las fases de la operación.

La analogía con un robo bancario muestra la coordinación: un explorador estudia el edificio y las rutinas; otro especialista supera cerraduras o alarmas; alguien prepara la salida y evita dejar rastros; el líder hace que todas las acciones respondan al mismo plan.

### Actores individuales

Un actor también puede trabajar solo, a veces llamado **lone wolf**. Puede poseer varias capacidades y ejecutar desde phishing sencillo hasta malware sofisticado. Aunque suele contar con menos recursos que un grupo, su autonomía y la falta de comunicaciones internas pueden volverlo difícil de detectar.

### Herramientas y técnicas

El reconocimiento puede combinar escáneres de red, información de fuentes abiertas (**OSINT**) e ingeniería social. Para obtener acceso se pueden utilizar malware, rootkits o scripts personalizados. Para ocultar comunicaciones y extracción de datos pueden usarse canales cifrados, ofuscación y VPN.

Las herramientas no definen por sí solas al actor: importa cómo se combinan, con qué autorización y para qué objetivo se utilizan.

### Métodos low and slow

Los grupos cuidadosos evitan técnicas demasiado **ruidosas**, como una fuerza bruta evidente o malware fácilmente detectable. Prefieren actuar lentamente, reducir la frecuencia de sus acciones y mezclarse con la actividad normal. Este enfoque se denomina **low and slow** y busca disminuir la posibilidad de activar alertas.

### Motivaciones

- **Ganancia económica:** fraude, robo de dinero, ransomware o venta de datos.
- **Espionaje:** obtención de secretos gubernamentales, corporativos o tecnológicos.
- **Disrupción:** detener servicios, destruir datos o difundir desinformación.
- **Ideología:** promover una causa política, religiosa o social atacando a sus adversarios.
- **Venganza:** responder a un daño o agravio real o percibido.

## Comandos y opciones

Esta sección es conceptual. Las herramientas mencionadas, como escáneres, rootkits o VPN, pueden tener usos legítimos o maliciosos; solo deben emplearse en sistemas propios o con autorización explícita.

## Diferencias que hay que recordar

- **Threat actor vs Red Team:** el actor de amenaza actúa maliciosamente y sin autorización; el Red Team simula esas técnicas dentro de un alcance autorizado.
- **Red Team vs Blue Team:** el Red Team representa al adversario; el Blue Team monitorea, detecta y responde.
- **Equipo vs lone wolf:** el equipo reparte tareas entre especialistas y dispone de más recursos; el actor individual concentra capacidades y trabaja de forma autónoma.
- **Reconocimiento vs exfiltración:** reconocer es estudiar al objetivo antes o durante el acceso; exfiltrar es sacar datos obtenidos.
- **Ataque ruidoso vs low and slow:** el primero genera muchas señales rápidamente; el segundo sacrifica velocidad para conservar el sigilo.
- **Herramienta vs intención:** una VPN o un escáner no son maliciosos por sí mismos; el contexto, el permiso y el uso determinan la actividad.

## Ejemplos prácticos

- Un especialista OSINT analiza perfiles públicos para entender hábitos de empleados.
- Un programador prepara malware adaptado a una vulnerabilidad concreta.
- Un ingeniero social llama haciéndose pasar por soporte para obtener acceso.
- Un analista revisa documentos robados y separa secretos comerciales de información sin valor.
- Un especialista extrae datos mediante un canal cifrado procurando no activar alertas.
- Un actor realiza pocos intentos espaciados para no parecer una fuerza bruta.

## Errores y precauciones

- No asumir que todos los actores trabajan en grupos o para gobiernos.
- No atribuir una campaña únicamente por una herramienta, porque distintos grupos pueden usarla.
- No confundir técnicas similares con la misma intención: autorización y objetivo son esenciales.
- No considerar inofensiva una actividad solamente porque avanza lentamente.
- No usar herramientas ofensivas fuera de un laboratorio o alcance expresamente autorizado.

## Inglés técnico del módulo

- `threat actor` → persona o grupo que representa una amenaza activa.
- `lone wolf` → actor individual que opera sin un equipo.
- `expert programmer` → especialista que desarrolla software o malware personalizado.
- `network specialist` → especialista que analiza y explota infraestructura de red.
- `social engineer` → persona que manipula a otras para obtener información o acciones.
- `exfiltration specialist` → integrante encargado de extraer datos y ocultar rastros.
- `open-source intelligence (OSINT)` → inteligencia obtenida de fuentes públicas.
- `rootkit` → software diseñado para mantener acceso privilegiado y ocultarse.
- `low and slow` → actividad lenta y poco ruidosa para reducir la detección.
- `brute-force attack` → intentos repetidos y numerosos para adivinar credenciales.

## Lo que más costó

Las seis respuestas fueron comprendidas correctamente. En la pregunta final se tipeó una opción equivocada, pero Tano identificó de inmediato que las motivaciones reales incluyen dinero, espionaje, disrupción, ideología y venganza.

## Qué aprendí

Entendí que un threat actor puede ser un equipo especializado o una persona sola. Puedo describir los roles del equipo, explicar el enfoque low and slow, reconocer sus principales motivaciones y diferenciar un atacante de Red Team y Blue Team.

## Para repasar o practicar

- Asociar cada rol con su función dentro de una operación.
- Comparar las ventajas y limitaciones de un grupo y un lone wolf.
- Explicar por qué un atacante evita técnicas ruidosas.
- Clasificar casos según su motivación principal.
- Recordar que las mismas herramientas pueden tener usos legítimos o maliciosos.

## Cuestionario de repaso

1. ¿Qué diferencia principalmente a un threat actor de un Red Team? — **Respuesta:** El threat actor actúa con fines maliciosos; el Red Team trabaja con autorización.
2. ¿Qué integrante crea malware y herramientas personalizadas? — **Respuesta:** El programador experto.
3. ¿Cuál es el trabajo principal del especialista en exfiltración? — **Respuesta:** Extraer datos intentando evitar la detección.
4. ¿Qué es un lone wolf? — **Respuesta:** Un actor de amenaza que trabaja individualmente.
5. ¿Qué significa utilizar métodos low and slow? — **Respuesta:** Avanzar lentamente y con poco ruido para evitar alertas.
6. ¿Cuáles pueden ser motivaciones de un threat actor? — **Respuesta:** Ganancia económica, espionaje, disrupción, ideología o venganza.
