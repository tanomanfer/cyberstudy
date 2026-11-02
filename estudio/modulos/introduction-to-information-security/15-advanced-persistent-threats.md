# 15 de 24 — Advanced Persistent Threats

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Una **Advanced Persistent Threat (APT)** es una operación cibernética sofisticada, planificada y prolongada. El atacante obtiene acceso no autorizado y procura permanecer oculto durante mucho tiempo. A diferencia de un ataque rápido que busca una ganancia inmediata, una APT mantiene presencia dentro de la organización para recopilar información, ampliar el acceso o preparar una interrupción futura.

Estas campañas requieren recursos, tiempo y coordinación. Por eso suelen relacionarse con grupos organizados, organizaciones criminales o actores patrocinados por Estados. La palabra **advanced** alude a las técnicas y recursos; **persistent**, a la continuidad del acceso; y **threat**, a la capacidad e intención de causar daño.

## Conceptos importantes

### Objetivos de una APT

El objetivo puede superar la ganancia económica inmediata:

- Robar propiedad intelectual, investigaciones, secretos comerciales o tecnología.
- Obtener documentos gubernamentales o inteligencia clasificada.
- Conseguir ventajas económicas, políticas o militares.
- Espiar durante meses sin interrumpir los sistemas.
- Sabotear infraestructura crítica, como energía, comunicaciones o finanzas.

### Etapas del ataque

1. **Reconocimiento:** recopilan información sobre personas, sistemas, proveedores y posibles puntos débiles.
2. **Infiltración inicial:** ingresan mediante spear phishing, credenciales robadas o vulnerabilidades.
3. **Establecimiento de presencia:** instalan malware, crean puertas traseras y aseguran un punto de apoyo.
4. **Movimiento lateral:** exploran otros equipos, aumentan privilegios y comprometen sistemas adicionales.
5. **Exfiltración:** transfieren información valiosa fuera de la red procurando no ser detectados.
6. **Persistencia:** mantienen caminos alternativos para regresar aunque se descubra o cierre un acceso.

El orden ayuda a entender el propósito de cada acción, aunque en una operación real algunas etapas pueden repetirse o superponerse.

### SolarWinds

En 2020, atacantes introdujeron código malicioso en una actualización del software de gestión de SolarWinds. Las organizaciones que confiaban en el proveedor instalaron la actualización y llevaron el malware a sus propias redes. Fue un **ataque a la cadena de suministro**: en lugar de atacar por separado a cada cliente, se comprometió un producto confiable que muchos utilizaban.

Esto permitió espiar organizaciones privadas y organismos gubernamentales durante meses. El caso muestra que un proveedor confiable también puede convertirse en una vía de entrada y que una actualización legítima en apariencia no garantiza que toda la cadena esté segura.

### Impacto

Una APT puede provocar pérdida de propiedad intelectual, espionaje, interrupciones, costos elevados de investigación y recuperación, sanciones legales, daño reputacional y riesgos para la seguridad nacional. Incluso después de detectar parte del ataque, pueden quedar puertas traseras o cuentas comprometidas que permitan el regreso.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. En un entorno real, la investigación y contención deben realizarse con herramientas autorizadas y procedimientos que preserven registros y evidencia.

## Diferencias que hay que recordar

- **Ataque rápido vs APT:** el ataque rápido busca resultados inmediatos; la APT prioriza sigilo, permanencia y objetivos estratégicos.
- **Infiltración vs presencia:** infiltrarse es conseguir la entrada inicial; establecer presencia es instalar mecanismos que permitan operar dentro de la red.
- **Presencia vs exfiltración:** malware y backdoors mantienen acceso; exfiltrar significa sacar información de la organización.
- **Movimiento lateral vs persistencia:** el movimiento lateral expande el acceso a otros sistemas; la persistencia permite regresar y conservarlo.
- **Spear phishing vs phishing genérico:** el spear phishing se adapta a una persona u organización concreta para aumentar su credibilidad.
- **Ataque directo vs cadena de suministro:** el directo apunta a la víctima; el de cadena de suministro compromete un proveedor o producto confiable para alcanzar a sus clientes.

## Ejemplos prácticos

- Investigar empleados y enviar un mensaje personalizado forma parte del reconocimiento y la infiltración.
- Instalar una puerta trasera luego de entrar establece presencia.
- Robar privilegios administrativos y pasar a un servidor de archivos es movimiento lateral.
- Comprimir y enviar documentos a infraestructura controlada por el atacante es exfiltración.
- Crear varias cuentas o accesos alternativos busca persistencia.
- Alterar una actualización de un proveedor para llegar a miles de clientes reproduce el modelo de SolarWinds.

## Errores y precauciones

- No confundir una APT con una herramienta específica: es una campaña completa.
- No considerar resuelto el incidente por cerrar un único acceso; pueden existir mecanismos de persistencia.
- No concentrar la defensa solamente en el perímetro: una vez dentro, el atacante intenta moverse lateralmente.
- No destruir registros al contener el incidente; son necesarios para conocer el alcance.
- Evaluar también proveedores y actualizaciones dentro del riesgo de la cadena de suministro.

## Inglés técnico del módulo

- `advanced persistent threat` → amenaza avanzada y persistente.
- `reconnaissance` → recopilación inicial de información sobre el objetivo.
- `initial infiltration` → ingreso inicial no autorizado.
- `foothold` → punto de apoyo dentro de la red.
- `backdoor` → mecanismo oculto que permite volver a ingresar.
- `lateral movement` → avance desde un sistema comprometido hacia otros.
- `privilege escalation` → obtención de permisos superiores.
- `data exfiltration` → extracción no autorizada de información.
- `persistence` → capacidad de mantener o recuperar el acceso.
- `supply chain attack` → ataque que aprovecha un proveedor, producto o dependencia confiable.

## Lo que más costó

En la respuesta inicial se confundió **establecimiento de presencia** con **exfiltración**, pero la diferencia quedó corregida: instalar malware o una puerta trasera sirve para operar y regresar; exfiltrar es transferir los datos fuera de la red.

## Qué aprendí

Entendí que una APT es una campaña prolongada y sigilosa con objetivos estratégicos. Puedo ordenar sus etapas, diferenciar presencia, movimiento lateral, exfiltración y persistencia, y explicar por qué SolarWinds fue un ataque a la cadena de suministro.

## Para repasar o practicar

- Ordenar las seis etapas sin mirar los apuntes.
- Clasificar acciones concretas como presencia, movimiento lateral, exfiltración o persistencia.
- Explicar la diferencia entre un ataque rápido y una APT.
- Relacionar SolarWinds con el riesgo de proveedores y actualizaciones.
- Recordar que descubrir un acceso no garantiza haber eliminado toda la persistencia.

## Cuestionario de repaso

1. ¿Qué distingue principalmente a una APT de un ataque convencional rápido? — **Respuesta:** Busca permanecer oculta y mantener acceso durante mucho tiempo.
2. ¿Cuál es la primera etapa de una APT? — **Respuesta:** Reconocimiento.
3. Instalar malware y crear puertas traseras después de entrar, ¿a qué etapa corresponde? — **Respuesta:** Establecimiento de presencia.
4. ¿Qué significa movimiento lateral? — **Respuesta:** Avanzar hacia otros sistemas y conseguir mayores privilegios.
5. ¿Qué sucede durante la exfiltración? — **Respuesta:** Se extrae información de la red.
6. ¿Por qué SolarWinds fue un ataque a la cadena de suministro? — **Respuesta:** Porque se infectó una actualización legítima que luego instalaron los clientes.
