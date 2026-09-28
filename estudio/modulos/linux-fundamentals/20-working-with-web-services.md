# 20 de 30 — Working with Web Services

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

Un **servicio web** es un programa que escucha peticiones y responde utilizando un protocolo web, normalmente HTTP o HTTPS. El navegador, `curl` o `wget` pueden actuar como clientes. Apache, el servidor integrado de Python, `http-server` de Node.js y el servidor integrado de PHP pueden actuar como servidores.

La separación más importante de este módulo es:

```text
HTTP       = idioma o protocolo de comunicación
Apache     = programa servidor web completo
Python     = lenguaje que incluye un servidor HTTP sencillo
PHP        = lenguaje que incluye un servidor web de desarrollo
Node.js    = entorno que puede ejecutar paquetes servidores instalados con npm
npm        = gestor de paquetes del ecosistema Node.js
```

Por eso, decir “servidor HTTP” **no significa automáticamente Python**. Varias herramientas pueden hablar HTTP. La pregunta indica cuál debe usarse: si dice `npm`, hay que buscar una herramienta de Node/npm; si dice `php`, hay que utilizar PHP; si pide Python, corresponde `python3 -m http.server`.

## Cómo razonar una consigna técnica

Conviene separar cada pregunta en cuatro partes:

1. **Acción:** ¿qué hay que hacer? En este caso, iniciar un servidor.
2. **Herramienta obligatoria:** ¿con qué tecnología? `npm` o `php`.
3. **Dirección:** ¿debe escuchar solamente en localhost o en todas las interfaces?
4. **Puerto y formato:** ¿qué puerto pide y exige una opción corta o larga?

Ejemplo con la primera pregunta:

```text
“Iniciar un servidor HTTP simple utilizando npm, en el puerto 8080,
con el argumento corto para el puerto.”

Acción       → iniciar servidor HTTP
Herramienta  → paquete instalado mediante npm
Puerto       → 8080
Formato      → opción corta
Respuesta    → http-server -p 8080
```

Ejemplo con la segunda:

```text
“Iniciar un servidor HTTP simple utilizando php,
en localhost (127.0.0.1), puerto 8080.”

Acción       → iniciar servidor HTTP
Herramienta  → PHP
Dirección    → 127.0.0.1
Puerto       → 8080
Respuesta    → php -S 127.0.0.1:8080
```

No conviene elegir un comando por asociación. Hay que localizar primero las palabras que imponen la herramienta, la dirección, el puerto y el tipo de opción.

## Cliente, servidor y HTTP

Cuando se abre `http://127.0.0.1:8080/`, ocurre este recorrido:

```text
curl o navegador
      │
      │ petición HTTP: GET /
      ▼
servidor en 127.0.0.1:8080
      │
      │ respuesta HTTP: estado + encabezados + cuerpo
      ▼
curl muestra texto / navegador renderiza la página
```

- `127.0.0.1` es la dirección de loopback: representa la propia computadora.
- `8080` identifica el puerto donde escucha el proceso.
- HTTP define cómo se forma la petición y la respuesta.
- La herramienta concreta decide cómo servir archivos o producir contenido dinámico.

## Apache

Apache es un servidor web completo, pensado para configurarse y mantenerse como servicio. En Debian, Ubuntu y Pwnbox se instala normalmente así:

```bash
sudo apt install apache2 -y
sudo systemctl start apache2
systemctl status apache2
```

Por defecto suele escuchar HTTP en el puerto `80`, por lo que estas dos URL son equivalentes:

```text
http://localhost
http://localhost:80
```

Si el puerto 80 ya está ocupado, Apache puede configurarse para escuchar en otro. En Debian/Ubuntu se modifica `/etc/apache2/ports.conf`, por ejemplo:

```apache
Listen 8080
```

También hay que comprobar la configuración de `VirtualHost`, reiniciar el servicio y verificar la respuesta:

```bash
sudo systemctl restart apache2
curl -I http://localhost:8080
```

En CachyOS/Arch cambian el paquete y el nombre del servicio:

```bash
sudo pacman -S apache
sudo systemctl start httpd
systemctl status httpd
```

### Módulos de Apache

Apache es modular: se le agregan funciones según lo que necesite el servidor.

| Módulo | Función |
|---|---|
| `mod_ssl` | Agrega soporte para cifrado TLS/HTTPS. |
| `mod_proxy` | Reenvía peticiones hacia otro servidor o aplicación. |
| `mod_headers` | Permite consultar o modificar encabezados HTTP. |
| `mod_rewrite` | Reescribe URLs aplicando reglas. |

Una analogía útil es que Apache es la estructura de una casa y cada módulo agrega una función especializada. El módulo no cambia qué es HTTP; amplía lo que Apache puede hacer con las peticiones y respuestas.

## Contenido estático y dinámico

El contenido **estático** ya existe como archivo y el servidor lo entrega prácticamente sin modificarlo:

```text
GET /index.html → el servidor lee index.html → devuelve su contenido
```

Ejemplos: HTML, CSS, imágenes y archivos de texto.

El contenido **dinámico** se genera al recibir la petición. Un programa puede consultar datos, realizar cálculos y construir la respuesta:

```text
GET /perfil → programa consulta datos → genera HTML → devuelve la respuesta
```

PHP, Python, JavaScript, Ruby, Perl, Java o .NET pueden generar contenido dinámico del lado del servidor. El lenguaje utilizado y el protocolo HTTP son capas distintas.

## Servidor sencillo con Python

Python incluye un módulo que publica los archivos del directorio actual:

```bash
python3 -m http.server 8000
```

- `python3` ejecuta Python 3.
- `-m` indica que se ejecutará un módulo como programa.
- `http.server` es el módulo servidor.
- `8000` es el puerto.

Para limitar el acceso a la propia computadora y elegir otro puerto:

```bash
python3 -m http.server 8081 --bind 127.0.0.1
```

El directorio desde donde se ejecuta el comando se convierte en la raíz publicada. En la práctica local se utilizó:

```bash
cd /home/tano/proyectos/cyberstudy/estudio/laboratorios/modulo-19-web-python
python3 -m http.server 8081 --bind 127.0.0.1
```

Python fue elegido para esta **práctica previa** porque ya estaba instalado y permitía ver rápidamente cómo funciona HTTP. No fue la respuesta a la consigna posterior que exigía npm.

## Servidor sencillo con Node.js y npm

Node.js es un entorno para ejecutar JavaScript fuera del navegador. `npm` administra paquetes para ese ecosistema. El paquete usado en la pregunta fue `http-server`:

```bash
sudo npm install -g http-server
```

- `npm install` instala un paquete.
- `-g` significa instalación global, para poder llamar al ejecutable desde distintos directorios.
- `http-server` es el nombre del paquete y del comando instalado.

Luego se inicia en el puerto solicitado:

```bash
http-server -p 8080
```

- `http-server` inicia el servidor.
- `-p` es la versión corta de la opción de puerto.
- `8080` es el valor asignado.

La advertencia `npm WARN deprecated ...` observada durante la instalación pertenecía a una dependencia antigua. No significaba que la instalación hubiera fallado: la línea `added 48 packages` confirmó que terminó. Una advertencia debe leerse, pero se diferencia de un error que detiene el proceso.

Otra posibilidad para ejecutar un paquete sin instalarlo globalmente es:

```bash
npx http-server -p 8080
```

Sin embargo, si HTB pide específicamente **el comando que inicia el servidor** después de instalarlo, la respuesta directa esperada es `http-server -p 8080`.

## Servidor sencillo con PHP

PHP incluye un servidor de desarrollo. Para escuchar únicamente en localhost, puerto 8080:

```bash
php -S 127.0.0.1:8080
```

- `php` ejecuta el intérprete.
- `-S` inicia el servidor web integrado; la `S` es mayúscula.
- `127.0.0.1:8080` combina dirección y puerto.

Este servidor publica el directorio actual y puede interpretar archivos `.php`. Ejemplo mínimo:

```php
<?php
$nombre = "Tano";
echo "Hola, $nombre";
?>
```

Guardado como `saludo.php`, podría solicitarse con:

```bash
curl http://127.0.0.1:8080/saludo.php
```

Resultado esperado:

```text
Hola, Tano
```

El cliente recibe el resultado generado, no necesariamente el código PHP original.

## `curl`: consultar y analizar respuestas

`curl` funciona como un cliente desde la terminal. Según la opción usada muestra distintas partes de la respuesta:

```bash
curl http://127.0.0.1:8081
curl -i http://127.0.0.1:8081
curl -I http://127.0.0.1:8081
```

| Comando | Qué muestra |
|---|---|
| `curl URL` | Principalmente el cuerpo de la respuesta. |
| `curl -i URL` | Encabezados y cuerpo. |
| `curl -I URL` | Solamente encabezados, mediante una petición `HEAD`. |

Durante la práctica, `curl -i` mostró algo similar a:

```text
HTTP/1.0 200 OK
Server: SimpleHTTP/0.6 Python/3.14.7
Content-type: text/html
Content-Length: 737
Last-Modified: ...

<!doctype html>
...
```

Interpretación:

- `200 OK`: la petición se procesó correctamente.
- `Server`: software que produjo la respuesta.
- `Content-Type`: tipo de contenido entregado.
- `Content-Length`: tamaño del cuerpo.
- `Last-Modified`: última modificación conocida del recurso.
- La línea vacía separa los encabezados del cuerpo.

El navegador interpreta y dibuja HTML, CSS y JavaScript. `curl` muestra la respuesta sin convertirla en una página visual, lo que facilita inspeccionarla o procesarla con otros comandos.

## `wget`: descargar contenido

`wget` también realiza peticiones, pero su comportamiento habitual está orientado a guardar el recurso en un archivo:

```bash
wget http://127.0.0.1:8081/index.html
```

Resultado esperado: crea un archivo local llamado `index.html`. Una forma simple de recordar la diferencia es:

```text
curl → consultar, probar y enviar la respuesta a STDOUT
wget → descargar y guardar contenido
```

Ambos tienen muchas opciones y pueden hacer más tareas; ésta es la diferencia básica relevante para el módulo.

## Cómo investigar una opción sin memorizarla

Cuando una pregunta exige una opción corta o larga, hay que consultar la ayuda:

```bash
http-server --help
php --help
python3 -m http.server --help
curl --help
```

Para filtrar términos en inglés:

```bash
http-server --help | grep -i port
php --help | grep -i server
curl --help | grep -i header
```

Método de lectura:

1. Buscar la palabra central de la consigna: `port`, `server`, `bind`, `header`.
2. Localizar la línea que describe esa función.
3. Distinguir opción corta (`-p`) de larga (`--port`).
4. Revisar si la opción espera un valor.
5. Construir y probar el comando.

Ejemplo conceptual:

```text
-p, --port PORT
│   │      └── necesita un número
│   └───────── opción larga
└───────────── opción corta pedida por HTB
```

## Diferencias que hay que recordar

| Conceptos | Diferencia |
|---|---|
| HTTP vs. Python/PHP/Node | HTTP es el protocolo; los demás son tecnologías capaces de implementar un servidor. |
| Node.js vs. npm | Node ejecuta JavaScript; npm instala y administra paquetes. |
| `http-server` vs. `npm` | `http-server` sirve archivos; npm se usa para instalarlo. |
| Apache vs. servidores integrados | Apache es configurable y apto para un servicio real; los otros son ideales para desarrollo y laboratorios. |
| `127.0.0.1` vs. `0.0.0.0` | El primero acepta conexiones locales; el segundo escucha en todas las interfaces disponibles. |
| `curl` vs. `wget` | `curl` suele inspeccionar o encadenar datos; `wget` suele descargar archivos. |
| `curl -i` vs. `curl -I` | `-i` muestra encabezados y cuerpo; `-I` solicita encabezados solamente. |
| Contenido estático vs. dinámico | El estático ya existe como archivo; el dinámico se genera al recibir la petición. |
| `WARN` vs. `ERROR` | Una advertencia informa un posible problema; un error normalmente impide completar la operación. |

## Prácticas para reforzar

### Práctica 1: servir el mismo archivo con herramientas distintas

En una carpeta de laboratorio que no contenga información privada, crear `index.html` y levantar, de a uno, distintos servidores:

```bash
python3 -m http.server 8081 --bind 127.0.0.1
http-server -p 8080
php -S 127.0.0.1:8082
```

Detener cada uno con `Ctrl+C` antes de iniciar el siguiente si se reutiliza el puerto. Consultarlos con `curl -i` y comparar el encabezado `Server`.

### Práctica 2: comparar `curl` y `wget`

```bash
curl http://127.0.0.1:8081/index.html
wget http://127.0.0.1:8081/index.html
```

Observar que el primero imprime el contenido y el segundo intenta guardarlo.

### Práctica 3: estático frente a dinámico

Crear `index.html` con un texto fijo y `hora.php` con:

```php
<?php echo date('H:i:s'); ?>
```

Iniciar PHP:

```bash
php -S 127.0.0.1:8080
```

Solicitar varias veces ambos archivos. El HTML no cambia por sí solo; PHP genera la hora al recibir cada petición.

### Práctica 4: razonar antes de ejecutar

Para cada consigna, subrayar mentalmente:

```text
acción | herramienta | dirección | puerto | opción corta/larga
```

Después buscar la sintaxis con `--help`. El objetivo no es memorizar todos los comandos, sino aprender a traducir requisitos a opciones.

## Errores y precauciones

- No ejecutar automáticamente Python cuando una consigna nombra `npm`, `php` u otra herramienta.
- `npm` no es Python: pertenece al ecosistema Node.js/JavaScript.
- `php -S` utiliza una `S` mayúscula; Linux distingue mayúsculas y minúsculas.
- `Address already in use` indica que otro proceso ocupa el puerto. Hay que identificarlo o elegir otro puerto.
- Un servidor iniciado desde el directorio equivocado puede publicar archivos que no se pretendía compartir.
- `127.0.0.1` es más seguro para prácticas locales que escuchar en todas las interfaces.
- Los servidores integrados de Python y PHP, y paquetes simples como `http-server`, no reemplazan una configuración segura de producción.
- No ejecutar estos servidores como root si no es necesario.
- No publicar claves, contraseñas, archivos `.env`, configuraciones VPN ni documentos personales.
- Instalar paquetes globalmente con `sudo npm install -g` modifica el sistema. En una máquina personal conviene entender la configuración de Node/npm o usar `npx`; en la Pwnbox descartable fue suficiente para el ejercicio.

## Inglés técnico del módulo

- `web service` → servicio web.
- `web server` → servidor web.
- `request` → petición enviada por un cliente.
- `response` → respuesta del servidor.
- `serve` → servir o entregar contenido.
- `listen` → quedar escuchando conexiones.
- `bind` → vincular el servicio a una dirección.
- `port` → puerto.
- `built-in server` → servidor integrado.
- `command-line tool` → herramienta de línea de comandos.
- `header` → encabezado HTTP.
- `response body` → cuerpo de la respuesta.
- `static content` → contenido estático.
- `dynamic content` → contenido dinámico.
- `server-side scripting` → ejecución de código del lado del servidor.
- `deprecated` → obsoleto; se mantiene por compatibilidad, pero se recomienda reemplazarlo.
- `short option` / `long option` → opción corta / opción larga.
- `fetch` → obtener un recurso.

## Lo que más costó y cómo razonarlo

La dificultad principal fue interpretar qué relación existe entre HTTP, npm, Python y PHP. Como la práctica anterior había usado `python3 -m http.server`, era razonable asociar “servidor HTTP simple” con Python. Pero esa asociación no alcanza cuando la consigna impone una tecnología.

El razonamiento correcto es:

```text
¿Qué protocolo se usa?      HTTP
¿Qué herramienta exige?     npm / PHP / Python
¿Dónde debe escuchar?       127.0.0.1 u otra dirección
¿En qué puerto?             8080
¿Qué formato de opción?     corta o larga
```

En la primera pregunta no se decidió iniciar con Python. Python se había usado antes para aprender y probar HTTP localmente. Cuando la consigna dijo `npm`, se investigó una herramienta instalable con npm (`http-server`) y su opción corta de puerto (`-p`). Cuando la segunda dijo `php`, se utilizó el servidor integrado de PHP (`-S`).

La enseñanza general es que **el mismo objetivo puede alcanzarse con herramientas distintas**. En administración Linux y ciberseguridad, las palabras exactas de la consigna determinan cuál corresponde.

## Qué aprendí

Comprendí que HTTP es un protocolo y no una herramienta exclusiva de Python. Aprendí a distinguir Apache, Python, PHP, Node.js y npm; inicié servidores sencillos con `http-server -p 8080` y `php -S 127.0.0.1:8080`; interpreté una advertencia de npm sin confundirla con un error; y practiqué cómo leer una consigna identificando acción, herramienta, dirección, puerto y tipo de opción. También reforcé el uso de `curl`, `wget`, encabezados HTTP y la diferencia entre contenido estático y dinámico.

## Para repasar o practicar

- Explicar con palabras propias por qué HTTP no significa Python.
- Recordar la diferencia entre Node.js, npm y el paquete `http-server`.
- Practicar `comando --help | grep -i palabra` buscando `port`, `bind`, `server` y `header`.
- Comparar `curl`, `curl -i`, `curl -I` y `wget`.
- Levantar de a uno servidores con Python, npm y PHP, y comparar las respuestas.
- Reforzar la diferencia entre contenido estático y dinámico.
- Recordar que `127.0.0.1` limita el acceso a la computadora local.
- Practicar la lectura de consignas separando acción, herramienta, dirección, puerto y formato de opción.
