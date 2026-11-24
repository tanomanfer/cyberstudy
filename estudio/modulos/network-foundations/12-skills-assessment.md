# 12 de 12 — Skills Assessment

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

La evaluación aplicó fundamentos de red dentro del laboratorio autorizado de HTB. Se observaron loopback, interfaces, servicios locales, rutas, conexiones y una transferencia FTP. La práctica quedó terminada en la plataforma, aunque el manejo de terminal fue guiado y debe considerarse material de repaso, no una habilidad ya automatizada.

## Conceptos importantes

### Pwnbox, objetivo y VPN

Pwnbox es la máquina de trabajo basada en Parrot Linux. El `target` es otra máquina creada para el ejercicio. Cuando se usa un equipo propio, la VPN de HTB crea una interfaz y rutas que permiten alcanzar la red privada del laboratorio. Que un objetivo responda no demuestra por sí solo que toda la configuración esté correcta: conviene comprobar interfaz y ruta.

### Loopback y servicios locales

La red `127.0.0.0/8` está reservada para loopback IPv4; `127.0.0.1` representa al propio host. Un servicio en `localhost` solo es visible desde esa máquina, salvo que exista una configuración adicional de exposición o reenvío.

Un puerto identifica un servicio o proceso dentro del host. Herramientas como `ss`, `netstat` o `lsof` permiten observar qué proceso escucha localmente. En la evaluación se identificó el programa asociado al puerto solicitado dentro de Pwnbox.

### Interfaces y diagnóstico

`ifconfig` es una herramienta clásica para ver y configurar interfaces; actualmente `ip` suele ser la alternativa moderna. `netstat` muestra conexiones, tablas de rutas y estadísticas; `ss` es una alternativa moderna enfocada en sockets.

### FTP y canales separados

FTP usa un canal de control y otro de datos. En modo pasivo, el servidor anuncia una dirección y dos números; el puerto de datos se obtiene con `p1 × 256 + p2`. Ese puerto es temporal y debe utilizarse mientras el canal de control sigue abierto.

El comando FTP `GET` recupera un archivo. No deben guardarse en los apuntes credenciales, flags ni direcciones temporales del laboratorio.

## Comandos y opciones

```bash
ip address show lo
ip -brief address
ip route get IP_DEL_OBJETIVO
ss -ltnp
netstat -tulnp
nmap IP_DEL_OBJETIVO
nc IP_DEL_OBJETIVO 21
```

- `ip address show lo` inspecciona loopback.
- `ip -brief address` resume interfaces y direcciones.
- `ip route get` muestra la ruta elegida hacia un destino.
- `ss -ltnp` lista sockets TCP en escucha y, con permisos suficientes, procesos.
- `netstat -tulnp` es la variante clásica para TCP/UDP en escucha.
- `nmap` enumera puertos de un objetivo autorizado.
- `nc` permite una conexión TCP manual para observar un protocolo de texto.

En FTP manual, `USER`, `PASS` y `PASV` pertenecen al canal de control. El puerto pasivo anunciado vence o deja de servir si se cierra la sesión.

## Diferencias que hay que recordar

- **localhost vs target:** localhost es la máquina actual; target es la máquina remota del ejercicio.
- **Pwnbox vs equipo propio:** son hosts diferentes y no muestran los mismos procesos locales.
- **ifconfig vs ip:** `ifconfig` es clásico; `ip` es la herramienta moderna de `iproute2`.
- **netstat vs ss:** `netstat` es clásico y amplio; `ss` es la alternativa moderna para sockets.
- **canal de control vs canal de datos FTP:** las órdenes viajan por uno y los archivos por otro.
- **modo activo vs pasivo:** cambia quién inicia la conexión de datos; el modo pasivo facilita atravesar NAT y firewalls del cliente.

## Ejemplos prácticos

```bash
ip route get 10.129.X.X
```

La salida esperada indica una interfaz después de `dev`. La IP es temporal y debe reemplazarse por el objetivo activo.

```text
227 Entering Passive Mode (...,p1,p2)
puerto = p1 × 256 + p2
```

El cálculo solo sirve para esa respuesta reciente y mientras la conexión de control permanezca activa.

## Errores y precauciones

- Ejecutar una comprobación de `localhost` en la PC propia no inspecciona Pwnbox.
- No publicar archivos `.ovpn`, credenciales ni flags.
- Trabajar únicamente contra objetivos autorizados por HTB.
- Un `Connection refused` en el puerto pasivo puede indicar que venció o que se cerró el canal de control.
- No reutilizar IP o puerto de una instancia anterior.
- El ejercicio HTTP opcional no es necesario para documentar los fundamentos ni se guarda como solución protegida.

## Inglés técnico del módulo

- `loopback` → comunicación del host consigo mismo.
- `listening port` → puerto donde un programa espera conexiones.
- `network interface` → interfaz por la que un host se conecta a una red.
- `routing table` → tabla usada para decidir la salida del tráfico.
- `socket` → extremo de comunicación identificado por protocolo, dirección y puerto.
- `passive mode` → modo FTP donde el servidor anuncia un puerto de datos.
- `retrieve a file` → recuperar o descargar un archivo.
- `connection refused` → el destino rechazó la conexión, normalmente porque no hay escucha disponible.

## Lo que más costó

La parte de terminal en Pwnbox y FTP fue guiada. Costó separar Pwnbox del objetivo, mantener abierto el canal de control y usar a tiempo el puerto pasivo. La plataforma dio por terminada la evaluación, pero estos comandos quedan marcados como observados y para practicar nuevamente, sin exigir repetir ahora el laboratorio.

## Qué aprendí

Reconocí loopback, interfaces, rutas, puertos y procesos locales, y entendí la separación entre control y datos en FTP. También entendí por qué Pwnbox, mi computadora y el target no son la misma máquina.

## Para repasar o practicar

- Ejecutar `ip address`, `ip route` y `ss` en un entorno propio seguro.
- Diferenciar Pwnbox, VPN y target sin depender de una captura.
- Repetir una conexión FTP pasiva en un laboratorio autorizado.
- Comparar `ifconfig`/`ip` y `netstat`/`ss`.
- Practicar terminal con calma; esta evaluación fue asistida.

## Cuestionario de repaso

1. ¿Para qué se utiliza loopback? — **Respuesta:** Para que un host envíe y reciba tráfico consigo mismo.
2. ¿Por qué `localhost` en la PC propia no muestra los servicios de Pwnbox? — **Respuesta:** Porque localhost siempre representa el host donde se ejecuta el comando.
3. ¿Qué comprueba `ip route get DESTINO`? — **Respuesta:** La ruta y la interfaz que el sistema elegiría hacia ese destino.
4. ¿Qué diferencia general existe entre `netstat` y `ss`? — **Respuesta:** `netstat` es la herramienta clásica; `ss` es la alternativa moderna centrada en sockets.
5. ¿Cómo se calcula el puerto anunciado por FTP pasivo? — **Respuesta:** `p1 × 256 + p2`.
6. ¿Qué comando del cliente FTP recupera un archivo? — **Respuesta:** `GET`.
