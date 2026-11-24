# 2 de 12 — Network Concepts

**Estado:** Repasar
**Progreso de la sección:** 100% (realizada en HTB)
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Una comunicación de red parece una sola acción —por ejemplo, abrir una página— pero requiere varias funciones: la aplicación genera información, el transporte la divide y administra, IP busca el destino, el enlace la prepara para el tramo local y el medio físico transmite señales.

Los modelos **OSI** y **TCP/IP** separan esas responsabilidades para poder comprenderlas y diagnosticar fallas. OSI es un mapa conceptual detallado de siete capas; TCP/IP agrupa funciones en cuatro capas utilizadas para describir redes reales e Internet.

## El mapa mental antes de memorizar nombres

Cada nivel resuelve una pregunta distinta:

1. **¿Cómo viajan físicamente los bits?** Señales, cables y radio.
2. **¿Cómo llega la información al siguiente equipo del enlace local?** Tramas y direcciones MAC.
3. **¿Cómo encuentra otra red y otro destino?** Paquetes, direcciones IP y routers.
4. **¿Cómo llega a la aplicación correcta y con qué garantías?** Puertos, TCP y UDP.
5–7. **¿Cómo mantienen una conversación y entienden los datos las aplicaciones?** Sesiones, representación y protocolos de aplicación.

La clave no es repetir siete nombres: es identificar qué problema intenta resolver cada capa.

## Modelo OSI

### Capa 1 — Physical Layer

Convierte bits en señales que atraviesan un medio. Incluye cables Ethernet, fibra, radio, conectores, hubs y repetidores. Si no hay enlace, señal o conexión física, el problema comienza aquí.

### Capa 2 — Data Link Layer

Mueve **frames (tramas)** entre equipos del mismo enlace local. Utiliza direcciones **MAC** y dispositivos como switches y bridges. Su alcance normal es el siguiente salto dentro de la LAN, no todo el recorrido mundial.

Un switch observa direcciones MAC para decidir por qué puerto entregar una trama.

### Capa 3 — Network Layer

Mueve **packets (paquetes)** entre redes diferentes. Utiliza direcciones IP y routers para elegir una ruta hacia la red de destino.

La palabra “logical addressing” se refiere aquí a IP: una dirección que permite ubicar un origen y destino dentro de una estructura de redes, no a un conector físico.

### Capa 4 — Transport Layer

Comunica aplicaciones de extremo a extremo. Divide información en segmentos o datagramas, usa puertos y ofrece diferentes garantías mediante TCP o UDP.

- **TCP** controla conexión, orden, confirmaciones y retransmisiones.
- **UDP** envía datagramas sin conexión previa ni garantía propia de entrega u orden.

### Capa 5 — Session Layer

Establece, mantiene y termina sesiones entre aplicaciones. El modelo la utiliza para representar el control de conversaciones prolongadas, puntos de reanudación y coordinación entre extremos.

### Capa 6 — Presentation Layer

Se ocupa de cómo se representan los datos: conversión de formatos, codificación, compresión, cifrado y descifrado. Su pregunta central es: “¿podrá el receptor interpretar estos datos?”.

### Capa 7 — Application Layer

Ofrece servicios de red que utilizan las aplicaciones. HTTP, FTP, SMTP y DNS se ubican en esta capa. El navegador no “es” la capa; usa protocolos de aplicación para comunicarse.

## Encapsulación: cómo viaja realmente un dato

Al enviar información, cada capa agrega datos de control alrededor de lo recibido desde arriba:

`datos → segmento/datagrama → paquete → trama → bits`

- La capa de transporte agrega información de TCP o UDP.
- La capa de red agrega información IP y produce un paquete.
- La capa de enlace envuelve ese paquete dentro de una trama para el enlace actual.
- La capa física transmite la trama como bits y señales.

Por eso la respuesta correcta es: **la trama de capa 2 contiene al paquete de capa 3**. Cuando la trama llega a un router, puede cambiar para el siguiente enlace; el paquete IP continúa siendo encaminado hacia el destino.

En el receptor ocurre la **desencapsulación**: cada capa retira e interpreta su información y entrega el contenido hacia arriba.

## Modelo TCP/IP

TCP/IP resume las funciones prácticas en cuatro capas:

| TCP/IP | Equivalencia aproximada en OSI | Funciones y ejemplos |
|---|---|---|
| **Application** | Session + Presentation + Application (5–7) | HTTP, FTP, SMTP, DNS y datos de aplicaciones |
| **Transport** | Transport (4) | TCP, UDP y puertos |
| **Internet** | Network (3) | IP, ICMP y routing |
| **Link** | Physical + Data Link (1–2) | Ethernet, Wi-Fi, MAC, tramas y señales |

La confusión concreta del ejercicio fue responder **Internet Layer** cuando la pregunta pedía el nombre del modelo OSI. `Internet Layer` es TCP/IP; su equivalente aproximado en OSI es `Network Layer`.

## Protocolos y responsabilidades

Un **protocol** es un conjunto de reglas compartidas para formatear, enviar, recibir e interpretar información.

- **HTTP:** solicitudes y respuestas de contenido web.
- **FTP:** transferencia de archivos.
- **SMTP:** envío de correo entre sistemas.
- **DNS:** resolución de nombres a direcciones IP.
- **IP:** direccionamiento lógico y encaminamiento de paquetes.
- **TCP:** transporte confiable, ordenado y orientado a conexión.
- **UDP:** transporte sin conexión, con menor control y sobrecarga.

## Quién decide entre TCP y UDP

La decisión la toma el diseñador de un protocolo o el desarrollador de la aplicación según sus necesidades. La aplicación solicita al sistema operativo un tipo de comunicación; el sistema operativo ejecuta TCP o UDP mediante su pila de red. Los routers no cambian libremente uno por otro.

Recorrido conceptual:

`la aplicación elige → el sistema operativo implementa → la red transporta`

### Cuándo conviene TCP

TCP se elige cuando importa recibir todo, sin duplicados y en orden. Confirma datos, detecta pérdidas y retransmite. Es parecido a un envío certificado con números de secuencia y aviso de recepción.

Ejemplos habituales: descarga de archivos, correo y HTTP/1.1 o HTTP/2.

### Cuándo conviene UDP

UDP se elige cuando importa reducir demoras y la aplicación tolera pérdidas o implementa sus propios controles. No significa que sea “malo”: ofrece un servicio diferente.

Ejemplos habituales: consultas DNS comunes, algunos juegos, voz y video en tiempo real. `HTTP/3` utiliza QUIC sobre UDP; QUIC agrega por encima controles que UDP no ofrece por sí solo.

## Tipos, modos y medios de transmisión

### Analógica vs digital

- Una señal **analógica** varía continuamente.
- Una señal **digital** representa información mediante valores discretos, habitualmente bits.

### Simplex, half-duplex y full-duplex

- **Simplex:** solamente un extremo transmite y el otro recibe. No existe camino de respuesta dentro de ese modo.
- **Half-duplex:** ambos extremos pueden transmitir, pero deben turnarse. Ejemplo: walkie-talkie.
- **Full-duplex:** ambos transmiten simultáneamente. Ejemplo: llamada telefónica.

La confusión del cuestionario fue elegir simplex para el walkie-talkie. La pregunta decisiva es: “¿ambos pueden transmitir alguna vez?”. Si sí, no es simplex. Si deben turnarse, es half-duplex.

### Medios de transmisión

- **Twisted pair:** cable de par trenzado habitual en Ethernet.
- **Coaxial:** televisión por cable y tecnologías de red anteriores.
- **Fiber optic:** pulsos de luz, alta velocidad y grandes distancias.
- **Radio:** Wi-Fi y redes celulares.
- **Microwave:** enlaces terrestres y satelitales.
- **Infrared:** comunicaciones inalámbricas de corta distancia.

## Ejemplo completo: abrir una página web

1. El navegador utiliza un protocolo de aplicación para solicitar contenido.
2. Transporte usa TCP o un protocolo moderno construido sobre UDP, según la versión elegida por cliente y servidor.
3. IP agrega las direcciones lógicas y permite encaminar paquetes entre redes.
4. Ethernet o Wi-Fi crea una trama para alcanzar el siguiente salto local.
5. El medio convierte los bits en señales.
6. Cada router retira la trama recibida, analiza el paquete IP y crea otra trama apropiada para el siguiente enlace.
7. El servidor desencapsula la información, responde y el proceso se repite en sentido contrario.

Este recorrido explica por qué paquete y trama no son sinónimos: el paquete busca atravesar redes; la trama sirve para un enlace específico del recorrido.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. Más adelante herramientas como `ip`, `ss`, `ping`, `traceroute`, `tcpdump` o Wireshark permitirán observar direcciones, puertos, rutas y capas, pero todavía no corresponde usarlas como sustituto del modelo mental.

## Diferencias que hay que recordar

- **OSI vs TCP/IP:** OSI explica siete responsabilidades; TCP/IP las agrupa en cuatro capas prácticas.
- **Network Layer vs Internet Layer:** nombres equivalentes aproximados, pero pertenecen a modelos diferentes.
- **MAC vs IP:** MAC identifica una interfaz en el enlace local; IP permite direccionamiento lógico entre redes.
- **Switch vs router:** el switch entrega tramas dentro del enlace; el router encamina paquetes entre redes.
- **Trama vs paquete:** la trama de capa 2 contiene al paquete de capa 3 para un enlace concreto.
- **TCP vs UDP:** TCP ofrece confiabilidad y orden; UDP ofrece un transporte mínimo sin esas garantías propias.
- **Simplex vs half-duplex:** simplex solo permite una dirección; half-duplex permite ambas por turnos.

## Errores y precauciones

- No memorizar capas sin asociarlas al problema que resuelven.
- No mezclar nombres de OSI y TCP/IP cuando la pregunta exige un modelo específico.
- No decir que UDP “es para streaming” como regla universal; la aplicación y el protocolo deciden según requisitos.
- No afirmar que TCP cifra datos: confiabilidad y cifrado son funciones diferentes.
- No confundir la dirección IP de extremo a extremo con la trama utilizada en cada enlace.
- No asumir que una capa siempre corresponde de manera perfecta a una implementación; los modelos simplifican sistemas reales.

## Inglés técnico del módulo

- `layer` → capa con una responsabilidad de comunicación.
- `Physical Layer` → transmisión de bits y señales.
- `Data Link Layer` → tramas, MAC y comunicación por el enlace.
- `Network Layer` → paquetes, IP y routing en OSI.
- `Internet Layer` → nombre TCP/IP para funciones de IP y routing.
- `Transport Layer` → comunicación extremo a extremo mediante TCP o UDP.
- `Presentation Layer` → representación, conversión, compresión y cifrado.
- `frame` → trama de capa 2.
- `packet` → paquete de capa 3.
- `segment / datagram` → unidades asociadas a TCP / UDP.
- `encapsulation / decapsulation` → agregado / retiro de información por capas.
- `reliable delivery` → entrega con controles de orden, confirmación y recuperación.
- `connectionless` → comunicación sin establecer una conexión previa.
- `half-duplex` → comunicación bidireccional por turnos.
- `full-duplex` → comunicación bidireccional simultánea.

## Lo que más costó

El cuestionario propio quedó 4/6. Se entendieron IP y routers en capa 3, TCP frente a UDP, la equivalencia de la capa Link y la utilidad de OSI. Costó distinguir half-duplex de simplex y recordar que el paquete de capa 3 se encapsula dentro de la trama de capa 2.

En el ejercicio final también se mezcló `Internet Layer` de TCP/IP con `Network Layer` de OSI. La primera explicación no construyó con suficiente claridad estas relaciones; por eso este apunte prioriza el problema que resuelve cada capa y el recorrido completo de un dato.

## Qué aprendí

Entendí que las capas separan responsabilidades y que debo identificar primero qué problema describe una pregunta. Puedo relacionar OSI con TCP/IP, explicar encapsulación, diferenciar trama de paquete, distinguir simplex/half-duplex/full-duplex y razonar por qué una aplicación elige TCP o UDP.

## Para repasar o practicar

- Reconstruir las siete capas desde sus funciones, sin recitar solamente nombres.
- Dibujar `datos → segmento → paquete → trama → bits` y el proceso inverso.
- Comparar Network Layer de OSI con Internet Layer de TCP/IP.
- Explicar por qué un switch se asocia a MAC y un router a IP.
- Dar un ejemplo propio de simplex, half-duplex y full-duplex.
- Elegir TCP o UDP para diferentes aplicaciones justificando la decisión.

## Cuestionario de repaso

1. ¿En qué capa OSI trabajan las direcciones IP y los routers? — **Respuesta:** Network Layer, capa 3.
2. ¿Qué diferencia principal existe entre TCP y UDP? — **Respuesta:** TCP ofrece entrega confiable y ordenada; UDP no garantiza entrega ni orden por sí mismo.
3. ¿Qué capas OSI combina aproximadamente la capa Link de TCP/IP? — **Respuesta:** Physical y Data Link, capas 1 y 2.
4. ¿Qué modo utiliza un walkie-talkie? — **Respuesta:** Half-duplex, porque ambos extremos transmiten pero deben turnarse.
5. ¿Cómo se relacionan paquete y trama? — **Respuesta:** La trama de capa 2 encapsula al paquete de capa 3 para atravesar un enlace.
6. ¿Para qué sirve principalmente OSI? — **Respuesta:** Para organizar conceptualmente las funciones de red y facilitar comprensión, diseño y diagnóstico.
