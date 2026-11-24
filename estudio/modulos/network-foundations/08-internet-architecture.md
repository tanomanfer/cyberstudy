# 8 de 12 — Internet Architecture

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

La arquitectura de Internet describe cómo se distribuyen los datos, las tareas y el control entre equipos y servicios. Cada modelo busca un equilibrio diferente entre escalabilidad, rendimiento, seguridad, costo, resistencia y facilidad de administración. En sistemas reales es frecuente combinar modelos.

## Conceptos importantes

### Peer-to-Peer (P2P)

En P2P cada nodo puede actuar como cliente y servidor: solicita recursos y también los comparte directamente con otros participantes. Puede ser totalmente descentralizado o utilizar un coordinador parcial que no aloja todos los datos.

BitTorrent es un ejemplo. Un `seeder` posee el archivo completo y continúa compartiéndolo. Agregar participantes puede aportar almacenamiento, procesamiento o ancho de banda, pero también complica las actualizaciones, la seguridad y la disponibilidad de recursos cuando los participantes se desconectan.

### Client-Server

Los clientes envían solicitudes y los servidores responden. Un navegador, por ejemplo, solicita una página y un servidor web devuelve el contenido. La centralización facilita administración, actualizaciones y políticas de seguridad, pero un servidor sin redundancia puede convertirse en punto único de fallo o congestionarse.

### Arquitecturas por tiers

Un `tier` es una capa de responsabilidades; no implica necesariamente una sola máquina física.

- **Single-tier:** presentación, lógica y datos residen en la misma máquina. Es simple, pero escala y se protege con dificultad.
- **Two-tier:** el cliente maneja la presentación y se comunica directamente con el servidor de datos. Es común en ciertas aplicaciones de escritorio.
- **Three-tier:** separa presentación, lógica de aplicación y base de datos. Cada capa puede mantenerse o escalarse de forma independiente.
- **N-tier:** agrega más capas especializadas para sistemas complejos y distribuidos. Aumenta la flexibilidad, pero también la cantidad de comunicaciones, configuraciones y controles necesarios.

Visitar una web común no constituye necesariamente two-tier: el navegador suele hablar con un servidor web o de aplicación, no directamente con la base de datos.

### Arquitectura híbrida

Combina client-server y P2P. Un servidor central puede autenticar usuarios, controlar el acceso y coordinar una sesión, mientras parte de los datos se transfiere directamente entre participantes. Las videoconferencias son un ejemplo conceptual: coordinación centralizada y transferencia distribuida.

Este modelo reduce carga central y conserva control, pero es más complejo. Si falla el coordinador, podrían interrumpirse el descubrimiento de participantes o el inicio de nuevas sesiones.

### Cloud Architecture

La infraestructura es virtualizada y administrada por un proveedor como AWS, Azure o Google Cloud. El usuario consume servidores, almacenamiento o aplicaciones sin controlar el hardware subyacente.

Sus cinco características esenciales son:

1. **On-demand self-service:** aprovisionamiento automático cuando se necesita.
2. **Broad network access:** acceso por red desde distintos dispositivos.
3. **Resource pooling:** recursos compartidos y asignados dinámicamente.
4. **Rapid elasticity:** capacidad que aumenta o disminuye rápidamente.
5. **Measured service:** consumo medido para control o facturación.

SaaS, como Google Drive o Dropbox, entrega una aplicación lista para usar. La nube facilita escalar y reduce mantenimiento de hardware, pero requiere conectividad, confianza y controles sobre el proveedor. `Vendor lock-in` describe la dificultad de migrar a otra plataforma.

### Software-Defined Networking (SDN)

SDN separa el **control plane**, que decide por dónde enviar el tráfico, del **data plane**, que reenvía los paquetes. Un controlador basado en software centraliza decisiones y los switches ejecutan instrucciones.

Esta separación permite automatizar políticas, rutas y asignación de ancho de banda. El controlador es un componente crítico: debe protegerse y diseñarse con redundancia para evitar que sea un punto único de fallo.

## Comandos y opciones

La sección fue conceptual y no requirió comandos.

## Diferencias que hay que recordar

- **P2P vs client-server:** P2P distribuye recursos entre pares; client-server centraliza servicios en servidores.
- **Two-tier vs three-tier:** three-tier introduce una capa de aplicación entre presentación y datos.
- **Híbrida vs two-tier:** híbrida combina coordinación central con intercambio P2P; two-tier describe comunicación directa entre dos capas.
- **Cloud vs client-server local:** cloud sigue usando principios client-server, pero la infraestructura es virtualizada y administrada por un proveedor.
- **Control plane vs data plane:** el primero decide; el segundo ejecuta el reenvío.

## Ejemplos prácticos

```text
Three-tier: navegador → servidor de aplicación → base de datos
Híbrida: autenticación central → coordinación → transferencia entre pares
SDN: controlador decide → switches reenvían
```

## Errores y precauciones

- No asumir que P2P significa ausencia absoluta de coordinación central.
- No llamar two-tier a cualquier sitio web.
- No asumir que cloud elimina la responsabilidad del cliente sobre datos y configuración.
- No confundir el control central de SDN con el reenvío real de paquetes.
- La centralización simplifica la gestión, pero exige redundancia y protección del componente central.

## Inglés técnico del módulo

- `Peer-to-Peer (P2P)` → pares que solicitan y comparten recursos.
- `seeder` → participante que posee el archivo completo y lo comparte.
- `Client-Server` → clientes solicitan servicios a servidores.
- `tier` → capa de responsabilidades de una aplicación.
- `business logic` → reglas y procesamiento de la aplicación.
- `Hybrid Architecture` → combinación de modelos centralizados y distribuidos.
- `on-demand self-service` → aprovisionamiento bajo demanda.
- `rapid elasticity` → cambio rápido de capacidad.
- `vendor lock-in` → dependencia que dificulta cambiar de proveedor.
- `Software-Defined Networking` → redes definidas por software.
- `control plane` → decide cómo dirigir el tráfico.
- `data plane` → reenvía el tráfico.

## Lo que más costó

El cuestionario propio terminó 5/6 por confundir un ejemplo híbrido con two-tier. Después quedó clara la diferencia: híbrido combina coordinación central y transferencia P2P; two-tier separa cliente y servidor de datos. En HTB se repitieron respuestas como `Peer-to-Peer` y `Hybrid` con formulaciones distintas; eso no fue falta de comprensión, sino una expectativa razonable de que cada respuesta sería diferente. También se reconoció `SDN`, y se ajustó al formato desarrollado `Software-Defined Networking` pedido por la plataforma.

## Qué aprendí

Entendí qué problema resuelven P2P, client-server, arquitecturas por tiers, modelos híbridos, cloud y SDN, y qué ventajas, riesgos y puntos centrales introduce cada uno.

## Para repasar o practicar

- Comparar P2P, client-server e híbrida con un ejemplo propio.
- Distinguir two-tier de three-tier.
- Memorizar las cinco características esenciales de cloud.
- Explicar control plane y data plane sin confundir decisión con reenvío.
- Recordar el nombre desarrollado `Software-Defined Networking`.

## Cuestionario de repaso

1. ¿Qué roles puede cumplir un participante P2P? — **Respuesta:** Cliente y servidor al mismo tiempo.
2. ¿Qué agrega three-tier respecto de two-tier? — **Respuesta:** Una capa de aplicación entre presentación y datos.
3. ¿Cómo puede funcionar una arquitectura híbrida? — **Respuesta:** Con coordinación y autenticación centrales, pero transferencia de datos entre pares.
4. ¿Qué significa rapid elasticity en cloud? — **Respuesta:** Aumentar o reducir recursos rápidamente según la demanda.
5. ¿Qué función cumple el control plane en SDN? — **Respuesta:** Decide cómo debe dirigirse el tráfico.
6. ¿Qué riesgo comparten un client-server sin redundancia y un SDN mal diseñado? — **Respuesta:** Un componente central puede convertirse en punto único de fallo.
