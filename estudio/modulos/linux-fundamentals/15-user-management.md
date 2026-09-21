# 15 de 30 — User Management

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Resumen

La administración de usuarios permite crear cuentas, modificar sus propiedades, asignarlas a grupos y controlar con qué privilegios pueden trabajar. Separar usuarios y permisos ayuda a proteger el sistema y evita usar `root` innecesariamente.

Cada usuario tiene un identificador numérico llamado **UID** y cada grupo un **GID**. Una cuenta tiene un grupo principal y puede pertenecer a varios grupos secundarios. Los permisos que recibe dependen de su identidad, de esos grupos y de las reglas configuradas en el sistema.

Para consultar esta información:

```bash
whoami
id
id alex
groups alex
getent passwd alex
getent group developers
```

- `whoami` muestra el usuario actual.
- `id` muestra UID, GID y grupos.
- `groups` muestra las pertenencias a grupos.
- `getent` consulta las bases de usuarios y grupos que reconoce el sistema.

Comandos principales:

```bash
sudo
su
useradd
userdel
usermod
addgroup
delgroup
passwd
```

`useradd` crea una cuenta nueva. La opción `-m` crea también su directorio personal:

```bash
sudo useradd -m alex
```

Después se puede establecer una contraseña:

```bash
sudo passwd alex
```

La diferencia principal es:

```text
useradd → crea una cuenta nueva
usermod → modifica una cuenta existente
userdel → elimina una cuenta
```

`usermod` modifica una cuenta existente. Para agregarla a un grupo secundario sin quitar los anteriores:

```bash
sudo usermod -aG developers alex
```

En `-aG`:

- `-G` define grupos secundarios.
- `-a` significa *append*: agrega sin reemplazar los grupos anteriores.

Usar solamente `-G` puede quitar al usuario de otros grupos secundarios por accidente.

Para bloquear una cuenta, la opción corta es `-L` y la versión larga es `--lock`:

```bash
sudo usermod --lock alex
```

La forma corta y la larga representan la misma opción:

```text
-L       forma corta
--lock   forma larga
```

Bloquear una cuenta no equivale necesariamente a borrar al usuario ni a cerrar todas sus sesiones existentes. Para revertir el bloqueo se utiliza la opción de desbloqueo correspondiente, que puede encontrarse con `usermod --help`.

`sudo` ejecuta un comando con privilegios de otro usuario, normalmente `root`. `su` cambia de identidad y también puede ejecutar un único comando mediante su opción larga correspondiente.

Ejemplos:

```bash
sudo cat /etc/shadow
sudo -u alex whoami
su - alex
```

- `sudo comando` suele ejecutar ese comando como `root` si la política lo permite.
- `sudo -u alex comando` lo ejecuta como `alex`.
- `su - alex` abre una sesión como `alex` y carga su entorno de inicio.

El archivo `/etc/shadow` contiene información sensible relacionada con contraseñas. Un usuario común recibe `Permission denied`; no debe copiarse ni guardarse su contenido real en los apuntes.

## Punto que más costó

La última pregunta pedía la opción larga de `su` para ejecutar un comando como otro usuario. Costó interpretar que no preguntaba simplemente cómo cambiar de usuario, sino cómo pasar **un único comando** a la shell iniciada por `su`.

Para investigarlo:

```bash
su --help | grep -i command
```

La descripción en inglés que había que reconocer era parecida a:

```text
pass a single command to the shell
```

La clave es separar estas dos ideas:

```text
su usuario            → cambia la sesión a ese usuario
su [opción] comando   → ejecuta un comando mediante la shell de ese usuario
```

No hay que confundir `sudo` con `su`:

```text
sudo → eleva o cambia los privilegios de un comando concreto
su   → cambia de identidad o inicia una shell como otro usuario
```

## Aprender usando `--help`

No es necesario memorizar todas las opciones. Una práctica importante es consultar la ayuda y filtrarla:

```bash
useradd --help | grep -i home
usermod --help | grep -i lock
su --help | grep -i command
```

Para interpretar la ayuda en inglés conviene buscar primero el verbo y el objeto:

- `create` → crear
- `modify` → modificar
- `delete` → eliminar
- `lock` → bloquear
- `execute` / `run` → ejecutar
- `command` → comando
- `user account` → cuenta de usuario
- `home directory` → directorio personal
- `group` → grupo
- `shell` → intérprete de comandos

Las opciones cortas normalmente tienen un guion (`-L`) y las largas dos (`--lock`). Si HTB pide *long version*, hay que responder la forma con `--`.

## Ejercicio seguro de práctica

Realizar únicamente en una máquina descartable o laboratorio propio:

```bash
sudo useradd -m practica
id practica
sudo passwd practica
sudo usermod -aG developers practica
groups practica
sudo usermod --lock practica
```

Para eliminar una cuenta de práctica junto con su directorio personal existe una opción de `userdel`, pero es una operación destructiva. Antes de usarla, consultar:

```bash
userdel --help
```

No practicar creación, bloqueo o eliminación de usuarios en una computadora importante sin comprender cada comando.

## Qué aprendí

- Diferencié `useradd`, `usermod` y `userdel`.
- Comprendí la relación entre usuarios, grupos y permisos.
- Aprendí por qué `/etc/shadow` está protegido y cuándo se utiliza `sudo`.
- Practiqué cómo encontrar opciones mediante `--help` y `grep`.
- Empecé a interpretar descripciones técnicas en inglés en lugar de depender solamente de la traducción.

## Para repasar

- Diferencia entre cambiar de usuario y ejecutar un único comando con `su`.
- Diferencia entre las formas corta y larga de una opción.
- Uso seguro de `usermod -aG` para no reemplazar grupos secundarios existentes.
- Lectura habitual de `--help` en inglés.
