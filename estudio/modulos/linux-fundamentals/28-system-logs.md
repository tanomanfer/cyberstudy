# 28 de 30 — System Logs

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

Los logs o registros guardan evidencia de lo que sucede en un sistema: arranques, errores del kernel, actividad de servicios, autenticaciones, comandos administrativos y solicitudes recibidas por aplicaciones. Permiten investigar problemas técnicos y posibles incidentes de seguridad.

```text
Evento
  ↓
Kernel, servicio o aplicación genera un mensaje
  ↓
Archivo de log o systemd-journald lo almacena
  ↓
Administrador/SOC filtra y correlaciona
  ↓
Diagnóstico, alerta, investigación o respuesta
```

Un log no es solamente “un archivo de errores”. Puede registrar eventos correctos, advertencias, información de depuración, conexiones aceptadas y acciones de usuarios.

## Para qué sirven

Los logs ayudan a responder preguntas como:

- ¿Cuándo arrancó o se reinició el sistema?
- ¿Por qué falló un servicio?
- ¿Quién inició sesión y desde qué dirección?
- ¿Hubo contraseñas fallidas o uso de `sudo`?
- ¿Qué dirección solicitó una página al servidor web?
- ¿Qué error detectó el kernel en un disco o controlador?
- ¿Un firewall, IDS o Fail2ban generó una alerta?
- ¿Una acción de una prueba de penetración fue detectada?

En un SOC, analizar logs permite construir una línea de tiempo y correlacionar datos de varias fuentes. Una sola línea puede ser normal; muchas líneas relacionadas pueden revelar un ataque.

## Logs como evidencia, no como verdad absoluta

Un registro es evidencia útil, pero tiene límites:

- Puede estar incompleto por una mala configuración.
- Puede rotarse o eliminarse.
- Un atacante con privilegios suficientes podría alterarlo.
- La hora puede ser incorrecta si el reloj no está sincronizado.
- Un mensaje de error no prueba por sí solo una intrusión.
- Ausencia de eventos no demuestra ausencia de ataque.

Por eso se correlacionan varias fuentes y, en empresas, se envían copias a servidores centrales donde el host investigado no puede modificarlas fácilmente.

## Formas de almacenamiento en Linux

Linux puede registrar eventos de dos formas principales:

1. **Archivos de texto** bajo `/var/log`.
2. **Journal de systemd**, consultado con `journalctl`.

Pueden coexistir. Un demonio como rsyslog puede recibir mensajes y escribirlos en archivos, mientras systemd-journald mantiene su propio journal estructurado.

### Diferencias entre distribuciones

HTB utiliza rutas típicas de Ubuntu/Debian:

```text
/var/log/syslog
/var/log/auth.log
/var/log/kern.log
```

En RHEL/CentOS suelen aparecer:

```text
/var/log/messages
/var/log/secure
```

En CachyOS/Arch muchos de esos archivos pueden no existir porque el sistema usa principalmente:

```text
systemd-journald → journalctl
```

No encontrar `/var/log/auth.log` no significa que no haya eventos de autenticación. Primero hay que identificar cómo registra datos la distribución y el servicio.

## Tipos de logs

### Logs del kernel

Pueden contener:

- Detección de hardware.
- Controladores cargados o con errores.
- Fallos de discos o sistemas de archivos.
- Eventos de red.
- Límites de recursos.
- Bloqueos o mensajes críticos del kernel.

En Ubuntu pueden copiarse a:

```text
/var/log/kern.log
```

Con systemd se consultan mediante:

```bash
journalctl -k
```

O solamente para el arranque actual:

```bash
journalctl -k -b
```

`dmesg` también consulta el búfer del kernel:

```bash
sudo dmesg --level=err,warn
```

El acceso puede estar restringido porque los mensajes del kernel pueden revelar información sensible del sistema.

### Logs del sistema

Registran eventos generales:

- Inicio y detención de servicios.
- Arranques y apagados.
- Errores de systemd.
- Tareas programadas.
- Mensajes enviados mediante syslog.

Rutas tradicionales:

```text
/var/log/syslog
/var/log/messages
```

En un sistema con journal:

```bash
journalctl
```

### Logs de autenticación

Pueden mostrar:

- Login aceptado o fallido.
- Autenticación SSH con clave o contraseña.
- Apertura y cierre de sesiones.
- Uso de `sudo`.
- Eventos de PAM.
- Bloqueos o fallos repetidos.

Rutas típicas:

```text
Ubuntu/Debian → /var/log/auth.log
RHEL/CentOS   → /var/log/secure
CachyOS/Arch  → journal de systemd, según configuración
```

Filtros útiles:

```bash
journalctl -u sshd
journalctl _COMM=sudo
journalctl | grep -Ei 'failed|accepted|authentication|sudo'
```

Filtrar con `grep` funciona, pero los filtros nativos de `journalctl` suelen ser más precisos y eficientes.

### Logs de aplicaciones

Cada aplicación decide qué registra y dónde:

```text
Nginx       → /var/log/nginx/access.log y error.log
Apache      → /var/log/apache2/access.log y error.log, según distribución
MySQL       → ruta configurada por el servidor
PostgreSQL  → ruta configurada por el paquete/instancia
Docker      → driver de logging y `docker logs`
```

Las rutas del módulo son ejemplos, no reglas universales. Siempre hay que revisar la documentación y configuración instalada.

Para un servicio systemd:

```bash
journalctl -u nombre.service
```

Para Docker:

```bash
docker logs NOMBRE_CONTENEDOR
docker logs --since 30m NOMBRE_CONTENEDOR
docker logs --tail 100 NOMBRE_CONTENEDOR
```

### Access logs

Un access log registra solicitudes o accesos. En un servidor web suele incluir:

- IP de origen.
- Fecha y hora.
- Método HTTP.
- Recurso solicitado.
- Código de estado.
- Cantidad de bytes.
- Referer y User-Agent, si están configurados.

Ejemplo:

```text
127.0.0.1 - - [28/Feb/2023:15:06:43 +0000]
"GET /index.html HTTP/1.1" 200 13484
```

Interpretación:

```text
Origen: 127.0.0.1
Método: GET
Recurso: /index.html
Versión: HTTP/1.1
Estado: 200, solicitud exitosa
Tamaño: 13484 bytes
```

Un `404` indica recurso no encontrado; un `401` requiere autenticación; un `403` fue prohibido; los `5xx` suelen indicar errores del servidor. Un código aislado no demuestra un ataque: importa su frecuencia, secuencia y contexto.

### Audit logs

Los logs de auditoría buscan registrar eventos relevantes para seguridad y cumplimiento, como:

- Modificaciones de archivos sensibles.
- Cambios de usuarios o permisos.
- Ejecución de determinados programas.
- Eventos definidos en reglas de auditd.
- Cambios de configuración.

En sistemas con Linux Audit:

```text
/var/log/audit/audit.log
```

Herramientas habituales:

```bash
sudo ausearch -m USER_AUTH
sudo aureport --auth
```

Solo funcionan si `auditd` está instalado, activo y configurado. No debe asumirse que todo acceso a cualquier archivo se registra automáticamente.

### Logs de seguridad

Dependen de las herramientas instaladas:

```text
Fail2ban → bloqueos e intentos detectados
Firewall → paquetes registrados por reglas LOG
IDS/IPS  → alertas de tráfico
AppArmor/SELinux → denegaciones de políticas
```

Ejemplos del módulo:

```text
/var/log/fail2ban.log
/var/log/ufw.log
```

En CachyOS, si esas herramientas no están instaladas, esos archivos no existirán. Algunos eventos aparecerán en el journal.

## Cómo leer una entrada

Ejemplo:

```text
Feb 28 15:04:22 server sshd[3010]:
Failed password for htb-student from 10.14.15.2 port 50223 ssh2
```

Se separa en:

```text
Fecha/hora: Feb 28 15:04:22
Hostname:   server
Proceso:    sshd
PID:        3010
Resultado:  contraseña fallida
Usuario:    htb-student
IP origen:  10.14.15.2
Puerto:     50223
Protocolo:  SSH2
```

El puerto `50223` es el puerto efímero de origen del cliente, no el puerto 22 del servidor. Ese detalle evita interpretar incorrectamente la conexión.

## Interpretación de eventos

### Autenticación aceptada

```text
Accepted publickey for admin from 10.14.15.2 port 43210 ssh2
```

Indica que una clave pública fue aceptada. No demuestra automáticamente que el acceso sea legítimo: hay que confirmar si el usuario, la IP, el horario y la clave eran esperados.

### Uso de sudo

```text
sudo: admin : TTY=pts/1 ; PWD=/home/admin ; USER=root ; COMMAND=/bin/bash
```

- Usuario que invocó sudo: `admin`.
- Terminal: `pts/1`.
- Directorio actual: `/home/admin`.
- Usuario objetivo: `root`.
- Comando: `/bin/bash`.

Esto demuestra que sudo autorizó esa acción, no necesariamente que el usuario pertenezca directamente a un grupo llamado `sudo`; la autorización puede provenir de reglas específicas o grupos diferentes.

### Cron

```text
CRON[2345]: pam_unix(cron:session): session opened for user root
```

Puede ser una tarea legítima. Se debe correlacionar con crontabs, timers, horario y comando ejecutado.

## `journalctl`: herramienta principal en CachyOS

### Últimos eventos

```bash
journalctl -n 50 --no-pager
```

- `-n 50`: últimas 50 entradas.
- `--no-pager`: imprime directamente.

### Arranque actual

```bash
journalctl -b
journalctl -b -n 20 --no-pager
```

`-b` limita al arranque actual.

### Arranques disponibles

```bash
journalctl --list-boots
```

Consultar el arranque anterior:

```bash
journalctl -b -1
```

### Por servicio

```bash
journalctl -u NetworkManager.service
journalctl -u docker.service
```

`-u` filtra una unidad systemd.

### Seguir eventos en vivo

```bash
journalctl -f
```

`-f` significa **follow**. Se detiene con `Ctrl+C`; eso deja de mirar y no elimina logs.

### Por tiempo

```bash
journalctl --since "today"
journalctl --since "1 hour ago"
journalctl --since "2026-09-27 20:00" --until "2026-09-27 21:00"
```

### Por prioridad

```bash
journalctl -p warning..alert
```

Prioridades habituales, de más grave a menos grave:

```text
emerg, alert, crit, err, warning, notice, info, debug
```

Usar `-p err` incluye normalmente esa prioridad y las más graves.

### Por kernel

```bash
journalctl -k -b
```

### Por ejecutable o proceso

```bash
journalctl _COMM=sudo
journalctl _PID=1234
```

El journal guarda campos estructurados. Para observarlos:

```bash
journalctl -n 1 -o verbose
```

## Herramientas para archivos de texto

### `tail`

Últimas líneas:

```bash
tail -n 50 /var/log/archivo.log
```

Seguir en vivo:

```bash
tail -f /var/log/archivo.log
```

### `grep`

Búsqueda sin distinguir mayúsculas:

```bash
grep -i 'failed' /var/log/archivo.log
```

Varios patrones:

```bash
grep -Ei 'failed|error|denied' /var/log/archivo.log
```

Mostrar número de línea:

```bash
grep -in 'failed' /var/log/archivo.log
```

### `less`

```bash
less /var/log/archivo.log
```

Dentro de `less`:

```text
/texto → buscar
n      → siguiente coincidencia
N      → coincidencia anterior
G      → final
g      → principio
q      → salir
```

### Archivos comprimidos

Logs rotados pueden terminar en `.gz`:

```bash
zless archivo.log.1.gz
zgrep -i 'failed' archivo.log.1.gz
```

## Rotación y retención

Si nunca se limitaran, los logs podrían llenar el disco y provocar una caída del sistema. La rotación:

- Renombra o archiva el archivo actual.
- Crea o continúa con uno nuevo.
- Comprime registros antiguos.
- Conserva cierta cantidad o período.
- Elimina archivos vencidos según política.

Herramienta frecuente para archivos:

```text
logrotate
```

Configuraciones habituales:

```text
/etc/logrotate.conf
/etc/logrotate.d/
```

Consulta segura:

```bash
logrotate --debug /etc/logrotate.conf
```

`--debug` permite revisar qué haría sin rotar realmente, aunque siempre conviene leer la ayuda de la versión instalada.

El journal tiene su propia configuración, normalmente en:

```text
/etc/systemd/journald.conf
```

Uso de disco:

```bash
journalctl --disk-usage
```

No conviene ejecutar opciones de vacuum o borrar logs antes de comprender la política de retención y preservar evidencia necesaria.

## Persistencia del journal

Según la configuración, el journal puede ser:

- **Volátil:** vive bajo `/run/log/journal` y se pierde al reiniciar.
- **Persistente:** vive bajo `/var/log/journal` y sobrevive reinicios.

Comprobar directorios:

```bash
command ls -ld /run/log/journal /var/log/journal 2>/dev/null
```

La existencia de `/var/log/journal` suele indicar persistencia, pero la configuración efectiva también debe revisarse.

## Seguridad de los logs

Buenas prácticas:

- Limitar quién puede leer registros sensibles.
- Evitar que aplicaciones escriban secretos o contraseñas.
- Sincronizar el reloj con NTP.
- Establecer retención suficiente para investigar.
- Vigilar el espacio disponible.
- Centralizar logs importantes.
- Alertar sobre patrones relevantes, no solo almacenarlos.
- Proteger integridad y acceso al servidor central.

Los logs pueden contener:

- Nombres de usuario.
- Direcciones IP.
- Rutas internas.
- Tokens o credenciales si una aplicación está mal programada.
- Consultas y datos personales.

No deben publicarse ni copiarse completos sin revisar y ocultar información sensible.

## Método de investigación

Ante un evento sospechoso:

1. Definir una franja horaria.
2. Identificar equipo, usuario, IP y servicio.
3. Buscar accesos fallidos y exitosos cercanos.
4. Revisar `sudo`, procesos, tareas programadas y cambios.
5. Correlacionar aplicación, kernel, firewall y autenticación.
6. Comparar con el comportamiento normal.
7. Preservar evidencia antes de limpiar o reiniciar.
8. Documentar zona horaria y comandos utilizados.

Ejemplo:

```text
10:00 muchos fallos SSH desde IP X
10:04 login aceptado para usuario Y
10:05 sudo ejecuta una shell como root
10:07 aparece un servicio nuevo
```

La secuencia completa es más significativa que cada línea aislada.

## Mejoras y correcciones al módulo

- `/var/log/kern.log`, `/var/log/syslog` y `/var/log/auth.log` no existen en todas las distribuciones.
- En CachyOS debe aprenderse primero `journalctl`.
- Un mensaje de `sudo` no demuestra necesariamente pertenencia al grupo `sudo`; demuestra una autorización efectiva.
- No todos los accesos a archivos aparecen automáticamente en un access log; se necesita instrumentación o auditoría configurada.
- Las rutas de aplicaciones dependen del paquete y su configuración.
- Detectar texto como `Failed password` es útil, pero un SOC debe correlacionar frecuencia, origen, usuario y accesos posteriores.
- Conservar logs sin revisarlos o alertar no alcanza para detectar incidentes a tiempo.

## Errores y precauciones

- No asumir que un archivo faltante implica ausencia de logs.
- No utilizar solamente `grep error`: muchos eventos críticos usan otras palabras o campos.
- No interpretar una línea sin revisar fecha, zona horaria y contexto.
- No borrar, truncar ni rotar evidencia durante una investigación.
- No ejecutar `journalctl --vacuum-*` sin revisar retención y necesidades forenses.
- No compartir logs que contengan tokens, claves, correos o datos personales.
- No confundir puerto de origen del cliente con puerto del servicio.
- No depender de logs locales como única evidencia frente a un atacante con root.
- No habilitar nivel `debug` permanentemente sin considerar volumen y datos sensibles.

## Uso de la ayuda

```bash
journalctl --help
man journalctl
man systemd.journal-fields
tail --help
grep --help
man logrotate
```

Búsquedas útiles dentro de `man journalctl`:

```text
/--since
/-u
/-p
/follow
/boot
```

Leer la descripción ayuda a distinguir filtros que parecen similares y conocer el formato de fecha aceptado.

## Inglés técnico del módulo

- `log` → registro de eventos.
- `log entry` → entrada o línea individual.
- `logging` → proceso de registrar eventos.
- `log level` → nivel o gravedad.
- `timestamp` → marca de fecha y hora.
- `hostname` → nombre del equipo.
- `failed attempt` → intento fallido.
- `successful login` → inicio de sesión exitoso.
- `access log` → registro de accesos o solicitudes.
- `audit log` → registro de auditoría.
- `follow` → seguir nuevas entradas en vivo.
- `since` / `until` → desde / hasta.
- `current boot` → arranque actual.
- `previous boot` → arranque anterior.
- `log rotation` → rotación de registros.
- `retention` → período de conservación.
- `tampering` → manipulación no autorizada de evidencia.
- `clear-text credentials` → credenciales guardadas o transmitidas sin protección.
- `false positive` → alerta que parece maliciosa pero no lo es.

## Lo que más hay que remarcar

No hace falta memorizar todas las rutas. Hay que aprender a identificar:

```text
Qué ocurrió
Cuándo ocurrió
En qué equipo
Qué proceso lo registró
Qué usuario o IP intervino
Cuál fue el resultado
Qué ocurrió inmediatamente antes y después
```

En PerlaNegra la herramienta principal es `journalctl`; las rutas de Ubuntu mostradas por HTB sirven para reconocer otros sistemas, pero no deben copiarse como si fueran universales.

## Qué aprendí

Comprendí que los logs permiten diagnosticar problemas y reconstruir actividad de seguridad. Diferencié registros del kernel, sistema, autenticación, aplicaciones, acceso, auditoría y herramientas defensivas. Aprendí a interpretar campos de una entrada y a utilizar `journalctl` en CachyOS para filtrar por arranque, servicio, tiempo, prioridad y proceso. También comprendí la importancia de rotación, retención, sincronización horaria, protección y centralización de registros.

## Para repasar o practicar

- Explorar el arranque actual con `journalctl -b`.
- Comparar logs del kernel con `journalctl -k -b` y `dmesg`.
- Filtrar servicios reales como Docker y NetworkManager.
- Generar un evento controlado y observarlo en vivo con `journalctl -f`.
- Buscar uso de `sudo` y eventos de autenticación sin exponer información sensible.
- Practicar filtros por tiempo y prioridad.
- Revisar el uso de disco y la persistencia del journal.
- Examinar logs de Nginx o de los contenedores locales.
- Aprender rotación con `logrotate --debug` sin forzar cambios.
- Construir una línea de tiempo combinando varias fuentes.
