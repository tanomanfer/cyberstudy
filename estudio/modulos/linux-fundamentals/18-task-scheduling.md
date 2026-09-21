# 18 de 30 — Task Scheduling

**Estado:** Completado
**Curso:** Linux Fundamentals
**Plataforma:** Hack The Box Academy

## Idea principal

La programación de tareas permite indicarle a Linux que ejecute un comando o un script automáticamente en un momento concreto o cada cierto intervalo. Es como programar una cafetera: se configura una vez qué debe hacer y cuándo debe hacerlo; después, el sistema repite la acción sin que una persona tenga que iniciarla manualmente.

Esto se usa para actualizaciones, copias de seguridad, mantenimiento de bases de datos, limpieza de archivos, ejecución de scripts y generación de alertas. En ciberseguridad también es importante porque una tarea programada desconocida puede utilizarse para ejecutar código malicioso o mantener persistencia. Por eso hay que saber crear tareas legítimas, pero también encontrarlas y auditarlas.

Linux ofrece distintas herramientas para programar tareas. En este módulo se trabajaron principalmente los **timers de systemd** y **Cron**.

## Conceptos importantes

### Systemd separa “cuándo” de “qué”

Con systemd normalmente se crean dos unidades relacionadas:

- Un archivo `.timer`, que establece **cuándo** se activa la tarea.
- Un archivo `.service`, que establece **qué comando o script** se ejecuta.

Si existen `mytimer.timer` y `mytimer.service`, systemd los relaciona por compartir el mismo nombre base (`mytimer`). Al activarse el timer, systemd inicia el servicio correspondiente.

Ejemplo de timer:

```ini
[Unit]
Description=My Timer

[Timer]
OnBootSec=3min
OnUnitActiveSec=1hour

[Install]
WantedBy=timers.target
```

- `OnBootSec=3min` indica que la primera activación ocurre tres minutos después de iniciar el sistema.
- `OnUnitActiveSec=1hour` indica que se vuelve a activar una hora después de la última activación.
- `WantedBy=timers.target` permite integrar el timer con el objetivo de timers de systemd cuando se lo habilita.

Ejemplo de servicio:

```ini
[Unit]
Description=My Service

[Service]
ExecStart=/ruta/completa/al/script.sh

[Install]
WantedBy=multi-user.target
```

`ExecStart` contiene el comando que se ejecutará. Conviene utilizar una ruta absoluta porque una tarea automática puede no tener el mismo directorio actual ni el mismo `PATH` que una terminal interactiva.

### Cron usa cinco campos de tiempo

Cron guarda las tareas en un archivo llamado `crontab`. Cada entrada tiene cinco campos temporales, seguidos por el comando:

```text
minuto hora día-del-mes mes día-de-la-semana comando
```

Los rangos principales son:

| Campo | Rango |
|---|---:|
| Minuto | 0–59 |
| Hora | 0–23 |
| Día del mes | 1–31 |
| Mes | 1–12 |
| Día de la semana | 0–7 (0 y 7 representan domingo) |

El asterisco `*` significa “cualquier valor”. Una expresión como `*/6` significa “cada seis unidades” dentro de ese campo.

## Comandos y opciones

Después de crear o modificar archivos de unidad, systemd debe volver a leerlos:

```bash
sudo systemctl daemon-reload
```

Iniciar un timer inmediatamente:

```bash
sudo systemctl start mytimer.timer
```

Habilitarlo para futuros arranques:

```bash
sudo systemctl enable mytimer.timer
```

También se pueden hacer ambas cosas juntas:

```bash
sudo systemctl enable --now mytimer.timer
```

Comprobar timers, estado y registros:

```bash
systemctl list-timers
systemctl status mytimer.timer
journalctl -u mytimer.service
```

Administrar el crontab del usuario actual:

```bash
crontab -e
crontab -l
```

- `crontab -e` abre el archivo para editar las tareas.
- `crontab -l` lista las tareas existentes sin modificarlas.

Consultar una propiedad concreta de una unidad:

```bash
systemctl show nombre.service --property=Type
systemctl show nombre.service -p Type
```

`--property=Type` y `-p Type` hacen lo mismo: filtran la salida y muestran únicamente la propiedad `Type`.

Para consultar una unidad perteneciente a la sesión del usuario:

```bash
systemctl --user show nombre.service -p Type
systemctl --user cat nombre.service
```

Si el administrador systemd del usuario no está disponible —algo que puede ocurrir en una máquina remota o sesión limitada— se puede localizar el archivo de unidad directamente:

```bash
find /usr/lib/systemd /lib/systemd -name "nombre.service" 2>/dev/null
```

Luego se inspecciona la propiedad necesaria:

```bash
grep "^Type=" /usr/lib/systemd/user/nombre.service
```

Acá `2>/dev/null` manda los errores del comando al dispositivo nulo para que no ensucien la salida. No cambia la búsqueda ni concede permisos.

## Diferencias que hay que recordar

- **Timer vs service:** el timer decide cuándo; el service decide qué se ejecuta.
- **`start` vs `enable`:** `start` activa ahora; `enable` configura el arranque automático futuro. `enable --now` hace las dos cosas.
- **Systemd timer vs Cron:** systemd requiere unidades `.timer` y `.service`, pero ofrece estados, dependencias y registros integrados. Cron es más directo para horarios repetitivos mediante una línea de crontab.
- **Servicio del sistema vs servicio del usuario:** sin `--user`, `systemctl` consulta el administrador global del sistema. Con `--user`, consulta la instancia de la sesión del usuario.
- **Unidad cargada vs archivo existente:** que `systemctl show` no muestre una propiedad no prueba que el archivo no exista. La sesión puede no tener la unidad cargada o puede no estar disponible el bus de systemd correspondiente.
- **`find` vs `grep`:** `find` localiza archivos por nombre; `grep` busca texto dentro de los archivos. Primero se encuentra la ruta y después se inspecciona su contenido.

## Ejemplos prácticos

Ejecutar un script cada seis horas, siempre en el minuto cero:

```cron
0 */6 * * * /ruta/update_software.sh
```

Se ejecutará aproximadamente a las 00:00, 06:00, 12:00 y 18:00.

Ejecutar un script el primer día de cada mes a medianoche:

```cron
0 0 1 * * /ruta/run_scripts.sh
```

Ejecutar una copia de seguridad todos los domingos a medianoche:

```cron
0 0 * * 0 /ruta/backup.sh
```

Investigar el tipo de un servicio de usuario cuando la consulta normal aparece vacía:

```bash
systemctl show nombre.service -p Type
systemctl --user show nombre.service -p Type
find /usr/lib/systemd /lib/systemd -name "nombre.service" 2>/dev/null
grep "^Type=" /ruta/encontrada/nombre.service
```

La lógica es avanzar por capas: primero consultar systemd; después probar la instancia del usuario; y, si esa sesión no funciona, localizar e inspeccionar el archivo real.

## Errores y precauciones

- Los scripts automáticos deben utilizar rutas absolutas y contar con los permisos necesarios. El entorno de Cron o systemd puede ser más reducido que el de la terminal.
- Antes de habilitar una tarea, conviene ejecutar manualmente el script y comprobar que no sea destructivo.
- Una tarea programada con privilegios elevados puede causar mucho daño si el script es modificable por usuarios no autorizados.
- Después de cambiar una unidad de systemd hay que ejecutar `daemon-reload`; de lo contrario, systemd puede continuar usando la versión anterior.
- Una salida como `Type=` vacía no significa automáticamente que el tipo esté vacío. Puede significar que se consultó el administrador equivocado o que la unidad no está cargada en esa sesión.
- El mensaje `(END)` indica que la salida está abierta en un paginador como `less`. Se sale presionando `q`.
- En `find`, las comillas alrededor de `"nombre.service"` evitan que la shell interprete caracteres especiales. `Ctrl+C` cancela un comando que quedó incompleto o que se desea interrumpir.

## Inglés técnico del módulo

- `task scheduling` → programación de tareas.
- `timer` → temporizador; unidad que define cuándo activar una tarea.
- `service` → servicio; unidad que define el proceso o comando ejecutado.
- `trigger` → desencadenante, evento que activa una acción.
- `interval` → intervalo entre ejecuciones.
- `on boot` → después del arranque del sistema.
- `scheduled task` / `cron job` → tarea programada.
- `user service` → servicio perteneciente a la sesión de un usuario.
- `unit file` → archivo de unidad de systemd.
- `property` → propiedad o atributo consultable de una unidad.
- `type` → tipo de inicio o comportamiento del servicio.

## Lo que más costó

La función general se entendió: programar una tarea para que se ejecute sola en un horario o intervalo. Lo que más costó fue pasar de esa idea al procedimiento concreto para investigar un servicio y encontrar su archivo.

En el ejercicio se probó primero:

```bash
systemctl show dconf.service -p Type
```

La propiedad apareció vacía. Después se intentó consultar la instancia del usuario con `systemctl --user`, pero la máquina de HTB devolvió un error porque el proceso o bus de systemd del usuario no estaba disponible. El punto difícil fue comprender que esos fallos no significaban que el archivo no existiera: significaban que `systemctl` no podía obtener esa información desde la sesión actual.

La estrategia correcta fue separar el problema en dos pasos:

1. **Encontrar el archivo por su nombre** con `find`.
2. **Buscar la propiedad dentro del archivo** con `grep`.

```bash
find /usr/lib/systemd /lib/systemd -name "dconf.service" 2>/dev/null
grep "^Type=" /usr/lib/systemd/user/dconf.service
```

También costó escribir inicialmente el patrón de `find` y fue necesario cancelar el intento con `Ctrl+C`. Esto es normal al aprender: las comillas, las rutas y las redirecciones se vuelven familiares con repetición. La idea que conviene fijar es: **`find` busca dónde está el archivo; `grep` busca qué dice adentro**.

## Qué aprendí

Entendí para qué sirve programar tareas, cómo systemd separa el horario (`.timer`) de la acción (`.service`) y cómo Cron representa horarios con cinco campos. Aprendí la diferencia entre iniciar y habilitar un timer, a consultar propiedades de servicios del sistema y del usuario, y a buscar directamente un archivo de unidad cuando `systemctl` no puede mostrarlo. También comprendí mejor la diferencia práctica entre `find`, que localiza archivos, y `grep`, que encuentra texto dentro de ellos.

## Para repasar o practicar

- Leer varias expresiones de Cron y decir en voz alta cuándo se ejecutarían.
- Crear en una máquina de práctica un timer y un service sencillos que escriban la fecha en un archivo temporal.
- Practicar `systemctl list-timers`, `systemctl status` y `journalctl -u`.
- Repetir la búsqueda de tres archivos `.service` diferentes usando `find` y luego consultar una propiedad con `grep`.
- Repasar servicios del sistema frente a servicios del usuario y cuándo corresponde utilizar `systemctl --user`.
- Practicar las comillas y la redirección `2>/dev/null` hasta entender qué parte del comando afecta cada una.
