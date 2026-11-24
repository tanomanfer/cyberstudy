# 4 de 12 — Network Communication

**Estado:** Repasar
**Progreso de la sección:** 100%
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Para que dos aplicaciones se comuniquen, la red necesita identificar tres cosas distintas: la interfaz local mediante una dirección **MAC**, el equipo o destino lógico mediante una dirección **IP**, y el servicio o proceso mediante un **puerto**. Cada dato cumple una función diferente y trabaja en una capa distinta.

Al abrir una página web, el equipo primero resuelve el nombre con DNS, obtiene la IP del servidor y prepara el envío. Si el destino está fuera de la red local, la trama se entrega a la MAC del gateway; el paquete conserva como destino la IP del servidor remoto.

## Conceptos importantes

### Dirección MAC

La MAC identifica una interfaz dentro del enlace local. Los switches la utilizan para entregar tramas dentro de la LAN. No sirve para encaminar tráfico por todo Internet y puede cambiar en cada salto porque cada enlace crea una trama nueva.

### Dirección IP

La IP es una dirección lógica usada para localizar equipos y encaminar paquetes entre redes. Los routers observan la IP de destino y deciden el siguiente salto. En un acceso a Internet, la IP de destino corresponde al servidor remoto aunque la primera trama local se dirija al router.

### Puertos

Los puertos identifican servicios o procesos dentro de un host. HTTPS utiliza habitualmente el puerto de destino `443`. El cliente usa un puerto temporal o **ephemeral port**, que permite al sistema operativo reconocer a qué conexión debe entregar la respuesta.

### ARP y gateway

ARP relaciona una dirección IPv4 local con una dirección MAC. Si el destino está en la misma LAN, el equipo busca la MAC del destinatario. Si está en otra red, busca la MAC del **default gateway**, no la MAC del servidor remoto.

### DNS

DNS traduce un nombre como `example.com` a una dirección IP. En una sesión web iniciada escribiendo un dominio, la consulta DNS ocurre antes de poder enviar la solicitud al servidor por su IP.

## Comandos y opciones

Esta sección es conceptual y no exige comandos. Más adelante `ip`, `arp` o `ip neigh`, `ss`, `dig` y `tcpdump` permiten observar direcciones, vecinos, puertos, DNS y tráfico real.

## Diferencias que hay que recordar

- **MAC vs IP:** MAC entrega una trama en el enlace local; IP identifica y encamina el paquete entre redes.
- **IP vs puerto:** IP identifica el host o interfaz lógica; el puerto identifica el servicio o proceso.
- **Switch vs router:** el switch trabaja localmente con MAC; el router conecta redes usando IP.
- **IP remota vs MAC de destino local:** al salir de la LAN, el paquete apunta a la IP remota, pero la trama apunta a la MAC del gateway.
- **Puerto de servidor vs puerto efímero:** el servidor escucha en un puerto conocido; el cliente usa uno temporal para asociar la respuesta con su conexión.

## Ejemplos prácticos

Al visitar `https://example.com`:

1. DNS obtiene la IP del servidor.
2. El navegador abre una conexión desde un puerto temporal hacia el puerto `443`.
3. El equipo detecta que la IP está fuera de su LAN.
4. ARP obtiene la MAC del gateway.
5. La trama local se dirige al gateway y contiene el paquete destinado al servidor remoto.
6. Los routers encaminan el paquete hasta el servidor y la respuesta vuelve al puerto temporal del cliente.

## Errores y precauciones

- No buscar mediante ARP la MAC de un servidor que está en Internet.
- No confundir el puerto físico de un switch con un puerto lógico TCP o UDP.
- No afirmar que la MAC identifica al destino durante todo el recorrido; solo vale para el enlace actual.
- No confundir DNS, que resuelve nombres, con ARP, que relaciona IPv4 y MAC dentro de la LAN.

## Inglés técnico del módulo

- `MAC address` → identificador de una interfaz en el enlace local.
- `IP address` → dirección lógica usada para localizar y encaminar.
- `port` → identificador lógico de un servicio o proceso.
- `default gateway` → router utilizado para alcanzar otras redes.
- `ARP` → protocolo que relaciona IPv4 con MAC en la LAN.
- `DNS lookup` → consulta para convertir un nombre en una IP.
- `ephemeral port` → puerto temporal elegido para una conexión del cliente.

## Lo que más costó

El cuestionario quedó 3/6. Hay que reforzar la diferencia entre switch/MAC y router/IP, recordar que al salir de la LAN se obtiene la MAC del gateway y comprender que el puerto temporal del cliente permite entregar la respuesta a la conexión correcta.

## Qué aprendí

Entendí que MAC, IP y puerto no compiten: identifican niveles distintos de la comunicación. También entendí que ARP busca al siguiente salto local y que DNS debe resolver el nombre antes de iniciar una comunicación web por IP.

## Para repasar o practicar

- Dibujar un paquete hacia Internet dentro de una trama dirigida al gateway.
- Explicar qué información usa un switch y cuál usa un router.
- Diferenciar DNS de ARP.
- Explicar para qué sirve el puerto temporal del cliente.
- Recordar que HTTPS usa habitualmente el puerto 443.

## Cuestionario de repaso

1. ¿Qué dirección usa principalmente un switch para entregar una trama en la LAN? — **Respuesta:** La dirección MAC.
2. ¿Qué dirección utiliza un router para encaminar entre redes? — **Respuesta:** La dirección IP.
3. Si el servidor está en Internet, ¿qué dirección MAC busca el cliente mediante ARP? — **Respuesta:** La MAC de su default gateway.
4. ¿Para qué sirve un puerto lógico? — **Respuesta:** Para identificar el servicio o proceso dentro de un host.
5. ¿Para qué usa el cliente un puerto efímero? — **Respuesta:** Para que el sistema operativo asocie la respuesta con la conexión o aplicación correcta.
6. ¿Cuál suele ser el primer paso al navegar escribiendo un dominio? — **Respuesta:** Una consulta DNS para obtener la dirección IP.
