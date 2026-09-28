# 21 de 30 — Backup and Restore

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

Un **backup** o copia de seguridad permite recuperar información después de un borrado accidental, una falla de disco, corrupción de archivos, una actualización defectuosa, robo del equipo o malware. No es una práctica exclusiva de servidores y empresas: para un usuario común puede proteger documentos, fotos, proyectos, apuntes y configuraciones personales.

En Linux existen distintas herramientas:

- `rsync`: sincroniza archivos y directorios de manera local o remota.
- Duplicity: realiza copias incrementales y puede cifrarlas.
- Deja Dup: ofrece una interfaz gráfica sencilla para configurar copias y restauraciones.
- SSH: puede proteger el transporte de un `rsync` remoto.
- Cron: permite ejecutar automáticamente un script de respaldo.

La idea central de `rsync` es:

```text
origen → comparación → transferencia de lo necesario → destino
```

En ejecuciones posteriores, `rsync` evita volver a transferir archivos que no cambiaron. Esto lo vuelve eficiente para mantener copias actualizadas.

## Por qué un usuario común necesita backups

En el caso de Tano, un respaldo podría proteger:

```text
/home/tano/proyectos
/home/tano/Documentos
/home/tano/Imágenes
/home/tano/.config
```

No siempre conviene copiar todo `/home/tano` sin revisar. Allí también puede haber cachés, archivos temporales, descargas prescindibles, máquinas virtuales o datos muy grandes. La estrategia correcta es identificar primero qué información sería difícil o imposible de reconstruir.

Una copia ubicada en otra carpeta del mismo disco sirve contra ciertos errores humanos, pero no contra la rotura física de ese disco:

```text
Mismo disco       → ayuda si se borra o modifica algo por accidente
Otro disco        → también ayuda si falla el disco principal
Copia remota      → también protege frente a pérdida o daño del equipo
Copia con versiones → permite recuperar estados anteriores
```

## Backup, sincronización y archivo histórico

Estos conceptos se relacionan, pero no significan lo mismo:

| Concepto | Objetivo |
|---|---|
| Copia simple | Duplicar datos en otro lugar. |
| Sincronización | Mantener origen y destino iguales o actualizados. |
| Backup histórico | Conservar una o más versiones recuperables. |
| Restauración | Copiar los datos respaldados nuevamente al lugar de trabajo. |

`rsync` es principalmente una herramienta de sincronización y transferencia. Puede formar parte de una estrategia de backup, pero una sincronización exacta sin versiones no siempre es un respaldo suficiente.

Por ejemplo, si se borra accidentalmente un archivo en el origen y luego se ejecuta `rsync --delete`, también puede desaparecer del destino. Un verdadero plan de recuperación debe contemplar versiones, copias desconectadas o herramientas diseñadas para conservar historial.

## Instalación de rsync

En Ubuntu, Debian o la Pwnbox de HTB:

```bash
sudo apt install rsync -y
```

En CachyOS o Arch:

```bash
sudo pacman -S rsync
```

Para comprobar que está disponible:

```bash
command -v rsync
rsync --version
```

En PerlaNegra se verificó que `rsync` ya estaba instalado.

## Sintaxis básica

La estructura general es:

```bash
rsync [opciones] ORIGEN DESTINO
```

Ejemplo local:

```bash
rsync -av /ruta/origen/ /ruta/respaldo/
```

- `rsync`: programa que compara y transfiere los datos.
- `-a`: modo `archive`; copia recursivamente y conserva atributos importantes.
- `-v`: modo `verbose`; muestra detalles de la operación.
- Primera ruta: origen.
- Segunda ruta: destino.

El modo `archive` incluye varias opciones y normalmente conserva permisos, fechas, enlaces simbólicos y estructura de directorios. No significa “crear automáticamente un archivo comprimido”.

## La barra final cambia el resultado

Ésta es una de las diferencias más importantes de `rsync`.

Sin barra final en el origen:

```bash
rsync -av origen destino/
```

Copia el directorio `origen` dentro del destino:

```text
destino/
└── origen/
    └── archivo.txt
```

Con barra final en el origen:

```bash
rsync -av origen/ destino/
```

Copia el contenido interior de `origen`:

```text
destino/
└── archivo.txt
```

Una forma de recordarlo es:

```text
origen   → copiar esta carpeta
origen/  → copiar lo que está dentro de esta carpeta
```

La barra final del destino suele usarse para dejar claro que se trata de un directorio, pero la barra verdaderamente decisiva en estos ejemplos es la del origen.

## Práctica local realizada

Se crearon dos directorios temporales:

```bash
mkdir -p /tmp/practica-rsync/origen
mkdir -p /tmp/practica-rsync/respaldo
```

- `mkdir` crea directorios.
- `-p` crea también directorios padres si faltan y evita fallar si ya existen.
- `/tmp/practica-rsync/origen` contiene los datos originales.
- `/tmp/practica-rsync/respaldo` recibe la copia.

Se creó un archivo:

```bash
echo "Mi primer archivo" > /tmp/practica-rsync/origen/documento.txt
```

- `echo` genera el texto.
- `>` redirige la salida hacia un archivo y reemplaza su contenido si ya existía.
- La ruta final es el archivo creado dentro del origen.

Después se sincronizó el contenido:

```bash
rsync -av /tmp/practica-rsync/origen/ /tmp/practica-rsync/respaldo/
```

La salida esperada incluye:

```text
sending incremental file list
documento.txt
```

Se verificó el resultado:

```bash
ls -l /tmp/practica-rsync/respaldo/
cat /tmp/practica-rsync/respaldo/documento.txt
```

`ls -l` confirma que el archivo existe y `cat` muestra su contenido:

```text
Mi primer archivo
```

Si se vuelve a ejecutar el mismo `rsync` sin modificar el origen, el archivo no debería transferirse de nuevo. `rsync` compara los datos y determina que ya están actualizados.

## El error que ocurrió durante la práctica

Al principio se pegaron `echo` y `rsync` en la misma línea sin un separador:

```bash
echo "Mi primer archivo" > /tmp/practica-rsync/origen/documento.txt rsync -av /tmp/practica-rsync/origen/ /tmp/practica-rsync/respaldo/
```

La shell interpretó todo como parte de un único comando `echo`. `rsync` no se ejecutó y la carpeta de respaldo quedó vacía. Por eso este comando falló después:

```bash
cat /tmp/practica-rsync/respaldo/documento.txt
```

El mensaje `No existe el fichero o el directorio` no significaba que `cat` estuviera roto: indicaba que la copia nunca se había creado en el destino.

La solución fue ejecutar cada instrucción por separado:

```bash
echo "Mi primer archivo" > /tmp/practica-rsync/origen/documento.txt
rsync -av /tmp/practica-rsync/origen/ /tmp/practica-rsync/respaldo/
```

Mientras se está aprendiendo, conviene pegar y ejecutar un comando por vez. Si se necesitan varios comandos en una línea, deben separarse conscientemente, por ejemplo con `&&`, que ejecuta el siguiente sólo si el anterior terminó correctamente:

```bash
comando_1 && comando_2
```

## Simular antes de modificar: `--dry-run`

`--dry-run` muestra qué haría `rsync` sin realizar cambios:

```bash
rsync -av --dry-run /ruta/origen/ /ruta/respaldo/
```

También existe la forma corta habitual:

```bash
rsync -avn /ruta/origen/ /ruta/respaldo/
```

Es una práctica especialmente importante cuando:

- Las rutas son largas o parecidas.
- Se trabaja con información valiosa.
- Se utiliza `--delete`.
- El destino es remoto.
- Se modifica un script automático.

La secuencia segura es:

```text
1. Revisar origen y destino.
2. Ejecutar con --dry-run.
3. Leer la lista de cambios.
4. Recién entonces ejecutar sin --dry-run.
```

## Compresión, copias de archivos reemplazados y eliminación

El módulo presenta un comando más avanzado:

```bash
rsync -avz --backup --backup-dir=/ruta/versiones --delete ORIGEN/ usuario@servidor:/ruta/respaldo/
```

Opciones:

- `-a`: conserva estructura y atributos.
- `-v`: muestra información detallada.
- `-z`: comprime los datos durante la transferencia.
- `--backup`: conserva archivos del destino que serían reemplazados o eliminados.
- `--backup-dir=RUTA`: indica dónde guardar esas versiones desplazadas.
- `--delete`: elimina del destino elementos que ya no existen en el origen.

`-z` puede ayudar en conexiones lentas, pero al copiar localmente puede ser innecesario porque comprimir y descomprimir también consume procesador.

### Riesgo de `--delete`

Este comando crea un espejo más exacto, pero puede borrar información del destino:

```bash
rsync -av --delete ORIGEN/ DESTINO/
```

Antes debe simularse:

```bash
rsync -av --delete --dry-run ORIGEN/ DESTINO/
```

También hay que confirmar que las rutas no estén invertidas. `rsync` interpreta siempre la primera como origen y la segunda como destino.

## Restaurar un respaldo

Restaurar significa copiar los datos desde el respaldo hacia la ubicación de trabajo. En una restauración local:

```bash
rsync -av /ruta/respaldo/ /ruta/restaurada/
```

En una restauración desde un servidor remoto:

```bash
rsync -av usuario@servidor:/ruta/respaldo/ /ruta/local/
```

El sentido de las rutas se invierte respecto del backup:

```text
Backup:      datos locales → almacenamiento de respaldo
Restauración: respaldo → ubicación local
```

Es más seguro restaurar primero en una carpeta nueva, inspeccionar los datos y luego decidir si deben reemplazar los archivos actuales:

```bash
mkdir -p /tmp/restauracion-prueba
rsync -av /ruta/respaldo/ /tmp/restauracion-prueba/
```

Un backup que nunca fue restaurado y comprobado podría estar incompleto o dañado. Probar la recuperación es parte del plan de backup.

## Transferencia remota mediante SSH

Para enviar datos a otro equipo:

```bash
rsync -avz -e ssh /ruta/origen/ usuario@servidor:/ruta/respaldo/
```

- `-e ssh`: indica el transporte remoto que debe utilizarse.
- SSH cifra los datos durante la transferencia y protege su integridad.
- `usuario@servidor:` identifica la cuenta y el equipo remoto.
- Los dos puntos separan el host remoto de la ruta ubicada en ese host.

En versiones modernas, `rsync` suele usar SSH como transporte remoto predeterminado, pero `-e ssh` deja la intención explícita y permite personalizar sus opciones.

SSH protege los datos **mientras viajan**, pero no cifra automáticamente el respaldo una vez almacenado. Para proteger los archivos guardados se necesitan mecanismos adicionales, como Duplicity, GnuPG, LUKS o un almacenamiento cifrado.

## Autenticación con claves SSH

Una tarea automática no puede depender de que una persona escriba una contraseña en cada ejecución. El módulo propone crear un par de claves:

```bash
ssh-keygen -t rsa -b 2048
ssh-copy-id usuario@servidor
```

- `ssh-keygen` genera una clave privada y una pública.
- `-t rsa` selecciona RSA.
- `-b 2048` establece el tamaño de la clave del ejemplo.
- `ssh-copy-id` instala la clave pública en la cuenta remota autorizada.

La clave privada nunca debe compartirse ni incorporarse al repositorio. Dejarla sin frase de seguridad facilita la automatización, pero aumenta el impacto si alguien la roba. En sistemas reales conviene evaluar claves dedicadas, permisos restringidos y limitaciones en el servidor.

## Automatizar con un script y Cron

Script presentado por el módulo:

```bash
#!/bin/bash

rsync -avz -e ssh /ruta/origen/ usuario@servidor:/ruta/respaldo/
```

El encabezado `#!/bin/bash` indica qué intérprete debe ejecutar el archivo. Después se concede permiso de ejecución:

```bash
chmod +x RSYNC_Backup.sh
```

Para editar las tareas Cron del usuario:

```bash
crontab -e
```

Ejemplo para ejecutar el script al minuto cero de cada hora:

```cron
0 * * * * /ruta/completa/RSYNC_Backup.sh
```

Campos de Cron:

```text
minuto hora día-del-mes mes día-de-la-semana comando
  0     *        *       *          *          script
```

En scripts automáticos deben usarse rutas absolutas porque el entorno de Cron es más limitado que el de una terminal interactiva. También conviene registrar salida y errores para saber si el respaldo funcionó.

Ejemplo para una práctica local cada minuto:

```cron
* * * * * /ruta/completa/RSYNC_Backup.sh
```

Una frecuencia de un minuto sirve para un laboratorio, pero puede ser excesiva en un sistema real.

## Regla 3-2-1

Una estrategia ampliamente utilizada es:

```text
3 copias de los datos
2 tipos de almacenamiento diferentes
1 copia fuera del equipo o ubicación principal
```

Ejemplo personal:

```text
1. Originales en PerlaNegra.
2. Copia en un disco externo.
3. Copia remota cifrada en otra ubicación.
```

Una copia externa debería desconectarse cuando no se utiliza, si es posible. Esto reduce el riesgo de que un malware, error o comando destructivo alcance simultáneamente originales y respaldo.

## Cómo usar la ayuda para aprender rsync

No hace falta memorizar todas las opciones. Hay que aprender a encontrarlas:

```bash
rsync --help
man rsync
```

Para filtrar palabras técnicas:

```bash
rsync --help | grep -i archive
rsync --help | grep -i verbose
rsync --help | grep -i dry-run
rsync --help | grep -i backup
rsync --help | grep -i delete
```

Método recomendado:

1. Extraer la acción de la consigna: copiar, conservar, borrar, simular o comprimir.
2. Traducir la palabra clave al inglés: `backup`, `delete`, `dry run`, `compress`.
3. Buscarla en `--help` o `man`.
4. Leer si la opción necesita un valor o una ruta.
5. Probar primero sobre carpetas descartables o con `--dry-run`.

Ejemplo:

```text
--dry-run, -n   perform a trial run with no changes made
```

Las palabras importantes son `trial run` (ejecución de prueba) y `no changes made` (sin realizar cambios).

## Prácticas recomendadas

### 1. Observar la transferencia incremental

Modificar el archivo original:

```bash
echo "Segunda línea" >> /tmp/practica-rsync/origen/documento.txt
rsync -av /tmp/practica-rsync/origen/ /tmp/practica-rsync/respaldo/
```

`>>` agrega contenido sin reemplazar lo anterior. `rsync` debería volver a transferir únicamente el archivo modificado.

### 2. Practicar la barra final

Usar dos destinos descartables y comparar:

```bash
rsync -av /tmp/practica-rsync/origen /tmp/destino-sin-barra/
rsync -av /tmp/practica-rsync/origen/ /tmp/destino-con-barra/
```

Después inspeccionar ambos árboles con `find` o `tree`.

### 3. Simular una eliminación

Crear un archivo descartable solamente en el destino y ejecutar:

```bash
rsync -av --delete --dry-run /tmp/practica-rsync/origen/ /tmp/practica-rsync/respaldo/
```

Leer qué eliminaría sin quitar todavía `--dry-run`.

### 4. Restaurar en otra carpeta

```bash
mkdir -p /tmp/practica-rsync/restaurado
rsync -av /tmp/practica-rsync/respaldo/ /tmp/practica-rsync/restaurado/
diff -r /tmp/practica-rsync/respaldo /tmp/practica-rsync/restaurado
```

Si `diff -r` no muestra diferencias, ambos árboles coinciden.

## Errores y precauciones

- Confirmar siempre cuál ruta es origen y cuál destino.
- Recordar que la barra final del origen modifica la estructura resultante.
- Utilizar `--dry-run` antes de `--delete` o de operar sobre información importante.
- No asumir que sincronizar equivale a conservar versiones históricas.
- Una copia en el mismo disco no protege contra una falla física del disco.
- No automatizar un comando hasta probarlo manualmente.
- Usar rutas absolutas en Cron y scripts.
- No guardar claves privadas SSH en repositorios o respaldos sin protección.
- SSH cifra la transferencia, no necesariamente los archivos almacenados.
- Revisar permisos y cifrado de los respaldos que contengan información sensible.
- Ejecutar comandos separados mientras se aprende para evitar que uno sea interpretado como argumento de otro.
- Verificar periódicamente que la restauración realmente funcione.

## Inglés técnico del módulo

- `backup` → copia de seguridad.
- `restore` → restaurar o recuperar desde una copia.
- `source` → origen.
- `destination` → destino.
- `archive mode` → modo que conserva estructura y atributos.
- `verbose` → salida detallada.
- `incremental` → transfiere o conserva cambios respecto de un estado anterior.
- `compression` → compresión.
- `remote host` → equipo remoto.
- `encrypted transfer` → transferencia cifrada.
- `key pair` → par de claves pública y privada.
- `passphrase` → frase que protege una clave.
- `schedule` → programar una ejecución.
- `trial run` / `dry run` → simulación sin aplicar cambios.
- `delete` → eliminar.
- `preserve` → conservar atributos o información.
- `trailing slash` → barra final de una ruta.
- `data loss` → pérdida de datos.

## Lo que más costó y cómo se entendió

La primera duda fue si un usuario común realmente necesita backups o si son exclusivos de empresas y servidores. Se comprendió que un usuario personal también enfrenta fallas de disco, borrados accidentales, corrupción, robo y malware. En este caso, los proyectos y documentos de `/home/tano` justifican una estrategia de respaldo, aunque debe seleccionarse qué carpetas son importantes y evitar copiar cachés innecesarias.

La segunda dificultad apareció en la práctica: `echo` y `rsync` quedaron pegados en la misma línea. Como no había separación, la shell no inició `rsync`; por eso el archivo nunca llegó al destino. El error posterior de `cat` fue una consecuencia, no la causa original. Se resolvió ejecutando un comando por vez y verificando cada resultado antes de continuar.

También debe reforzarse que una copia dentro del mismo disco ofrece protección limitada, que la barra final en el origen cambia la estructura copiada y que `--delete` puede convertir una sincronización equivocada en una pérdida de datos.

## Qué aprendí

Comprendí por qué los backups son importantes también para un usuario común y qué información de mi directorio personal podría necesitar recuperar. Aprendí la sintaxis básica de `rsync`, el significado de `-a` y `-v`, la diferencia producida por la barra final del origen y la forma de comprobar una copia con `ls` y `cat`. También distinguí sincronización de backup histórico, reconocí el riesgo de `--delete`, incorporé `--dry-run` como medida preventiva y entendí cómo intervienen SSH, claves y Cron en una copia remota automática.

## Para repasar o practicar

- Practicar la diferencia entre `origen` y `origen/`.
- Ejecutar el mismo `rsync` dos veces y observar qué se transfiere.
- Modificar un archivo y comprobar la actualización incremental.
- Simular `--delete` utilizando siempre `--dry-run`.
- Restaurar el respaldo en una carpeta nueva y compararlo con `diff -r`.
- Diseñar una estrategia personal siguiendo la regla 3-2-1.
- Decidir qué carpetas de `/home/tano` son importantes y cuáles deberían excluirse.
- Practicar búsquedas con `rsync --help | grep -i palabra`.
- Repasar el orden de los cinco campos de Cron.
- Recordar que crear el backup no alcanza: también hay que probar su restauración.
