# 29 de 30 — Solaris

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

Solaris es un sistema operativo Unix desarrollado originalmente por Sun Microsystems y adquirido posteriormente por Oracle. El objetivo del módulo no es aprender a administrarlo por completo, sino reconocer que Solaris comparte fundamentos Unix con Linux, pero no es una distribución Linux y utiliza herramientas propias.

```text
Conceptos Unix compartidos
├── jerarquía de directorios
├── usuarios, grupos y permisos
├── procesos y señales
├── sistemas de archivos y montajes
└── herramientas de shell

Implementaciones diferentes
├── kernel SunOS en lugar de Linux
├── SMF en lugar de systemd
├── IPS/pkg en Solaris 11
├── ZFS como tecnología central
├── Solaris Zones
└── truss y pfiles
```

Lo importante frente a un equipo desconocido es identificar primero el sistema y su versión. No se deben copiar comandos de Ubuntu, Arch o RHEL suponiendo que funcionarán igual en Solaris.

## Historia y uso

Solaris se hizo conocido por estabilidad, escalabilidad y administración de sistemas empresariales. Ha estado asociado con:

- Hardware SPARC y también plataformas x86.
- Bases de datos y aplicaciones críticas.
- Centros de datos.
- Alta disponibilidad y tolerancia a fallos.
- Virtualización y aislamiento.
- Entornos financieros, gubernamentales y empresariales.

Oracle Solaris es propietario. Existen descendientes abiertos del antiguo OpenSolaris dentro del ecosistema illumos, pero no deben confundirse automáticamente con Oracle Solaris: comparten historia y tecnologías, aunque sus versiones, paquetes y soporte pueden diferir.

## Tecnologías características

### ZFS

ZFS combina funciones de sistema de archivos y administración de almacenamiento. Entre sus capacidades aparecen:

- Pools de almacenamiento.
- Integridad mediante checksums.
- Snapshots.
- Clones.
- Compresión.
- Cuotas.
- Datasets.
- Reparación cuando existe redundancia adecuada.

ZFS nació en Sun/Solaris. Existe en otros sistemas, incluido Linux mediante implementaciones externas, pero no es correcto decir que las distribuciones Linux normalmente utilizan ZFS: ext4, XFS y Btrfs son opciones comunes según la distribución.

Comandos para reconocer:

```bash
zpool list
zpool status
zfs list
zfs get all dataset
```

### SMF

SMF significa **Service Management Facility**. Administra servicios y dependencias, de manera comparable en propósito general a systemd, aunque su diseño y sintaxis son diferentes.

Comandos:

```bash
svcs
svcs -xv
svcadm enable servicio
svcadm disable servicio
svcadm restart servicio
```

- `svcs`: muestra servicios y estados.
- `svcs -xv`: explica servicios con problemas y posibles causas.
- `svcadm`: cambia el estado de servicios.

ZFS y SMF no son alternativas entre sí:

```text
ZFS → almacenamiento y sistemas de archivos
SMF → administración de servicios
```

El texto de HTB los presenta en una comparación confusa; Solaris utiliza ambos.

### Solaris Zones

Las Zones proporcionan aislamiento a nivel del sistema operativo. Se parecen conceptualmente a contenedores porque comparten el kernel del host, pero pertenecen al ecosistema y modelo de administración de Solaris.

```text
Sistema Solaris global
├── global zone
├── zone de aplicación A
└── zone de aplicación B
```

No deben confundirse con máquinas virtuales completas, que ejecutan su propio kernel.

Comandos para reconocer:

```bash
zoneadm list -cv
zonecfg -z nombre info
```

### DTrace

DTrace permite observación dinámica del kernel y de aplicaciones. Puede investigar llamadas, tiempos y comportamiento sin instrumentar manualmente cada programa. Es potente y puede mostrar datos sensibles o afectar rendimiento si se utiliza sin cuidado.

### RBAC

RBAC significa **Role-Based Access Control**. Permite asignar capacidades administrativas mediante roles y perfiles en vez de entregar privilegios totales.

La idea coincide con mínimo privilegio:

```text
Persona → rol autorizado → comandos/capacidades necesarias
```

Solaris también puede soportar `sudo`; RBAC y sudo no deben presentarse como opciones mutuamente excluyentes en todas las versiones.

## Jerarquía de directorios

Solaris conserva una estructura Unix reconocible:

| Ruta | Función general |
|---|---|
| `/` | Raíz de toda la jerarquía |
| `/bin` | Comandos esenciales |
| `/boot` | Archivos relacionados con el arranque, según plataforma/versión |
| `/dev` | Representación de dispositivos |
| `/etc` | Configuración del sistema |
| `/home` | Directorios personales, aunque puede depender de la organización |
| `/kernel` | Componentes y módulos del kernel Solaris |
| `/lib` | Bibliotecas y componentes necesarios |
| `/mnt` | Montajes temporales |
| `/opt` | Software opcional |
| `/proc` | Información de procesos y kernel |
| `/sbin` | Herramientas administrativas |
| `/tmp` | Archivos temporales |
| `/usr` | Programas, bibliotecas y datos del sistema |
| `/var` | Datos variables, logs y colas |

Que una ruta exista en ambos sistemas no garantiza que tenga exactamente el mismo contenido, enlaces o políticas.

## Identificar el sistema

En Linux y Solaris puede utilizarse:

```bash
uname -a
```

En Solaris se encuentran además:

```bash
cat /etc/release
showrev -a
```

`showrev -a` puede mostrar:

- Hostname.
- Arquitectura del kernel.
- Versión del sistema.
- Plataforma de aplicaciones.
- Proveedor de hardware.
- Dominio.
- Versión y parches del kernel.

Antes de ejecutar instrucciones administrativas hay que responder:

```text
¿Es Solaris 10 o Solaris 11?
¿La arquitectura es SPARC o x86?
¿Es Oracle Solaris o un descendiente illumos?
¿Qué shell y PATH utiliza la sesión?
```

## Gestión de paquetes

El módulo mezcla generaciones de Solaris.

### Sistema tradicional SVR4

Ejemplo de paquetes antiguos:

```bash
pkgadd -d SUNWapchr
```

Herramientas históricas:

```bash
pkgadd
pkgrm
pkginfo
```

### Solaris 11 e IPS

Solaris 11 utiliza principalmente Image Packaging System:

```bash
pkg list
pkg search nombre
pkg info nombre
pkg install nombre
pkg update
```

No debe aprenderse `pkgadd` como si fuera el único gestor de todas las versiones. La versión del sistema determina qué documentación corresponde.

Comparación orientativa:

```text
Ubuntu/Debian → apt
CachyOS/Arch  → pacman
Solaris 11    → pkg / IPS
Solaris viejo → herramientas SVR4 como pkgadd
```

## Permisos

Solaris y Linux comparten los permisos Unix tradicionales.

```bash
chmod 700 archivo
```

`700` significa:

```text
Propietario → lectura, escritura y ejecución
Grupo       → sin permisos
Otros       → sin permisos
```

### Buscar SUID

El módulo compara:

```bash
find / -perm 4000
find / -perm -4000
```

La explicación correcta no es simplemente que Solaris tenga un sistema de permisos diferente. En variantes de `find`, la forma exacta y la forma “bits presentes” pueden tener significados distintos.

En GNU/Linux se utiliza comúnmente:

```bash
find / -type f -perm -4000 2>/dev/null
```

- `-type f`: solo archivos regulares.
- `-perm -4000`: el bit SUID está presente aunque existan otros bits.
- `2>/dev/null`: oculta errores de permisos; durante una auditoría formal puede ser preferible conservarlos.

En Solaris debe consultarse `man find` de esa versión. No hay que suponer que todas las variantes aceptan exactamente la misma sintaxis.

## NFS en Solaris

Compartir un directorio:

```bash
share -F nfs -o rw /export/home
```

- `share`: publica un recurso.
- `-F nfs`: selecciona NFS.
- `-o rw`: permite lectura y escritura según los demás controles.
- `/export/home`: directorio compartido.

Listar recursos NFS:

```bash
share -F nfs
```

Montar como cliente Solaris:

```bash
mount -F nfs servidor:/nfs_share /mnt/local
```

Una exportación `rw` no equivale a acceso libre para todos: también intervienen listas de clientes, identidad, permisos del sistema de archivos y modo de seguridad NFS.

### Corrección de versión

`/etc/dfs/dfstab` corresponde a mecanismos antiguos. En Solaris 11, `share` crea recursos persistentes y Oracle indica que ya no hace falta editar ese archivo; en Solaris 11.4 ya no se utiliza para este fin. Antes de modificar NFS hay que consultar documentación de la versión exacta.

Referencia: `https://docs.oracle.com/en/operating-systems/solaris/oracle-solaris/11.4/manage-nfs/automatic-file-system-sharing.html`

## Archivos abiertos por procesos

En Linux se utiliza frecuentemente:

```bash
sudo lsof -c apache2
sudo lsof -p PID
```

En Solaris:

```bash
pfiles PID
```

El ejemplo del módulo combina `pfiles` con `pgrep`:

```bash
pfiles $(pgrep httpd)
```

Hay que tener cuidado: `pgrep` puede devolver varios PID. Es mejor comprobarlos primero:

```bash
pgrep -fl httpd
```

`pfiles` puede mostrar:

- Descriptores abiertos.
- Archivos.
- Sockets.
- Tipo de descriptor.
- Direcciones y puertos, según el recurso.

## `truss` y `strace`

En Solaris:

```bash
truss ls
truss -p PID
```

`truss` observa llamadas al sistema, señales y fallos del proceso. Sirve para investigar:

- Archivos que intenta abrir una aplicación.
- Errores de permisos.
- Esperas o bloqueos.
- Conexiones.
- Llamadas que fallan y sus códigos de retorno.

En Linux, la herramienta comparable es:

```bash
strace programa
strace -p PID
strace -f programa
```

`-f` sigue procesos hijos. El texto de HTB afirma que `strace` no puede seguir hijos o señales, pero esa comparación es incorrecta: `strace` posee soporte para procesos hijos y también informa señales.

Precauciones:

- La salida puede contener rutas, argumentos, datos y secretos.
- Adjuntarse a procesos requiere permisos.
- El tracing puede modificar tiempos y rendimiento.
- Debe hacerse con autorización.

## Comparación de comandos

| Tarea | Linux habitual | Solaris |
|---|---|---|
| Información general | `uname -a` | `uname -a`, `showrev -a`, `/etc/release` |
| Servicios | `systemctl` | `svcs`, `svcadm` |
| Paquetes modernos | `apt`, `dnf`, `pacman` | `pkg`/IPS en Solaris 11 |
| Archivos abiertos | `lsof` | `pfiles` |
| Llamadas del sistema | `strace` | `truss` |
| Montajes persistentes | `/etc/fstab` | `/etc/vfstab` |
| Virtualización ligera | namespaces/contenedores | Solaris Zones |
| Roles/perfiles | sudo, polkit, capabilities | RBAC y perfiles de derechos |

La tabla ayuda a orientarse, pero no implica equivalencia exacta de opciones o funcionamiento.

## Método ante un Solaris desconocido

1. Identificar versión, arquitectura y variante.
2. Consultar `man` local antes de copiar comandos.
3. Enumerar servicios con SMF.
4. Identificar gestor de paquetes.
5. Revisar ZFS, pools y datasets sin modificar.
6. Revisar zones y roles administrativos.
7. Mapear procesos, archivos y sockets.
8. Verificar NFS y otros servicios expuestos.
9. Registrar comandos y resultados.
10. Evitar aplicar instrucciones de otra versión.

Consultas iniciales de solo lectura:

```bash
uname -a
cat /etc/release
showrev -a
svcs -xv
pkg list
zpool status
zfs list
zoneadm list -cv
```

La disponibilidad depende de la versión y configuración.

## Errores y precauciones

- No llamar a Solaris una distribución Linux.
- No comparar ZFS con SMF; resuelven problemas distintos.
- No asumir que Solaris 10 y 11 utilizan la misma gestión de paquetes.
- No editar `/etc/dfs/dfstab` en Solaris 11 siguiendo instrucciones antiguas.
- No copiar opciones de GNU/Linux sin consultar el manual de Solaris.
- No asumir que una ruta Unix contiene exactamente lo mismo en ambos sistemas.
- No concluir que `pkgadd` es el gestor moderno principal de Solaris 11.
- No rastrear procesos críticos con `truss` sin autorización y evaluación de impacto.
- No compartir una exportación NFS con `rw` sin restricciones y revisión de permisos.
- No confundir Zones con máquinas virtuales completas.

## Uso de la ayuda

En Solaris, las páginas locales son fundamentales porque muestran la sintaxis de la versión instalada:

```bash
man showrev
man pkg
man svcs
man svcadm
man zfs
man zpool
man share
man pfiles
man truss
man find
```

Antes de utilizar un ejemplo de Internet hay que comparar su versión y fecha con:

```bash
cat /etc/release
showrev -a
```

## Inglés técnico del módulo

- `proprietary` → propietario; controlado por un proveedor.
- `mission-critical` → crítico para el funcionamiento de una organización.
- `high availability` → alta disponibilidad.
- `fault tolerance` → tolerancia a fallos.
- `scalability` → capacidad de crecer manteniendo funcionamiento.
- `pool` → conjunto de almacenamiento administrado por ZFS.
- `dataset` → unidad lógica dentro de ZFS.
- `snapshot` → instantánea de un estado.
- `service management` → administración de servicios.
- `role-based access control` → control de acceso basado en roles.
- `system call` → llamada de un programa al kernel.
- `child process` → proceso hijo.
- `file descriptor` → identificador de archivo, socket u otro recurso abierto.
- `trace` → rastrear ejecución o eventos.
- `share` → recurso/directorio compartido.

## Lo que más hay que remarcar

Este módulo es un repaso comparativo y no tiene la misma prioridad práctica inmediata que Linux, redes, seguridad, firewalls o logs para la ruta actual. Lo esencial es reconocer que:

```text
Solaris es Unix, pero no Linux.
```

Y asociar estas tecnologías:

```text
ZFS    → almacenamiento
SMF    → servicios
Zones  → aislamiento/virtualización ligera
IPS    → paquetes modernos
RBAC   → delegación por roles
pfiles → archivos y sockets de procesos
truss  → llamadas al sistema
```

## Qué aprendí

Comprendí que Solaris comparte fundamentos Unix con Linux, pero posee kernel, herramientas y modelos de administración propios. Reconocí ZFS, SMF, Solaris Zones, DTrace, RBAC e IPS; comparé `showrev`, `pkg`, `svcs`, `pfiles` y `truss` con herramientas conocidas de Linux. También aprendí a identificar mezclas entre Solaris 10 y 11 y a consultar la documentación de la versión antes de utilizar comandos antiguos.

## Para repasar o practicar

- Memorizar la función, no toda la sintaxis, de ZFS, SMF, Zones, IPS y RBAC.
- Practicar la tabla comparativa Linux/Solaris.
- Reconocer diferencias entre Solaris 10 y Solaris 11.
- Investigar un entorno Solaris o illumos solamente si aparece en laboratorios futuros.
- Reforzar `pfiles` frente a `lsof` y `truss` frente a `strace`.
- Consultar siempre `man` y `/etc/release` antes de usar instrucciones de otra versión.
