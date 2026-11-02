# 11 de 24 — Distributed Denial of Service

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Un ataque **Distributed Denial of Service (DDoS)** intenta interrumpir el funcionamiento normal de un sitio, servidor, red o servicio en línea mediante una cantidad de tráfico superior a la que puede procesar. Los usuarios legítimos encuentran lentitud, errores o una interrupción completa.

La diferencia central frente a un ataque **Denial of Service (DoS)** es el origen: un DoS proviene principalmente de una sola fuente, mientras que un DDoS utiliza numerosas fuentes distribuidas. Esto aumenta la capacidad del ataque y dificulta bloquearlo sin afectar tráfico legítimo.

## Conceptos importantes

### Componentes del ataque

Un DDoS incluye tres participantes principales:

- **Atacante:** persona o grupo que coordina el ataque y selecciona el objetivo.
- **Botnet:** red de computadoras, servidores o dispositivos IoT comprometidos y controlados sin permiso de sus propietarios.
- **Víctima:** servidor, red o servicio que recibe el tráfico y se intenta dejar inaccesible.

El atacante ordena a los dispositivos de la botnet enviar solicitudes simultáneas. El volumen acumulado consume ancho de banda, capacidad de procesamiento, memoria o conexiones disponibles hasta degradar o detener el servicio.

### Disponibilidad

El objetivo principal se relaciona con la **disponibilidad** de la tríada CIA: aunque los datos no sean robados ni modificados, los usuarios autorizados no pueden utilizar el recurso cuando lo necesitan.

### Botnet y amplificación

Una **botnet** genera tráfico mediante dispositivos comprometidos. Una **red o técnica de amplificación** aprovecha servicios de terceros para obtener respuestas mucho mayores que las solicitudes originales. Pueden combinarse en un ataque, pero no son sinónimos.

### IoT y Mirai

Los dispositivos IoT con contraseñas débiles, configuraciones inseguras o software sin actualizar pueden ser incorporados a botnets. En 2016, **Mirai** utilizó cámaras, routers y otros dispositivos comprometidos para atacar a Dyn. Como muchos servicios dependían de su infraestructura, el impacto se extendió a numerosos sitios y usuarios.

### Impacto y distracción

Un DDoS puede provocar pérdida de ventas, interrupciones operativas, costos de mitigación y daño a la confianza de los clientes. También puede actuar como **smokescreen**: mientras el equipo se concentra en recuperar la disponibilidad, el atacante intenta ingresar a otros sistemas, robar información o instalar malware.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. La detección y mitigación dependen de la infraestructura, el proveedor de red y las herramientas defensivas de cada organización.

## Diferencias que hay que recordar

- **DoS vs DDoS:** DoS parte de una fuente; DDoS distribuye el tráfico entre muchas fuentes.
- **Botnet vs víctima:** la botnet genera el tráfico; la víctima lo recibe y sufre la saturación.
- **Botnet vs amplificación:** la botnet usa dispositivos comprometidos; la amplificación aumenta el volumen aprovechando respuestas de terceros.
- **DDoS vs robo de datos:** el efecto principal es la indisponibilidad, aunque el ataque pueda ocultar otras acciones.
- **Tráfico alto legítimo vs ataque:** una gran cantidad de visitas reales no implica por sí sola intención maliciosa; se debe analizar el patrón y el contexto.

## Ejemplos prácticos

- Miles de dispositivos comprometidos solicitan una página al mismo tiempo hasta agotar las conexiones disponibles.
- Una tienda en línea queda inaccesible durante una campaña y pierde ventas aunque su base de datos no haya sido modificada.
- Una cámara IoT vulnerable es incorporada a una botnet sin que su propietario lo note.
- El equipo responde a una saturación mientras el atacante intenta aprovechar otra vulnerabilidad: el DDoS funciona como distracción.
- Un proveedor compartido es atacado y varios servicios dependientes quedan afectados indirectamente.

## Errores y precauciones

- No asumir que bloquear una sola dirección IP detendrá un DDoS distribuido.
- No bloquear tráfico masivamente sin evaluar el impacto sobre usuarios legítimos.
- No confundir una botnet con el objetivo del ataque: los dispositivos comprometidos también son víctimas del atacante.
- No concentrarse únicamente en recuperar el servicio; se deben vigilar posibles ataques paralelos.
- Las pruebas de carga o de resistencia requieren autorización, límites claros y coordinación para no causar una interrupción real.

## Inglés técnico del módulo

- `Denial of Service (DoS)` → denegación de servicio desde una fuente principal.
- `Distributed Denial of Service (DDoS)` → denegación de servicio distribuida.
- `botnet` → red de dispositivos comprometidos controlados por un atacante.
- `victim` → sistema o servicio atacado.
- `bandwidth` → capacidad disponible para transmitir datos.
- `processing capacity` → recursos disponibles para procesar solicitudes.
- `traffic flood` → inundación o volumen masivo de tráfico.
- `amplification` → técnica que genera respuestas mayores que las solicitudes.
- `downtime` → período durante el cual el servicio no está disponible.
- `smokescreen` → distracción utilizada para ocultar otra actividad maliciosa.

## Lo que más costó

No hubo errores en el cuestionario: las seis respuestas fueron correctas. Conviene recordar que el DDoS afecta principalmente la disponibilidad, pero también puede utilizarse como distracción para intentar comprometer la confidencialidad o la integridad por otra vía.

## Qué aprendí

Entendí que un DDoS utiliza múltiples fuentes, normalmente una botnet, para saturar los recursos de una víctima. Puedo diferenciar DoS de DDoS, reconocer el papel de los dispositivos IoT y explicar tanto el impacto sobre la disponibilidad como el posible uso del ataque como distracción.

## Para repasar o practicar

- Explicar con un ejemplo la diferencia entre DoS y DDoS.
- Identificar atacante, botnet y víctima en distintos escenarios.
- Diferenciar una botnet de una técnica de amplificación.
- Relacionar el ataque con la disponibilidad de la tríada CIA.
- Recordar que durante un DDoS se deben investigar posibles actividades paralelas.

## Cuestionario de repaso

1. ¿Cuál es la diferencia principal entre DoS y DDoS? — **Respuesta:** DoS proviene de una fuente principal; DDoS utiliza múltiples fuentes distribuidas.
2. ¿Qué es una botnet? — **Respuesta:** Una red de dispositivos comprometidos controlados por un atacante.
3. ¿Quién es la víctima en un DDoS? — **Respuesta:** El servidor, la red o el servicio que se intenta saturar.
4. ¿Qué propiedad de la tríada CIA resulta afectada principalmente? — **Respuesta:** La disponibilidad.
5. ¿Por qué los dispositivos IoT pueden utilizarse en un DDoS? — **Respuesta:** Porque pueden ser comprometidos e incorporados a una botnet.
6. ¿Por qué un DDoS puede utilizarse como distracción? — **Respuesta:** Para ocupar al equipo defensor mientras se intenta otro ataque.
