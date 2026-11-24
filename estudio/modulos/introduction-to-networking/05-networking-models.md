# 5 de 21 — Networking Models

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Introduction to Networking (módulo 3 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Hay dos **modelos de red** que describen cómo viajan los datos de un equipo a otro: el **modelo OSI** y el **modelo TCP/IP**. Los dos dividen la comunicación en **capas**. Cada capa tiene una tarea, y entre todas convierten los bits que viajan por el cable en algo que nosotros podemos leer.

```text
        OSI (7 capas)                TCP/IP (4 capas)
 7  Application    ┐
 6  Presentation   ├──────────────►  Application
 5  Session        ┘
 4  Transport      ───────────────►  Transport
 3  Network        ───────────────►  Internet
 2  Data-Link      ┐
 1  Physical       ┘──────────────►  Link
```

## Conceptos importantes

### Modelo OSI

- **OSI** = *Open Systems Interconnection*. Lo publicaron la **ISO** (Organización Internacional de Normalización) y la **ITU** (Unión Internacional de Telecomunicaciones); por eso también se le dice **ISO/OSI**.
- Es un **modelo de referencia**: sirve para describir y definir cómo se comunican los sistemas.
- Tiene **7 capas**, cada una con tareas bien separadas.
- Es conocido por ser **estricto**.

### Modelo TCP/IP

- **TCP/IP** (*Transmission Control Protocol / Internet Protocol*) es el nombre genérico de una **familia de protocolos**, no solo de TCP e IP.
- Esa familia incluye también, por ejemplo, **ICMP** (el de `ping`) y **UDP**.
- Se encarga de conmutar y transportar los paquetes de datos. **Internet entera está basada en TCP/IP**.
- Tiene **4 capas** y es más **flexible**: permite relajar reglas mientras se respeten las pautas generales.

> Ojo con el texto de HTB: dice que OSI es "más nuevo y más usado". En la práctica, **lo que realmente funciona en Internet es TCP/IP**; OSI se usa sobre todo como **modelo de referencia** para explicar y analizar. Lo importante para el curso: conocer los dos.

### PDU (Protocol Data Unit)

En cada capa, los datos tienen un formato y un nombre distinto: la **PDU** (*unidad de datos del protocolo*).

| Capa OSI | Capa TCP/IP | PDU |
|---|---|---|
| 7, 6, 5 (Aplicación, Presentación, Sesión) | Application | **Data** (datos) |
| 4 (Transporte) | Transport | **Segment** (TCP) / **Datagram** (UDP) |
| 3 (Red) | Internet | **Packet** (paquete) |
| 2 (Enlace de datos) | Link | **Frame** (trama) |
| 1 (Física) | Link | **Bit** |

### Encapsulación

Cuando mandás algo (por ejemplo, al pedir una página web), los datos **bajan** por las capas:

1. Cada capa le agrega su propio **encabezado (header)** a lo que recibe de la capa de arriba. Ese header controla e identifica el paquete.
2. **Header + datos** forman la PDU de la capa siguiente.
3. Así hasta la capa física, donde se transmiten como **bits**.

Del otro lado se hace al revés (**desencapsulación**): cada capa lee y saca su header, hasta que la aplicación recibe los datos.

```text
Emisor (baja)                                   Receptor (sube)
[ Datos ]                                       [ Datos ]
[ TCP | Datos ]                                 [ TCP | Datos ]
[ IP | TCP | Datos ]                            [ IP | TCP | Datos ]
[ MAC | IP | TCP | Datos ]                      [ MAC | IP | TCP | Datos ]
01101001... ──────────── cable / aire ────────► 01101001...
```

### Para qué le sirven a un pentester (y a un analista)

- **TCP/IP:** para entender rápido cómo se establece una conexión completa.
- **OSI:** para desarmar el tráfico **pieza por pieza** y analizarlo en detalle. Esto pasa cuando capturás e interceptás tráfico (lo vas a profundizar en el módulo **Network Traffic Analysis**, muy importante para SOC).

## Comandos y opciones

Sección teórica. Cuando uses Wireshark vas a ver exactamente estas capas: trama (Ethernet), paquete (IP), segmento (TCP/UDP) y datos.

## Diferencias que hay que recordar

| | OSI | TCP/IP |
|---|---|---|
| Capas | 7 | 4 |
| Qué es | Modelo de referencia | Familia de protocolos real de Internet |
| Estilo | Estricto | Más flexible |
| Uso práctico | Analizar en detalle | Entender la conexión completa |

- **Segment vs datagram:** los dos son de la capa de transporte; segmento es con **TCP**, datagrama con **UDP**.
- **Packet vs frame:** paquete es capa 3 (IP); trama es capa 2 (MAC).

## Ejemplos prácticos

- Truco para recordar las 7 capas de abajo hacia arriba: **"Please Do Not Throw Sausage Pizza Away"** (Physical, Data-Link, Network, Transport, Session, Presentation, Application).
- Un proxy (sección 4) trabaja en la **capa 7**; un switch, en la **capa 2**; un router, en la **capa 3**.

## Errores y precauciones

- No pensar que TCP/IP son solo dos protocolos: es toda una familia (incluye UDP e ICMP).
- No mezclar los nombres de las PDU: los cambios de nombre ayudan a saber en qué capa estás.

## Inglés técnico del módulo

- `layer` → capa.
- `reference model` → modelo de referencia.
- `protocol family` / `protocol suite` → familia de protocolos.
- `PDU (Protocol Data Unit)` → unidad de datos de cada capa.
- `header` → encabezado.
- `encapsulation` → encapsulación (cada capa agrega su header).
- `segment` / `datagram` / `packet` / `frame` / `bit` → nombres de la PDU por capa.
- `ICMP (Internet Control Message Protocol)` → protocolo de mensajes de control (ping).
- `UDP (User Datagram Protocol)` → protocolo de transporte sin conexión.

## Lo que más costó

El orden de las PDU: packet (capa 3, IP) va antes que frame (capa 2, MAC). Falta fijar segment (TCP) vs datagram (UDP) y la desencapsulación del receptor.

## Qué aprendí

Aprendí que hay dos modelos de red: OSI (7 capas, modelo de referencia estricto) y TCP/IP (4 capas, la familia de protocolos real de Internet). Vi cómo se corresponden sus capas, el nombre de la PDU en cada una (datos, segmento/datagrama, paquete, trama, bit) y cómo funciona la encapsulación: cada capa agrega su header al enviar y lo saca al recibir.

## Para repasar o practicar

- Escribir de memoria las 7 capas OSI y las 4 de TCP/IP, con su correspondencia.
- Decir la PDU de cada capa.
- Abrir una captura en Wireshark y ubicar cada capa en un paquete.

## Cuestionario de repaso

_Respondido por Tano y corregido por la IA (cuestionario conjunto de 6 preguntas entre las secciones 4 y 5)._

4. ¿Cuántas capas tiene el modelo OSI y cuántas el TCP/IP? ¿Qué capas OSI quedan juntas dentro de la capa Application de TCP/IP?
   - **Tano:** 7 y 4; en la capa 4 de TCP/IP están las capas 5, 6 y 7 de OSI.
   - **Corrección:** ✅ Correcto. La capa 4 de TCP/IP (contando desde abajo) es Application, y junta Session (5), Presentation (6) y Application (7).
5. ¿Qué es la encapsulación y qué pasa del lado del receptor?
   - **Tano:** los datos bajan por las capas, cada una les pone su encabezado, hasta la física.
   - **Corrección:** ⚠️ Bien la primera parte. Faltó: header + datos forman la PDU de la capa siguiente, y el **receptor hace lo inverso** (desencapsulación): sube por las capas sacando cada header hasta que la aplicación recibe los datos.
6. Ordená de la capa 4 a la capa 1: frame, packet, bit, segment. ¿En qué se diferencia un segment de un datagram?
   - **Tano:** segment, frame, packet, bit.
   - **Corrección:** ❌ Frame y packet están invertidos. Orden correcto: **segment (4) → packet (3) → frame (2) → bit (1)**. Truco: el **paquete** es de IP (capa 3) y la **trama** es de MAC (capa 2). Segment y datagram son de capa 4: **segment con TCP**, **datagram con UDP**.
