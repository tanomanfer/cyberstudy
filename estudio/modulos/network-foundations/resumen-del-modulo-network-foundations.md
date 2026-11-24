# Resumen del módulo: Network Foundations

**Estado:** Completado
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy
**Cobertura:** 12 de 12 secciones

## Visión general

Una red permite que dispositivos intercambien datos mediante reglas comunes. El módulo conecta los elementos físicos y lógicos de ese proceso: tipos de red, modelos por capas, switches y routers, direcciones MAC e IP, puertos, DHCP, NAT, DNS, arquitecturas de Internet, Wi-Fi, seguridad y diagnóstico básico.

La idea central es seguir el recorrido completo de los datos. Una aplicación genera información; las capas agregan cabeceras; la trama viaja al siguiente salto; routers encaminan el paquete; servicios como DNS, DHCP y NAT resuelven necesidades específicas; el destino desencapsula y responde.

## 1. Alcance y tipos de red

Una LAN conecta dispositivos en un área limitada. Una WAN enlaza redes a mayor distancia y un ISP proporciona conectividad hacia Internet. Tener conexión local no garantiza salida a Internet: los equipos de una casa pueden seguir comunicándose aunque falle el ISP.

La comunicación puede ser `simplex`, `half-duplex` o `full-duplex`. En half-duplex ambos extremos transmiten, pero no al mismo tiempo; un walkie-talkie es el ejemplo típico.

## 2. Capas y encapsulación

Los modelos OSI y TCP/IP separan responsabilidades para que tecnologías diferentes puedan interoperar. No son solo listas para memorizar: cada capa resuelve un problema.

```text
datos → segmento → paquete → trama → bits
```

Transporte usa puertos para llegar a la aplicación correcta; red usa direcciones IP y routing; enlace usa tramas y MAC para el salto local; la capa física transmite bits.

## 3. Switches, routers y direcciones

Un switch reenvía tramas dentro de la LAN según direcciones MAC. Un router conecta redes y decide rutas según direcciones IP. Cuando el destino está fuera de la LAN, el equipo no busca la MAC del servidor remoto: usa ARP para conocer la MAC del gateway.

La MAC identifica una interfaz dentro del enlace local; la IP permite direccionamiento entre redes; el puerto identifica un servicio o proceso. Un cliente suele utilizar un puerto efímero para distinguir su conexión.

## 4. DHCP, NAT y DNS

DHCP automatiza la configuración mediante DORA: Discover, Offer, Request y Acknowledge. Entrega una concesión temporal con IP, máscara, gateway y DNS.

NAT traduce direcciones; PAT o NAT Overload permite que muchos equipos privados compartan una IP pública mediante puertos. Port forwarding habilita tráfico entrante hacia un servicio interno, pero NAT no debe confundirse con un firewall.

DNS relaciona nombres con información como direcciones IP. Primero se consulta la caché; si hace falta, un resolvedor recursivo sigue la jerarquía root, TLD y servidor autoritativo. El root normalmente orienta hacia el TLD, no entrega la IP final.

## 5. Arquitecturas y redes inalámbricas

P2P distribuye recursos entre pares; client-server centraliza servicios. Two-tier comunica presentación y datos directamente, mientras three-tier agrega una capa de aplicación. Una arquitectura híbrida puede usar coordinación central y transferencia entre pares. Cloud ofrece recursos virtualizados bajo demanda. SDN separa el control plane, que decide, del data plane, que reenvía.

Un router inalámbrico doméstico combina routing y punto de acceso. Un hotspot comparte `Cellular Data` 4G/5G mediante Wi-Fi. En general, 2.4 GHz ofrece más alcance y penetración; 5 GHz ofrece más capacidad a menor distancia. Las redes celulares usan torres, celdas, backhaul y controladores como el `Base Station Controller`.

## 6. Seguridad de red

La tríada CIA guía la protección: confidencialidad, integridad y disponibilidad. Firewalls aplican reglas; IDS detecta y alerta; IPS detecta y puede bloquear. Las firmas reconocen patrones conocidos y las anomalías buscan desviaciones. Defensa en profundidad combina controles para que una sola falla no comprometa todo.

## 7. Recorrido de una solicitud web

```text
Wi-Fi → DHCP → DNS → encapsulación → ARP del gateway
→ router/NAT → Internet → servidor → respuesta → desencapsulación
```

Este recorrido permite ubicar cada concepto: Wi-Fi da acceso al medio; DHCP configura; DNS resuelve el nombre; ARP encuentra la MAC local; el router encamina; NAT traduce; TCP/UDP usa puertos; el servidor responde.

## 8. Herramientas observadas

```bash
ip address
ip route
ip neigh
ss -ltnp
netstat -tulnp
nmap IP_AUTORIZADA
nc IP_AUTORIZADA PUERTO
```

`ip` inspecciona interfaces, rutas y vecinos; `ss` y `netstat` observan sockets; `nmap` enumera puertos de objetivos autorizados; `nc` permite hablar manualmente con servicios de texto. `ifconfig` y `netstat` son herramientas clásicas; `ip` y `ss` son alternativas modernas.

En FTP, control y datos usan conexiones separadas. En modo pasivo, el puerto anunciado se calcula como `p1 × 256 + p2` y es temporal. `GET` recupera un archivo.

## Diferencias esenciales

- Switch/MAC opera en el salto local; router/IP conecta redes.
- DNS resuelve nombre a IP; ARP resuelve IPv4 local a MAC.
- DHCP entrega configuración; NAT traduce direcciones y puertos.
- IDS alerta; IPS puede bloquear.
- P2P distribuye; client-server centraliza; híbrida combina ambos.
- Wi-Fi es acceso inalámbrico local; Cellular Data proviene de la red móvil.
- Pwnbox es el host de trabajo; target es el objetivo autorizado; localhost siempre es la máquina actual.

## Precauciones

- No asumir que Wi-Fi equivale a Internet.
- No tratar NAT como firewall.
- No escanear sistemas sin autorización.
- No guardar ni compartir VPN, credenciales o flags.
- No reutilizar IP y puertos temporales de laboratorios anteriores.
- Una herramienta o capa no explica por sí sola todo el flujo.

## Qué aprendí

Puedo explicar cómo se conectan dispositivos, cómo viajan los datos dentro y fuera de una LAN y qué funciones cumplen DHCP, NAT, DNS, Wi-Fi, routing y los controles de seguridad. También reconozco herramientas básicas de diagnóstico, aunque la terminal de Pwnbox y FTP necesitan más práctica guiada.

## Para repasar o practicar

- Encapsulación y recorrido completo de una solicitud.
- Switch/MAC frente a router/IP y MAC del gateway.
- Puerto efímero del cliente.
- Arquitectura híbrida frente a two-tier.
- Vocabulario `Cellular Data` y `Base Station Controller`.
- Uso práctico de `ip`, `ss`, `netstat`, `nmap`, `nc` y FTP pasivo en laboratorios autorizados.
- Las secciones 1, 2 y 4 continúan señaladas para repaso conceptual; la práctica de la sección 12 fue asistida.
