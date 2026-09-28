# 22 de 30 — File System Management

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

Administrar sistemas de archivos significa entender cómo Linux organiza, identifica y hace accesibles los datos almacenados en discos, SSD, dispositivos USB y otros medios.

La relación fundamental es:

```text
Disco físico
└── Partición
    └── Sistema de archivos
        └── Punto de montaje
            └── Directorios y archivos
```

Estos conceptos no son sinónimos:

- Un **disco** es el dispositivo completo.
- Una **partición** es una división lógica del disco.
- Un **sistema de archivos** define cómo se organizan los datos dentro de una partición.
- Un **punto de montaje** es el directorio donde Linux hace accesible ese sistema de archivos.

## La jerarquía única de Linux

Linux presenta todos sus sistemas de archivos dentro de un solo árbol que comienza en `/`:

```text
/
├── home
├── datos
├── mnt
├── var
└── ...
```

Un directorio de ese árbol puede mostrar datos que físicamente se encuentran en otro disco. Por ejemplo, en PerlaNegra:

```text
/dev/sda4      → ext4 → /
/dev/sda5      → ext4 → /datos
/dev/nvme0n1p2 → ext4 → /mnt/docker
```

Al entrar en `/datos`, se accede al sistema de archivos de `/dev/sda5`. El usuario ve un árbol continuo, aunque debajo existan varios dispositivos.

## Discos y particiones

Nombres habituales de discos:

```text
/dev/sda       primer disco SATA/SCSI detectado
/dev/sdb       segundo disco SATA/SCSI detectado
/dev/nvme0n1   primer dispositivo NVMe
```

Las particiones agregan un número:

```text
/dev/sda4       partición 4 de /dev/sda
/dev/nvme0n1p2  partición 2 de /dev/nvme0n1
```

En PerlaNegra se observaron discos SATA y NVMe, además de sistemas `ext4`, `NTFS`, `vfat` y `swap`.

### Consultar sin modificar

```bash
lsblk
lsblk -f
```

- `lsblk` muestra dispositivos de bloques y su relación jerárquica.
- `-f` agrega información de sistemas de archivos, UUID, etiquetas y montajes.

Otra consulta útil:

```bash
sudo fdisk -l
```

- `fdisk` administra tablas de particiones.
- `-l` significa `list`: sólo enumera discos y particiones.

`fdisk -l` es una consulta, pero abrir `fdisk /dev/disco` en modo interactivo permite modificar particiones. No se debe escribir cambios sin un plan y un respaldo verificado.

## Sistemas de archivos

Un sistema de archivos define cómo se registran nombres, directorios, metadatos, espacio libre y bloques de datos.

| Sistema | Características principales |
|---|---|
| `ext2` | Antiguo y sin journaling; menor sobrecarga, pero menos recuperación tras fallas. |
| `ext3` | Evolución de ext2 con journaling. |
| `ext4` | Muy usado en Linux; equilibrio entre rendimiento, estabilidad y capacidad. |
| `XFS` | Buen rendimiento con archivos grandes y cargas intensivas de entrada/salida. |
| `Btrfs` | Subvolúmenes, snapshots, checksums y funciones avanzadas de almacenamiento. |
| `NTFS` | Nativo de Windows; útil para discos compartidos entre Windows y Linux. |
| `vfat/FAT32` | Muy compatible; común en dispositivos extraíbles y particiones EFI. |

No existe un sistema de archivos universalmente mejor. La elección depende de estabilidad, rendimiento, integridad, compatibilidad, snapshots y tamaño de archivos o volúmenes.

### Journaling

El **journaling** registra operaciones del sistema de archivos antes o durante su aplicación. Después de un apagado inesperado, ese diario ayuda a recuperar coherencia más rápidamente.

No es un backup:

```text
Journaling → ayuda a mantener o recuperar la estructura del sistema de archivos.
Backup     → permite recuperar datos desde otra copia.
```

## Tipos de archivos

El módulo destaca tres categorías:

1. Archivos regulares.
2. Directorios.
3. Enlaces simbólicos.

### Archivos regulares

Contienen texto o datos binarios:

```text
documento.txt
foto.jpg
programa
script.py
```

Pueden existir en cualquier parte del árbol para la que haya permisos adecuados; no viven únicamente en `/`.

### Directorios

Un directorio organiza nombres y referencias hacia otros archivos o directorios. El directorio que contiene un elemento se denomina su directorio padre.

```text
/home/tano/proyectos/cyberstudy
                 └── proyecto contenido dentro de su directorio padre
```

## Inodes

Un inode es una estructura que almacena metadatos de un archivo o directorio:

- Tipo de archivo.
- Propietario y grupo.
- Permisos.
- Tamaño.
- Fechas.
- Cantidad de enlaces.
- Referencias a los bloques donde están los datos.

El inode normalmente **no guarda el nombre del archivo**. La entrada del directorio relaciona un nombre con un número de inode.

Para verlo:

```bash
ls -li
```

El primer número de cada línea es el inode. También puede consultarse un archivo concreto:

```bash
stat archivo.txt
```

La tabla de inodes tiene una capacidad. Un sistema puede quedarse sin inodes por acumular millones de archivos pequeños aunque todavía queden gigabytes libres.

Comparación:

```bash
df -h /
df -i /
```

- `df -h` muestra espacio de almacenamiento en unidades legibles.
- `df -i` muestra uso y disponibilidad de inodes.

En PerlaNegra se observó aproximadamente:

```text
Partición raíz: 226 GB
Uso de espacio: 85%
Uso de inodes: 15%
```

Por lo tanto, el límite más cercano era el espacio en bytes, no la cantidad de inodes.

## Enlaces simbólicos

Un enlace simbólico o **symlink** es un archivo especial que contiene una ruta hacia otro archivo o directorio. Se parece a un acceso directo:

```text
enlace → ruta del archivo original
```

Crear un archivo y un enlace simbólico:

```bash
echo "contenido original" > original.txt
ln -s original.txt acceso.txt
```

- `ln` crea enlaces.
- `-s` indica que será simbólico.
- `original.txt` es el objetivo.
- `acceso.txt` es el nombre del enlace.

Comprobarlo:

```bash
ls -li original.txt acceso.txt
readlink acceso.txt
cat acceso.txt
```

Una salida de `ls -l` puede mostrar:

```text
acceso.txt -> original.txt
```

Al abrir `acceso.txt`, Linux sigue la ruta y accede al original. Si el original se mueve o elimina, el symlink puede quedar roto:

```text
acceso.txt → original.txt inexistente
```

### Rutas relativas y absolutas en symlinks

Enlace relativo:

```bash
ln -s original.txt acceso.txt
```

La ruta se interpreta desde el directorio donde vive el enlace.

Enlace absoluto:

```bash
ln -s /ruta/completa/original.txt acceso.txt
```

Apunta a una ubicación completa. Puede ser claro dentro del mismo sistema, pero se rompe si el árbol se mueve a otra máquina o ruta.

### Enlace simbólico frente a enlace duro

Aunque el módulo se concentra en symlinks, conviene distinguirlos:

| Enlace simbólico | Enlace duro |
|---|---|
| Tiene su propio inode. | Comparte el inode del archivo original. |
| Guarda una ruta al objetivo. | Es otro nombre para los mismos datos. |
| Puede apuntar a directorios. | Normalmente no se usa con directorios. |
| Puede cruzar sistemas de archivos. | No puede cruzar sistemas de archivos. |
| Puede quedar roto si desaparece el objetivo. | Los datos continúan mientras exista al menos un enlace duro. |

Enlace duro:

```bash
ln original.txt otro-nombre.txt
```

`ls -li` muestra el mismo inode para ambos nombres.

Los enlaces no duplican automáticamente el contenido como una copia de seguridad. Un symlink que apunta a un archivo perdido no permite recuperarlo.

## Montaje

Montar significa asociar un sistema de archivos con un directorio del árbol de Linux:

```text
dispositivo o recurso → punto de montaje
```

Ejemplo conceptual:

```bash
sudo mount /dev/sdb1 /mnt/usb
```

- `/dev/sdb1` es la partición.
- `/mnt/usb` es el punto de montaje.
- Después del montaje, el contenido se consulta entrando en `/mnt/usb`.

El punto de montaje debe existir:

```bash
sudo mkdir -p /mnt/usb
```

Pero no debe ejecutarse `mount` copiando ciegamente `/dev/sdb1`: primero hay que identificar el dispositivo real con `lsblk -f`. En la computadora de Tano, `/dev/sdb1` corresponde a un disco NTFS de gran tamaño, no necesariamente a un USB descartable.

### Ver sistemas montados

```bash
mount
findmnt
findmnt /
```

`mount` sin argumentos produce una lista extensa que incluye sistemas virtuales. `findmnt` suele presentar la jerarquía de manera más legible.

Para consultar espacio:

```bash
df -h
df -h /datos
```

`lsblk` responde principalmente “qué dispositivos existen y dónde están montados”; `df` responde “cuánto espacio tiene y usa un sistema montado”.

### Qué ocurre si el punto de montaje ya contiene archivos

Si se monta un sistema sobre un directorio que ya contiene archivos, esos archivos quedan temporalmente ocultos mientras el montaje esté activo. No se eliminan, pero no serán visibles hasta desmontar. Por eso conviene utilizar un directorio vacío como punto de montaje.

## Desmontaje seguro

Para desconectar el sistema de archivos del árbol:

```bash
sudo umount /mnt/usb
```

El comando se llama `umount`, sin `n` después de la `u`.

No debe retirarse físicamente un almacenamiento mientras todavía está montado: Linux puede tener escrituras pendientes en caché.

Si aparece `target is busy`, algún proceso utiliza el punto de montaje. Puede ser incluso una terminal cuyo directorio actual sea `/mnt/usb`.

Comprobaciones:

```bash
lsof +D /mnt/usb
fuser -vm /mnt/usb
```

Después hay que cerrar o detener conscientemente los procesos implicados, salir del directorio y volver a intentar el desmontaje. No conviene matar procesos sin identificarlos.

## Montaje automático con `/etc/fstab`

`/etc/fstab` describe sistemas que deben montarse con opciones determinadas, normalmente durante el arranque.

Consulta segura:

```bash
cat /etc/fstab
```

Formato general:

```text
dispositivo  punto_montaje  tipo  opciones  dump  pass
```

Ejemplo:

```fstab
UUID=abcd-1234 /datos ext4 defaults 0 2
```

Campos:

1. Dispositivo, preferentemente mediante UUID.
2. Punto de montaje.
3. Tipo de sistema de archivos.
4. Opciones de montaje.
5. Campo histórico para `dump`.
6. Orden de comprobación con `fsck` durante el arranque.

Se prefiere `UUID=` porque nombres como `/dev/sdb1` pueden cambiar según el orden de detección de dispositivos.

Para consultar UUID:

```bash
lsblk -f
sudo blkid
```

Opciones mencionadas:

- `defaults`: conjunto habitual de opciones predeterminadas.
- `rw`: lectura y escritura.
- `ro`: sólo lectura.
- `noauto`: no montar automáticamente durante el arranque.
- `user`: permitir que un usuario común monte el recurso bajo ciertas condiciones.

Editar mal `/etc/fstab` puede provocar fallas o demoras de arranque. Antes de reiniciar, una configuración modificada debe validarse cuidadosamente. En este módulo sólo se inspeccionó el archivo; no se lo modificó.

## Swap

La swap es espacio que el kernel puede utilizar para alojar páginas de memoria que no necesitan permanecer inmediatamente en la RAM.

```text
RAM  → rápida, usada por procesos y caché activos
Swap → apoyo más lento o memoria comprimida, según su tipo
```

Puede existir como:

- Partición dedicada.
- Archivo de swap.
- Dispositivo comprimido en RAM mediante zram.

El módulo presenta:

```bash
mkswap DISPOSITIVO_O_ARCHIVO
swapon DISPOSITIVO_O_ARCHIVO
```

- `mkswap` prepara un área como swap.
- `swapon` la activa.

`mkswap` es destructivo si se apunta al dispositivo equivocado: reemplaza las estructuras existentes por una cabecera de swap. No debe practicarse sobre discos reales sin un entorno descartable y una identificación exacta.

### Swap en una computadora con 32 GB de RAM

Tener mucha RAM reduce la probabilidad de necesitar swap intensamente, pero no vuelve automáticamente inútil a la swap.

Puede servir para:

- Dar margen ante un consumo inesperado.
- Mover páginas inactivas y reservar RAM para procesos o caché útiles.
- Reducir la posibilidad de que el kernel mate inmediatamente un proceso por falta de memoria.
- Permitir hibernación, si el sistema está configurado para ello y existe capacidad suficiente.

La conclusión correcta no es “siempre es obligatoria”, sino:

> Con 32 GB de RAM, la swap probablemente se utilizará poco durante un uso normal, pero mantener una cantidad razonable —especialmente zram— puede aportar un margen útil. La necesidad y el tamaño dependen de la carga, la hibernación y la configuración del sistema.

En PerlaNegra se observó:

```text
/dev/zram0 → 31,1 GB de swap comprimida; uso mínimo en ese momento
/dev/sda3  → 8 GB de swap en disco; sin uso en ese momento
```

Zram comprime páginas dentro de la RAM. Aunque sigue utilizando memoria, los datos comprimidos pueden ocupar menos y suele ser mucho más rápida que la swap en disco.

Consultas seguras:

```bash
free -h
swapon --show
sysctl vm.swappiness
```

`swappiness` expresa una preferencia del kernel, no un porcentaje exacto de RAM a partir del cual comienza la swap.

Usar unos pocos megabytes de swap no significa que falte RAM. En cambio, un uso intenso acompañado de lentitud constante merece investigar la presión de memoria.

## Hibernación

Al hibernar, Linux guarda el estado necesario de la sesión en almacenamiento persistente y apaga el equipo. Al encenderlo, intenta recuperar ese estado.

La hibernación requiere una configuración compatible, capacidad suficiente y parámetros adecuados de reanudación. Tener swap por sí solo no garantiza que la hibernación funcione.

Zram por sí sola no conserva datos después de apagar el equipo porque vive en RAM. Para hibernar normalmente se necesita un destino persistente, como una partición o archivo de swap en disco, configurado correctamente.

## Comandos de consulta y ayuda

Comandos seguros para reconocer el sistema:

```bash
lsblk -f
findmnt
findmnt /
df -h /
df -i /
swapon --show
free -h
cat /etc/fstab
```

Ayuda integrada:

```bash
lsblk --help
findmnt --help
mount --help
umount --help
swapon --help
man fstab
man ln
```

Filtros para practicar inglés técnico:

```bash
lsblk --help | grep -i filesystem
findmnt --help | grep -i target
mount --help | grep -i read
ln --help | grep -i symbolic
swapon --help | grep -i show
```

Durante la consulta real, una combinación avanzada de opciones de `swapon` no fue aceptada por la versión instalada. Se volvió al comando compatible:

```bash
swapon --show
```

Esto recuerda que ejemplos de Internet o de otra distribución pueden variar. Cuando una opción falla, se consulta `comando --help` en la máquina real.

## Prácticas seguras recomendadas

### 1. Reconocer el almacenamiento

```bash
lsblk -f
findmnt /
df -h /
df -i /
```

Identificar dispositivo, partición, sistema de archivos, montaje, espacio e inodes sin cambiar nada.

### 2. Practicar symlinks en `/tmp`

```bash
mkdir -p /tmp/practica-enlaces
cd /tmp/practica-enlaces
echo "archivo original" > original.txt
ln -s original.txt acceso.txt
ls -li
readlink acceso.txt
cat acceso.txt
```

Después renombrar el original y observar el enlace roto:

```bash
mv original.txt renombrado.txt
cat acceso.txt
```

La práctica es segura porque ocurre en una carpeta temporal.

### 3. Comparar espacio e inodes

```bash
df -h /
df -i /
```

Explicar cuál de los dos recursos está más cerca de agotarse.

### 4. Leer montajes persistentes

```bash
cat /etc/fstab
lsblk -f
```

Relacionar los UUID del archivo con los dispositivos reales, sin editarlo.

## Errores y precauciones

- No confundir disco, partición, sistema de archivos y punto de montaje.
- `fdisk -l` lista; el modo interactivo de `fdisk` puede modificar particiones.
- `mkfs` formatea un sistema de archivos y destruye la estructura anterior del destino.
- `mkswap` también modifica el dispositivo o archivo indicado.
- Nunca copiar nombres como `/dev/sdb1` de un tutorial sin comprobar `lsblk -f` en la máquina real.
- Un directorio usado como punto de montaje debería estar vacío para evitar ocultar temporalmente sus archivos.
- No retirar físicamente un dispositivo antes de desmontarlo.
- Si `umount` indica que está ocupado, identificar los procesos antes de cerrarlos.
- No editar `/etc/fstab` sin copia, validación y un procedimiento de recuperación.
- Un enlace simbólico no es un backup y puede romperse si cambia el objetivo.
- La swap no sustituye a la RAM y la swap en disco es mucho más lenta.
- No asumir que más RAM obliga a eliminar la swap ni que todos los equipos necesitan la misma cantidad.

## Inglés técnico del módulo

- `file system` → sistema de archivos.
- `disk` / `drive` → disco o unidad.
- `partition` → partición.
- `mount` → montar o asociar un sistema de archivos.
- `mount point` → directorio donde se hace accesible.
- `unmount` → desmontar.
- `block device` → dispositivo de bloques.
- `inode` → estructura de metadatos de un archivo.
- `metadata` → datos que describen otros datos.
- `regular file` → archivo regular.
- `directory` → directorio.
- `symbolic link` / `symlink` → enlace simbólico.
- `hard link` → enlace duro.
- `target` → objetivo de un enlace o montaje.
- `journaling` → registro de operaciones del sistema de archivos.
- `read-only` → sólo lectura.
- `read-write` → lectura y escritura.
- `swap space` → espacio de intercambio.
- `hibernation` → hibernación.
- `out of space` → sin espacio disponible.
- `target is busy` → el punto está siendo usado por un proceso.

## Lo que más costó y cómo se entendió

La duda principal fue si la swap deja de ser necesaria cuando una computadora tiene 32 GB de RAM. Se comprendió que una cantidad grande de RAM reduce su uso esperado, pero que la swap puede seguir dando margen, colaborar con la administración de páginas inactivas y ser necesaria para determinados esquemas de hibernación. No existe una regla universal: depende de la carga y la configuración.

También se reforzó que zram y swap en disco no son iguales. Zram utiliza RAM comprimida y es rápida; una partición de swap es persistente y más lenta. En el momento de la consulta, PerlaNegra casi no utilizaba ninguna, señal de que había memoria suficiente, no de que la configuración estuviera mal.

Los montajes se entendieron como el puente entre una partición y un directorio visible. `/datos` parece un directorio común, pero expone el contenido de otra partición. Los symlinks se entendieron como archivos que guardan una ruta: facilitan el acceso, pero no duplican ni protegen el contenido.

## Qué aprendí

Aprendí a diferenciar discos, particiones, sistemas de archivos y puntos de montaje; reconocí los sistemas ext4, XFS, Btrfs, NTFS y vfat; comprendí el propósito del journaling y los inodes; y comparé espacio disponible con disponibilidad de inodes. Entendí cómo funcionan los enlaces simbólicos, por qué pueden quedar rotos y cómo se diferencian de los enlaces duros. También comprendí el montaje manual, el desmontaje seguro, la función de `/etc/fstab`, el uso de UUID y el papel de la swap y zram en una computadora con suficiente RAM.

## Para repasar o practicar

- Dibujar la cadena disco → partición → sistema de archivos → montaje.
- Relacionar las particiones reales de PerlaNegra con `/`, `/datos` y `/mnt/docker`.
- Comparar `lsblk`, `findmnt`, `df -h` y `df -i`.
- Crear y romper intencionalmente un symlink dentro de `/tmp`.
- Comparar el inode de un symlink, un enlace duro y el archivo original.
- Recordar por qué un symlink no es una copia de seguridad.
- Leer los seis campos de una entrada de `/etc/fstab` sin modificarla.
- Repasar qué significa `target is busy` al desmontar.
- Diferenciar swap en disco de zram.
- Consultar opciones con `--help` y términos como `filesystem`, `target`, `symbolic` y `show`.
