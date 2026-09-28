# 26 de 30 — Linux Security

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

Proteger Linux no consiste en instalar una única herramienta. Es un proceso continuo de actualización, reducción de servicios, control de permisos, protección de accesos remotos, monitoreo y auditoría.

```text
Actualizar el sistema
        ↓
Reducir la superficie de ataque
        ↓
Aplicar mínimo privilegio
        ↓
Controlar la red y los accesos
        ↓
Registrar, revisar y corregir
```

Linux puede tener una superficie de ataque diferente a Windows, pero no es invulnerable. Un servidor web expuesto a Internet, un SSH mal configurado, un servicio viejo o un permiso excesivo pueden permitir una intrusión.

## Riesgo y superficie de ataque

La **superficie de ataque** está formada por todos los puntos que podrían utilizarse para atacar un sistema:

- Puertos abiertos y servicios de red.
- Aplicaciones web.
- Cuentas y contraseñas.
- Software y kernel desactualizados.
- Permisos incorrectos.
- Tareas programadas.
- Binarios SUID/SGID.
- Configuraciones y secretos expuestos.

Cuantos más componentes innecesarios haya, más cosas deben mantenerse y más posibilidades existen de cometer un error. Una medida básica de hardening es eliminar o desactivar lo que no se utiliza.

## Actualizaciones

HTB utiliza un ejemplo de Ubuntu/Debian:

```bash
sudo apt update && sudo apt dist-upgrade
```

- `apt update`: actualiza la información disponible de los repositorios.
- `apt dist-upgrade`: instala actualizaciones y puede resolver cambios de dependencias agregando o quitando paquetes.
- `&&`: ejecuta la segunda orden solamente si la primera terminó correctamente.

PerlaNegra utiliza CachyOS, basada en Arch Linux. Su actualización normal es:

```bash
sudo pacman -Syu
```

- `-S`: sincroniza u opera con paquetes de los repositorios.
- `-y`: actualiza las bases de datos de paquetes.
- `-u`: actualiza los paquetes instalados.

En Arch no se recomienda ejecutar `pacman -Sy` por separado y continuar usando el sistema sin actualizar paquetes: puede provocar una **actualización parcial**, situación no soportada que mezcla bases nuevas con paquetes viejos.

Después de actualizar un kernel puede ser necesario reiniciar para comenzar a utilizar la versión nueva. Instalar el paquete no reemplaza el kernel que ya está cargado en memoria.

Comprobaciones útiles:

```bash
uname -r
pacman -Q linux-cachyos
```

`uname -r` muestra el kernel actualmente ejecutándose. La consulta con `pacman -Q` muestra la versión instalada del paquete indicado; el nombre exacto puede variar según el kernel utilizado.

## Mínimo privilegio

El principio de **least privilege** indica que cada usuario, proceso o servicio debe recibir solamente los permisos indispensables para su tarea.

Ejemplo incorrecto:

```text
Un usuario necesita reiniciar un servicio → recibe sudo completo
```

Ejemplo más seguro:

```text
Un usuario necesita reiniciar un servicio → se autoriza solamente ese comando
```

La configuración de sudo debe modificarse con:

```bash
sudo visudo
```

`visudo` bloquea el archivo mientras se edita y valida la sintaxis antes de aceptar los cambios. Editar `/etc/sudoers` directamente puede dejar inutilizable `sudo` si se comete un error.

Para consultar qué puede ejecutar el usuario actual:

```bash
sudo -l
```

También conviene que cada persona tenga su propia cuenta. Las cuentas compartidas dificultan atribuir acciones en los logs y revocar el acceso de una sola persona.

## Proteger SSH

SSH suele ser una puerta administrativa muy importante. Algunas directivas relevantes de `/etc/ssh/sshd_config` son:

```text
PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
```

- `PermitRootLogin no`: impide iniciar sesión directamente como root.
- `PasswordAuthentication no`: deshabilita autenticación mediante contraseña.
- `PubkeyAuthentication yes`: permite claves SSH.

Una secuencia segura es:

1. Crear y copiar la clave pública.
2. Abrir una segunda sesión y confirmar que la clave funciona.
3. Mantener abierta la sesión administrativa existente.
4. Validar la configuración.
5. Recién después deshabilitar contraseñas o root.

Validación habitual del servidor OpenSSH:

```bash
sudo sshd -t
```

Si no produce salida, normalmente la sintaxis es válida. Esto no garantiza que todas las decisiones de seguridad sean correctas, pero evita varios errores de formato.

Consultar valores efectivos:

```bash
sudo sshd -T | grep -Ei 'permitrootlogin|passwordauthentication|pubkeyauthentication'
```

No conviene modificar SSH a ciegas: una configuración incorrecta puede dejar al administrador sin acceso remoto.

## Firewall

Un firewall controla tráfico según datos como interfaz, dirección IP, puerto, protocolo y estado de conexión.

```text
Internet → firewall → servicios permitidos
                     └─ servicios rechazados o descartados
```

HTB menciona `iptables`, pero muchos sistemas modernos utilizan `nftables` como infraestructura principal. Herramientas como `firewalld` pueden administrar reglas sin que el usuario escriba directamente toda la sintaxis de nftables.

Comprobaciones seguras:

```bash
systemctl is-active firewalld
systemctl is-active nftables
sudo nft list ruleset
```

Para revisar qué servicios escuchan:

```bash
ss -lntup
```

- `-l`: solamente sockets en escucha.
- `-n`: muestra números sin resolver nombres.
- `-t`: TCP.
- `-u`: UDP.
- `-p`: proceso asociado, cuando hay permisos para verlo.

Un firewall no corrige un servicio vulnerable. Reduce quién puede alcanzarlo, pero el servicio también debe estar actualizado y bien configurado.

## Fail2ban

Fail2ban observa logs de servicios y detecta patrones repetidos de autenticación fallida. Cuando un origen supera un límite, aplica la acción configurada, normalmente un bloqueo temporal mediante el firewall.

```text
Intentos fallidos → filtro de Fail2ban → contador → acción/bloqueo
```

Conceptos frecuentes:

- `filter`: patrón que identifica fallos en los logs.
- `jail`: combina servicio, filtro, límites y acción.
- `maxretry`: cantidad de fallos permitidos.
- `findtime`: período durante el cual se cuentan.
- `bantime`: duración del bloqueo.

Fail2ban complementa, pero no reemplaza:

- Claves SSH.
- Contraseñas robustas.
- MFA cuando esté disponible.
- Restricciones de red.
- Actualizaciones.

Además, bloquear una dirección IP no siempre equivale a bloquear a una persona: varias personas pueden compartir una IP y un atacante puede cambiar de origen.

## Auditoría periódica

Una auditoría busca configuraciones que faciliten intrusiones o escaladas de privilegios:

- Kernel y paquetes desactualizados.
- Cuentas antiguas o innecesarias.
- Permisos excesivos.
- Archivos escribibles por todos.
- Binarios SUID/SGID innecesarios.
- Cron jobs modificables por usuarios sin privilegios.
- Servicios ejecutándose como root sin necesidad.
- Puertos inesperados.
- Errores o accesos sospechosos en logs.

### Archivos escribibles por todos

Ejemplo de búsqueda dentro de un directorio controlado:

```bash
find /ruta/a/revisar -type f -perm -0002 -ls
```

- `-type f`: archivos regulares.
- `-perm -0002`: el permiso de escritura para `others` está presente.
- `-ls`: muestra información detallada.

Buscar desde `/` puede producir muchos resultados y errores de permisos; primero conviene limitar el alcance y entender cada coincidencia antes de cambiarla.

### SUID y SGID

Para inspeccionar archivos SUID o SGID:

```bash
find /usr/bin /usr/sbin -type f \( -perm -4000 -o -perm -2000 \) -ls
```

- SUID puede hacer que un ejecutable opere con la identidad de su propietario.
- SGID puede hacer que opere con el grupo propietario.

Encontrar uno no significa automáticamente que sea malicioso. Algunos son legítimos. Hay que comparar con los paquetes oficiales, analizar su necesidad y evitar retirar bits de permisos sin comprender el efecto.

### Tareas programadas

Revisar tareas propias:

```bash
crontab -l
```

Revisar timers de systemd:

```bash
systemctl list-timers --all
```

Una tarea privilegiada es peligrosa si ejecuta scripts o archivos que un usuario sin privilegios puede modificar.

## SELinux y AppArmor

Los permisos tradicionales de Linux son un control de acceso discrecional o **DAC**. SELinux y AppArmor agregan políticas de **MAC**, control de acceso obligatorio, aplicadas por el kernel.

```text
Acceso permitido por chmod/propietario
                 ↓
Política SELinux/AppArmor
                 ↓
Permitido o bloqueado finalmente
```

### SELinux

SELinux asigna etiquetas o contextos a procesos, archivos y otros objetos. Las políticas controlan qué dominios pueden interactuar con qué tipos de recursos.

Comandos habituales en sistemas con SELinux:

```bash
getenforce
sestatus
ls -Z
```

Modos comunes:

- `Enforcing`: aplica y bloquea según la política.
- `Permissive`: registra infracciones pero no las bloquea.
- `Disabled`: no está activo.

### AppArmor

AppArmor utiliza perfiles asociados a programas y reglas basadas principalmente en rutas y capacidades.

Comprobaciones habituales cuando está instalado:

```bash
sudo aa-status
systemctl status apparmor
```

SELinux y AppArmor no sustituyen los permisos Unix, el firewall ni las actualizaciones: agregan otra capa de defensa.

## Herramientas mencionadas

### Lynis

Audita configuración y genera recomendaciones de hardening. Sus avisos deben interpretarse según el uso del equipo; no todo consejo debe aplicarse automáticamente.

### Snort

Sistema de detección o prevención de intrusiones de red. Analiza tráfico utilizando reglas y puede alertar sobre patrones sospechosos.

### chkrootkit y rkhunter

Buscan señales conocidas asociadas a rootkits o alteraciones. Pueden generar falsos positivos y tampoco garantizan que un sistema esté limpio. Un resultado se investiga; no debe tomarse como veredicto definitivo.

## Contraseñas y cuentas

Medidas recomendables:

- Contraseñas largas y únicas.
- Gestor de contraseñas.
- MFA donde esté disponible.
- Bloqueo o demora ante fallos repetidos.
- Eliminación o bloqueo de cuentas que ya no se utilizan.
- Historial y caducidad cuando la política y el riesgo lo justifiquen.

La caducidad periódica obligatoria no reemplaza una buena contraseña ni MFA y puede provocar patrones predecibles. Debe aplicarse según las necesidades y políticas del entorno, no de manera automática en todos los casos.

Consultar información de caducidad:

```bash
sudo chage -l usuario
```

## TCP Wrappers

TCP Wrappers es un mecanismo histórico que permite a servicios compatibles consultar reglas basadas en servicio, host o dirección.

Archivos tradicionales:

```text
/etc/hosts.allow → accesos permitidos
/etc/hosts.deny  → accesos denegados
```

Ejemplos conceptuales del módulo:

```text
sshd : 10.129.14.0/24
ftpd : 10.129.14.10
ALL  : .example.com
```

La forma general es:

```text
servicio : origen
```

Sin embargo, es fundamental recordar:

- TCP Wrappers es una tecnología antigua.
- Muchos programas y distribuciones modernas ya no la soportan.
- Crear `hosts.allow` o `hosts.deny` no sirve si el servicio no fue enlazado con la biblioteca correspondiente.
- No controla puertos de manera general; solamente servicios compatibles.
- No reemplaza un firewall.

Actualmente se priorizan `nftables`/`firewalld`, la configuración del propio servicio, segmentación, VPN y mecanismos modernos de autenticación.

## Diferencias que hay que recordar

| Mecanismo | Función principal |
|---|---|
| Actualizaciones | Corrigen vulnerabilidades conocidas |
| Permisos Unix | Controlan propietario, grupo y otros |
| `sudo` | Delega acciones administrativas concretas |
| Firewall | Filtra tráfico de red |
| Fail2ban | Reacciona a patrones repetidos en logs |
| SELinux/AppArmor | Imponen políticas adicionales desde el kernel |
| Lynis | Audita y recomienda mejoras |
| Snort | Detecta patrones sospechosos en tráfico |
| TCP Wrappers | Control histórico para servicios compatibles |

Ninguna fila reemplaza a todas las demás. La seguridad eficaz utiliza varias capas.

## Errores y precauciones

- No asumir que Linux no necesita antivirus, actualizaciones ni auditoría.
- No ejecutar `pacman -Sy` como actualización parcial en Arch/CachyOS.
- No entregar sudo completo cuando alcanza con una acción limitada.
- No desactivar contraseñas SSH antes de comprobar el acceso con clave.
- No cerrar la única sesión remota mientras se modifica SSH o el firewall.
- No modificar SUID/SGID solamente porque una búsqueda los encontró.
- No aplicar automáticamente todas las sugerencias de una herramienta de auditoría.
- No creer que Fail2ban o un firewall corrigen una aplicación vulnerable.
- No confiar en `/etc/hosts.allow` sin comprobar si el servicio soporta TCP Wrappers.
- No exponer servicios administrativos directamente a Internet si pueden restringirse mediante VPN, red interna o lista de orígenes.

## Uso de la ayuda

Antes de aplicar cambios:

```bash
pacman --help
sudo --help
ss --help
find --help
man sshd_config
man sudoers
man find
man systemd.timer
```

Ejemplos de búsqueda:

```bash
man sshd_config
```

Dentro del manual:

```text
/PermitRootLogin
/PasswordAuthentication
```

En `man`, `/texto` busca, `n` avanza y `q` sale. Antes de copiar una regla desde Internet hay que comprobar que corresponda a la distribución y versión instaladas.

## Inglés técnico del módulo

- `hardening` → endurecimiento o refuerzo de seguridad.
- `attack surface` → superficie de ataque.
- `least privilege` → mínimo privilegio.
- `world-writable` → escribible por cualquier usuario.
- `password aging` → reglas de antigüedad/caducidad de contraseña.
- `failed login attempt` → intento fallido de inicio de sesión.
- `lock down` → restringir o reforzar un sistema.
- `enforce` → hacer cumplir una política.
- `audit` → revisar sistemáticamente y conservar evidencia.
- `intrusion detection` → detección de intrusiones.
- `rule set` → conjunto de reglas.
- `misconfigured` → configurado incorrectamente.
- `unencrypted authentication` → autenticación transmitida sin cifrado adecuado.

## Lo que hay que remarcar

La seguridad no es un producto ni una configuración que se realiza una sola vez. Un sistema seguro hoy puede dejar de serlo si aparecen vulnerabilidades, se agrega un servicio, cambia un permiso o una cuenta queda abandonada.

La prioridad práctica es:

1. Conocer qué hay instalado y escuchando.
2. Actualizar con el procedimiento correcto de la distribución.
3. Eliminar lo innecesario.
4. Restringir permisos y accesos de red.
5. Proteger SSH y las cuentas.
6. Registrar y revisar actividad.
7. Auditar nuevamente después de cada cambio importante.

## Qué aprendí

Comprendí que Linux necesita defensa en profundidad y mantenimiento continuo. Aprendí la importancia de actualizar correctamente CachyOS, reducir servicios, aplicar mínimo privilegio, proteger SSH, revisar puertos, usar firewall y comprender el papel de Fail2ban, SELinux, AppArmor y las herramientas de auditoría. También aprendí que TCP Wrappers es un mecanismo histórico que muchos servicios modernos ya no soportan y que no reemplaza al firewall.

## Para repasar o practicar

- Revisar servicios y puertos locales con `systemctl` y `ss`.
- Identificar qué firewall utiliza PerlaNegra y leer sus reglas sin modificarlas.
- Practicar `sudo -l` y comprender autorizaciones específicas de sudoers.
- Repasar claves SSH antes de modificar autenticación por contraseña.
- Investigar si el sistema utiliza AppArmor, SELinux u otro LSM.
- Practicar búsquedas controladas de permisos world-writable y SUID/SGID.
- Aprender a interpretar recomendaciones de Lynis sin aplicarlas automáticamente.
- Repasar la diferencia entre prevención, detección, respuesta y auditoría.
