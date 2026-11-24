# 1 de 12 — Introduction to Networks

**Estado:** Repasar
**Progreso de la sección:** 100% (realizada en HTB)
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Una **red** es un conjunto de dispositivos interconectados que pueden comunicarse, intercambiar datos y compartir recursos. Para que exista una red no alcanza con reunir dispositivos: también hacen falta enlaces que transporten la información y reglas que permitan interpretarla.

Esta base es importante para ciberseguridad porque los ataques, las alertas y los controles defensivos dependen de cómo se comunican los dispositivos, por dónde circulan los datos y qué redes conectan entre sí.

## Conceptos importantes

### Nodo, enlace y datos

- Un **node (nodo)** es un dispositivo conectado: computadora, teléfono, impresora, servidor, televisor o equipo de red.
- Un **link (enlace)** es el camino de comunicación entre nodos. Puede ser cableado, como Ethernet o fibra, o inalámbrico, como Wi-Fi.
- Los **data (datos)** son la información que los nodos envían y reciben.

Una conversación sirve como analogía: las personas son nodos, la posibilidad de hablar y escuchar es el enlace, y la conversación son los datos. Si hay personas pero no pueden oírse, no existe comunicación efectiva.

### Para qué sirve una red

Las redes permiten compartir impresoras, almacenamiento y aplicaciones; enviar mensajes o videollamadas; acceder a archivos y bases de datos; colaborar desde distintos lugares y alcanzar servicios externos a través de Internet.

Una red local puede funcionar aunque Internet esté caído. Los dispositivos todavía pueden comunicarse entre sí si el router, los enlaces y los servicios locales siguen disponibles.

### Local Area Network (LAN)

Una **LAN** conecta dispositivos dentro de un área limitada, como una casa, escuela, oficina o edificio. Suele ser administrada por una persona u organización, ofrece altas velocidades y utiliza Ethernet o Wi-Fi.

`LAN` es la sigla internacional de **Local Area Network**. La traducción automática del material mostró “RAN” en un fragmento, pero no debe utilizarse para este concepto.

### Wide Area Network (WAN)

Una **WAN** conecta redes a través de grandes distancias: ciudades, países o continentes. Normalmente intervienen proveedores y organizaciones distintas, y su infraestructura es más compleja que la de una LAN.

Internet es la WAN más grande: conecta millones de redes locales distribuidas por el mundo.

### Cómo se conectan LAN y WAN

En una casa, teléfonos y computadoras se conectan al router y forman una LAN. Esa red obtiene acceso externo a través de la infraestructura del **Internet Service Provider (ISP)**.

Recorrido simplificado:

`dispositivo → router/LAN → módem o equipo del proveedor → ISP/WAN → Internet`

- El **router** organiza el tráfico local y decide hacia dónde enviarlo.
- El **módem** adapta la señal entre la red doméstica y el medio del proveedor.
- El **ISP** es la empresa que brinda acceso a Internet.

Muchos proveedores entregan un solo aparato que combina módem, router, switch y punto de acceso Wi-Fi. Aunque compartan una caja, sus funciones siguen siendo diferentes.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. Más adelante se utilizarán herramientas para observar interfaces, direcciones, rutas y tráfico.

## Diferencias que hay que recordar

- **Nodo vs enlace:** el nodo es el dispositivo; el enlace es el camino que permite comunicarlo.
- **LAN vs WAN:** una LAN cubre un área local; una WAN conecta redes a grandes distancias.
- **Router vs módem:** el router organiza y dirige tráfico; el módem adapta la conexión al medio del ISP.
- **Wi-Fi vs Internet:** Wi-Fi es un enlace inalámbrico dentro de una red; Internet es una red global externa.
- **Red vs Internet:** puede existir una red local sin acceso a Internet.

## Ejemplos prácticos

- Una computadora y una impresora conectadas al mismo router pueden comunicarse dentro de la LAN aunque el ISP tenga una caída.
- Una empresa conecta la LAN de Buenos Aires con la LAN de Córdoba mediante una WAN para compartir sistemas centrales.
- Un teléfono conectado por Wi-Fi es un nodo; la señal de radio es el enlace; una foto enviada constituye datos.
- Si el Wi-Fi funciona pero no abre ninguna web, primero hay que distinguir si falla la LAN, el router, el enlace con el ISP o el servicio remoto.

## Errores y precauciones

- No asumir que “conectado a Wi-Fi” significa “conectado a Internet”.
- No confundir el nombre de la red inalámbrica con el servicio del ISP.
- No utilizar `RAN` como traducción de LAN en este contexto.
- No pensar que una WAN es solamente Internet; una organización puede operar su propia WAN.
- No atribuir al módem y al router exactamente la misma función aunque estén integrados.

## Inglés técnico del módulo

- `network` → conjunto de dispositivos interconectados.
- `node` → dispositivo individual conectado a una red.
- `link` → vía cableada o inalámbrica que une nodos.
- `data sharing` → intercambio de información y recursos.
- `Local Area Network (LAN)` → red de área local.
- `Wide Area Network (WAN)` → red de área amplia.
- `Internet Service Provider (ISP)` → proveedor de acceso a Internet.
- `router` → equipo que dirige tráfico entre redes.
- `modem` → equipo que adapta señales para el medio del proveedor.
- `wired / wireless` → cableado / inalámbrico.

## Lo que más costó

En el cuestionario propio se respondió 5/6. La dificultad concreta fue pensar que, si cae el ISP, el teléfono deja de pertenecer a la LAN. La corrección es separar dos hechos: el dispositivo puede seguir conectado al router y comunicarse localmente, aunque haya perdido la salida hacia Internet.

Las preguntas de HTB sobre `network`, `nodes`, `Internet`, `LAN` y `links` fueron respondidas y la plataforma permitió continuar.

## Qué aprendí

Entendí que una red combina nodos, enlaces y datos. Puedo diferenciar LAN de WAN, router de módem y Wi-Fi de Internet. También sé que una LAN puede continuar activa aunque el ISP no brinde acceso externo.

## Para repasar o practicar

- Dibujar la LAN de casa e identificar nodos y enlaces.
- Explicar qué comunicación seguiría disponible durante una caída del ISP.
- Diferenciar router, módem y equipo combinado del proveedor.
- Identificar ejemplos de LAN y WAN que no dependan solamente de Internet.

## Cuestionario de repaso

1. ¿Qué es una red? — **Respuesta:** Un conjunto de dispositivos conectados que pueden comunicarse y compartir recursos.
2. ¿Cuál es la diferencia entre nodo y enlace? — **Respuesta:** El nodo es el dispositivo; el enlace es el medio que permite la comunicación.
3. ¿Qué describe una LAN? — **Respuesta:** Una red local dentro de un área limitada como una casa, oficina o edificio.
4. ¿Cuál es la función general de una WAN? — **Respuesta:** Conectar redes a través de grandes distancias.
5. ¿Qué diferencia básica existe entre router y módem? — **Respuesta:** El router organiza y dirige tráfico; el módem adapta la conexión al medio del proveedor.
6. Si el teléfono sigue conectado al Wi-Fi pero cae el ISP, ¿qué ocurre? — **Respuesta:** La LAN puede seguir funcionando, pero no existe acceso a Internet mediante ese proveedor.
