# 8 de 24 — Physical Security

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

**Physical Security** protege las instalaciones, las personas y los elementos físicos que almacenan, transportan o procesan información. Incluye computadoras, servidores, racks, equipos de red, dispositivos de almacenamiento, cableado, documentos impresos y los edificios donde se encuentran.

La seguridad informática no alcanza por sí sola. Si una persona puede acceder físicamente a un equipo, podría robarlo, dañarlo, conectar dispositivos o manipularlo directamente, evitando muchos controles digitales. Por eso la protección física forma parte de una estrategia completa de Information Security.

## Conceptos importantes

### Personas, procesos y tecnología

La seguridad física no consiste solamente en cerraduras y guardias. Combina:

- **Personas:** empleados, seguridad, visitantes y responsables de cada área.
- **Procesos:** identificación, registro y acompañamiento de visitantes, gestión de llaves y respuesta ante incidentes.
- **Tecnología:** cámaras, alarmas, controles electrónicos de acceso y sistemas de monitoreo.
- **Diseño de instalaciones:** cercos, iluminación, puertas reforzadas y ubicación segura de equipos críticos.

### Defensa en profundidad

**Defense in depth** significa colocar varias capas de protección. Si una medida falla, las restantes todavía pueden detectar o frenar al atacante. Las capas buscan cumplir cuatro funciones:

1. **Disuadir:** hacer que el atacante desista antes de actuar, por ejemplo mediante cercos, iluminación visible o advertencias.
2. **Detectar:** descubrir un intento o acceso indebido mediante cámaras, sensores o alarmas.
3. **Demorar:** dificultar el avance para ganar tiempo, por ejemplo con puertas reforzadas o barreras.
4. **Responder:** intervenir cuando se detecta el incidente mediante guardias o personal de seguridad.

Un ejemplo completo sería: el cerco disuade, la cámara detecta, la puerta reforzada demora y el guardia responde.

### Relación con la tríada CIA

- **Confidencialidad:** impedir que una persona no autorizada vea documentos, pantallas o datos almacenados.
- **Integridad:** evitar que equipos o información sean modificados o manipulados físicamente.
- **Disponibilidad:** prevenir robos, daños o sabotajes que interrumpan servicios y operaciones.

También protege a empleados y visitantes, reduce interrupciones y ayuda a cumplir requisitos regulatorios.

### Responsabilidades

- El **equipo de seguridad física** coordina los controles generales.
- **Facilities Management** mantiene edificios, puertas, alarmas, iluminación y otras instalaciones.
- **IT Security** protege servidores, equipos de red y demás infraestructura tecnológica.
- El **CSO o CISO** puede dirigir la estrategia, según la estructura de la organización.
- **Todos los empleados** deben cumplir los procedimientos: no compartir tarjetas, no dejar puertas abiertas y bloquear sus computadoras.

La seguridad física es una responsabilidad compartida. Un control costoso puede perder efectividad si una persona sostiene una puerta para un desconocido o deja una estación de trabajo desbloqueada.

### Vulnerabilidades frecuentes

- **Puntos de acceso sin asegurar:** puertas o ventanas abiertas o fáciles de superar.
- **Cerraduras débiles:** mecanismos antiguos o de baja calidad.
- **Perímetro insuficiente:** ausencia de cercos, barreras, cámaras o vigilancia.
- **Mala gestión de llaves:** llaves o tarjetas compartidas, extraviadas o almacenadas incorrectamente.
- **Iluminación insuficiente:** áreas oscuras que pueden ocultar personas o actividades.
- **Infraestructura IT expuesta:** servidores, dispositivos de red o cableado accesibles sin autorización.
- **Gestión deficiente de visitantes:** falta de identificación, registro, acompañamiento o monitoreo.
- **Estaciones sin supervisión:** computadoras o dispositivos desbloqueados en espacios públicos o compartidos.

### Pruebas de seguridad física

Red Teamers o pentesters especializados pueden simular ataques reales para probar controles de acceso, cámaras, barreras y tiempos de respuesta. También pueden evaluar si la ingeniería social permite convencer a una persona para que conceda acceso.

Estas pruebas siempre necesitan autorización explícita, alcance definido y coordinación para no poner en peligro a las personas ni interrumpir las operaciones.

## Comandos y opciones

Esta sección es teórica y no presenta comandos. Sus controles se aplican mediante instalaciones, dispositivos, procedimientos y capacitación.

## Diferencias que hay que recordar

- **Disuadir vs detectar:** disuadir intenta evitar el intento; detectar descubre que está ocurriendo.
- **Detectar vs responder:** una cámara puede mostrar el incidente, pero se necesita una persona o proceso para actuar.
- **Demorar vs impedir para siempre:** una barrera busca ganar tiempo, aunque finalmente pueda ser superada.
- **Seguridad física vs seguridad digital:** una protege el acceso material a personas, instalaciones y equipos; la otra protege sistemas, redes y datos mediante controles lógicos. Se complementan.
- **Facilities vs IT Security:** Facilities mantiene el edificio y sus controles; IT Security se ocupa especialmente de la infraestructura tecnológica.

## Ejemplos prácticos

- Una cámara **detecta** que una persona entró; una puerta reforzada la **demora**; el personal de seguridad **responde**.
- Un empleado deja su computadora desbloqueada en un área compartida: existe una estación de trabajo sin supervisión y alguien podría acceder a información con su sesión.
- Un visitante recibe identificación, queda registrado y es acompañado dentro de las áreas restringidas: se aplica una correcta gestión de visitantes.
- Un servidor tiene cifrado y contraseña, pero está ubicado en una habitación abierta: los controles digitales existen, pero la infraestructura física sigue expuesta.
- Un área oscura junto a una entrada dificulta detectar intrusos; mejorar la iluminación agrega disuasión y visibilidad.

## Errores y precauciones

- No depender de una sola barrera; cada capa puede fallar.
- No sostener puertas seguras para personas desconocidas ni prestar tarjetas de acceso.
- No dejar computadoras desbloqueadas, aunque la ausencia sea breve.
- No ubicar servidores, dispositivos de red o documentos sensibles en áreas accesibles al público.
- No asumir que una cámara evita por sí sola el incidente: debe existir monitoreo y respuesta.
- No realizar pruebas físicas o de ingeniería social sin autorización y coordinación explícitas.

## Inglés técnico del módulo

- `physical security` → seguridad física.
- `defense in depth` → defensa en profundidad mediante varias capas.
- `deter` → disuadir o desalentar un intento.
- `detect` → detectar que algo está ocurriendo.
- `delay` → demorar el avance del atacante.
- `respond` → intervenir ante el incidente.
- `perimeter security` → protección del límite exterior de una instalación.
- `access point` → punto físico de entrada.
- `access card` → tarjeta de acceso.
- `key management` → administración de llaves o credenciales físicas.
- `visitor management` → identificación, registro y control de visitantes.
- `unattended workstation` → computadora sin supervisión.
- `tailgating` → ingreso no autorizado siguiendo a una persona autorizada.
- `on-site security personnel` → personal de seguridad presente en el lugar.

## Lo que más costó

En el cuestionario se confundió el orden de las cuatro funciones de las capas físicas. El orden correcto es **disuadir → detectar → demorar → responder**. Después del refuerzo se identificó correctamente que la cámara detecta, la puerta reforzada demora y el personal de seguridad responde.

## Qué aprendí

Entendí que Physical Security protege personas, instalaciones, equipos y documentos, y que forma parte de la protección de los datos. Puedo explicar la defensa en profundidad y reconocer las funciones de disuadir, detectar, demorar y responder. También puedo identificar vulnerabilidades físicas comunes y las responsabilidades de cada área.

## Para repasar o practicar

- Memorizar el orden: disuadir, detectar, demorar y responder.
- Clasificar distintos controles según la función que cumplen.
- Identificar vulnerabilidades físicas al observar una oficina o sala técnica.
- Relacionar controles físicos con confidencialidad, integridad y disponibilidad.
- Recordar que las pruebas físicas y de ingeniería social necesitan autorización explícita.

## Cuestionario de repaso

1. ¿Qué protege principalmente Physical Security? — **Respuesta:** Instalaciones, personas, equipos y documentos físicos.
2. ¿Qué significa defensa en profundidad? — **Respuesta:** Utilizar varias capas para que otras continúen protegiendo si una falla.
3. ¿Cuál es el orden correcto de los cuatro objetivos? — **Respuesta:** Disuadir, detectar, demorar y responder.
4. Una puerta reforzada hace que el atacante tarde más. ¿Qué función cumple? — **Respuesta:** Demorar.
5. Un empleado deja su computadora desbloqueada en un área compartida. ¿Qué vulnerabilidad representa? — **Respuesta:** Una estación de trabajo sin supervisión.
6. ¿Por qué la ciberseguridad puede fallar aunque existan buenos controles digitales? — **Respuesta:** Porque el acceso físico puede permitir robar, dañar o manipular directamente los sistemas.

**Refuerzo:** la cámara detecta, la puerta reforzada demora y el personal de seguridad responde.
