# 9 de 12 — Wireless Networks

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Una red inalámbrica conecta computadoras, teléfonos y dispositivos IoT mediante ondas de radio u otras señales inalámbricas, sin requerir un cable físico para cada equipo. Ofrece movilidad y facilidad de instalación, pero debe manejar interferencia, alcance, rendimiento y seguridad.

## Conceptos importantes

### Ventajas y desventajas

La movilidad permite desplazarse dentro de la cobertura. Agregar dispositivos suele ser más sencillo que extender cableado. Como contrapartida, paredes, aparatos electrónicos y condiciones del entorno degradan la señal; una transmisión por el aire es más fácil de interceptar si no se protege; y una conexión inalámbrica suele ser menos estable o rápida que una conexión cableada equivalente.

### Wireless Router

Un router inalámbrico doméstico combina:

- **Routing:** dirige paquetes entre la red local y otras redes, como Internet.
- **Wireless Access Point:** proporciona cobertura Wi-Fi a los dispositivos.

El puerto **WAN** conecta con la fuente de Internet, como un módem. Los puertos **LAN** conectan por cable dispositivos locales. Las antenas transmiten y reciben señales; el procesador y la memoria ejecutan el enrutamiento y la administración.

El módem enlaza la casa con el servicio del ISP, el router comunica redes y el access point proporciona Wi-Fi. Un equipo doméstico puede integrar las tres funciones.

### Mobile Hotspot

Un hotspot móvil comparte mediante Wi-Fi la conexión **Cellular Data** 4G o 5G de un teléfono:

```text
Laptop → Wi-Fi → teléfono → Cellular Data 4G/5G → Internet
```

Su alcance suele ser de pocos metros. Consume batería y datos del plan, por lo que debe protegerse con una contraseña segura. `Cellular bands` son las bandas de frecuencia y `cellular network` es la infraestructura; `Cellular Data` es el servicio que el hotspot utiliza y comparte.

### Cell Tower y celdas

Una `cell tower` sostiene antenas y equipos que brindan cobertura a una zona llamada celda. Cuando una persona se desplaza, la sesión puede transferirse entre celdas para conservar la conexión.

El **Base Station Controller (BSC)** gestiona múltiples torres o estaciones base y ayuda a coordinar llamadas, datos y traspasos. Las torres se enlazan con la red central mediante `backhaul`, normalmente fibra óptica o microondas.

- **Macro cells:** torres grandes con cobertura de varios kilómetros, útiles para áreas extensas o rurales.
- **Micro/small cells:** instalaciones pequeñas que aportan capacidad y completan cobertura en zonas urbanas densas.

### Frecuencias

La frecuencia es la tasa de oscilación de una onda y se mide en hertz (Hz).

- **2.4 GHz:** mayor alcance y mejor penetración de paredes, pero más interferencia por la cantidad de dispositivos que la usan, como Bluetooth y hornos microondas.
- **5 GHz:** mayor velocidad o capacidad potencial, pero menor alcance y peor penetración de obstáculos.
- **Cellular bands:** 4G y 5G pueden utilizar bandas bajas, medias y muy altas. Las bajas cubren más distancia; las altas transportan más datos, pero a distancias menores.

La relación es una tendencia general: también influyen el estándar, canal, potencia, obstáculos y congestión. Organismos gubernamentales regulan el espectro para ordenar el uso de frecuencias y reducir interferencias.

## Comandos y opciones

La sección fue conceptual y no requirió comandos.

## Diferencias que hay que recordar

- **Wi-Fi vs cellular:** Wi-Fi brinda acceso inalámbrico local; cellular ofrece cobertura amplia mediante torres y celdas.
- **Hotspot vs router doméstico:** el hotspot comparte Cellular Data; el router doméstico suele recibir Internet desde un módem o equipo del ISP.
- **WAN vs LAN:** WAN mira hacia la fuente de Internet; LAN conecta equipos de la red local.
- **2.4 GHz vs 5 GHz:** 2.4 llega más lejos y atraviesa mejor paredes; 5 ofrece más capacidad a menor alcance.
- **Cellular Data vs Cellular Bands:** Data es el servicio de datos compartido; Bands son las frecuencias utilizadas.
- **Cell tower vs BSC:** la torre proporciona radio y cobertura; el Base Station Controller gestiona múltiples estaciones.

## Ejemplos prácticos

En casa, el teléfono usa Wi-Fi de 2.4 o 5 GHz a través del router. Al salir, utiliza 4G o 5G mediante una torre celular. Si una notebook necesita Internet, el teléfono puede crear un hotspot: recibe Internet por Cellular Data y lo comparte localmente mediante Wi-Fi.

## Errores y precauciones

- No confundir Wi-Fi con la conexión celular que alimenta un hotspot.
- Proteger el hotspot y el Wi-Fi con autenticación segura.
- No asumir que una frecuencia más alta siempre es mejor: pierde alcance y penetración.
- No confundir las bandas celulares con el servicio Cellular Data.
- No asumir que una macro cell es necesariamente más rápida; su rasgo principal es la cobertura extensa.
- El controlador debe escribirse exactamente como `Base Station Controller` cuando HTB exige tres palabras.

## Inglés técnico del módulo

- `radio waves` → ondas utilizadas para transmitir señales inalámbricas.
- `wireless router` → equipo que combina routing y acceso Wi-Fi.
- `Wireless Access Point` → punto de acceso inalámbrico.
- `WAN port` → puerto hacia la fuente externa de red o Internet.
- `LAN port` → puerto para dispositivos de la red local.
- `mobile hotspot` → punto de acceso que comparte una conexión móvil.
- `Cellular Data` → servicio de datos 4G/5G utilizado por el hotspot.
- `cell tower` → estructura que proporciona cobertura celular.
- `Base Station Controller` → controlador de múltiples estaciones base.
- `backhaul` → enlace desde las torres hacia la red central.
- `interference` → degradación producida por señales u obstáculos.
- `frequency band` → rango de frecuencias asignado a una tecnología.

## Lo que más costó

El cuestionario propio terminó 6/6. En HTB se entendía el funcionamiento del hotspot, pero costó la expresión exacta `Cellular Data`: `Cellular Bands` y `Cellular Networks` eran conceptos relacionados, no la frase pedida. También hubo un problema de ingreso con `Base Station Controller`; el concepto era correcto y HTB finalmente aceptó el nombre exacto de tres palabras. Esto se conserva como precisión de vocabulario, no como una falla conceptual.

## Qué aprendí

Entendí cómo se relacionan Wi-Fi, routers inalámbricos, hotspots, redes celulares, torres y controladores, y cómo las frecuencias cambian el equilibrio entre alcance, penetración, interferencia y capacidad.

## Para repasar o practicar

- Explicar el recorrido completo desde una laptop conectada a un hotspot hasta Internet.
- Diferenciar módem, router y access point.
- Recordar `Cellular Data`, `Cell Tower` y `Base Station Controller`.
- Comparar 2.4 GHz y 5 GHz sin afirmar que una siempre es mejor.
- Explicar macro cells, small cells y backhaul.

## Cuestionario de repaso

1. ¿Qué funciones combina un router inalámbrico doméstico? — **Respuesta:** Routing y Wireless Access Point.
2. ¿Qué puerto conecta normalmente con el módem o la fuente de Internet? — **Respuesta:** El puerto WAN.
3. ¿Qué conexión utiliza un hotspot para salir a Internet? — **Respuesta:** Cellular Data 4G o 5G.
4. ¿Para qué se usan micro o small cells? — **Respuesta:** Para aportar capacidad y completar cobertura en zonas urbanas densas.
5. ¿Qué diferencia habitual existe entre 2.4 GHz y 5 GHz? — **Respuesta:** 2.4 GHz ofrece mayor alcance y penetración; 5 GHz ofrece más capacidad con menor alcance.
6. ¿Qué ocurre cuando un teléfono mantiene la conexión mientras cambia de zona? — **Respuesta:** La sesión se transfiere entre celdas o torres cercanas.
