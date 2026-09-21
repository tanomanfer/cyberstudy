# 19 de 30 — Network Services

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

Un **servicio de red** es un programa que queda esperando solicitudes de otros programas a través de una red. El programa que ofrece una función se llama **servidor** y el que inicia la comunicación para utilizarla se llama **cliente**.

Por ejemplo, al abrir una página local:

```text
Firefox → petición HTTP → servidor Python → archivo solicitado → respuesta HTTP → Firefox
```

Aunque cliente y servidor estén en la misma computadora, la comunicación conserva los conceptos reales de red: dirección IP, puerto, protocolo, petición y respuesta.

Una dirección IP identifica el equipo y el puerto identifica un servicio dentro de ese equipo. Una analogía útil es:

```text
Dirección IP = dirección de un edificio
Puerto       = número de departamento
```

En `127.0.0.1:8081`, `127.0.0.1` identifica la propia computadora y `8081` el puerto en el que espera el servidor.

## Conceptos fundamentales

### Servicio, proceso y puerto

Un servicio es ejecutado por uno o más procesos. Para aceptar conexiones, el proceso abre un **socket** y queda escuchando en una dirección y un puerto.

Algunos puertos habituales son:

| Puerto | Servicio habitual | Función |
|---:|---|---|
| 21 | FTP | Transferencia tradicional de archivos |
| 22 | SSH/SFTP | Administración y transferencia cifrada |
| 80 | HTTP | Contenido web sin TLS |
| 443 | HTTPS | Contenido web protegido con TLS |
| 2049 | NFS | Sistema de archivos compartido |
| 8000/8080/8081 | HTTP de desarrollo | Pruebas y servidores temporales |

El número de puerto no crea el protocolo. Ejecutar un servidor HTTP en el puerto `443` no lo convierte automáticamente en HTTPS: para eso también se necesita configurar TLS y un certificado.

### Direcciones de escucha

`127.0.0.1`, también llamado `localhost` o **loopback**, siempre representa la computadora local. Un servicio vinculado a esa dirección solamente acepta conexiones locales:

```bash
python3 -m http.server 8081 --bind 127.0.0.1
```

`0.0.0.0` significa que el servicio escucha en todas las interfaces IPv4 disponibles. Puede quedar accesible desde otros equipos si el firewall y la red lo permiten:

```bash
python3 -m http.server 8081 --bind 0.0.0.0
```

No debe cambiarse de `127.0.0.1` a `0.0.0.0` sin entender qué archivos se publican y quién puede acceder a la red.

### Puertos ocupados

Dos procesos normalmente no pueden escuchar simultáneamente en la misma combinación de dirección, puerto y protocolo. Durante la práctica, el puerto `8000` ya estaba ocupado y Python mostró:

```text
OSError: [Errno 98] Address already in use
```

Eso no indicaba un error en el comando. Significaba que otro proceso ya utilizaba ese puerto. Se resolvió eligiendo `8081` y se aprendió que, antes de cerrar un proceso, conviene identificarlo:

```bash
sudo ss -ltnp | grep ':8000'
```

- `-l` muestra sockets que están escuchando.
- `-t` limita la consulta a TCP.
- `-n` muestra números de puertos sin traducirlos a nombres.
- `-p` intenta mostrar el proceso relacionado.

## SSH: administración remota segura

SSH permite iniciar una sesión, ejecutar comandos y transferir archivos mediante una conexión cifrada. Normalmente utiliza TCP `22`.

Conexión básica:

```bash
ssh usuario@IP
```

En este ejemplo, `ssh` es el cliente local, `usuario` es la cuenta remota y la IP corresponde al servidor. Todo lo que se ejecuta después de iniciar sesión ocurre en la máquina remota hasta salir con `exit`.

En Debian, Ubuntu o la Pwnbox de HTB, el servidor se instala y consulta con:

```bash
sudo apt install openssh-server -y
systemctl status ssh
```

En CachyOS/Arch los nombres cambian:

```bash
sudo pacman -S openssh
systemctl status sshd
```

El archivo principal del servidor suele ser:

```text
/etc/ssh/sshd_config
```

SSH también permite copiar archivos:

```bash
scp archivo.txt usuario@IP:/ruta/remota/
scp usuario@IP:/ruta/remota/archivo.txt ./
```

SFTP trabaja sobre SSH y cifra credenciales y datos. No debe confundirse con FTP tradicional, que puede transmitir información en texto plano.

SSH puede crear túneles o redirecciones de puertos. La idea general es transportar a través de la conexión SSH el tráfico destinado a otro servicio. Es una función importante, pero requiere una práctica separada para comprender bien qué extremo escucha y hacia dónde se reenvía el tráfico.

## NFS: compartir directorios por red

NFS permite que un directorio almacenado en un servidor aparezca montado dentro del árbol de directorios de un cliente:

```text
Servidor: /srv/proyectos
               ↓ NFS
Cliente:  /mnt/proyectos
```

En Debian o Ubuntu, el servidor puede instalarse y comprobarse con:

```bash
sudo apt install nfs-kernel-server -y
systemctl status nfs-kernel-server
```

Las exportaciones del servidor se definen en:

```text
/etc/exports
```

Ejemplo conceptual:

```text
/srv/proyectos 192.168.1.0/24(rw,sync,root_squash)
```

- `/srv/proyectos` es el directorio compartido.
- `192.168.1.0/24` representa la red autorizada.
- `rw` permite lectura y escritura.
- `sync` confirma las operaciones después de escribir los datos.
- `root_squash` evita que el usuario root del cliente conserve automáticamente privilegios de root sobre el recurso.

Opciones importantes:

| Opción | Significado | Riesgo o ventaja |
|---|---|---|
| `rw` | Lectura y escritura | Permite modificar contenido |
| `ro` | Solamente lectura | Reduce modificaciones accidentales |
| `sync` | Escritura confirmada antes de responder | Más coherente y generalmente más segura |
| `async` | Puede responder antes de completar la escritura | Más rápido, pero con mayor riesgo de pérdida |
| `root_squash` | Reduce los privilegios de root remoto | Protección recomendada |
| `no_root_squash` | Conserva privilegios de root remoto | Puede permitir abuso y escalada de privilegios |

Desde el cliente se pueden consultar recursos y montar uno de ellos:

```bash
showmount -e IP_SERVIDOR
sudo mkdir -p /mnt/nfs
sudo mount -t nfs IP_SERVIDOR:/srv/proyectos /mnt/nfs
```

Una exportación con escritura para demasiados clientes o con `no_root_squash` puede permitir modificar archivos sensibles. NFS debe practicarse en una máquina o entorno controlado, nunca compartiendo información personal sin revisar antes los permisos.

## Servidores web

Un servidor web recibe peticiones HTTP y devuelve recursos. Esos recursos pueden ser documentos HTML, imágenes, hojas de estilo, archivos descargables o respuestas generadas por una aplicación.

Servidores habituales:

- Apache HTTP Server.
- Nginx.
- Caddy.
- Lighttpd.
- El servidor sencillo incluido con Python, útil para laboratorios.

### Apache

En Debian o Ubuntu:

```bash
sudo apt install apache2 -y
systemctl status apache2
```

Ubicaciones habituales:

```text
/etc/apache2/apache2.conf
/var/www/html
```

En CachyOS/Arch el paquete y el servicio se llaman normalmente `apache` y `httpd`:

```bash
sudo pacman -S apache
systemctl status httpd
```

Su configuración principal suele estar en:

```text
/etc/httpd/conf/httpd.conf
```

Apache está diseñado para funcionar como servicio permanente, utilizar archivos de configuración, mantener registros y cargar módulos. Esto lo diferencia del servidor temporal de Python.

### Servidor HTTP de Python

Para publicar temporalmente el directorio actual:

```bash
python3 -m http.server 8081 --bind 127.0.0.1
```

También puede indicarse explícitamente otra carpeta:

```bash
python3 -m http.server 8081 --bind 127.0.0.1 --directory /ruta/a/publicar
```

Mientras el proceso esté activo, se accede desde:

```text
http://127.0.0.1:8081
```

Se detiene desde la terminal con `Ctrl+C`. Este servidor es útil para pruebas y transferencias controladas, pero no es apropiado para producción.

### `index.html` y la raíz web

Un archivo HTML es texto guardado con extensión `.html`. Ejemplo:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Mi primera página</title>
  </head>
  <body>
    <h1>Servidor funcionando</h1>
    <p>Este archivo fue entregado mediante HTTP.</p>
  </body>
</html>
```

Cuando el cliente pide `/`, el servidor busca por convención un documento principal como `index.html`. Por eso estas direcciones suelen mostrar lo mismo:

```text
http://127.0.0.1:8081/
http://127.0.0.1:8081/index.html
```

El directorio publicado se denomina **raíz web** o `document root`. Iniciar el servidor dentro de `/home/tano` sería peligroso porque podría exponer una zona demasiado amplia. Debe publicarse únicamente una carpeta preparada para ese fin y sin contraseñas, claves, configuraciones VPN ni información privada.

### Peticiones y códigos HTTP

Durante el laboratorio se utilizó Firefox como cliente y después `curl`:

```bash
curl -i http://127.0.0.1:8081/archivo-prueba.txt
```

Una respuesta exitosa contiene encabezados y cuerpo:

```text
HTTP/1.0 200 OK
Content-type: text/plain
Content-Length: ...

Contenido del archivo solicitado
```

- `GET` es el método utilizado para pedir un recurso.
- `Content-Type` informa qué clase de contenido se envía.
- `Content-Length` informa el tamaño de la respuesta.
- Después de los encabezados aparece el cuerpo.

Se pidió también un archivo inexistente:

```bash
curl -i http://127.0.0.1:8081/no-existe.txt
```

El servidor respondió `404 File not found`. La conclusión importante fue que **sí hubo conexión**: el servidor recibió la petición, pero no encontró el recurso solicitado.

| Código | Interpretación básica |
|---:|---|
| 200 | Petición exitosa |
| 301/302 | Redirección |
| 403 | Acceso prohibido |
| 404 | Recurso no encontrado |
| 500 | Error interno del servidor |

En seguridad, las diferencias entre respuestas ayudan a enumerar contenido. Solicitar rutas y analizar códigos, tamaños y encabezados puede revelar páginas, archivos, paneles o tecnologías. Estas pruebas solamente deben realizarse sobre sistemas propios o laboratorios autorizados.

## VPN: acceso seguro a una red remota

Una VPN crea un túnel cifrado entre el equipo local y otra red. En HTB se utilizó OpenVPN para incorporar la computadora local a la red del laboratorio:

```bash
sudo openvpn --config archivo.ovpn
```

El recorrido conceptual es:

```text
PerlaNegra → túnel VPN cifrado → red de HTB → máquina objetivo
```

Una vez activa la VPN, pueden usarse distintos servicios contra los objetivos autorizados:

```text
VPN activa
├── SSH en el puerto 22
├── HTTP en el puerto 80
├── HTTPS en el puerto 443
└── otros servicios del laboratorio
```

La diferencia que debe quedar clara es:

```text
VPN → conecta el equipo con una red remota
SSH → abre una sesión o ejecuta comandos en una máquina concreta
```

El archivo `.ovpn` contiene configuración sensible de acceso y no debe guardarse en los apuntes ni subirse al repositorio.

## FTP sin cifrar y alternativas seguras

FTP tradicional puede transmitir credenciales y datos en texto plano. Alguien capaz de observar ese tráfico podría leerlos. Según la necesidad, pueden utilizarse alternativas como:

- SFTP o SCP sobre SSH.
- HTTPS con TLS correctamente configurado.
- Una VPN para proteger el tráfico dentro del túnel.

`Plaintext` significa que los datos no están protegidos mediante cifrado. No alcanza con utilizar un puerto conocido como seguro: debe estar activo el protocolo y el cifrado correspondiente.

## Práctica realizada en PerlaNegra

Se creó una carpeta de laboratorio dentro de CyberStudy con:

```text
estudio/laboratorios/modulo-19-web-python/
├── index.html
└── archivo-prueba.txt
```

La práctica fue:

1. Entrar en la carpeta que se deseaba publicar.
2. Intentar levantar el servidor en `127.0.0.1:8000`.
3. Interpretar correctamente `Address already in use`.
4. Cambiar al puerto disponible `8081`.
5. Abrir `index.html` desde Firefox.
6. Abrir `archivo-prueba.txt` directamente.
7. Solicitar un recurso inexistente y comprender el código `404`.
8. Comparar respuestas mediante `curl -i`.
9. Comprender que `index.html` es un archivo de texto con extensión HTML que el navegador interpreta.

Comandos principales de la práctica:

```bash
cd /home/tano/proyectos/cyberstudy/estudio/laboratorios/modulo-19-web-python
python3 -m http.server 8081 --bind 127.0.0.1
curl -i http://127.0.0.1:8081/archivo-prueba.txt
curl -i http://127.0.0.1:8081/no-existe.txt
sudo ss -ltnp | grep ':8081'
```

## Prácticas recomendadas para reforzar

### Práctica 1: editar la página

Editar `index.html`, agregar un título, un párrafo y un enlace al archivo de prueba. Recargar Firefox y observar que no hace falta reiniciar Python porque el servidor lee nuevamente el archivo.

```html
<a href="archivo-prueba.txt">Descargar archivo de prueba</a>
```

### Práctica 2: comparar códigos

Solicitar un recurso existente y otro inexistente:

```bash
curl -i http://127.0.0.1:8081/index.html
curl -i http://127.0.0.1:8081/inventado.txt
```

Identificar el código, el tipo de contenido y el cuerpo en cada respuesta.

### Práctica 3: observar el puerto

Con el servidor activo, ejecutar:

```bash
ss -ltn | grep ':8081'
```

Detenerlo con `Ctrl+C` y repetir el comando. La entrada debería desaparecer porque ya no existe un proceso escuchando.

### Práctica 4: publicar otro directorio

Crear una carpeta que contenga únicamente archivos descartables y publicarla explícitamente:

```bash
python3 -m http.server 8082 --bind 127.0.0.1 --directory /ruta/de/practica
```

Verificar que el contenido de otros directorios no pueda solicitarse desde esa raíz web.

### Práctica 5: reconocer cliente y servidor

Para cada comando, responder:

```text
ssh usuario@IP                  → cliente: ssh; servidor: sshd remoto
curl http://IP:PUERTO           → cliente: curl; servidor: servicio web
showmount -e IP                 → cliente: showmount; servidor: NFS remoto
sudo openvpn --config red.ovpn  → cliente VPN local; servidor VPN remoto
```

## Errores y precauciones

- `Address already in use` significa que el puerto está ocupado; no se debe matar un proceso sin identificarlo.
- Un `404` confirma que hubo comunicación, pero el servidor no encontró la ruta solicitada.
- `127.0.0.1` limita el acceso al equipo local; `0.0.0.0` amplía la exposición.
- Python `http.server` no ofrece por sí solo autenticación ni HTTPS y no debe usarse en producción.
- Usar el puerto `443` no activa TLS automáticamente.
- Los puertos inferiores a `1024` suelen requerir privilegios adicionales en Linux. No conviene ejecutar el servidor de práctica como root.
- Nunca iniciar un servidor web desde una carpeta que contenga secretos.
- No habilitar Apache, SSH o NFS automáticamente al arranque sin necesitarlo y sin revisar su configuración.
- NFS con `no_root_squash` o permisos demasiado amplios puede ser una vulnerabilidad seria.
- Los comandos y nombres de servicios varían entre Debian/Ubuntu y CachyOS/Arch.

## Inglés técnico del módulo

- `network service` → servicio de red.
- `client` / `server` → cliente / servidor.
- `listen` / `listening port` → escuchar / puerto en escucha.
- `request` / `response` → petición / respuesta.
- `remote host` → equipo remoto.
- `share` → recurso compartido.
- `mount` → montar un sistema de archivos.
- `document root` → raíz desde la que el servidor publica archivos.
- `plaintext` → texto sin cifrar.
- `encrypted tunnel` → túnel cifrado.
- `port forwarding` → redirección de puertos.
- `file not found` → archivo no encontrado.
- `address already in use` → dirección o puerto ya ocupado.
- `privilege escalation` → escalada de privilegios.

## Lo que más costó y cómo se entendió

El texto original presentaba varios servicios y comandos, pero no dejaba suficientemente claro qué papel cumple cada componente. La práctica permitió relacionar conceptos abstractos con algo visible.

Primero apareció `Address already in use`. Se comprendió que el servidor todavía no había iniciado porque otro proceso ocupaba `8000`, y que cambiar a `8081` solucionaba el conflicto sin cerrar un proceso desconocido.

Después se solicitó un archivo inexistente. Al principio se observó simplemente que “da error porque no existe”. La idea importante que surgió fue más precisa: **la conexión sí funcionó y el servidor respondió; el problema estaba solamente en el recurso pedido**. Esta diferencia ayuda a diagnosticar redes y aplicaciones:

```text
Sin conexión → no se pudo llegar al servicio
404          → se llegó al servicio, pero la ruta no existe
```

También se aclaró que `index.html` no aparece por arte de magia: es un archivo de texto creado como cualquier otro, con contenido HTML. Su nombre es una convención que permite al servidor elegirlo cuando el cliente solicita `/`.

## Qué aprendí

Comprendí la relación entre cliente, servidor, proceso, IP, puerto y protocolo. Levanté un servidor HTTP local con Python, publiqué una carpeta controlada, accedí desde Firefox y `curl`, interpreté respuestas `200` y `404`, y resolví un conflicto de puerto ocupado. También diferencié SSH, NFS, servidores web y VPN, entendí por qué FTP tradicional es inseguro y reconocí riesgos como publicar directorios sensibles, escuchar en todas las interfaces o utilizar `no_root_squash` en NFS.

## Para repasar

- Explicar con palabras propias por qué `127.0.0.1:8081` contiene una IP y un puerto.
- Diferenciar falta de conexión de una respuesta HTTP `404`.
- Recordar que cambiar el puerto a `443` no activa HTTPS.
- Practicar `curl -i` y leer encabezados y cuerpo.
- Practicar `ss -ltnp` para relacionar puertos con procesos.
- Comparar SSH con VPN: máquina concreta frente a red remota.
- Comparar Python `http.server` con Apache: servidor temporal frente a servicio configurable.
- Revisar los riesgos de NFS y la diferencia entre `root_squash` y `no_root_squash`.
