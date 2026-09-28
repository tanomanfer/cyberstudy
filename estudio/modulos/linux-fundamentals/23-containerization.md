# 23 de 30 — Containerization

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

La contenerización permite ejecutar aplicaciones o sistemas Linux en entornos aislados llamados **contenedores**. Estos entornos separan procesos, redes, montajes y recursos, pero comparten el kernel del sistema anfitrión.

Docker y LXC utilizan capacidades del kernel Linux como:

- **Namespaces:** separan procesos, red, montajes, usuarios y otros recursos.
- **Cgroups:** controlan el consumo de CPU, memoria y cantidad de procesos.
- **Capabilities:** dividen los privilegios tradicionales de root.
- **Seccomp, AppArmor o SELinux:** restringen operaciones permitidas.

Los contenedores son más livianos que las máquinas virtuales porque no arrancan otro kernel completo.

```text
Máquina virtual
└── hardware virtualizado
    └── sistema invitado con kernel propio

Contenedor
└── procesos y entorno aislados
    └── kernel compartido con el host
```

Compartir el kernel reduce consumo y tiempo de arranque, pero también significa que el aislamiento no es equivalente al de una máquina virtual.

## Docker, LXC e Incus

### Docker: contenedores de aplicaciones

Docker está orientado principalmente a empaquetar y ejecutar aplicaciones:

```text
contenedor Nginx
├── Nginx
├── bibliotecas necesarias
├── configuración
└── archivos del entorno
```

La práctica habitual consiste en describir el entorno con una imagen reproducible y ejecutar uno o pocos procesos principales.

### LXC: contenedores de sistema

LXC está orientado a crear entornos Linux que se comportan como sistemas completos:

```text
contenedor Ubuntu
├── usuarios
├── systemd
├── servicios
├── paquetes
└── aplicaciones
```

Se parece en el uso cotidiano a una máquina virtual liviana, pero continúa compartiendo el kernel Linux del host.

### Incus: administrador de contenedores y máquinas virtuales

Incus es una capa de administración que puede manejar:

- Contenedores de sistema mediante LXC.
- Contenedores de aplicaciones.
- Máquinas virtuales reales mediante QEMU.

Ejemplo conceptual:

```bash
incus launch images:debian/12 debian-contenedor
incus launch images:debian/12 debian-vm --vm
```

El primero comparte el kernel. El segundo arranca una VM con kernel propio.

## Contenedores frente a máquinas virtuales

| Característica | Docker | LXC/Incus container | VirtualBox/VMware/Incus VM |
|---|---|---|---|
| Objetivo habitual | Aplicación | Sistema Linux completo | Computadora completa |
| Kernel propio | No | No | Sí |
| Sistemas invitados | Linux compatible | Linux compatible | Linux, Windows y otros |
| Consumo | Muy bajo | Bajo | Mayor |
| Arranque | Muy rápido | Muy rápido | Más lento |
| Aislamiento | Comparte kernel | Comparte kernel | Frontera de virtualización |
| Servicios múltiples | Posible, no es el modelo preferido | Sí | Sí |

Para administración Linux, LXC/Incus permite crear muchos entornos livianos. Para malware peligroso, ataques al kernel, Windows o aislamiento más fuerte, conviene una VM.

## Arquitectura básica de Docker

Docker se entiende mejor separando estas piezas:

```text
Docker CLI → Docker daemon/Engine → imágenes, contenedores, redes y volúmenes
```

- **CLI:** comando `docker` utilizado en la terminal.
- **Docker Engine/daemon:** servicio que realiza las operaciones.
- **Imagen:** plantilla inmutable o de sólo lectura para crear contenedores.
- **Contenedor:** instancia creada desde una imagen.
- **Registry:** servidor que almacena imágenes, como Docker Hub.
- **Volumen:** almacenamiento independiente del ciclo de vida del contenedor.
- **Red:** espacio de comunicación entre contenedores y host.

## Imagen y contenedor

```text
Imagen     → receta o plantilla
Contenedor → instancia creada a partir de esa plantilla
```

Una misma imagen puede generar varios contenedores diferentes:

```text
nginx:alpine
├── contenedor web-1
├── contenedor web-2
└── contenedor cyberstudy-nginx
```

Un contenedor detenido sigue existiendo. Sus cambios en la capa escribible permanecen mientras no se elimine:

```text
docker stop  → detiene el contenedor
docker start → vuelve a iniciar el mismo contenedor
docker rm    → elimina el contenedor y su capa escribible
```

Por eso es incorrecto afirmar que todo se pierde simplemente al detenerlo. Los datos desaparecen normalmente al eliminar y recrear el contenedor, salvo que estén en una imagen nueva, un volumen o un montaje del host.

## Estado real de PerlaNegra

Se comprobó:

```text
Docker Engine CLI: 29.8.0
Docker Compose:     5.5.1
LXC:                no instalado
Usuario tano:       no pertenece al grupo docker
```

Por eso los comandos que hablan con el daemon requirieron `sudo`. Mostrar ayuda o consultar la versión no necesita acceder al daemon:

```bash
docker --version
docker compose version
docker ps --help
```

En cambio, listar o crear contenedores necesitó:

```bash
sudo docker ps
sudo docker run ...
```

Agregar un usuario al grupo `docker` evita escribir `sudo`, pero otorga capacidades prácticamente equivalentes a root. No se realizó ese cambio automáticamente.

## Comandos fundamentales de Docker

### Ayuda y versión

```bash
docker --help
docker COMMAND --help
docker --version
docker info
```

Ejemplos:

```bash
docker ps --help
docker run --help | grep -i publish
docker logs --help | grep -i tail
docker exec --help | grep -i interactive
```

No hace falta memorizar todas las opciones. El método recomendado es identificar la acción, traducir la palabra clave al inglés y buscarla con `--help`.

### Listar contenedores

```bash
sudo docker ps
sudo docker ps -a
sudo docker ps --all
```

- `docker ps`: muestra solamente contenedores activos.
- `-a` o `--all`: incluye también los detenidos.

Durante la práctica, ambos comandos mostraron lo mismo porque los ocho contenedores existentes estaban activos.

Columnas principales:

| Columna | Significado |
|---|---|
| `CONTAINER ID` | Identificador corto. |
| `IMAGE` | Imagen utilizada. |
| `COMMAND` | Proceso principal. |
| `CREATED` | Momento de creación. |
| `STATUS` | Estado y salud. |
| `PORTS` | Puertos publicados o expuestos. |
| `NAMES` | Nombre legible. |

Salida personalizada para terminales angostas:

```bash
sudo docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}'
```

Filtrar un contenedor:

```bash
sudo docker ps --filter name=cyberstudy-nginx
```

Mostrar solamente IDs:

```bash
sudo docker ps -q
```

### Error observado al combinar comandos

Se escribió:

```bash
docker ps image ls
```

Docker interpretó `docker ps` como el comando y `image ls` como argumentos inválidos. Respondió:

```text
docker: 'docker ps' accepts no arguments
```

Los comandos correctos son independientes:

```bash
sudo docker ps
sudo docker image ls
```

### Administrar imágenes

```bash
sudo docker image ls
sudo docker pull nginx:alpine
sudo docker image inspect nginx:alpine
sudo docker rmi IMAGEN
```

- `image ls`: lista imágenes locales.
- `pull`: descarga desde un registry.
- `inspect`: muestra metadatos detallados.
- `rmi`: elimina una imagen que no esté siendo utilizada.

Formato del nombre:

```text
nginx:alpine
│     └── etiqueta o variante
└──────── repositorio/imagen
```

Si se omite la etiqueta, muchas imágenes utilizan `latest`, pero `latest` no significa necesariamente “la versión más estable” ni garantiza reproducibilidad.

### Crear e iniciar un contenedor

Práctica realizada:

```bash
sudo docker run --name cyberstudy-nginx -d -p 127.0.0.1:8082:80 nginx:alpine
```

Desglose:

- `docker run`: crea un contenedor nuevo y lo inicia.
- `--name cyberstudy-nginx`: asigna un nombre claro y único.
- `-d` o `--detach`: ejecuta en segundo plano.
- `-p` o `--publish`: publica un puerto.
- `127.0.0.1:8082:80`: host, puerto del host y puerto interno.
- `nginx:alpine`: imagen utilizada.

La ruta de la petición fue:

```text
curl o navegador
      ↓
127.0.0.1:8082 en PerlaNegra
      ↓ publicación Docker
puerto 80 dentro del contenedor
      ↓
Nginx
```

Vincular el puerto a `127.0.0.1` limitó el acceso a la propia computadora. Publicarlo como `0.0.0.0:8082` lo expondría en todas las interfaces disponibles si la red y el firewall lo permiten.

### Comprobar el puerto antes de utilizarlo

```bash
ss -ltn | grep ':8082'
```

Sin salida significa que no se encontró un socket TCP escuchando en ese puerto. Si aparece una línea, primero hay que identificar el proceso o elegir otro puerto.

### Probar el servicio

```bash
curl -I http://127.0.0.1:8082
curl http://127.0.0.1:8082
```

La primera petición produjo:

```text
HTTP/1.1 200 OK
Server: nginx/1.31.6
Content-Type: text/html
```

- `curl -I` usa normalmente `HEAD` y solicita encabezados.
- `curl URL` utiliza `GET` y solicita también el cuerpo.
- `200 OK` confirmó que Nginx respondió correctamente.

### Consultar logs

```bash
sudo docker logs cyberstudy-nginx
sudo docker logs --tail 5 cyberstudy-nginx
sudo docker logs -f cyberstudy-nginx
```

- `logs`: muestra salida estándar y errores del contenedor.
- `--tail 5`: limita a las últimas cinco líneas.
- `-f` o `--follow`: continúa mostrando nuevas líneas hasta `Ctrl+C`.

En los logs se observó:

```text
"HEAD / HTTP/1.1" 200
```

También aparecieron:

```text
nginx/1.31.6
OS: Linux 7.2.6-1-cachyos
start worker process ...
```

Esto demostró que el entorno de usuario proviene de Alpine/Nginx, pero el kernel visible es el kernel CachyOS del host.

La dirección `172.17.0.1` en el log correspondió al host visto desde la red bridge privada de Docker.

### Ejecutar comandos dentro del contenedor

```bash
sudo docker exec -it cyberstudy-nginx sh
```

- `exec`: ejecuta un comando dentro de un contenedor activo.
- `-i`: mantiene abierta la entrada estándar.
- `-t`: asigna una terminal interactiva.
- `sh`: shell disponible en Alpine.

Comprobaciones útiles dentro:

```sh
cat /etc/os-release
uname -r
ps
```

Resultado conceptual:

```text
/etc/os-release → Alpine Linux
uname -r        → kernel CachyOS compartido
```

Para salir sin detener el contenedor:

```sh
exit
```

### Ciclo de vida

```bash
sudo docker stop cyberstudy-nginx
sudo docker start cyberstudy-nginx
sudo docker restart cyberstudy-nginx
sudo docker rm cyberstudy-nginx
```

- `stop`: solicita una detención ordenada.
- `start`: inicia un contenedor existente detenido.
- `restart`: detiene e inicia nuevamente.
- `rm`: elimina el contenedor; normalmente debe estar detenido.

Eliminar un contenedor no elimina automáticamente su imagen:

```text
docker rm  → contenedor
docker rmi → imagen
```

### Inspección y uso de recursos

```bash
sudo docker inspect cyberstudy-nginx
sudo docker stats cyberstudy-nginx
sudo docker top cyberstudy-nginx
```

- `inspect`: configuración completa en JSON.
- `stats`: CPU, memoria, red y procesos en vivo.
- `top`: procesos del contenedor vistos desde Docker.

## Nginx en el laboratorio

Nginx es un servidor web y proxy inverso. Puede entregar HTML, imágenes y archivos, o reenviar peticiones a otras aplicaciones.

```text
Usuario
  ↓
Nginx
  ├── /    → frontend
  └── /api → backend
```

La imagen `nginx:alpine` combina Nginx con un entorno mínimo basado en Alpine Linux. El contenedor creado se llamó `cyberstudy-nginx`.

```text
nginx:alpine      → imagen
cyberstudy-nginx  → contenedor
nginx             → proceso servidor dentro del contenedor
```

## Persistencia: volúmenes y bind mounts

Los datos importantes no deberían depender solamente de la capa escribible del contenedor.

### Volumen administrado por Docker

```bash
sudo docker volume create datos-practica
sudo docker volume ls
sudo docker volume inspect datos-practica
```

Montaje conceptual:

```bash
sudo docker run --name ejemplo -v datos-practica:/datos IMAGEN
```

El volumen puede continuar existiendo aunque el contenedor sea eliminado.

### Bind mount

Expone una ruta concreta del host:

```bash
sudo docker run --name web-local -d \
  -p 127.0.0.1:8083:80 \
  -v /ruta/web:/usr/share/nginx/html:ro \
  nginx:alpine
```

`ro` significa sólo lectura dentro del contenedor. Los bind mounts deben usarse con cuidado: montar rutas sensibles del host puede romper el aislamiento o exponer información.

## Dockerfile e imágenes propias

Un `Dockerfile` describe cómo construir una imagen:

```dockerfile
FROM nginx:alpine
COPY index.html /usr/share/nginx/html/index.html
EXPOSE 80
```

Construcción:

```bash
sudo docker build -t cyberstudy-web:1.0 .
```

- `build`: construye una imagen.
- `-t`: asigna nombre y etiqueta.
- `.`: utiliza el contexto del directorio actual y busca allí el Dockerfile.

Ejecutarla:

```bash
sudo docker run --name cyberstudy-web -d \
  -p 127.0.0.1:8084:80 cyberstudy-web:1.0
```

Las capas del Dockerfile se almacenan en caché. Conviene ordenar instrucciones para aprovechar esa caché, usar imágenes confiables y evitar copiar secretos al contexto.

### Problemas de seguridad del ejemplo de HTB

El Dockerfile del módulo contiene una contraseña escrita directamente, agrega un usuario a `sudo` y concede `NOPASSWD: ALL`. Sirve como ejemplo didáctico, pero no es una configuración segura para producción:

```text
contraseña en Dockerfile → puede quedar en capas o historial
sudo sin contraseña      → privilegios excesivos
SSH dentro del contenedor → superficie adicional innecesaria
varios servicios juntos  → más complejidad
```

Los secretos deben gestionarse mediante mecanismos dedicados y nunca escribirse en un Dockerfile versionado.

## Docker Compose

Compose describe varios servicios en un archivo `compose.yaml`:

```yaml
services:
  web:
    image: nginx:alpine
    ports:
      - "127.0.0.1:8085:80"
```

Comandos básicos:

```bash
sudo docker compose up -d
sudo docker compose ps
sudo docker compose logs
sudo docker compose down
```

- `up -d`: crea e inicia los servicios en segundo plano.
- `ps`: muestra los contenedores del proyecto.
- `logs`: muestra registros del conjunto.
- `down`: detiene y elimina contenedores y redes creados por Compose.

`docker compose down -v` también elimina volúmenes declarados o anónimos asociados; puede destruir datos persistentes y no debe usarse sin revisar.

## Contenedores existentes y seguridad operativa

En PerlaNegra se encontraron servicios reales:

- Home Assistant.
- Open WebUI.
- FreeLingo frontend y backend.
- PostgreSQL.
- Redis.
- Whisper.
- Kokoro.

Por eso todos los comandos de práctica utilizaron nombres y filtros específicos. No se deben ejecutar comandos globales como:

```bash
sudo docker stop $(sudo docker ps -q)
sudo docker container prune
sudo docker system prune
```

Podrían detener o eliminar recursos de proyectos reales. Antes de borrar algo:

```bash
sudo docker ps -a
sudo docker image ls
sudo docker volume ls
```

Hay que identificar exactamente el recurso y comprender si contiene datos.

## DockerLabs

DockerLabs es una plataforma de máquinas vulnerables empaquetadas como imágenes Docker. El flujo habitual es:

```text
descargar laboratorio.tar + auto_deploy.sh
       ↓
sudo bash auto_deploy.sh laboratorio.tar
       ↓
Docker carga la imagen y crea el contenedor vulnerable
       ↓
se entrega una IP como 172.17.0.x
       ↓
se practica reconocimiento y explotación
       ↓
Ctrl+C intenta eliminar el laboratorio
```

DockerLabs enseña principalmente pentesting sobre objetivos vulnerables; no reemplaza un curso de fundamentos Docker.

No se recomendó ejecutarlo directamente en PerlaNegra porque allí viven contenedores importantes. Una máquina deliberadamente vulnerable y un script ejecutado con `sudo` deben aislarse mejor:

```text
PerlaNegra
└── VM de laboratorio
    ├── Docker
    └── DockerLabs
```

Antes de ejecutar cualquier `auto_deploy.sh`, hay que leerlo para conocer qué imágenes, redes y contenedores crea o elimina.

## Comandos fundamentales de LXC

En Ubuntu/Debian:

```bash
sudo apt install lxc -y
lxc-checkconfig
```

Crear un contenedor:

```bash
sudo lxc-create -n linuxcontainer -t download
```

- `-n`: nombre del contenedor.
- `-t`: plantilla utilizada.
- `download`: permite elegir una imagen compatible.

Administración:

```bash
sudo lxc-ls --fancy
sudo lxc-start -n linuxcontainer
sudo lxc-info -n linuxcontainer
sudo lxc-attach -n linuxcontainer
sudo lxc-stop -n linuxcontainer
sudo lxc-destroy -n linuxcontainer
```

- `lxc-ls --fancy`: lista contenedores y estado.
- `lxc-start`: inicia.
- `lxc-info`: muestra información.
- `lxc-attach`: abre una shell o ejecuta un comando dentro.
- `lxc-stop`: detiene.
- `lxc-destroy`: elimina; debe utilizarse con cuidado.

LXC no estaba instalado en PerlaNegra y no se modificó todavía el sistema. Las instrucciones concretas dependen de la distribución, versión de LXC, cgroup v2, red y configuración de usuarios sin privilegios.

## Límites de recursos en LXC

Los cgroups permiten limitar CPU, memoria y procesos. El módulo muestra parámetros históricos como:

```text
lxc.cgroup.cpu.shares = 512
lxc.cgroup.memory.limit_in_bytes = 512M
```

En sistemas modernos con cgroup v2, los nombres y valores pueden cambiar a opciones `lxc.cgroup2.*`. No conviene copiar una configuración sin consultar la versión local:

```bash
lxc-start --version
man lxc.container.conf
```

Limitar recursos ayuda a evitar que un contenedor agote la memoria o CPU del host, pero no resuelve todos los riesgos de denegación de servicio.

## Contenedores privilegiados y no privilegiados

Un contenedor privilegiado tiene una relación más directa entre root interno y privilegios del host. Es más sencillo para aprender, pero presenta mayor riesgo.

En un contenedor no privilegiado, los UID y GID internos se mapean a rangos sin privilegios del host:

```text
root dentro del contenedor (UID 0)
          ↓ mapeo
UID 100000 u otro usuario sin privilegios en el host
```

Siempre que sea viable, se prefieren contenedores no privilegiados. Aun así, compartir kernel implica que una vulnerabilidad del kernel puede afectar la frontera de aislamiento.

## Usos reales de LXC e Incus

Para administración:

- Probar actualizaciones.
- Ejecutar distintas distribuciones Linux.
- Separar servicios.
- Crear entornos de desarrollo y staging.
- Clonar sistemas y usar snapshots.
- Enseñar usuarios, servicios, redes y paquetes.

Para ciberseguridad:

- Laboratorios de servicios Linux.
- Redes con varios hosts simulados.
- Práctica de logs, hardening y firewall.
- Objetivos vulnerables controlados.
- Entornos descartables para herramientas.

No son la mejor frontera para malware peligroso, exploits del kernel o pruebas de escape; en esos casos se utilizan máquinas virtuales separadas.

## Seguridad de contenedores

Medidas básicas:

- Usar imágenes oficiales o de origen confiable.
- Mantener host e imágenes actualizados.
- Evitar ejecutar como root dentro del contenedor.
- No usar `--privileged` sin una necesidad justificada.
- Eliminar capabilities innecesarias.
- Limitar CPU, memoria y procesos.
- Publicar solamente puertos necesarios y preferir `127.0.0.1` para laboratorios locales.
- Usar volúmenes y bind mounts con permisos mínimos.
- No montar `/var/run/docker.sock` dentro de contenedores no confiables.
- No guardar contraseñas, tokens o claves en Dockerfiles e imágenes.
- Revisar logs y vulnerabilidades de las imágenes.
- Separar laboratorios vulnerables de servicios personales.

Un contenedor no es una sandbox perfecta. Una mala configuración puede permitir escalada de privilegios, acceso al host o escape.

## Cómo usar la ayuda

```bash
docker --help
docker ps --help
docker run --help
docker logs --help
docker exec --help
docker image --help
docker volume --help
docker network --help
docker compose --help
```

Filtros útiles:

```bash
docker run --help | grep -i publish
docker run --help | grep -i volume
docker ps --help | grep -i all
docker logs --help | grep -i tail
docker exec --help | grep -i interactive
```

Lectura de opciones:

```text
-a, --all
│   └── forma larga
└────── forma corta
```

Primero se identifica la acción (`list`, `run`, `stop`, `logs`, `inspect`), después el objeto (`container`, `image`, `volume`, `network`) y finalmente las opciones.

## Prácticas recomendadas para ganar soltura

### 1. Ciclo de vida seguro

Sobre `cyberstudy-nginx`:

```bash
sudo docker ps --filter name=cyberstudy-nginx
sudo docker stop cyberstudy-nginx
sudo docker ps -a --filter name=cyberstudy-nginx
sudo docker start cyberstudy-nginx
curl -I http://127.0.0.1:8082
```

### 2. Comparar entorno y kernel

```bash
sudo docker exec cyberstudy-nginx cat /etc/os-release
sudo docker exec cyberstudy-nginx uname -r
uname -r
```

Comparar Alpine dentro del contenedor con el kernel compartido de CachyOS.

### 3. Observar recursos

```bash
sudo docker stats cyberstudy-nginx
```

Salir con `Ctrl+C` sin detener el contenedor.

### 4. Publicar una página propia

Crear un directorio sin secretos y montarlo como sólo lectura:

```bash
mkdir -p /tmp/docker-web
echo '<h1>CyberStudy con Docker</h1>' > /tmp/docker-web/index.html
sudo docker run --name cyberstudy-web -d \
  -p 127.0.0.1:8083:80 \
  -v /tmp/docker-web:/usr/share/nginx/html:ro \
  nginx:alpine
curl http://127.0.0.1:8083
```

### 5. Construir una imagen

Crear un Dockerfile seguro y mínimo, construirlo con `docker build`, ejecutarlo con un nombre propio y comprobarlo con `curl`.

### 6. Practicar Compose

Definir un único Nginx en `compose.yaml`, ejecutar `up -d`, leer `compose ps` y `compose logs`, y finalizar con `compose down` sin `-v`.

### 7. Practicar LXC en un entorno separado

Usar una VM o entorno de laboratorio para instalar LXC, crear un contenedor no privilegiado, consultar su estado, entrar con `lxc-attach`, limitar recursos y destruir solamente el contenedor de práctica.

## Errores y precauciones

- `docker ps image ls` mezcla dos comandos independientes.
- `docker ps` muestra activos; `docker ps -a` agrega detenidos.
- `docker stop` no equivale a `docker rm`.
- `docker rm` y `docker rmi` eliminan objetos diferentes.
- Publicar `8082:80` significa host 8082 hacia contenedor 80.
- Omitir `127.0.0.1` puede exponer el servicio en otras interfaces.
- No usar nombres o puertos que colisionen con contenedores reales.
- No ejecutar operaciones globales de limpieza en una máquina con servicios importantes.
- El grupo `docker` concede privilegios muy elevados.
- Un volumen puede contener datos aunque el contenedor ya no exista.
- `docker compose down -v` puede borrar datos persistentes.
- Un Dockerfile no debe contener contraseñas o claves.
- Docker y LXC comparten el kernel; no reemplazan siempre a una VM.
- Las instrucciones LXC varían entre cgroup v1 y v2 y entre distribuciones.
- Las máquinas vulnerables deben ejecutarse en un laboratorio aislado.

## Inglés técnico del módulo

- `containerization` → contenerización.
- `container` → contenedor.
- `image` → imagen o plantilla.
- `host` → sistema anfitrión.
- `guest` → sistema invitado.
- `shared kernel` → kernel compartido.
- `namespace` → espacio de nombres aislado.
- `control group` / `cgroup` → grupo de control de recursos.
- `registry` → servidor o catálogo de imágenes.
- `tag` → etiqueta de versión o variante.
- `layer` → capa de una imagen.
- `build context` → archivos disponibles durante la construcción.
- `entrypoint` → proceso inicial configurado.
- `detached` → ejecutado en segundo plano.
- `publish a port` → publicar un puerto.
- `bind mount` → montaje de una ruta del host.
- `volume` → almacenamiento administrado independiente.
- `persistent data` → datos persistentes.
- `logs` → registros de ejecución.
- `privileged container` → contenedor con privilegios amplios.
- `container escape` → ruptura del aislamiento hacia el host.
- `resource limits` → límites de recursos.
- `reverse proxy` → proxy inverso.

## Lo que más costó y cómo se entendió

La primera confusión fue pensar que LXC era equivalente a VirtualBox o VMware. Se entendió que LXC se siente como una máquina virtual liviana porque puede ejecutar un sistema Linux completo, pero técnicamente comparte el kernel del host y no virtualiza una computadora completa.

La segunda dificultad fue separar los objetos y comandos Docker. `docker ps image ls` mostró que `docker ps` y `docker image ls` son órdenes distintas. Se incorporó el modelo `docker OBJETO ACCIÓN` o los alias tradicionales y el hábito de consultar `--help`.

La práctica con Nginx permitió unir varios conceptos: `nginx:alpine` fue la imagen, `cyberstudy-nginx` fue el contenedor y Nginx fue el proceso servidor. El mapeo `127.0.0.1:8082:80` conectó el puerto local con el servicio interno. `curl` generó la petición y `docker logs` mostró `HEAD / HTTP/1.1` con estado `200`.

También se comprendió por qué dentro del contenedor aparece Alpine mediante `/etc/os-release`, mientras `uname -r` muestra el kernel CachyOS: el espacio de usuario está aislado, pero el kernel se comparte.

Finalmente, DockerLabs se identificó como plataforma de pentesting que usa Docker para desplegar objetivos vulnerables, no como curso completo de Docker. Debido a los servicios reales de PerlaNegra, se recomendó ejecutarla dentro de una VM separada.

## Qué aprendí

Comprendí la diferencia entre contenedores de aplicaciones, contenedores de sistema y máquinas virtuales; distinguí Docker, LXC e Incus; y entendí que los contenedores comparten el kernel. Practiqué la consulta de contenedores e imágenes, la lectura de ayuda, la creación de un Nginx con nombre y puerto local, la verificación mediante `curl`, la interpretación de logs y el acceso interactivo con `docker exec`. También aprendí el ciclo de vida de imágenes y contenedores, la importancia de volúmenes, Dockerfiles y Compose, y los riesgos del grupo Docker, los comandos globales de limpieza y los laboratorios vulnerables.

## Para repasar o practicar

- Repetir el ciclo `run → ps → logs → exec → stop → start → rm` con un contenedor propio.
- Practicar `docker image ls`, `inspect`, `pull` y las etiquetas.
- Crear una página HTML y publicarla con un bind mount de sólo lectura.
- Crear una imagen propia mediante Dockerfile.
- Practicar un servicio simple mediante Docker Compose.
- Comparar contenedor detenido, eliminado e imagen disponible.
- Crear y restaurar datos en un volumen de práctica.
- Reforzar redes, `127.0.0.1`, puertos del host y del contenedor.
- Realizar un curso específico de Docker para ganar fluidez.
- Practicar LXC o Incus en una VM o entorno separado.
- Leer cualquier script `auto_deploy.sh` antes de ejecutar DockerLabs.
- Continuar consultando `docker COMANDO --help` en lugar de memorizar opciones sin contexto.

## Fuentes recomendadas

- Documentación inicial de Docker: <https://docs.docker.com/get-started/>
- Tutorial oficial de Docker: <https://docs.docker.com/get-started/tutorials/run-an-app/>
- Docker CLI Cheat Sheet: <https://docs.docker.com/get-started/docker_cheatsheet.pdf>
- Introducción oficial a LXC: <https://linuxcontainers.org/lxc/introduction/>
- Primeros pasos con LXC: <https://linuxcontainers.org/lxc/getting-started/>
- Contenedores y VMs en Incus: <https://linuxcontainers.org/incus/docs/main/explanation/containers_and_vms/>
- Instrucciones de DockerLabs: <https://dockerlabs.es/instrucciones-uso>
