# 25 de 30 — Remote Desktop Protocols in Linux

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

Los protocolos de escritorio remoto permiten ver o controlar una interfaz gráfica que se ejecuta en otra computadora. Son útiles para administrar equipos sin estar físicamente delante de ellos, prestar soporte, instalar programas y resolver problemas.

No todos trabajan de la misma manera:

```text
X11 forwarding → transporta ventanas de aplicaciones individuales
VNC            → comparte o crea un escritorio remoto completo
RDP            → ofrece una sesión gráfica remota, especialmente en Windows
XDMCP          → gestiona sesiones X completas, pero es antiguo e inseguro
```

En seguridad es importante reconocer qué servicio está escuchando, en qué puerto, si cifra la comunicación y si está expuesto solamente en la red local o también hacia Internet.

## Cliente y servidor: quién muestra y quién ejecuta

Normalmente pensamos que el servidor es la computadora remota. En X11 la terminología puede resultar confusa:

- El **servidor X** controla la pantalla, el teclado y el mouse del usuario.
- El **cliente X** es la aplicación que solicita dibujar una ventana.

Por eso, al ejecutar una aplicación remota mediante SSH:

```text
Equipo remoto                         Mi computadora
Firefox, cliente X ── SSH cifrado ──► servidor X / XWayland ──► monitor
```

Firefox se ejecuta y consume recursos en el equipo remoto, pero su ventana se dibuja en la computadora local.

## X11 y X Server

X11 o X Window System es un sistema gráfico tradicional de Unix y Linux. Permite separar la aplicación que se ejecuta del equipo que muestra su ventana. Esa transparencia de red fue una de sus características más importantes.

Los displays se escriben como `:0`, `:1`, etc. Tradicionalmente, si X11 escucha mediante TCP, la relación es:

```text
Display :0 → TCP 6000
Display :1 → TCP 6001
Display :2 → TCP 6002
```

En sistemas actuales no es habitual ni recomendable exponer estos puertos directamente. Muchas instalaciones utilizan sockets Unix locales y deshabilitan la escucha TCP.

### X11 forwarding mediante SSH

El servidor SSH remoto debe permitirlo en `/etc/ssh/sshd_config`:

```text
X11Forwarding yes
```

Para comprobar la configuración sin mostrar comentarios irrelevantes:

```bash
grep -i '^X11Forwarding' /etc/ssh/sshd_config
```

Desde el cliente se puede solicitar el reenvío con:

```bash
ssh -X usuario@servidor
```

O ejecutar directamente una aplicación:

```bash
ssh -X usuario@servidor /usr/bin/firefox
```

- `ssh`: establece la conexión segura.
- `-X`: habilita X11 forwarding con controles de seguridad.
- `usuario@servidor`: cuenta y equipo remoto.
- `/usr/bin/firefox`: programa ejecutado remotamente.

También existe `ssh -Y`, llamado **trusted X11 forwarding**. Es más permisivo y, por lo tanto, debe usarse solamente cuando se confía realmente en el servidor remoto. No conviene elegir `-Y` automáticamente porque una aplicación remota maliciosa podría interactuar con más recursos de la sesión gráfica local.

## Wayland y XWayland en PerlaNegra

La práctica local mostró:

```bash
echo "$XDG_SESSION_TYPE"
```

Resultado:

```text
wayland
```

Esto significa que Hyprland utiliza Wayland, el sistema gráfico moderno, y no una sesión X11 pura.

Después se comprobó la compatibilidad con aplicaciones X11:

```bash
pgrep -a Xwayland
```

Resultado observado, simplificado:

```text
12116 Xwayland :0 -rootless ...
```

- `12116`: identificador del proceso o PID.
- `Xwayland`: servidor de compatibilidad para aplicaciones X11.
- `:0`: display X11 número cero.
- `-rootless`: las ventanas X11 se integran como ventanas normales de Hyprland, sin crear un escritorio X separado.

La arquitectura real queda así:

```text
Aplicaciones Wayland ───────────────► Hyprland ──► monitor
Aplicaciones X11 ──► XWayland ─────► Hyprland ──► monitor
```

Tener el display `:0` no demuestra que el puerto TCP 6000 esté expuesto. Para buscar listeners X11:

```bash
ss -lntp | grep -E ':600[0-9]\b'
```

Si no aparece nada, XWayland puede seguir funcionando localmente mediante sockets o descriptores internos sin exponer X11 directamente por TCP. Ese es un comportamiento normal y más seguro.

## Seguridad de X11

X11 directo no fue diseñado pensando en las amenazas modernas. Una exposición incorrecta puede permitir que otros usuarios o equipos observen ventanas, capturen información o interactúen con la sesión.

Buenas prácticas:

- No publicar TCP 6000–6010 hacia Internet.
- Preferir X11 forwarding mediante SSH.
- Utilizar `ssh -X` antes que `ssh -Y`, salvo necesidad concreta.
- Mantener Xorg, XWayland y el sistema actualizados.
- Comprobar listeners con `ss` en vez de asumir que un display equivale a un puerto abierto.

## XDMCP

XDMCP significa **X Display Manager Control Protocol**. Permite solicitar una sesión gráfica X completa, por ejemplo KDE o GNOME, desde otro equipo.

Su puerto característico es:

```text
UDP 177
```

No debe confundirse con X11 forwarding:

- X11 forwarding suele transportar una aplicación concreta dentro de SSH.
- XDMCP gestiona el acceso a una sesión gráfica completa.
- XDMCP no proporciona una protección moderna suficiente y puede ser vulnerable a interceptación o ataques de intermediario.

En entornos que requieren seguridad no conviene exponer XDMCP. Existen alternativas más modernas protegidas con SSH, VPN o TLS.

## VNC

VNC significa **Virtual Network Computing** y utiliza el protocolo RFB (**Remote Framebuffer**). Transmite la imagen del escritorio y recibe las acciones del teclado y el mouse.

```text
VNC Viewer                               VNC Server
   ├── envía teclado y mouse ───────────────►
   └── recibe la imagen del escritorio ◄─────
```

Hay dos modelos frecuentes:

1. **Compartir la pantalla real:** el usuario local y el remoto ven la misma sesión y pueden interferir entre sí.
2. **Crear una sesión virtual:** el usuario remoto recibe un escritorio separado, aunque no exista físicamente en un monitor.

Implementaciones conocidas:

- TigerVNC.
- TightVNC.
- RealVNC.
- UltraVNC.

### Displays y puertos de VNC

La relación habitual es:

```text
Display :0 → TCP 5900
Display :1 → TCP 5901
Display :2 → TCP 5902
```

No hay que confundir estos puertos con los de X11:

```text
X11 :1 → normalmente TCP 6001
VNC :1 → normalmente TCP 5901
```

### Ejemplo de TigerVNC del módulo

En Ubuntu/Debian, HTB propone instalar XFCE y TigerVNC:

```bash
sudo apt install xfce4 xfce4-goodies tigervnc-standalone-server -y
vncpasswd
```

Este comando es específico de distribuciones con `apt`. PerlaNegra está basada en Arch/CachyOS, por lo que no se debe copiar esa instalación literalmente.

Los archivos principales del ejemplo viven en:

```text
~/.vnc/xstartup   → define qué escritorio o programas iniciar
~/.vnc/config     → configura resolución, DPI y otras opciones
~/.vnc/passwd     → almacena la credencial VNC en el formato del programa
```

El script debe poder ejecutarse:

```bash
chmod +x ~/.vnc/xstartup
```

Iniciar y listar sesiones:

```bash
vncserver
vncserver -list
```

Un resultado como este relaciona los tres datos:

```text
X DISPLAY #   RFB PORT #   PROCESS ID
:1            5901         79746
```

### Proteger VNC con un túnel SSH

No debe suponerse que cualquier implementación de VNC cifra toda la sesión. La autenticación y el cifrado dependen del producto y de su configuración. Una práctica más segura consiste en hacer que VNC escuche solamente de manera local y transportarlo mediante SSH.

Desde el equipo cliente:

```bash
ssh -L 5901:127.0.0.1:5901 -N usuario@servidor
```

- `-L`: crea un reenvío de puerto local.
- Primer `5901`: puerto abierto en el cliente.
- `127.0.0.1:5901`: destino visto desde el servidor SSH.
- `-N`: no ejecuta una shell o comando remoto; mantiene solamente el túnel.

Mientras esa conexión sigue abierta, otra terminal puede conectarse a:

```bash
vncviewer 127.0.0.1:5901
```

El recorrido es:

```text
VNC Viewer → localhost:5901 → túnel SSH cifrado → VNC remoto:5901
```

HTB muestra también `-f`, que envía SSH al segundo plano después de autenticarse. Para aprender y diagnosticar conviene empezar sin `-f`, porque así se ve la conexión y se puede detener con `Ctrl+C`.

## RDP

RDP significa **Remote Desktop Protocol**. Es especialmente común en Windows y utiliza habitualmente TCP/UDP 3389. Linux también puede actuar como cliente RDP y, con programas como `xrdp`, ofrecer sesiones compatibles.

En este módulo RDP aparece principalmente como comparación; la configuración desarrollada es la de X11 y VNC.

## Diferencias que hay que recordar

| Tecnología | Qué se recibe | Puerto característico | Seguridad recomendada |
|---|---|---:|---|
| X11 directo | Ventanas de aplicaciones | TCP 6000 + display | No exponer; usar SSH |
| X11 por SSH | Ventanas de aplicaciones | SSH TCP 22 | `ssh -X` |
| XDMCP | Sesión X completa | UDP 177 | Evitar en redes no confiables |
| VNC | Escritorio completo/compartido | TCP 5900 + display | TLS, VPN o túnel SSH |
| RDP | Sesión de escritorio | TCP/UDP 3389 | NLA, TLS, VPN y acceso restringido |

## Método para analizar un servicio remoto

Cuando aparezca una consigna o un puerto, conviene preguntar:

1. ¿Qué programa actúa como servidor?
2. ¿Qué cliente necesito?
3. ¿Transporta una ventana o un escritorio completo?
4. ¿Qué puerto y protocolo utiliza: TCP o UDP?
5. ¿La comunicación está cifrada?
6. ¿Escucha solamente en `127.0.0.1`, en la red local o en todas las interfaces?
7. ¿Puedo protegerlo con SSH o VPN?

Comandos de diagnóstico seguros:

```bash
ss -lntup
ss -lntp | grep -E ':590[0-9]\b|:600[0-9]\b|:3389\b'
pgrep -a Xwayland
echo "$XDG_SESSION_TYPE"
```

Consultar ayuda antes de copiar opciones:

```bash
ssh --help
man ssh
man ssh_config
vncserver --help
vncviewer --help
ss --help
```

Para buscar términos dentro del manual:

```text
/forward
/local
/display
```

Dentro de `man`, `/palabra` busca hacia adelante y `n` pasa a la coincidencia siguiente.

## Errores y precauciones

- No asumir que VNC siempre cifra toda la comunicación.
- No exponer 5900, 6000, 3389 o UDP 177 directamente a Internet.
- No confundir un número de display con la confirmación de un puerto abierto.
- No confundir X11 `:1`/6001 con VNC `:1`/5901.
- No copiar `apt install` en CachyOS: primero identificar la distribución y su gestor de paquetes.
- Evitar `ssh -Y` con servidores que no sean de confianza.
- No editar `sshd_config` sin validar la configuración y conservar otra sesión administrativa abierta; un error podría impedir el próximo acceso SSH.
- Una contraseña no reemplaza el cifrado ni la restricción de red.

## Inglés técnico del módulo

- `remote desktop` → escritorio remoto.
- `display` → número lógico de pantalla o sesión gráfica.
- `viewer` → programa cliente que visualiza VNC.
- `screen sharing` → compartir la pantalla existente.
- `forwarding` → reenvío; transportar una conexión mediante otra.
- `listener` / `listening` → proceso que espera conexiones en un puerto.
- `tunnel` → túnel que encapsula tráfico dentro de otra conexión.
- `trusted` → confiable; en `ssh -Y` implica más permisos.
- `framebuffer` → memoria/representación de los píxeles de una pantalla.
- `man-in-the-middle` → ataque de intermediario que intercepta o altera comunicaciones.
- `unencrypted` → sin cifrar.
- `view-only password` → contraseña que permite mirar sin controlar teclado y mouse.

## Lo que más costó

La parte más confusa fue entender por qué aparece X11 si PerlaNegra utiliza Wayland y qué debía aprender de la práctica. La respuesta es que Wayland es la sesión principal, mientras que XWayland conserva compatibilidad con aplicaciones X11. El proceso `Xwayland :0` confirma esa capa de compatibilidad, pero no significa por sí solo que TCP 6000 esté abierto.

También es importante razonar la diferencia entre ejecutar una aplicación remota y controlar todo un escritorio: X11 forwarding suele traer una ventana individual; VNC transmite un escritorio completo o compartido.

## Qué aprendí

Comprendí las diferencias entre X11, XDMCP, VNC y RDP; identifiqué sus puertos característicos y entendí por qué no deben exponerse sin protección. Comprobé que mi escritorio usa Wayland con Hyprland y que XWayland permite ejecutar aplicaciones X11. También aprendí que X11 forwarding transporta ventanas mediante SSH, mientras que VNC controla una sesión gráfica completa, y que VNC puede protegerse mediante un túnel SSH.

## Para repasar o practicar

- Repetir la diferencia entre servidor X y cliente X.
- Recordar X11 `6000 + display` y VNC `5900 + display`.
- Practicar un túnel SSH en un laboratorio propio, sin publicar VNC hacia Internet.
- Aprender a interpretar `ssh -L` indicando puerto local, destino y puerto remoto.
- Investigar qué aplicaciones locales utilizan XWayland.
- Comparar Wayland, XWayland y una sesión Xorg tradicional.
- Practicar `man ssh`, `ssh --help`, `ss --help` y búsquedas dentro de los manuales.
