# 3 de 21 — Networking Topologies

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Introduction to Networking (módulo 3 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Una **topología de red** es la forma en que están ordenados y conectados los equipos de una red. Define qué componentes se necesitan y cómo acceden al medio de transmisión.

Hay que separar dos miradas:

- **Topología física:** cómo están **los cables y los equipos** en la realidad (plano de cableado, dónde está cada nodo).
- **Topología lógica:** cómo **viajan los datos** por esa red, más allá de cómo esté el cable.

No siempre coinciden. Por ejemplo, podés tener PCs ubicadas en círculo en una habitación y eso no significa que la red sea un anillo. O tener cables en estrella y que los datos circulen como en anillo.

## Conceptos importantes

### Hosts y componentes de red

- **Hosts:** los equipos que **usan** la red, como clientes y servidores.
- **Componentes de red:** los que **distribuyen** el tráfico para que todos los hosts se puedan conectar, como switches, bridges y routers (se ven en detalle en secciones siguientes).

### Las tres áreas de una topología

#### 1. Conexiones (el medio)

| Cableadas | Inalámbricas |
|---|---|
| Coaxial | Wi-Fi |
| Fibra óptica | Celular (datos móviles) |
| Par trenzado (*twisted pair*, el cable de red común) | Satelital |

#### 2. Nodos

Un **nodo** es un punto donde un equipo se conecta al medio para enviar o recibir señales (eléctricas, ópticas o de radio). La conexión se hace a través de una **NIC** (*Network Interface Controller*, la placa de red). Un nodo puede ser una computadora, pero también algo simple con solo un microcontrolador, o incluso algo sin nada programable.

Ejemplos de nodos/componentes: repetidores, hubs, bridges, switches, router/módem, gateways y firewalls.

#### 3. Clasificaciones (las 8 topologías básicas)

Point-to-Point, Bus, Star, Ring, Mesh, Tree, Hybrid y Daisy Chain. Las redes complejas combinan varias.

### Las 8 topologías

#### Point-to-Point (punto a punto)

- La más simple: un **enlace directo entre dos hosts** y nada más.
- Es el modelo de la telefonía tradicional.
- **No confundir con P2P (Peer-to-Peer)**, que es una arquitectura de aplicaciones (como BitTorrent), no una topología física.

```text
[Host A] ──── [Host B]
```

#### Bus

- Todos los hosts cuelgan de **un único medio compartido** (por ejemplo, un cable coaxial).
- **No hay un equipo central** que controle.
- Solo **uno puede transmitir a la vez**; los demás reciben todo y cada uno se fija si el mensaje es para él.

```text
[A]   [B]   [C]   [D]
 │     │     │     │
═══════════════════════  ← cable compartido
```

#### Star (estrella)

- Hay un **componente central** (switch, hub o router) y cada host se conecta a él con **su propio cable**.
- El central recibe los paquetes y los reenvía al destino.
- Punto débil: **todo el tráfico pasa por el centro**, así que tiene mucha carga, y si se cae, se cae toda la red.
- Es la topología más común en casas y oficinas.

```text
      [A]   [B]
        \   /
[F] ── [SWITCH] ── [C]
        /   \
      [E]   [D]
```

#### Ring (anillo)

- **Físico:** cada host tiene **dos cables**, uno de entrada y otro de salida, formando un círculo.
- No necesita un componente activo central; el acceso al medio lo regula un **protocolo** que todos respetan.
- Los datos viajan **en una sola dirección**.
- Se usa un **token**: un patrón de bits que gira por el anillo; solo quien tiene el token puede transmitir (*claim token process*).
- **Anillo lógico:** el cableado es en estrella, pero el equipo central simula el anillo pasando los datos de un puerto al siguiente.

```text
[A] → [B]
 ↑     ↓
[D] ← [C]
```

#### Mesh (malla)

- Muchos nodos con **múltiples conexiones** entre sí; no tiene una forma fija.
- **Totalmente mallada (fully meshed):** cada nodo conectado con **todos** los demás. Muy confiable y con mucho ancho de banda. Se usa en WAN/MAN, por ejemplo entre routers: si uno se cae, el tráfico sigue por otro camino.
- **Parcialmente mallada (partially meshed):** algunos nodos tienen una sola conexión y otros tienen varias.

```text
[R1] ─── [R2]
 │ ╲   ╱ │
 │   ╳   │
 │ ╱   ╲ │
[R4] ─── [R3]
```

#### Tree (árbol)

- Es una **estrella extendida**: estrellas conectadas en niveles (jerarquía).
- Típica de **edificios grandes de empresas**: un switch principal que conecta switches de cada piso, y cada uno conecta sus PCs.
- También aparece en redes de banda ancha y MAN. El protocolo **Spanning Tree** arma un árbol lógico para evitar bucles.

```text
           [Servidor]
          /          \
    [Switch 1]    [Switch 2]
     /  |  \        /  |  \
   [A] [B] [C]    [D] [E] [F]
```

#### Hybrid (híbrida)

- Combina **dos o más topologías distintas**, y el resultado no es ninguna estándar.
- Ejemplo: estrellas unidas entre sí por buses.
- Ojo: un **árbol conectado con otro árbol sigue siendo árbol**. Para que sea híbrida tienen que unirse topologías **diferentes**.

#### Daisy Chain (cadena)

- Los hosts se conectan **uno detrás de otro**, con un cable de cada nodo al siguiente, formando una cadena.
- La señal pasa por los nodos anteriores para llegar a destino.
- Común en **automatización industrial** y en autos (bus **CAN**).
- Se basa en la disposición **física** de los nodos, a diferencia del token, que es una regla lógica independiente del cableado.

```text
[A] ── [B] ── [C] ── [D] ── [E]
```

## Comandos y opciones

Esta sección es conceptual y no tiene comandos.

## Diferencias que hay que recordar

- **Topología física vs lógica:** física = cómo están los cables; lógica = cómo viajan los datos.
- **Point-to-Point vs P2P:** Point-to-Point es una topología (enlace directo entre dos). P2P (Peer-to-Peer) es una arquitectura de aplicaciones.
- **Bus vs Star:** en bus todos comparten un cable sin centro; en estrella cada uno tiene su cable hacia un centro.
- **Star vs Tree:** el árbol es una estrella de estrellas, en niveles.
- **Ring vs Daisy Chain:** el anillo se cierra (el último vuelve al primero) y usa token; la cadena es una línea abierta.
- **Fully meshed vs partially meshed:** en la total todos con todos; en la parcial solo algunos tienen varias conexiones.
- **Hybrid vs Tree + Tree:** híbrida = topologías distintas unidas; dos árboles unidos siguen siendo árbol.

## Ejemplos prácticos

- **Tu casa:** el router Wi-Fi con las PCs y celulares conectados es una **estrella**.
- **Una empresa de varios pisos:** switch central → switch por piso → PCs = **árbol**.
- **Routers de un proveedor de Internet:** conectados entre sí por varios caminos = **malla**, para que si uno falla el tráfico siga.
- **Un auto:** sus módulos electrónicos conectados en serie por el bus CAN = **daisy chain**.

## Errores y precauciones

- **Confundir la ubicación física con la topología.** Que los equipos estén en círculo no hace una red en anillo.
- **Olvidar el punto único de falla de la estrella.** Si se cae el switch central, nadie se comunica. Desde seguridad, ese equipo central también ve todo el tráfico: es un objetivo valioso.
- **Pensar que en un bus el mensaje llega solo al destinatario.** Llega a **todos**; cada uno descarta lo que no es suyo. Por eso en un medio compartido es fácil escuchar tráfico ajeno.
- **Llamar híbrida a cualquier red grande.** Solo es híbrida si mezcla topologías distintas.

## Inglés técnico del módulo

- `network topology` → topología de red.
- `physical topology` / `logical topology` → topología física / lógica.
- `host` → equipo que usa la red (cliente o servidor).
- `node` → punto de conexión al medio.
- `Network Interface Controller (NIC)` → placa de red.
- `coaxial cabling` → cable coaxial.
- `glass fiber` / `fiber optic` → fibra óptica.
- `twisted-pair cabling` → cable de par trenzado.
- `repeater` / `hub` / `bridge` / `switch` → componentes que repiten o distribuyen la señal.
- `point-to-point` → enlace directo entre dos.
- `bus` → medio compartido por todos.
- `star` → estrella.
- `ring` → anillo.
- `token` → patrón de bits que da permiso para transmitir.
- `mesh` / `fully meshed` / `partially meshed` → malla / totalmente / parcialmente mallada.
- `tree` → árbol.
- `spanning tree` → protocolo que arma un árbol lógico y evita bucles.
- `hybrid` → híbrida.
- `daisy chain` → cadena, conexión en serie.
- `CAN (Controller Area Network)` → bus de comunicación usado en autos e industria.

## Lo que más costó

Sin dudas registradas todavía en esta sección. Puntos que suelen confundir: topología física vs lógica, el anillo lógico armado sobre una estrella física y la regla de que dos árboles unidos no forman una híbrida.

## Qué aprendí

Aprendí que la topología es la forma de conectar los equipos y que puede ser física (cables) o lógica (cómo viajan los datos). Conocí las tres áreas (conexiones, nodos y clasificaciones) y las 8 topologías básicas: point-to-point, bus, estrella, anillo, malla, árbol, híbrida y cadena, con sus ventajas, debilidades y dónde se usan.

## Para repasar o practicar

- Dibujar de memoria las 8 topologías.
- Para cada una, decir una ventaja, una debilidad y un ejemplo real.
- Identificar qué topología tiene mi red de casa.
- Explicar la diferencia entre topología física y lógica con un ejemplo.

## Cuestionario de repaso

_Respuestas redactadas por la IA a pedido de Tano, para avanzar directo a la sección 4. Conviene intentar responderlas solo antes de leer la respuesta._

1. ¿Qué diferencia hay entre topología física y lógica? — **Respuesta:** la física es cómo están realmente los cables y equipos; la lógica es cómo viajan los datos. Pueden no coincidir: por ejemplo, un anillo lógico armado sobre un cableado en estrella.
2. ¿Cuál es el punto débil de la topología en estrella? — **Respuesta:** todo pasa por el componente central (switch/router): tiene mucha carga y si se cae, se cae toda la red. Desde seguridad, además, ese equipo ve todo el tráfico.
3. ¿En qué se diferencian Point-to-Point y P2P? — **Respuesta:** Point-to-Point es una topología: un enlace directo entre dos hosts (como la telefonía clásica). P2P (Peer-to-Peer) es una arquitectura de aplicaciones, no una forma de conectar cables.
4. ¿Cómo funciona el acceso al medio en una red en anillo? — **Respuesta:** los datos van en una sola dirección y se usa un token, un patrón de bits que gira por el anillo; solo quien tiene el token puede transmitir.
5. Dos redes en árbol unidas, ¿forman una topología híbrida? — **Respuesta:** no. Un árbol unido a otro árbol sigue siendo árbol. Es híbrida solo cuando se unen topologías distintas (ej. estrellas conectadas por un bus).
6. Decí qué topología es cada ejemplo: router de casa con sus equipos, edificio con switch central y un switch por piso, routers de un ISP conectados por varios caminos, módulos de un auto en serie. — **Respuesta:** estrella, árbol, malla y daisy chain (bus CAN), en ese orden.
