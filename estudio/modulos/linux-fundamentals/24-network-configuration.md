# 24 de 30 — Network Configuration

**Estado:** Completado  
**Observación:** Requiere repaso; varios conceptos todavía no quedaron completamente claros.  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

Configurar una red en Linux significa administrar las interfaces, direcciones IP, máscaras, rutas, gateway y servidores DNS que permiten comunicarse con otros equipos. Para resolver problemas no alcanza con saber comandos de memoria: hay que comprender qué función cumple cada capa y comprobarlas en orden.

```text
Aplicación o servicio
        ↓
Nombre DNS → dirección IP
        ↓
Tabla de rutas → interfaz y gateway
        ↓
Interfaz física o virtual
        ↓
Red local → router → otras redes o Internet
```

En ciberseguridad esto permite reconocer redes, preparar laboratorios, detectar servicios expuestos, diagnosticar por qué no se alcanza un objetivo y comprender cómo viaja el tráfico.

## Conceptos básicos

### Interfaz de red

Una interfaz es el punto mediante el cual Linux envía y recibe tráfico. Puede ser:

- Física: Ethernet o Wi-Fi.
- Loopback: comunicación interna del propio equipo.
- Virtual: Docker, VPN, bridge, túnel o máquina virtual.

Nombres encontrados en PerlaNegra:

```text
enp10s0          Ethernet por cable
wlan0            Wi-Fi
lo               loopback
docker0          bridge predeterminado de Docker
br-...           bridges creados por redes Docker/Compose
veth...          extremos virtuales que conectan contenedores con bridges
```

### Dirección IP

Una dirección identifica una interfaz dentro de una red:

```text
enp10s0 → 192.168.1.37
wlan0   → 192.168.0.34
lo      → 127.0.0.1
```

`127.0.0.1` es loopback: siempre representa la propia computadora. No permite llegar directamente desde otro equipo.

### Máscara y prefijo CIDR

El prefijo indica qué parte identifica la red. Por ejemplo:

```text
192.168.1.37/24
```

`/24` equivale a la máscara `255.255.255.0`. En este caso:

```text
Red:       192.168.1.0
Hosts:     normalmente 192.168.1.1 a 192.168.1.254
Broadcast: 192.168.1.255
```

La máscara permite decidir si el destino está en la misma red local o si debe enviarse al gateway.

### Gateway predeterminado

El gateway es el router al que se envía tráfico destinado a otras redes:

```text
Equipo → gateway → Internet u otra red
```

Una ruta puede mostrar:

```text
default via 192.168.1.1 dev enp10s0
```

- `default`: destinos sin una ruta más específica.
- `via 192.168.1.1`: siguiente salto o router.
- `dev enp10s0`: interfaz de salida.

### DHCP

DHCP asigna automáticamente configuración de red, normalmente:

- Dirección IP.
- Prefijo o máscara.
- Gateway.
- Servidores DNS.
- Tiempo de concesión.

La palabra `proto dhcp` en una ruta indica que fue aprendida mediante DHCP.

### DNS

DNS traduce nombres a direcciones:

```text
example.com → dirección IP
```

Tener conectividad IP no garantiza que DNS funcione. Es posible llegar a `1.1.1.1` y, al mismo tiempo, no poder resolver `example.com`.

## La red real de PerlaNegra

La tabla de rutas mostró dos conexiones activas:

```text
default via 192.168.1.1 dev enp10s0 src 192.168.1.37 metric 100
default via 192.168.0.1 dev wlan0   src 192.168.0.34 metric 600
```

Mapa simplificado:

```text
Internet
├── router 192.168.1.1
│   └── cable enp10s0: 192.168.1.37, métrica 100
└── router 192.168.0.1
    └── Wi-Fi wlan0: 192.168.0.34, métrica 600
```

Linux suele preferir la ruta con menor métrica:

```text
Cable: 100 → preferida
Wi-Fi: 600 → alternativa
```

Esto no significa que toda consulta deba usar forzosamente el mismo DNS o que la segunda interfaz esté apagada. Ambas conexiones pueden estar activas; la tabla de rutas decide por dónde enviar cada destino.

Para consultar la decisión concreta del kernel:

```bash
ip route get 8.8.8.8
```

La respuesta muestra gateway, interfaz y dirección de origen seleccionada.

## Redes Docker observadas

La tabla también contenía:

```text
172.17.0.0/16 dev docker0          src 172.17.0.1
172.18.0.0/16 dev br-3f8a6c1b9168 src 172.18.0.1
172.19.0.0/16 dev br-...           src 172.19.0.1 linkdown
```

Docker crea redes privadas y bridges:

```text
contenedor ← veth → bridge Docker ← host ← interfaz física → red exterior
```

- `docker0` es el bridge predeterminado.
- `br-...` suele corresponder a una red creada por Docker Compose.
- `veth...` es un extremo de cable virtual.
- `linkdown` indica que ese enlace no está operativo en ese momento; puede existir una red sin contenedores activos conectados.

La dirección `172.17.0.1` apareció en los logs de Nginx porque era el host visto desde la red Docker.

NetworkManager mostró las `veth` como `sin gestión`: es normal porque Docker, no NetworkManager, administra esas interfaces.

## Herramientas modernas y antiguas

HTB muestra herramientas que todavía pueden encontrarse, pero varias fueron reemplazadas:

| Herramienta antigua | Alternativa moderna |
|---|---|
| `ifconfig` | `ip address`, `ip link` |
| `route` | `ip route` |
| `netstat` | `ss` |
| edición directa de `/etc/resolv.conf` | NetworkManager o `systemd-resolved` |

No es incorrecto reconocer `ifconfig` o `netstat`, pero para sistemas actuales conviene aprender primero `ip` y `ss`.

## Consultar interfaces

```bash
ip address
ip addr
ip -brief address
ip link
```

- `ip address`: direcciones y datos completos.
- `ip -brief address`: resumen legible.
- `ip link`: estado de interfaces en la capa de enlace.

Campos frecuentes:

- `UP`: interfaz habilitada administrativamente.
- `LOWER_UP`: existe enlace en la capa inferior.
- `state UP`: está operativa.
- `mtu 1500`: tamaño máximo habitual de trama IP sin fragmentar.
- `link/ether`: dirección MAC de Ethernet.
- `inet`: dirección IPv4.
- `inet6`: dirección IPv6.

Ayuda:

```bash
ip --help
ip address help
ip link help
```

## Activar o desactivar interfaces

Comando moderno:

```bash
sudo ip link set INTERFAZ up
sudo ip link set INTERFAZ down
```

Ejemplo del módulo:

```bash
sudo ip link set eth0 up
```

En PerlaNegra la interfaz real no se llama necesariamente `eth0`; se observó `enp10s0`. Copiar un nombre de ejemplo sin comprobarlo puede cortar la conexión equivocada.

Estas modificaciones son temporales y pueden ser reemplazadas por NetworkManager. No se practicaron sobre la interfaz real para evitar perder conectividad.

## Direcciones y rutas con `ip`

Asignación temporal conceptual:

```bash
sudo ip address add 192.168.50.10/24 dev INTERFAZ
```

Eliminarla:

```bash
sudo ip address del 192.168.50.10/24 dev INTERFAZ
```

Agregar una ruta predeterminada conceptual:

```bash
sudo ip route add default via 192.168.50.1 dev INTERFAZ
```

Estos comandos cambian la red inmediatamente. No deben ejecutarse sobre PerlaNegra sin un plan, porque una IP duplicada, máscara incorrecta o gateway equivocado puede dejarla sin red.

Consultas seguras:

```bash
ip route
ip route get 1.1.1.1
ip neigh
```

- `ip route`: tabla de rutas.
- `ip route get`: decisión para un destino concreto.
- `ip neigh`: vecinos conocidos, equivalente moderno relacionado con ARP/NDP.

## Configuración persistente en CachyOS

HTB utiliza `/etc/network/interfaces`, habitual en determinados sistemas Debian/Ubuntu. PerlaNegra utiliza NetworkManager:

```bash
nmcli device status
nmcli connection show
nmcli device show INTERFAZ
```

En PerlaNegra se observaron:

```text
enp10s0 → Conexión cableada 1
wlan0   → PERLANEGRA33
```

Las configuraciones persistentes deben realizarse sobre el perfil de NetworkManager, no copiando `/etc/network/interfaces`.

Antes de cambiar un perfil:

```bash
nmcli --help
nmcli connection help
nmcli device help
```

No se modificó ninguna conexión durante el módulo.

## DNS en PerlaNegra

`/etc/resolv.conf` mostró:

```text
# Generated by NetworkManager
nameserver 127.0.0.53
```

`127.0.0.53` es un resolvedor local de `systemd-resolved`. Las consultas se reciben localmente y se reenvían a los DNS configurados para los enlaces.

`resolvectl status` mostró DNS entregados por la red y servidores de respaldo como Quad9, Cloudflare y Google.

No conviene editar `/etc/resolv.conf` directamente porque NetworkManager o `systemd-resolved` pueden regenerarlo. Consultas seguras:

```bash
resolvectl status
resolvectl query example.com
nmcli device show wlan0
```

## Diagnóstico por capas

El procedimiento recomendado es:

```text
1. ¿Existe la interfaz y está activa?
2. ¿Tiene una dirección correcta?
3. ¿Existe ruta hacia el destino?
4. ¿Responde el gateway local?
5. ¿Se alcanza una IP externa?
6. ¿DNS resuelve nombres?
7. ¿El puerto y servicio final responden?
```

### Paso 1: interfaz

```bash
ip -brief address
nmcli device status
```

### Paso 2: rutas

```bash
ip route
ip route get 1.1.1.1
```

### Paso 3: gateway

```bash
ping -c 3 192.168.1.1
```

### Paso 4: conectividad IP externa

```bash
ping -c 3 1.1.1.1
```

### Paso 5: DNS

```bash
resolvectl query example.com
ping -c 3 example.com
```

### Paso 6: servicio

```bash
curl -I https://example.com
```

Interpretación:

```text
No responde gateway
→ revisar interfaz, enlace, cable, Wi-Fi o router.

Gateway responde pero no se alcanza 1.1.1.1
→ revisar ruta, firewall, router o proveedor.

1.1.1.1 responde pero no resuelve example.com
→ problema de DNS.

El nombre resuelve pero el servicio no abre
→ revisar puerto, firewall, aplicación o ruta específica.
```

## `ping`

`ping` envía mensajes ICMP Echo Request y mide respuestas:

```bash
ping -c 4 8.8.8.8
```

- `-c 4`: enviar cuatro solicitudes y finalizar.
- `icmp_seq`: número de secuencia.
- `ttl`: saltos restantes del paquete recibido.
- `time`: latencia de ida y vuelta.
- `packet loss`: porcentaje perdido.

Que un host no responda ping no demuestra que esté apagado: ICMP puede estar filtrado. Del mismo modo, que responda ping no garantiza que un servicio concreto funcione.

Ayuda:

```bash
ping --help
man ping
```

## `traceroute` y TTL

`traceroute` intenta mostrar los saltos hacia un destino utilizando valores TTL crecientes:

```bash
traceroute example.com
```

Cada router reduce el TTL. Cuando llega a cero, puede responder y revelar ese salto.

Tres asteriscos:

```text
* * *
```

no significan automáticamente que la ruta esté rota. El router puede filtrar o no priorizar esas respuestas mientras continúa reenviando tráfico.

Alternativas y ayuda:

```bash
tracepath example.com
traceroute --help
```

## Sockets y puertos con `ss`

`ss` reemplaza gran parte del uso cotidiano de `netstat`:

```bash
sudo ss -ltnp
sudo ss -lunp
ss -tunap
```

- `-l`: sockets en escucha.
- `-t`: TCP.
- `-u`: UDP.
- `-n`: números sin traducir servicios.
- `-a`: todos los estados.
- `-p`: proceso asociado, cuando los permisos lo permiten.

Ejemplo conceptual:

```text
127.0.0.1:8082 → servicio accesible solamente en el host
0.0.0.0:3000   → escucha en todas las interfaces IPv4
[::]:3000      → escucha en IPv6; según configuración puede aceptar también IPv4
```

Ayuda:

```bash
ss --help | grep -i listening
ss --help | grep -i process
```

## `lsof`

En Linux los sockets se representan mediante descriptores, por lo que `lsof` puede relacionar procesos con conexiones:

```bash
sudo lsof -i
sudo lsof -iTCP -sTCP:LISTEN -nP
sudo lsof -i :8082
```

- `-i`: recursos de red.
- `-n`: no resolver nombres DNS.
- `-P`: no traducir números de puerto a nombres de servicios.

## Monitoreo de red

Herramientas mencionadas:

- `syslog`/`rsyslog`: recepción y almacenamiento de registros.
- `ss`: sockets y conexiones.
- `lsof`: archivos y sockets abiertos por procesos.
- `tcpdump`: captura de paquetes en terminal.
- Wireshark: captura y análisis gráfico.
- `tshark`: versión de terminal de Wireshark.
- ELK: centralización, búsqueda y visualización de logs.

Capturar tráfico puede exponer credenciales, tokens y datos personales. Sólo debe hacerse en sistemas y redes propias o con autorización explícita.

## Modelos de control de acceso

HTB los presenta dentro de NAC, aunque DAC, MAC y RBAC son modelos generales de control de acceso, no solamente herramientas de configuración de red.

### DAC — Discretionary Access Control

El propietario decide permisos:

```text
chmod, chown, permisos usuario/grupo/otros
```

Ejemplo: Tano es propietario de un archivo y decide quién puede leerlo.

### MAC — Mandatory Access Control

Una política central impone reglas incluso por encima de permisos tradicionales:

```text
SELinux o AppArmor
```

Aquí `MAC` significa **Mandatory Access Control**, no dirección MAC de red. Son dos conceptos distintos con la misma sigla.

### RBAC — Role-Based Access Control

Los permisos se asignan a roles:

```text
Analista SOC → leer alertas
Administrador → modificar configuración
Auditor → consultar registros sin alterar
```

Los usuarios reciben permisos a través de su rol, facilitando la administración en organizaciones grandes.

### NAC — Network Access Control

NAC busca decidir qué usuarios o dispositivos pueden entrar a una red según identidad, postura de seguridad y políticas. Puede considerar autenticación, certificados, estado del dispositivo, VLAN y rol.

No hay que confundir:

```text
NAC  → acceso a la red
DAC/MAC/RBAC → modelos generales para decidir acceso a recursos
```

## SELinux y AppArmor

Ambos son sistemas de Mandatory Access Control basados en Linux Security Modules.

### SELinux

- Usa etiquetas y políticas.
- Ofrece control muy granular.
- Es común en Fedora, RHEL y derivados.
- Modos habituales: enforcing, permissive y disabled.

### AppArmor

- Usa perfiles asociados a rutas y aplicaciones.
- Suele resultar más directo para comenzar.
- Es común en Ubuntu y otras distribuciones.
- Perfiles en modo enforce o complain.

Comparación simplificada:

| SELinux | AppArmor |
|---|---|
| Basado principalmente en etiquetas/contextos | Basado principalmente en rutas y perfiles |
| Muy granular | Generalmente más sencillo de leer |
| Curva de aprendizaje mayor | Curva inicial menor |

Ninguno reemplaza permisos Unix, firewall, actualizaciones o configuración segura. Añaden otra capa para limitar el daño si un proceso es comprometido.

No se instalaron ni reconfiguraron sobre PerlaNegra. HTB recomienda correctamente practicar estas políticas en una VM con snapshot.

## TCP Wrappers: concepto histórico

TCP Wrappers controlaba ciertos servicios compatibles mediante:

```text
/etc/hosts.allow
/etc/hosts.deny
```

La decisión dependía de la dirección cliente y del servicio enlazado con `libwrap`.

Actualmente muchos servicios y distribuciones ya no usan TCP Wrappers. No es un firewall universal y editar esos archivos no afecta aplicaciones que no tengan soporte. Para sistemas modernos suelen utilizarse:

- Firewall (`nftables`, `firewalld`, `ufw`).
- Configuración propia del servicio.
- NetworkManager.
- SELinux/AppArmor.
- Sistemas NAC reales en entornos corporativos.

Debe aprenderse para reconocer sistemas antiguos, no como primera solución moderna.

## Errores frecuentes y precauciones

- No copiar `eth0`: comprobar el nombre real con `ip -brief address`.
- No desactivar una interfaz remota sin otra forma de acceso.
- No agregar IP o gateway sin verificar red, máscara y duplicados.
- No editar `/etc/resolv.conf` si NetworkManager o `systemd-resolved` lo generan.
- No usar `/etc/network/interfaces` como guía universal; depende de la distribución.
- No confundir falta de ping con host apagado.
- No interpretar `* * *` de traceroute automáticamente como corte.
- No confundir una dirección MAC con Mandatory Access Control.
- `netstat` e `ifconfig` siguen apareciendo en documentación antigua; preferir `ss` e `ip`.
- TCP Wrappers no protege servicios modernos sin soporte `libwrap`.
- Capturar tráfico ajeno sin autorización puede ser ilegal y exponer datos sensibles.
- Probar SELinux/AppArmor en una VM con snapshot antes de aplicarlos a un sistema real.

## Inglés técnico del módulo

- `network interface` → interfaz de red.
- `wired` / `wireless` → cableada / inalámbrica.
- `address` → dirección.
- `netmask` → máscara de red.
- `prefix length` → longitud de prefijo CIDR.
- `default gateway` → puerta de enlace predeterminada.
- `route` / `routing table` → ruta / tabla de rutas.
- `metric` → costo o prioridad de una ruta.
- `hop` → salto entre routers.
- `packet loss` → pérdida de paquetes.
- `round-trip time` → tiempo de ida y vuelta.
- `name resolution` → resolución de nombres.
- `lease` → concesión DHCP.
- `listening socket` → socket en escucha.
- `bridge` → puente de red.
- `link down` → enlace no operativo.
- `managed` / `unmanaged` → administrada / no administrada.
- `mandatory` → obligatorio o impuesto por política.
- `discretionary` → decidido por el propietario.
- `role-based` → basado en roles.
- `troubleshooting` → diagnóstico y resolución de problemas.
- `hardening` → endurecimiento de seguridad.

## Lo que más costó y cómo repasarlo

Tano indicó que este módulo dejó varios conceptos poco claros. La mayor dificultad está en unir elementos que HTB presenta juntos: interfaz, IP, máscara, gateway, DNS, rutas, redes Docker y mecanismos de acceso.

Conviene repasarlo mediante este mapa:

```text
Interfaz → ¿por dónde salgo?
IP       → ¿qué dirección tengo?
Máscara  → ¿qué destinos son locales?
Ruta     → ¿qué camino elige el kernel?
Gateway  → ¿qué router recibe lo no local?
DNS      → ¿cómo traduzco nombres?
Puerto   → ¿qué servicio recibe la conexión?
```

La salida real ayudó a comprender por qué coexistían cable y Wi-Fi, cómo la métrica favorecía el cable y por qué Docker añadía redes `172.x`, bridges y dispositivos `veth`.

También debe repasarse la separación conceptual:

```text
DAC/MAC/RBAC → quién puede acceder a recursos
NAC          → quién o qué dispositivo puede entrar a la red
SELinux/AppArmor → políticas obligatorias sobre procesos y recursos
firewall     → tráfico permitido o bloqueado
```

## Qué aprendí

Comprendí la relación entre interfaces, direcciones IP, máscaras, gateways, rutas, DHCP y DNS. Analicé la red real de PerlaNegra, con conexión cableada y Wi-Fi, interpreté las métricas 100 y 600 y reconocí las redes bridge y `veth` creadas por Docker. Aprendí a consultar la red mediante `ip`, `nmcli`, `resolvectl`, `ping`, `traceroute`, `ss` y `lsof`, y a diagnosticar problemas por capas. También diferencié DAC, Mandatory Access Control, RBAC y NAC; comparé SELinux con AppArmor; y entendí que `ifconfig`, `netstat`, `/etc/network/interfaces` y TCP Wrappers pertenecen a contextos más antiguos o específicos.

## Para repasar o practicar

- Volver a dibujar la red real de PerlaNegra.
- Explicar con palabras propias IP, `/24`, gateway y DNS.
- Practicar `ip route get DESTINO` y leer la interfaz elegida.
- Desconectar una sola conexión desde la interfaz gráfica, observar la ruta y volver a conectarla, solamente cuando no haya tareas importantes.
- Comparar `ping` por IP con `resolvectl query` por nombre.
- Ejecutar `traceroute` y explicar por qué aparecen asteriscos.
- Usar `ss -ltnp` para relacionar direcciones, puertos y procesos.
- Identificar qué bridges Docker están activos y a qué proyecto pertenecen.
- Repasar la diferencia entre DAC, MAC, RBAC y NAC.
- Practicar SELinux o AppArmor únicamente dentro de una VM con snapshot.
- Investigar firewall moderno (`nftables` o `firewalld`) en lugar de depender de TCP Wrappers.
- Continuar usando `comando --help`, subcomandos de ayuda y `grep -i`.
