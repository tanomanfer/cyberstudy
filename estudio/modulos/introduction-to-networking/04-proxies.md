# 4 de 21 — Proxies

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Introduction to Networking (módulo 3 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Un **proxy** es un equipo o servicio que se pone **en el medio** de una conexión y actúa como **mediador**. La clave es esa palabra: para ser proxy, el equipo del medio tiene que **poder ver e inspeccionar el contenido** del tráfico.

- Si el equipo del medio **solo pasa el tráfico** sin poder mirarlo, técnicamente es un **gateway**, no un proxy.
- Los proxies trabajan casi siempre en la **capa 7 del modelo OSI** (capa de aplicación).

Cada grupo de gente entiende "proxy" distinto:

- **Seguridad:** proxies HTTP como Burp Suite, o pivoting con proxies SOCKS/SSH (Chisel, ptunnel, sshuttle).
- **Desarrollo web:** Cloudflare o ModSecurity para bloquear tráfico malicioso.
- **Usuario común:** "algo para esconder mi ubicación y ver el Netflix de otro país". En realidad eso suele ser una **VPN**, que técnicamente **no es un proxy**. Que te cambie la IP no lo convierte en proxy.

## Conceptos importantes

### Los tres tipos principales

1. **Forward proxy** (o proxy dedicado)
2. **Reverse proxy**
3. **Transparente / no transparente** (no es un tipo aparte: es una característica que puede tener cualquiera de los anteriores).

### Forward proxy (proxy de salida)

Es lo que la mayoría imagina: el **cliente** le pide algo al proxy y el proxy hace el pedido **por él** hacia afuera. Filtra el tráfico **que sale**.

```text
[PC de la empresa] ──► [Forward proxy / filtro web] ──► Internet
```

**Ejemplo corporativo (defensa):**

- En una red de empresa, las computadoras sensibles no salen directo a Internet: tienen que pasar por un proxy o filtro web.
- Es una buena barrera contra **malware**: no solo tiene que esquivar el filtro web (eso es fácil), también tiene que ser **proxy aware** (saber usar el proxy) o usar un **C2** poco común.
  - **C2 (Command and Control):** el canal por el que el malware recibe órdenes del atacante.
- **Navegadores y proxy del sistema:**
  - Internet Explorer, Edge y Chrome usan la configuración de **proxy del sistema** por defecto.
  - Si el malware usa **WinSock** (la API de red nativa de Windows), probablemente ya sea proxy aware sin código extra.
  - **Firefox** no usa WinSock: usa **libcurl** (el mismo código en cualquier sistema). Para usar ese proxy, el malware tendría que buscar la configuración de Firefox, y es muy raro que lo haga.
  - Por eso, si una empresa usa solo Firefox, es muy poco probable que le entre malware proxy aware.
- **C2 por DNS:** el malware podría usar DNS como canal de órdenes. Pero si la organización **monitorea DNS** (por ejemplo con **Sysmon**), ese tráfico se detecta rápido. Esto es justo trabajo de SOC.

**Burp Suite** también es un forward proxy: se usa para reenviar e inspeccionar peticiones HTTP. Es la navaja suiza de los proxies HTTP: también puede funcionar como reverse proxy o transparente.

### Reverse proxy (proxy de entrada)

Es el **inverso** del forward proxy: en vez de filtrar lo que sale, filtra **lo que entra**. Escucha en una dirección y reenvía el tráfico hacia una red cerrada (por ejemplo, los servidores internos).

```text
Internet ──► [Reverse proxy / WAF] ──► [Servidores web internos]
```

Usos comunes:

- **Cloudflare:** tiene una red muy grande que aguanta la mayoría de los ataques **DDoS**. Las organizaciones lo ponen delante para filtrar cuánto y qué tráfico llega a sus servidores.
- **ModSecurity:** es un **WAF** (*Web Application Firewall*). Revisa cada petición web y la bloquea si es maliciosa. Un buen punto de partida para aprender es el **OWASP ModSecurity Core Rule Set**.
- Cloudflare también puede funcionar como WAF, pero para eso tiene que **descifrar el tráfico HTTPS**, y algunas organizaciones no quieren eso.

Uso ofensivo (pentesting):

- El pentester configura un reverse proxy en un **equipo comprometido**. Ese equipo escucha en un puerto y manda todo lo que se conecta de vuelta al atacante.
- Sirve para **esquivar firewalls** o **evitar el registro (logs)**.
- Ejemplo: la empresa tiene un **IDS** (*Intrusion Detection System*) mirando las peticiones web externas. Si el atacante entró por **SSH**, puede mandar las peticiones web dentro del **túnel SSH** y el IDS no las ve.

### Transparente vs no transparente

Cualquier proxy puede funcionar de una de estas dos formas:

- **Transparente:** el cliente **no sabe** que existe. El proxy intercepta sus pedidos a Internet y actúa en su lugar. Hacia afuera, se ve como el interlocutor.
- **No transparente:** el cliente **tiene que saber** que existe. Al equipo o al programa se le carga una **configuración de proxy** para que el tráfico vaya primero al proxy. Sin esa configuración no hay comunicación, y como el proxy suele ser el único camino hacia otras redes, **te quedás sin Internet**.

## Comandos y opciones

Esta sección es teórica. Las herramientas mencionadas (Burp Suite, Chisel, ptunnel, sshuttle, Sysmon) se usan en módulos posteriores.

## Diferencias que hay que recordar

| | Forward proxy | Reverse proxy |
|---|---|---|
| Qué filtra | Tráfico que **sale** | Tráfico que **entra** |
| Protege a | Los clientes internos | Los servidores |
| Ejemplos | Filtro web corporativo, Burp Suite | Cloudflare, ModSecurity (WAF) |

- **Proxy vs gateway:** el proxy **inspecciona** el contenido; el gateway solo lo deja pasar.
- **Proxy vs VPN:** una VPN cambia tu IP, pero no es técnicamente un proxy.
- **Transparente vs no transparente:** ¿el cliente sabe que el proxy existe o no?

## Ejemplos prácticos

- Tu navegador configurado para mandar todo a Burp Suite (`127.0.0.1:8080`): **forward proxy no transparente**.
- Una empresa que intercepta toda la navegación sin configurar nada en las PCs: **proxy transparente**.
- Una web protegida por Cloudflare: **reverse proxy** (y WAF si filtra ataques).

## Errores y precauciones

- No llamar "proxy" a cualquier cosa que cambie la IP.
- No confundir el reverse proxy (defensa, en la entrada) con usar un reverse proxy en un equipo comprometido (ataque, para pivotear).
- Usar un WAF en la nube con HTTPS implica que el proveedor ve el tráfico descifrado.

## Inglés técnico del módulo

- `mediator` → mediador, el que está en el medio y puede ver el tráfico.
- `gateway` → puerta de enlace; pasa el tráfico sin inspeccionarlo.
- `forward proxy` → proxy de salida.
- `reverse proxy` → proxy de entrada.
- `transparent proxy` → proxy que el cliente no ve.
- `proxy aware` → programa que sabe usar la configuración del proxy.
- `C2 (Command and Control)` → canal de órdenes del malware.
- `WAF (Web Application Firewall)` → firewall que analiza peticiones web.
- `IDS (Intrusion Detection System)` → sistema que detecta intrusiones.
- `pivoting` → usar un equipo comprometido para llegar a otras redes.
- `DDoS` → ataque de denegación de servicio distribuido.

## Lo que más costó

Forward vs reverse proxy aplicado a un caso real (quién es cuál y por qué) y la parte del C2 por DNS.

## Qué aprendí

Aprendí que un proxy es un mediador que puede inspeccionar el tráfico (si no, es un gateway) y que trabaja en la capa 7. Diferencié forward proxy (filtra lo que sale, como un filtro web o Burp), reverse proxy (filtra lo que entra, como Cloudflare o un WAF) y proxy transparente vs no transparente. También vi por qué un proxy corporativo frena malware y cómo se detecta un C2 por DNS.

## Para repasar o practicar

- Explicar con mis palabras proxy vs gateway vs VPN.
- Dibujar dónde va un forward proxy y dónde un reverse proxy.
- Configurar el navegador para usar Burp Suite y ver una petición interceptada.

## Cuestionario de repaso

_Respondido por Tano y corregido por la IA (cuestionario conjunto de 6 preguntas entre las secciones 4 y 5)._

1. ¿Qué tiene que poder hacer un equipo para ser un proxy y no un gateway? ¿En qué capa OSI trabajan casi siempre los proxies?
   - **Tano:** poder ver e inspeccionar el contenido del tráfico; capa 7.
   - **Corrección:** ✅ Correcto.
2. Una empresa obliga a sus PCs a salir a Internet por un filtro web y protege su página con Cloudflare. ¿Cuál es forward proxy y cuál reverse proxy? ¿Por qué?
   - **Tano:** copió la definición de forward proxy, sin decir cuál era cuál.
   - **Corrección:** ⚠️ Incompleta. El **filtro web es forward proxy**: filtra lo que **sale** de las PCs y protege a los clientes. **Cloudflare es reverse proxy**: filtra lo que **entra** hacia los servidores y los protege (DDoS, WAF).
3. ¿Por qué es poco probable que el malware funcione en una empresa que usa solo Firefox detrás de un proxy, y qué podría intentar el malware en su lugar?
   - **Tano:** usa libcurl y proxy aware.
   - **Corrección:** ⚠️ Bien encaminada, falta la mitad. Firefox no usa WinSock sino libcurl, así que el malware no queda proxy aware "gratis": tendría que buscar la configuración de proxy de Firefox, y casi nunca lo hace. En su lugar podría usar **DNS como C2**, que se detecta si la empresa monitorea DNS (por ejemplo con Sysmon).
