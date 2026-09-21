# 16 de 30 — Package Management

**Estado:** Repasar
**Curso:** Linux Fundamentals
**Plataforma:** Hack The Box Academy

## Idea principal

Un paquete es un archivo que agrupa los binarios de un programa, sus archivos de configuración, la información sobre qué otros paquetes necesita (dependencias) y un registro de versión para poder actualizarlo o desinstalarlo después. Los gestores de paquetes existen para automatizar la descarga, instalación, resolución de dependencias y eliminación de ese software, en vez de tener que hacerlo manualmente copiando archivos por el sistema.

Esto es central en seguridad porque tanto para administrar un sistema propio como para armar o mantener una distribución de pentesting (Kali, Parrot) hace falta saber instalar herramientas que no siempre vienen empaquetadas de forma prolija.

## Conceptos importantes

**Paquete:** archivo que contiene binarios, configuración, metadatos de dependencias y control de versión. En Debian/Ubuntu/Kali/Parrot el formato es `.deb`.

**Repositorio:** servidor remoto donde están alojados los paquetes disponibles para una distribución. Puede tener distintas ramas de estabilidad: `stable`, `testing`, `unstable` (en Parrot aparece como `rolling`). La mayoría de las distros usan por defecto el repositorio más estable ("main").

**Dependencia:** paquete adicional que necesita otro paquete para funcionar. Si falta, el gestor de alto nivel (apt) la detecta y la resuelve solo; el gestor de bajo nivel (dpkg) no resuelve dependencias automáticamente, solo avisa el error.

**Cache de APT:** base de datos local que guarda información de los paquetes disponibles en los repositorios configurados. Permite buscar y consultar detalles de paquetes sin depender de internet en el momento de la consulta (aunque para instalar sí hace falta conexión).

**Gestores de paquetes según el "nivel" y el ecosistema:**

| Herramienta | Nivel / ecosistema | Qué hace |
|---|---|---|
| `dpkg` | Bajo nivel, Debian | Instala/quita un `.deb` puntual, sin resolver dependencias solo |
| `apt` | Alto nivel, Debian | Interfaz de línea de comandos que busca en repos, resuelve dependencias, instala/actualiza/quita |
| `aptitude` | Alto nivel, Debian | Alternativa a `apt`, mismo motor de fondo |
| `pacman` | Alto y bajo nivel, Arch/CachyOS | Equivalente a apt+dpkg combinados |
| `snap` | Paquetes autocontenidos | Trae sus propias dependencias empaquetadas, independiente de la distro |
| `pip` | Ecosistema Python | Instala paquetes de Python que no están en los repos de la distro |
| `gem` | Ecosistema Ruby | Instala paquetes de RubyGems |
| `git` | No es un gestor de paquetes | Se usa para clonar herramientas directo desde un repositorio (ej. GitHub), sin pasar por ningún sistema de paquetes |

## Comandos y opciones

```bash
apt list --installed
```
Lista los paquetes efectivamente instalados en el sistema según el registro de apt.

```bash
apt search nginx
apt-cache search impacket
```
Buscan paquetes por nombre o descripción en los repositorios configurados. `apt-cache search` trabaja contra la base local (cache de APT).

```bash
apt-cache show impacket-scripts
```
Muestra el detalle de un paquete disponible: versión, dependencias (`Depends:`), tamaño, y de qué archivo/repo viene, sin necesidad de instalarlo.

```bash
sudo apt install nginx
sudo apt install impacket-scripts -y
```
Instala un paquete y resuelve automáticamente las dependencias que falten. `-y` responde "sí" a la confirmación sin preguntar.

```bash
sudo apt remove nginx
sudo apt purge nginx
```
`remove` desinstala el programa pero puede conservar archivos de configuración. `purge` además elimina esa configuración gestionada por el paquete.

```bash
dpkg-query -W
```
Consulta la base local de dpkg. Puede devolver una cantidad distinta de paquetes que `apt list --installed` porque incluye registros con configuración conservada aunque el programa ya no esté "instalado" en sentido estricto.

```bash
cat /etc/apt/sources.list
cat /etc/apt/sources.list.d/parrot.list
```
Muestran de dónde descarga apt los paquetes. Cada línea tiene el formato `deb URL rama secciones`, por ejemplo `deb http://htb.deb.parrot.sh/parrot/ rolling main contrib non-free`: protocolo/URL del mirror, rama de estabilidad (`rolling`) y secciones del repositorio (`main`, `contrib`, `non-free`).

```bash
wget http://archive.ubuntu.com/ubuntu/pool/main/s/strace/strace_4.21-1ubuntu1_amd64.deb
sudo dpkg -i strace_4.21-1ubuntu1_amd64.deb
```
Descarga un `.deb` de forma manual (sin pasar por apt) y lo instala directo con `dpkg -i`. Si al paquete le faltan dependencias, `dpkg` no las resuelve solo: hay que correr `sudo apt --fix-broken install` después para que apt las complete.

```bash
mkdir ~/nishang/ && git clone https://github.com/samratashok/nishang.git ~/nishang
```
Clona un repositorio de GitHub a una carpeta local. No es instalar un paquete del sistema: es traer el código fuente de una herramienta directamente, algo muy común en pentesting cuando la herramienta no está empaquetada para la distro.

## Diferencias que hay que recordar

- **`dpkg` vs `apt`:** `dpkg` es el motor de bajo nivel que instala/quita un `.deb` puntual; `apt` es la capa de alto nivel que además busca en repositorios y resuelve dependencias automáticamente.
- **`apt remove` vs `apt purge`:** `remove` deja la configuración; `purge` la borra también.
- **`apt list --installed` vs `dpkg-query -W`:** pueden dar números distintos porque consultan bases ligeramente distintas (una filtra "instalado" en sentido estricto, la otra incluye configuración conservada).
- **Gestor del sistema vs gestor por lenguaje:** `apt`/`dpkg`/`pacman` gestionan paquetes del sistema operativo; `pip`/`gem` gestionan paquetes de un lenguaje específico. Ninguno reemplaza al otro.
- **Paquete gestionado vs `git clone`:** un paquete instalado con apt/dpkg queda registrado y controlado por el sistema (se puede desinstalar, actualizar, auditar); un repo clonado con git es solo código fuente en una carpeta, sin ese control.

## Ejemplos prácticos

Buscar si existe un paquete relacionado a una herramienta ofensiva antes de instalarlo a ciegas:
```bash
apt-cache search impacket
apt-cache show impacket-scripts
```
Resultado esperado: la primera lista los paquetes que coinciden con "impacket"; la segunda muestra sus dependencias (`python3-impacket`, `python3-ldap3`, etc.) antes de decidir instalar.

Instalar sabiendo que apt resuelve dependencias automáticamente:
```bash
sudo apt install impacket-scripts -y
```
Resultado esperado: apt detecta e instala las dependencias necesarias sin pedir cada una por separado.

## Errores y precauciones

- Instalar un `.deb` suelto con `dpkg -i` puede fallar por dependencias faltantes; no es un bug, es esperable porque dpkg no resuelve dependencias solo. La solución es `sudo apt --fix-broken install`.
- `apt purge` es más agresivo que `remove`: borra configuración que quizás se quería conservar para una reinstalación futura. Conviene pensarlo antes de purgar un paquete importante.
- Clonar repos de git e instalar herramientas sin revisar su origen es un riesgo de seguridad (no hay control de calidad como el que sí aplican los repositorios oficiales de la distro).

## Inglés técnico del módulo

- `package` → paquete.
- `repository` → repositorio, servidor con paquetes disponibles.
- `dependency` → dependencia, paquete que otro necesita para funcionar.
- `dependency resolution` → resolución de dependencias, proceso automático de detectar e instalar lo que falta.
- `cache` → caché, copia local de datos para consultar sin ir siempre al origen.
- `front-end` → interfaz, la capa con la que interactúa el usuario (ej. apt es front-end de dpkg).
- `standalone package` → paquete independiente, descargado y manejado por separado del gestor de repositorios.
- `clone` → clonar, copiar un repositorio completo a una carpeta local.

## Lo que más costó

El contenido de esta sección se retomó de la conversación pero no quedó registrada la confirmación de haberla terminado en HTB. La parte que requiere más práctica es diferenciar cuándo conviene usar `apt` (con resolución automática de dependencias) versus `dpkg -i` directo (para un `.deb` descargado a mano, con el riesgo de tener que resolver dependencias manualmente después).

## Qué aprendí

Entendí qué es un paquete y qué información contiene, la diferencia entre `apt` y `dpkg`, cómo consultar el cache de APT con `apt-cache` sin instalar nada, dónde están definidos los repositorios del sistema, cómo instalar un `.deb` bajado a mano, y que existen gestores de paquetes específicos por lenguaje (`pip`, `gem`) además de herramientas como `git` para traer código sin pasar por ningún gestor.

## Para repasar o practicar

- Confirmar en HTB si esta sección figura realmente completada.
- Practicar `apt-cache show` sobre paquetes reales para acostumbrarme a leer el campo `Depends:`.
- Probar instalar un `.deb` a propósito con una dependencia faltante y resolverla con `apt --fix-broken install`, para ver el flujo completo.
- Repasar la diferencia entre `snap` y los paquetes tradicionales `.deb`.
