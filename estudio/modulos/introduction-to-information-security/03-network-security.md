# 3 de 24 — Network Security

**Estado:** Repasar
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

La seguridad de red protege los dispositivos, servicios y datos conectados a una red, tanto frente a atacantes externos como ante amenazas internas. No depende de una sola herramienta: combina filtrado, monitoreo, cifrado y controles de acceso para mantener la **confidencialidad, integridad y disponibilidad** de la información mientras circula o permanece almacenada.

## Conceptos importantes

| Elemento | Función |
|---|---|
| **Firewall** | Separa redes confiables y no confiables, y permite o bloquea tráfico según reglas predefinidas. |
| **IDS** | Inspecciona el tráfico, detecta actividad sospechosa y genera alertas. |
| **IPS** | Detecta actividad sospechosa y puede bloquearla automáticamente. |
| **VPN** | Crea una conexión cifrada sobre una red pública para proteger la privacidad e integridad de los datos. |
| **Control de acceso** | Combina autenticación y autorización para limitar el acceso a los recursos. |
| **Cifrado** | Vuelve ilegibles los datos para quien no posee la clave adecuada, tanto en tránsito como en reposo. |

La analogía del correo ayuda a entender cómo trabajan juntas estas defensas: la credencial del cartero representa la autenticación; la bolsa cerrada, el firewall; la vigilancia de paquetes sospechosos, el IDS/IPS; un servicio de mensajería segura, la VPN; y los sellos contra manipulaciones, el cifrado.

La superficie de ataque creció con la nube, los dispositivos IoT y el trabajo remoto. Una brecha puede provocar pérdidas económicas, interrupciones operativas, daño reputacional y consecuencias legales. Por eso la protección debe revisarse y probarse de manera continua.

### Responsabilidades

- El **CISO** define la estrategia general y verifica que esté alineada con los objetivos y el riesgo aceptable de la empresa.
- El **CIO** y la dirección de IT asignan recursos e integran la seguridad con la infraestructura tecnológica.
- El **Network Security Manager** dirige al equipo especializado en seguridad de red.
- Los **administradores de red** y **analistas de seguridad** configuran, mantienen y monitorean las defensas diariamente.
- Los **pentesters** o hackers éticos simulan ataques autorizados para encontrar debilidades.
- Cumplimiento y gestión de riesgos controlan regulaciones y ayudan a priorizar inversiones.

## Comandos y opciones

Esta sección es teórica y no presenta comandos. La configuración real de firewalls, VPN, IDS o IPS depende del producto y debe hacerse en un entorno autorizado y controlado.

## Diferencias que hay que recordar

- **Firewall vs IDS/IPS:** el firewall filtra conexiones usando reglas; el IDS observa y alerta sobre comportamiento sospechoso; el IPS también puede bloquearlo.
- **Autenticación vs autorización:** autenticación responde **“¿quién sos?”**; autorización responde **“¿qué tenés permitido hacer?”**.
- **VPN vs firewall:** una VPN protege el canal de comunicación mediante cifrado; un firewall decide qué tráfico puede atravesar un límite de red.
- **Datos en tránsito vs en reposo:** en tránsito están viajando por la red; en reposo están guardados en un disco, servidor o nube. Ambos necesitan protección.
- **Estrategia vs operación diaria:** el CISO marca la dirección general; administradores y analistas aplican y monitorean los controles cada día.

## Ejemplos prácticos

- Un empleado trabaja desde una cafetería y usa una VPN para conectarse a recursos internos. La VPN cifra el trayecto sobre la red pública, pero no reemplaza la autenticación ni los permisos.
- Un firewall permite conexiones web al servidor, mientras el IDS detecta un patrón sospechoso y alerta al analista. Si se utiliza un IPS, este podría bloquear el tráfico automáticamente según su configuración.
- Un usuario presenta su contraseña y segundo factor: eso verifica su identidad (**autenticación**). Después, el sistema comprueba si puede abrir un archivo concreto (**autorización**).
- Un pentester, con permiso explícito, simula un ataque y entrega sus hallazgos para que la organización priorice mejoras.

## Errores y precauciones

- Un firewall es una primera barrera, no una defensa completa: puede haber reglas incorrectas, tráfico permitido que transporte un ataque, amenazas internas o técnicas que evadan los controles.
- Una VPN cifra la comunicación, pero no vuelve confiable automáticamente al dispositivo ni otorga acceso ilimitado.
- Un IPS puede bloquear tráfico legítimo por error; sus reglas deben probarse y supervisarse.
- Las pruebas de penetración requieren autorización explícita y un alcance definido.
- No confundir que una herramienta esté instalada con que la red esté protegida: necesita configuración, monitoreo y mantenimiento continuos.

## Inglés técnico del módulo

- `network security` → seguridad de red.
- `trusted / untrusted network` → red confiable / no confiable.
- `firewall` → barrera que filtra tráfico según reglas.
- `IDS (Intrusion Detection System)` → sistema de detección de intrusiones.
- `IPS (Intrusion Prevention System)` → sistema de prevención de intrusiones.
- `VPN (Virtual Private Network)` → red privada virtual con un canal cifrado.
- `authentication` → verificación de identidad.
- `authorization` → permisos concedidos después de identificar al usuario.
- `data in transit / at rest` → datos en tránsito / en reposo.
- `attack surface` → conjunto de puntos que podrían ser atacados.
- `security posture` → estado general de seguridad de una organización.
- `business continuity` → capacidad de seguir operando durante o después de un incidente.

## Lo que más costó

Costó explicar por qué un firewall no alcanza por sí solo. La clave es recordar que únicamente filtra según sus reglas: no cubre todos los ataques, los errores de configuración ni las amenazas internas. También hubo que ordenar los roles: el CISO define la estrategia; el CIO y la dirección de IT asignan recursos; los administradores y analistas realizan la operación y el monitoreo diarios.

## Qué aprendí

Entendí que la seguridad de red protege dispositivos, servicios y datos mediante varias capas. Puedo diferenciar el filtrado del firewall, la detección del IDS, el bloqueo del IPS, el canal cifrado de una VPN y la diferencia entre autenticar una identidad y autorizar acciones.

## Para repasar o practicar

- Explicar con un ejemplo por qué un firewall no brinda protección total.
- Recordar la diferencia exacta entre IDS e IPS.
- Distinguir autenticación de autorización sin depender de una analogía.
- Ordenar las responsabilidades del CISO, CIO, Network Security Manager, administradores y analistas.
- Relacionar cada control con confidencialidad, integridad o disponibilidad.

## Cuestionario de repaso

1. ¿Qué protege la seguridad de red y por qué forma parte de Information Security? — **Respuesta:** Protege dispositivos, servicios y datos conectados o transmitidos por una red. Forma parte de InfoSec porque ayuda a mantener la confidencialidad, integridad y disponibilidad de la información.
2. ¿Cuál es la diferencia entre un firewall y un IDS/IPS? — **Respuesta:** El firewall filtra tráfico según reglas; el IDS detecta actividad sospechosa y alerta; el IPS además puede bloquearla automáticamente.
3. ¿Para qué sirve una VPN cuando un empleado trabaja de forma remota? — **Respuesta:** Crea un canal cifrado sobre una red pública para proteger la privacidad e integridad de la comunicación con los recursos internos.
4. ¿Qué diferencia hay entre autenticación y autorización? — **Respuesta:** La autenticación verifica quién es el usuario; la autorización determina qué recursos o acciones tiene permitidos.
5. ¿Por qué un firewall solo no alcanza para proteger completamente una red? — **Respuesta:** Porque solo aplica reglas de filtrado y puede haber configuraciones incorrectas, ataques dentro de tráfico permitido, amenazas internas o técnicas de evasión. Se necesitan varias capas de defensa.
6. ¿Quién define la estrategia general y quién realiza el monitoreo diario de la red? — **Respuesta:** El CISO define la estrategia general; los administradores de red y analistas de seguridad realizan la operación y el monitoreo cotidianos. El CIO y la dirección de IT asignan recursos e integran la seguridad con la infraestructura.
