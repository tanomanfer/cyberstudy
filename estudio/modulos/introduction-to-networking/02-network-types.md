# 2 de 21 — Network Types

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Introduction to Networking (módulo 3 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Las redes se clasifican en **tipos** según su alcance y su uso. La sección los divide en dos grupos:

- **Términos comunes:** los que se escuchan en el trabajo todos los días (WAN, LAN, WLAN, VPN). Estos hay que dominarlos.
- **Términos "de libro":** los que aparecen en exámenes de redes pero casi no se usan en la práctica (GAN, MAN, PAN/WPAN). Conviene conocerlos, pero no hace falta recitarlos de memoria.

Lo más importante para seguridad: saber distinguir una IP **privada** de una **pública** (RFC 1918) y entender cómo funciona una **VPN**, sobre todo la diferencia entre **split tunnel** y túnel completo.

## Conceptos importantes

### Términos comunes

| Tipo | Qué es | Ejemplo |
|---|---|---|
| **WAN** (*Wide Area Network*) | Red de área amplia | Internet |
| **LAN** (*Local Area Network*) | Red local interna | La red de tu casa u oficina |
| **WLAN** (*Wireless LAN*) | LAN accesible por Wi-Fi | El Wi-Fi de tu casa |
| **VPN** (*Virtual Private Network*) | Te hace sentir conectado a otra red | Conectarte a los labs de HTB |

### WAN

En la práctica, **WAN = Internet**. En un router vas a ver una **dirección WAN** (la que se ve desde Internet) y una **dirección LAN** (la de adentro de tu red).

Pero una WAN, en el fondo, es **muchas LAN unidas**. Por eso existen también WAN internas: empresas grandes o gobiernos tienen redes enormes que no salen a Internet, llamadas **intranet** o **red airgap** (aislada).

¿Cómo se reconoce una WAN?

1. Usa un protocolo de ruteo propio de WAN, como **BGP** (*Border Gateway Protocol*, el que usan los grandes proveedores para intercambiar rutas en Internet).
2. Sus direcciones IP **no** están dentro de los rangos privados de la RFC 1918.

### RFC 1918: las IP privadas

La **RFC 1918** es el documento que reserva tres rangos de IP para uso **privado** (redes internas). Estas IP no se usan en Internet:

| Rango | Ejemplo típico |
|---|---|
| `10.0.0.0/8` | `10.10.14.5` (VPN de HTB, empresas) |
| `172.16.0.0/12` (de `172.16.x.x` a `172.31.x.x`) | `172.17.0.2` (Docker) |
| `192.168.0.0/16` | `192.168.1.10` (casas) |

Si una IP está en estos rangos → es interna (LAN). Si no → es pública/ruteable (WAN, Internet).

### LAN y WLAN

Las LAN y WLAN normalmente reparten IP **privadas** (RFC 1918). Hay excepciones: algunas universidades u hoteles te dan una IP pública al conectarte, pero es poco común.

Entre LAN y WLAN **no hay diferencia de fondo**, salvo que la WLAN transmite sin cables. Es más que nada una distinción de **seguridad**: una red inalámbrica se puede escuchar desde afuera del edificio, así que se trata distinto.

### VPN: los tres tipos

Todas las VPN buscan lo mismo: que el usuario **se sienta conectado a otra red**, como si estuviera enchufado ahí.

#### 1. Site-to-Site VPN (sitio a sitio)

- Cliente y servidor **no son personas**, son equipos de red: routers o firewalls.
- Comparten **rangos de red completos**.
- Uso típico: unir la sede central de una empresa con sus sucursales por Internet, como si estuvieran en la misma red local.

#### 2. Remote Access VPN (acceso remoto)

- Tu computadora crea una **interfaz virtual** que se comporta como si estuvieras en la red del otro lado.
- Ejemplo: **HTB usa OpenVPN**, que crea un adaptador **TUN** (`tun0`) para que llegues a los labs.
- Lo importante al analizarla es la **tabla de rutas** que se crea al conectarte:
  - **Split tunnel:** la VPN solo agrega rutas para redes puntuales (ej. `10.10.10.0/24`). El resto de tu tráfico (Internet normal) **no pasa por la VPN**.
  - **Full tunnel (túnel completo):** todo tu tráfico, incluido Internet, pasa por la VPN.

#### 3. SSL VPN

- La VPN funciona **dentro del navegador**.
- Normalmente te "transmite" una aplicación o un escritorio entero en una pestaña.
- Ejemplo: el **Pwnbox** de HTB (una máquina de ataque que usás desde el navegador).

### Términos de libro

| Tipo | Qué es | Ejemplo |
|---|---|---|
| **GAN** (*Global Area Network*) | Red mundial | Internet, o la red global privada de una multinacional |
| **MAN** (*Metropolitan Area Network*) | Red regional que une varias LAN cercanas | Sucursales de una empresa en una misma ciudad |
| **PAN / WPAN** (*(Wireless) Personal Area Network*) | Red personal de pocos metros | Celular + auriculares Bluetooth |

- **GAN:** une varias WAN alrededor del mundo usando fibra óptica, **cables submarinos** y **satélites**. Internet es una GAN, pero también lo es la red privada mundial de una multinacional.
- **MAN:** une varias LAN de una misma zona (por ejemplo, sucursales de una ciudad) con **líneas alquiladas** (*leased lines*) y fibra. Es tan rápida que dos puntos lejanos se comunican casi como si estuvieran en la misma LAN. Varias MAN se integran en WAN, y las WAN en GAN.
- **PAN / WPAN:** red entre dispositivos personales a pocos metros. Si es por cable es **PAN**; si es inalámbrica (Bluetooth o USB inalámbrico) es **WPAN**. Una WPAN por Bluetooth se llama **piconet**. En el **IoT** (Internet de las cosas) se usan protocolos WPAN como **Z-Wave**, **ZigBee** e **Insteon** para casas inteligentes (domótica).

### Escala de tamaño (de menor a mayor)

`PAN/WPAN` (metros) → `LAN/WLAN` (casa/edificio) → `MAN` (ciudad) → `WAN` (país/regiones) → `GAN` (mundo)

## Comandos y opciones

Esta sección es conceptual, pero hay comandos útiles para ver lo que explica:

```bash
ip a
```

Al conectarte a la VPN de HTB vas a ver una interfaz nueva llamada `tun0` con una IP del rango `10.x.x.x` (privada, RFC 1918). Esa es la **interfaz virtual** de la Remote Access VPN.

```bash
ip route
```

Muestra la tabla de rutas. Con la VPN de HTB vas a ver líneas como `10.10.10.0/23 via ... dev tun0`: solo esas redes van por la VPN. Tu `default via ...` sigue saliendo por tu router de casa → eso es **split tunnel**. Si la línea `default` apuntara a `tun0`, sería **full tunnel**.

## Diferencias que hay que recordar

- **WAN vs LAN:** WAN = muchas LAN unidas, IP públicas, protocolos como BGP. LAN = red interna, IP privadas (RFC 1918).
- **LAN vs WLAN:** misma idea; la WLAN es sin cable y por eso se considera distinta en seguridad.
- **Site-to-Site vs Remote Access:** Site-to-Site une **redes enteras** entre routers/firewalls. Remote Access conecta **una computadora** a una red.
- **Split tunnel vs full tunnel:** split = solo algunas redes por la VPN, Internet sale directo. Full = todo por la VPN.
- **Remote Access vs SSL VPN:** Remote Access crea una interfaz virtual en tu equipo (ej. `tun0`). SSL VPN corre en el navegador y te transmite apps o escritorios.
- **PAN vs WPAN:** PAN por cable, WPAN inalámbrica (Bluetooth). Piconet = WPAN por Bluetooth.

## Ejemplos prácticos

- **¿Pública o privada?** `192.168.0.15` → privada. `172.20.4.1` → privada (está entre `172.16` y `172.31`). `172.40.1.1` → pública (fuera del rango `/12`). `8.8.8.8` → pública.
- **Split tunnel en HTB es bueno:** llegás a los labs pero tu navegación personal no pasa por los servidores de HTB → más privacidad.
- **Split tunnel en una empresa es malo:** si la notebook de un empleado tiene malware y la VPN es split tunnel, el tráfico del malware sale directo a Internet y **no pasa por los controles de la empresa** (IDS, proxy, firewall), así que no lo detectan. Para un SOC, el full tunnel da visibilidad.

## Errores y precauciones

- **Pensar que WAN es solo Internet.** Existen WAN internas (intranet, airgap).
- **Confundir `172.16.0.0/12` con `172.16.0.0/16`.** El `/12` cubre de `172.16.0.0` a `172.31.255.255`, no solo `172.16.x.x`.
- **No revisar la tabla de rutas al conectar una VPN.** Es lo que te dice qué tráfico va por el túnel y cuál no.
- **Tratar la WLAN igual que la LAN cableada.** La señal inalámbrica sale del edificio y cualquiera cerca puede intentar conectarse o escuchar.

## Inglés técnico del módulo

- `Wide Area Network (WAN)` → red de área amplia (Internet).
- `Local Area Network (LAN)` → red local.
- `Wireless LAN (WLAN)` → red local inalámbrica.
- `Virtual Private Network (VPN)` → red privada virtual.
- `airgap network` → red físicamente aislada de Internet.
- `routable IP` → IP pública que se puede rutear por Internet.
- `BGP (Border Gateway Protocol)` → protocolo de ruteo entre grandes redes de Internet.
- `RFC 1918` → documento que define los rangos de IP privadas.
- `Site-to-Site VPN` → VPN que une dos redes completas.
- `Remote Access VPN` → VPN que conecta un equipo a una red.
- `TUN adapter` → interfaz de red virtual que crea OpenVPN (`tun0`).
- `routing table` → tabla de rutas.
- `split tunnel` → VPN que solo manda por el túnel algunas redes.
- `SSL VPN` → VPN que funciona en el navegador.
- `leased line` → línea dedicada alquilada a un proveedor.
- `piconet` → red Bluetooth entre pocos dispositivos.
- `IoT (Internet of Things)` → dispositivos conectados (domótica, sensores).

## Lo que más costó

Sin dudas registradas todavía en esta sección. Puntos que suelen confundir: el rango `172.16.0.0/12` y la diferencia entre split tunnel y full tunnel, y por qué lo que es bueno para HTB es malo para una empresa.

## Qué aprendí

Aprendí los tipos de red comunes (WAN, LAN, WLAN, VPN) y los de libro (GAN, MAN, PAN/WPAN). Entendí que las IP privadas están definidas en la RFC 1918 y que eso ayuda a saber si una red es interna o pública. Conocí los tres tipos de VPN (Site-to-Site, Remote Access y SSL) y que en una Remote Access hay que mirar la tabla de rutas para saber si es split tunnel.

## Para repasar o practicar

- Memorizar los tres rangos de la RFC 1918 y practicar clasificando IP como públicas o privadas.
- Conectarme a la VPN de HTB y mirar `ip a` e `ip route` para ver `tun0` y las rutas del split tunnel.
- Explicar con mis palabras por qué el split tunnel es un problema para la detección en una empresa.
- Ordenar los tipos de red de menor a mayor alcance.

## Cuestionario de repaso

_Respuestas redactadas por la IA a pedido de Tano, para avanzar directo a la sección 4. Conviene intentar responderlas solo antes de leer la respuesta._

1. ¿Cuáles son los tres rangos de IP privadas de la RFC 1918? — **Respuesta:** `10.0.0.0/8`, `172.16.0.0/12` (de `172.16.x.x` a `172.31.x.x`) y `192.168.0.0/16`.
2. ¿Cómo se reconoce que una red es una WAN? — **Respuesta:** usa protocolos de ruteo propios de WAN, como BGP, y sus IP no están en los rangos privados de la RFC 1918. Una WAN es, en el fondo, muchas LAN unidas (y puede ser interna, como una intranet).
3. ¿Qué diferencia hay entre una Site-to-Site VPN y una Remote Access VPN? — **Respuesta:** la Site-to-Site une redes completas entre routers o firewalls (ej. sede central y sucursal). La Remote Access conecta una sola computadora a una red, creando una interfaz virtual (ej. `tun0` de OpenVPN en HTB).
4. ¿Qué es un split tunnel y por qué es bueno para HTB pero malo para una empresa? — **Respuesta:** es una VPN que solo manda por el túnel algunas redes (ej. `10.10.10.0/24`) y el resto de Internet sale directo. En HTB da privacidad; en una empresa, si la notebook tiene malware, ese tráfico sale por Internet sin pasar por los controles de detección.
5. ¿La IP `172.20.4.1` es pública o privada? ¿Y `172.40.1.1`? — **Respuesta:** `172.20.4.1` es privada (está entre `172.16` y `172.31`). `172.40.1.1` es pública, porque queda fuera del rango `172.16.0.0/12`.
6. Ordená de menor a mayor alcance: MAN, PAN, GAN, LAN, WAN. ¿Qué es una piconet? — **Respuesta:** PAN → LAN → MAN → WAN → GAN. Una piconet es una WPAN armada por Bluetooth entre pocos dispositivos.
