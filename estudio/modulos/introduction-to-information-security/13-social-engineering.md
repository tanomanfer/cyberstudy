# 13 de 24 — Social Engineering

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

La **ingeniería social** consiste en manipular psicológicamente a una persona para que revele información confidencial, entregue acceso o realice una acción insegura. En lugar de vulnerar directamente una defensa técnica, el atacante explota comportamientos humanos como la confianza, la amabilidad, la curiosidad, la urgencia o el deseo de recibir un beneficio.

Esto permite saltar controles muy sólidos: si una persona autorizada entrega su contraseña o abre una puerta, el atacante puede actuar con permisos que no conseguiría atacando el sistema desde afuera.

## Conceptos importantes

### Phishing

El atacante envía un correo o mensaje que aparenta provenir de una entidad legítima. Suele crear urgencia y dirigir a una página falsa para robar usuarios, contraseñas o datos financieros. El engaño está en el mensaje y en la identidad simulada.

### Pretexting

El atacante inventa una historia o identidad creíble, llamada **pretexto**, para conseguir información o lograr una acción. Por ejemplo, puede llamar fingiendo ser del área de soporte y afirmar que necesita la contraseña para resolver un problema.

### Baiting

Se utiliza un señuelo atractivo para despertar curiosidad o interés. Un pendrive llamado “Sueldos 2026” puede contener malware: la propia víctima activa la trampa al conectarlo.

### Tailgating

El atacante entra a un área restringida siguiendo a una persona autorizada. Puede aprovechar la cortesía, por ejemplo cargando una caja para que alguien le sostenga una puerta controlada por tarjeta.

### Quid pro quo

El atacante ofrece un supuesto beneficio a cambio de información o acceso. Un ejemplo es prometer una actualización gratuita a cambio de las credenciales. La expresión significa “algo por algo”.

### Impacto

La ingeniería social puede causar filtraciones de datos, fraude, pérdidas económicas, interrupciones operativas y daño reputacional. Es difícil crear una defensa completamente efectiva porque incluso una persona capacitada puede ser engañada por un atacante hábil y porque las técnicas evolucionan con las tecnologías y las costumbres sociales.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. La defensa depende de verificar identidades y solicitudes por canales oficiales, aplicar mínimo privilegio, capacitar al personal y reportar intentos sospechosos.

## Diferencias que hay que recordar

- **Phishing vs pretexting:** phishing suele usar un mensaje falso y masivo o dirigido; pretexting se apoya en una historia e identidad fabricadas para sostener la interacción.
- **Baiting vs quid pro quo:** baiting deja un señuelo tentador para que la víctima actúe; quid pro quo propone explícitamente un intercambio.
- **Tailgating vs ataques digitales:** tailgating busca acceso físico aprovechando a una persona autorizada.
- **Ataque técnico vs ingeniería social:** el primero explota fallas de sistemas; la segunda explota decisiones y emociones humanas. Pueden combinarse en un mismo incidente.

## Ejemplos prácticos

- Un correo que imita al banco exige verificar la cuenta mediante un enlace falso: phishing.
- Una persona llama fingiendo ser de soporte y pide la contraseña: pretexting.
- Un pendrive atractivo dejado en un estacionamiento instala malware al conectarlo: baiting.
- Alguien sin tarjeta logra que un empleado le sostenga una puerta: tailgating.
- Un falso técnico ofrece una mejora de software a cambio del usuario y la contraseña: quid pro quo.

## Errores y precauciones

- No entregar contraseñas: un soporte legítimo no debería necesitarlas.
- No confiar solamente en uniformes, documentos, nombres conocidos o números telefónicos visibles.
- No actuar por urgencia sin verificar la solicitud mediante un canal oficial independiente.
- No conectar dispositivos USB encontrados o de origen desconocido.
- No permitir el ingreso de otra persona a una zona restringida sin que valide sus propias credenciales.
- Reportar el intento aunque no haya producido daño; puede formar parte de una campaña contra más personas.

## Inglés técnico del módulo

- `social engineering` → manipulación de personas para obtener información, acceso o acciones.
- `phishing` → mensaje engañoso que suplanta una fuente legítima.
- `pretexting` → uso de una identidad o situación inventada.
- `baiting` → uso de un señuelo atractivo para provocar una acción.
- `tailgating` → ingreso físico siguiendo a una persona autorizada.
- `quid pro quo` → ofrecimiento de un beneficio a cambio de información o acceso.
- `sensitive information` → información sensible que requiere protección.
- `unauthorized access` → acceso realizado sin autorización.

## Lo que más costó

No hubo errores en el cuestionario: las seis respuestas fueron correctas. Conviene seguir practicando la diferencia entre baiting y quid pro quo, porque ambos usan un incentivo, pero solamente el segundo presenta un intercambio explícito.

## Qué aprendí

Entendí que la ingeniería social evita o complementa las defensas técnicas manipulando a personas autorizadas. Puedo reconocer phishing, pretexting, baiting, tailgating y quid pro quo, y explicar por qué verificar la identidad y el contexto es más seguro que confiar en la apariencia o la urgencia.

## Para repasar o practicar

- Clasificar ejemplos nuevos según las cinco técnicas.
- Practicar cómo verificar una solicitud urgente por otro canal.
- Recordar que nunca se deben compartir contraseñas con soporte.
- Diferenciar un señuelo de un intercambio ofrecido explícitamente.
- Relacionar cada técnica con controles humanos, físicos y técnicos.

## Cuestionario de repaso

1. ¿Qué diferencia principalmente a la ingeniería social de un ataque técnico? — **Respuesta:** Manipula personas en lugar de vulnerar directamente los sistemas.
2. Un correo que imita al banco y pide ingresar urgentemente mediante un enlace, ¿qué técnica utiliza? — **Respuesta:** Phishing.
3. Alguien llama fingiendo ser de soporte e inventa un problema para pedir una contraseña, ¿qué técnica utiliza? — **Respuesta:** Pretexting.
4. Un pendrive llamado “Sueldos 2026” dejado para despertar curiosidad, ¿qué técnica representa? — **Respuesta:** Baiting.
5. Una persona entra detrás de un empleado que le sostiene una puerta restringida, ¿qué técnica utiliza? — **Respuesta:** Tailgating.
6. Alguien ofrece una actualización gratuita a cambio de credenciales, ¿qué técnica utiliza? — **Respuesta:** Quid pro quo.
