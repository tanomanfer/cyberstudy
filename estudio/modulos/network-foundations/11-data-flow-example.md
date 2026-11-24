# 11 de 12 — Data Flow Example

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Esta sección conecta los temas anteriores siguiendo el recorrido completo desde que una notebook se une a Wi-Fi y escribe una dirección web hasta que recibe la respuesta. Cada protocolo resuelve una parte distinta del viaje.

## Conceptos importantes

### Del Wi-Fi a la configuración IP

El dispositivo encuentra el `SSID`, se autentica con WPA2/WPA3 y se asocia al punto de acceso. Luego DHCP le entrega una dirección IP, máscara, gateway predeterminado y servidor DNS. Sin esos datos podría estar conectado al Wi-Fi, pero no necesariamente comunicarse correctamente fuera de la red local.

### DNS y preparación del tráfico

DNS traduce el nombre del sitio a una dirección IP. El sistema construye los datos de aplicación y los encapsula: segmento de transporte, paquete IP y trama de enlace. Para una dirección remota, ARP no busca la MAC del servidor de Internet; obtiene la MAC del gateway local.

### Router, NAT e Internet

El router recibe la trama, examina el paquete IP y decide el siguiente salto. En una red doméstica, NAT/PAT reemplaza la dirección privada de origen por la pública y registra la traducción para que la respuesta pueda volver al dispositivo correcto.

### Respuesta y desencapsulación

El servidor procesa la solicitud y devuelve una respuesta. En el regreso, los routers encaminan paquetes, el router doméstico revierte la traducción y el cliente desencapsula trama, paquete y segmento hasta entregar los datos al navegador.

## Comandos y opciones

```bash
ip address
ip route
ip neigh
```

`ip address` muestra direcciones asignadas; `ip route` permite identificar el gateway y las rutas; `ip neigh` muestra vecinos de la red local aprendidos mediante ARP o mecanismos equivalentes. Son observaciones parciales: una sola orden no muestra todo el recorrido de extremo a extremo.

## Diferencias que hay que recordar

- **Asociación Wi-Fi vs DHCP:** una conecta al medio inalámbrico; la otra entrega configuración IP.
- **DNS vs ARP:** DNS relaciona nombres con IP; ARP relaciona una IPv4 local con una MAC.
- **MAC vs IP:** la MAC sirve para el salto local; la IP identifica el destino a través de redes.
- **Routing vs NAT:** routing decide por dónde enviar; NAT modifica direcciones o puertos y conserva una traducción.
- **Encapsulación vs desencapsulación:** una agrega cabeceras para transmitir; la otra las procesa y retira al recibir.

## Ejemplos prácticos

```text
Notebook → Wi-Fi → DHCP → DNS → encapsulación → ARP del gateway
→ router/NAT → Internet → servidor web → respuesta → desencapsulación
```

Si el sitio está fuera de la LAN, la trama sale con la MAC del gateway como destino local, mientras el paquete conserva como destino la IP del servidor remoto.

## Errores y precauciones

- Tener Wi-Fi no garantiza tener Internet.
- ARP no descubre la MAC de un servidor remoto a través de Internet.
- NAT no sustituye a un firewall.
- DNS resuelve nombres, pero no transporta la página web.
- Las direcciones MAC cambian en cada salto de enlace; las IP de extremo a extremo siguen otra lógica, salvo traducciones como NAT.

## Inglés técnico del módulo

- `data flow` → recorrido de los datos entre origen y destino.
- `wireless association` → asociación del dispositivo con el punto de acceso.
- `default gateway` → router utilizado para llegar a otras redes.
- `encapsulation` → agregado de cabeceras por capas.
- `next hop` → siguiente dispositivo al que se entrega el paquete.
- `decapsulation` → procesamiento y retiro de cabeceras al recibir.

## Lo que más costó

La sección quedó aprobada 3/3 en el repaso propio. Los puntos clave fueron identificar DHCP después de conectarse al Wi-Fi, comprender que la trama hacia Internet usa la MAC del router y reconocer a NAT en la salida de la red privada.

## Qué aprendí

Puedo seguir el viaje de una solicitud web desde la conexión Wi-Fi hasta el servidor y explicar qué aportan DHCP, DNS, ARP, encapsulación, routing y NAT.

## Para repasar o practicar

- Dibujar el recorrido sin mirar el apunte.
- Explicar qué direcciones cambian en cada salto.
- Diferenciar estar conectado al Wi-Fi de tener configuración IP y salida a Internet.
- Reconocer dónde intervienen DHCP, DNS, ARP y NAT.

## Cuestionario de repaso

1. ¿Qué protocolo entrega IP, máscara, gateway y DNS al cliente? — **Respuesta:** DHCP.
2. ¿Qué servicio traduce el nombre del sitio a una dirección IP? — **Respuesta:** DNS.
3. Para un servidor remoto, ¿qué MAC utiliza la trama al salir de la LAN? — **Respuesta:** La MAC del gateway predeterminado.
4. ¿Qué diferencia hay entre routing y NAT? — **Respuesta:** Routing decide el camino; NAT traduce direcciones o puertos.
5. ¿En qué orden general se encapsulan los datos? — **Respuesta:** Datos, segmento, paquete, trama y bits.
6. ¿Qué ocurre al llegar la respuesta al cliente? — **Respuesta:** Se desencapsula hasta entregar los datos a la aplicación.
