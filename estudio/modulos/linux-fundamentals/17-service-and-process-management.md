# 17 de 30 — Service and Process Management

**Estado:** Repasar
**Curso:** Linux Fundamentals
**Plataforma:** Hack The Box Academy

## Idea principal

Un servicio (o demonio) es un programa que corre en segundo plano sin interacción directa del usuario, y que mantiene el sistema funcionando o agrega funcionalidades. `systemd` es el sistema de inicio que administra esos servicios en la mayoría de las distros modernas, y `systemctl` es el comando principal para controlarlos: arrancarlos, pararlos, dejarlos programados al inicio, y diagnosticarlos. Además de servicios, todo lo que corre en Linux es un proceso con su propio PID, y hay herramientas para controlarlos (señales, foreground/background) y para encadenar comandos entre sí.

## Conceptos importantes

**Servicios del sistema vs instalados por el usuario:** los del sistema son necesarios para que la máquina arranque y funcione (equivalente al motor de un auto); los instalados por el usuario agregan funcionalidad opcional (equivalente al aire acondicionado). Muchos demonios terminan en `d` (`sshd`, `systemd`).

**PID y PPID:** todo proceso tiene un PID (Process ID) único. Si fue creado por otro proceso, tiene un PPID (Parent Process ID) que apunta al padre. Esta info vive en `/proc/`.

**`systemd`:** es el primer proceso que arranca el sistema, siempre con PID 1.

**Estados de un proceso:** Running (corriendo), Waiting (esperando un evento o recurso), Stopped (detenido), Zombie (terminó pero todavía tiene entrada en la tabla de procesos).

**Señales:** la forma de interactuar con un proceso en ejecución. Se envían con `kill`, `pkill`, `pgrep` o `killall`.

## Comandos y opciones

```bash
systemctl start ssh
```
Inicia el servicio ahora mismo (no lo deja programado para el próximo arranque).

```bash
systemctl status ssh
```
Muestra si está activo, el PID principal, y las últimas líneas de log.

```bash
systemctl enable ssh
```
Deja el servicio programado para arrancar automáticamente en cada inicio del sistema (equivalente moderno de `update-rc.d ... defaults` en SysV). No lo inicia en este momento si no estaba corriendo.

```bash
systemctl list-units --type=service
```
Lista todas las unidades de tipo servicio, con columnas: `UNIT` (nombre), `LOAD`, `ACTIVE`, `SUB` y `DESCRIPTION`. Sin `--type=service` la salida mezcla también dispositivos, automounts, sockets, etc.

```bash
journalctl -u ssh.service --no-pager
```
Muestra el historial de logs de una unidad puntual (`-u`). Sirve para diagnosticar por qué un servicio no arrancó o se cayó. `--no-pager` evita que la salida se abra en un visor tipo `less`.

```bash
kill -9 <PID>
```
Manda la señal SIGKILL (9): mata el proceso inmediatamente, sin dejarlo limpiar nada. Es el último recurso.

```bash
jobs
bg
fg 1
```
`jobs` lista los procesos en segundo plano o suspendidos de la sesión actual. `bg` reanuda el último suspendido pero en segundo plano. `fg <id>` trae ese proceso de vuelta al primer plano.

```bash
comando &
```
Agregar `&` al final manda el proceso a background desde que arranca, sin necesidad de suspenderlo primero con Ctrl+Z.

## Diferencias que hay que recordar

- **`start` vs `enable`:** `start` prende el servicio ahora; `enable` lo deja programado para el próximo boot. No son excluyentes, se suelen usar los dos.
- **`Ctrl+C` (SIGINT) vs `Ctrl+Z` (SIGTSTP):** `Ctrl+C` interrumpe/corta el proceso; `Ctrl+Z` lo suspende pero se puede retomar después con `fg` o `bg`.
- **`SIGKILL` (9) vs `SIGTERM` (15):** SIGTERM pide al programa que termine de forma prolija (puede ignorarlo); SIGKILL lo mata a la fuerza sin darle chance de limpiar nada.
- **`;` vs `&&` vs `|`:** `;` ejecuta todo en secuencia sin importar errores previos; `&&` corta la cadena si algo antes falló; `|` no encadena ejecución sino que conecta la salida de un comando como entrada del siguiente.
- **`list-units` con y sin `--type=service`:** sin el filtro, la lista incluye dispositivos, sockets y automounts, no solo servicios — así fue el primer error del ejercicio de hoy.

## Ejemplos prácticos

Buscar una unidad de servicio por parte de su descripción:
```bash
systemctl list-units --type=service | grep -i snapd
```
Resultado esperado: filtra la lista larga de `systemctl` y muestra solo las líneas que contienen "snapd", incluyendo la unidad y su descripción completa.

Diagnosticar un servicio que no levanta:
```bash
journalctl -u ssh.service --no-pager
```
Resultado esperado: historial de eventos de esa unidad puntual (arranque, mensajes de error, cierres), útil para saber por qué falló.

## Errores y precauciones

- Usar `list-units` sin `--type=service` mezcla tipos de unidades muy distintas (dispositivos, automounts) y hace mucho más difícil encontrar lo que se busca.
- Al filtrar con `grep` por una palabra genérica del tema (ej. "apparmor") se puede encontrar una unidad parecida pero no la correcta, cuando existen varias unidades relacionadas al mismo tema. Conviene filtrar por la palabra más específica y distintiva de la descripción pedida (ej. "snapd").
- `kill -9` no permite que el proceso libere recursos o guarde datos pendientes: usarlo solo cuando `SIGTERM` no funcionó.

## Inglés técnico del módulo

- `daemon` → demonio, servicio que corre en segundo plano.
- `unit` → unidad, cada servicio/dispositivo/socket que gestiona systemd.
- `to enable` → habilitar (programar el arranque automático).
- `to load` → cargar (leer/inicializar algo, como perfiles de AppArmor).
- `signal` → señal, mensaje que se manda a un proceso para controlarlo.
- `foreground` / `background` → primer plano / segundo plano.
- `job` → tarea, en el contexto de la shell, un proceso en background o suspendido de la sesión actual.

## Lo que más costó

El ejercicio pedía encontrar, con `systemctl list-units --type=service`, la unidad con la descripción exacta "Load AppArmor profiles managed internally by snapd". La primera confusión fue de comando: se corrió `list-units` sin `--type=service`, mezclando tipos de unidades. Corregido eso, el segundo problema fue de estrategia de búsqueda: al filtrar con `grep -i apparmor` apareció `apparmor.service` (el genérico), no `snapd.apparmor.service` (el que pedía el enunciado), porque había dos unidades relacionadas al mismo tema. Hubo además una confusión sobre qué se pide como "respuesta" en HTB: no es el comando usado para buscar, sino el nombre de la unidad (primera columna de la salida) que aparece en la línea con la descripción exacta.

La respuesta correcta de este ejercicio era `snapd.apparmor.service`.

## Qué aprendí

Diferencié servicios del sistema y del usuario, entendí qué hace `systemd` y cómo controlar servicios con `systemctl` (start, status, enable, list-units), aprendí a diagnosticar con `journalctl -u`, repasé estados de proceso y señales (`kill -9`, Ctrl+C, Ctrl+Z), background/foreground con `jobs`/`bg`/`fg`/`&`, y las diferencias entre `;`, `&&` y `|` para encadenar comandos.

## Para repasar o practicar

- Practicar filtrar salidas largas de `systemctl` eligiendo la palabra clave más específica de la descripción pedida, no la más obvia.
- Repasar con calma la lista completa de señales (`kill -l`) y para qué sirve cada una de las más usadas.
- Practicar `jobs`, `bg` y `fg` con más de un proceso suspendido a la vez.
- Volver a HTB y confirmar si esta sección ya figura completada tras resolver el ejercicio de `snapd.apparmor.service`.
