# 27 de 30 — Firewall Setup

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

Un firewall examina tráfico de red y decide qué paquetes permitir, bloquear, rechazar, registrar o modificar. No funciona por intención: procesa reglas concretas y ordenadas según datos como protocolo, dirección, puerto, interfaz y estado de conexión.

El modelo mental utilizado en el módulo fue:

```text
Paquete
  ↓
Tabla según la tarea
  ↓
Cadena según el recorrido
  ↓
Reglas evaluadas en orden
  ↓
Coincidencia o match
  ↓
Objetivo/acción o target
```

Una regla individual puede estar bien escrita y aun así no producir el resultado esperado si otra regla anterior captura el paquete primero.

## Netfilter, iptables y nftables

### Netfilter

Netfilter es la infraestructura del kernel Linux que ofrece puntos o *hooks* para inspeccionar y modificar paquetes durante su recorrido.

### iptables

`iptables` es una herramienta histórica de espacio de usuario para configurar reglas de Netfilter. Su sintaxis organiza reglas en tablas y cadenas.

### nftables

`nftables` es la alternativa moderna. Utiliza la herramienta `nft`, una sintaxis más uniforme y recursos como sets, maps y verdict maps para administrar reglas con mayor flexibilidad.

Una corrección importante al texto del módulo: nftables no está construido “encima de iptables”. Los dos son interfaces distintas para trabajar con Netfilter. Sí existe una capa de compatibilidad que permite utilizar la sintaxis clásica de iptables sobre el backend moderno de nftables.

En PerlaNegra se comprobó:

```bash
iptables --version
nft --version
```

Resultados observados:

```text
iptables v1.8.13 (nf_tables)
nftables v1.1.7
```

`(nf_tables)` significa:

```text
Comandos escritos con sintaxis iptables
                    ↓
Capa de compatibilidad iptables-nft
                    ↓
Backend nf_tables del kernel
```

No significa que el formato nativo de respaldo de ambas herramientas sea idéntico.

## Tablas

Las tablas agrupan reglas por finalidad.

| Tabla | Función principal | Cadenas frecuentes |
|---|---|---|
| `filter` | Permitir o bloquear tráfico | `INPUT`, `OUTPUT`, `FORWARD` |
| `nat` | Modificar origen o destino para NAT | `PREROUTING`, `INPUT`, `OUTPUT`, `POSTROUTING` |
| `mangle` | Modificar campos o marcas de paquetes | Las cinco cadenas principales |
| `raw` | Tratamiento especial previo al seguimiento de conexiones | `PREROUTING`, `OUTPUT` |

Si no se especifica `-t`, iptables utiliza normalmente la tabla `filter`:

```bash
iptables -L
```

Es equivalente conceptualmente a listar la tabla de filtrado predeterminada.

Para indicar otra tabla:

```bash
iptables -t nat -L -n -v
```

## Cadenas y recorrido de paquetes

Las cadenas representan puntos diferentes del recorrido:

```text
PREROUTING  → antes de que el kernel decida la ruta
INPUT       → tráfico destinado a esta computadora
FORWARD     → tráfico que atraviesa esta computadora hacia otra
OUTPUT      → tráfico generado por esta computadora
POSTROUTING → después de decidir la ruta, antes de salir
```

### Tráfico hacia un servicio local

```text
Red → PREROUTING → decisión de ruta → INPUT → aplicación local
```

### Tráfico generado localmente

```text
Programa local → OUTPUT → decisión de ruta → POSTROUTING → red
```

### Equipo actuando como router

```text
Red A → PREROUTING → FORWARD → POSTROUTING → Red B
```

No todas las cadenas existen en todas las tablas. `INPUT`, por ejemplo, es la cadena principal utilizada en la práctica para filtrar conexiones destinadas al servidor Python local.

## Anatomía de una regla

Ejemplo:

```bash
iptables -I INPUT 1 -p tcp --dport 8080 -j REJECT
```

Se interpreta así:

```text
iptables          herramienta
-I                operación: insertar
INPUT             cadena
1                 posición
-p tcp            coincidencia: protocolo TCP
--dport 8080      coincidencia: puerto de destino 8080
-j REJECT         objetivo o acción
```

Modelo para leer reglas:

```text
operación → cadena → posición → coincidencias → acción
```

Las opciones pueden tener variantes y la sintaxis exacta debe consultarse con `iptables --help` o `man iptables`, pero este orden mental facilita comprenderlas.

## Operaciones importantes

### Agregar al final

```bash
iptables -A INPUT ...
```

`-A` significa **append**: agrega al final de la cadena.

### Insertar

```bash
iptables -I INPUT ...
```

Sin número, `-I` inserta al principio, no al final.

```bash
iptables -I INPUT 3 ...
```

Inserta en la posición 3 y desplaza hacia abajo las reglas existentes.

### Eliminar por número

```bash
iptables -D INPUT 2
```

Elimina la regla que ocupa actualmente la posición 2. Después de borrarla, las reglas inferiores se renumeran. Siempre hay que listar otra vez antes de eliminar la siguiente.

### Crear una cadena

```bash
iptables -N WEB_TRAFFIC
```

`-N` significa **new chain**.

### Eliminar una cadena

```bash
iptables -X WEB_TRAFFIC
```

Una cadena personalizada debe estar vacía y no tener referencias para poder eliminarla. Primero se retiran los saltos hacia ella y sus reglas internas.

### Listar

```bash
iptables -L -n -v --line-numbers
```

- `-L`: lista cadenas y reglas.
- `-n`: no resuelve nombres; muestra direcciones y puertos numéricos.
- `-v`: salida detallada, incluidos contadores.
- `--line-numbers`: muestra posiciones utilizables con `-D` o `-I`.

## Coincidencias o matches

Los matches deciden si una regla corresponde al paquete.

| Opción | Qué compara |
|---|---|
| `-p tcp` | Protocolo TCP |
| `-p udp` | Protocolo UDP |
| `-p icmp` | Protocolo ICMP |
| `--dport 8080` | Puerto de destino |
| `--sport 12345` | Puerto de origen |
| `-s 192.168.1.0/24` | IP o red de origen |
| `-d 192.168.1.10` | IP de destino |
| `-i INTERFAZ` | Interfaz de entrada |
| `-o INTERFAZ` | Interfaz de salida |
| `-m conntrack --ctstate ...` | Estado conocido de la conexión |
| `-m multiport` | Varios puertos |
| `-m limit` | Límite de frecuencia |

`--dport` lleva dos guiones. Durante la práctica se escribió inicialmente `-dport`; el razonamiento era correcto, pero la opción no existía con un solo guion.

## Objetivos o targets

`-j` significa **jump**. Puede saltar a una acción o a otra cadena.

### ACCEPT

```bash
-j ACCEPT
```

Acepta el paquete y detiene el recorrido por esa cadena.

### DROP

```bash
-j DROP
```

Descarta el paquete sin responder. El cliente normalmente espera hasta agotar su tiempo.

### REJECT

```bash
-j REJECT
```

Bloquea y envía una respuesta de rechazo. El cliente suele fallar inmediatamente.

### LOG

```bash
-j LOG
```

Registra información, pero normalmente no decide por sí solo aceptar o descartar. Se debe limitar la frecuencia para evitar llenar los logs.

### Salto a cadena personalizada

```bash
-j WEB_TRAFFIC
```

Envía la evaluación a esa cadena. Si la cadena personalizada termina sin un veredicto, el paquete regresa a la cadena que la llamó y continúa en la regla siguiente, como un `RETURN` implícito.

## DROP frente a REJECT

Se observaron comportamientos diferentes:

```text
DROP   → silencio → curl esperó → timeout
REJECT → respuesta inmediata → curl falló en 0 ms
```

Con `DROP`, la prueba mostró:

```text
curl: (28) Connection timed out after 2000 milliseconds
```

Con `REJECT`, mostró:

```text
curl: (7) Failed to connect ... after 0 ms
```

Ninguno es universalmente “mejor”. La elección depende del objetivo, del protocolo, de la experiencia del usuario y de la política de seguridad.

## Orden, colisiones y reglas sombreadas

Las reglas se acumulan; una nueva no reemplaza automáticamente a otra.

Ejemplo practicado:

```text
1  DROP    origen 127.0.0.1
2  ACCEPT  TCP puerto 8080
3  DROP    TCP puerto 8080
```

Para una conexión desde `127.0.0.1` hacia TCP/8080:

```text
Regla 1: ¿origen 127.0.0.1? Sí → DROP → termina
```

Las reglas 2 y 3 no se evalúan. Una regla posterior que nunca puede alcanzarse por otra regla más amplia se denomina **shadowed rule** o regla sombreada.

Las aparentes contradicciones también pueden ser intencionales:

```text
1. Permitir a la red de administradores acceder a SSH
2. Bloquear SSH para todos los demás
```

Conviene ordenar de lo específico a lo general:

```text
Excepciones específicas
        ↓
Reglas por servicio o red
        ↓
Reglas generales
        ↓
Política predeterminada
```

## Contadores

La salida detallada muestra:

```text
pkts  bytes  target ...
```

- `pkts`: cantidad de paquetes que coincidieron.
- `bytes`: cantidad de bytes correspondientes.

En la práctica, el contador de `ACCEPT tcp` aumentó después de ejecutar `curl`. Esto demostró qué regla recibió realmente el tráfico y no solamente cuál parecía correcta al leerla.

Los contadores ayudan a identificar reglas activas, no utilizadas o ubicadas detrás de otra que absorbe todo el tráfico.

## Laboratorio aislado utilizado

No se modificó el firewall real de PerlaNegra porque Docker, Home Assistant, Open WebUI y FreeLingo pueden depender de reglas reales. Se creó un network namespace temporal:

```bash
sudo unshare --net --mount-proc bash
```

- `--net`: crea un espacio de red independiente.
- `--mount-proc`: monta una vista de procesos adecuada dentro del entorno.
- `bash`: abre una shell en el laboratorio.

No era una máquina virtual completa:

```text
Kernel de PerlaNegra
├── red real y Docker
└── namespace de práctica
    ├── loopback propio
    ├── puertos propios
    └── reglas de firewall propias
```

El namespace compartía kernel y sistema de archivos con el host, pero aislaba interfaces, rutas, puertos y reglas de red. Por eso era adecuado para esta práctica, pero no para ejecutar malware o software desconocido.

Se activó loopback:

```bash
ip link set lo up
ip -brief address
```

Resultado esperado:

```text
lo  UNKNOWN  127.0.0.1/8 ::1/128
```

`UNKNOWN` es normal en loopback porque no existe un enlace físico cuyo estado pueda detectarse.

## Servidor de prueba

Dentro del namespace se inició:

```bash
python3 -m http.server 8080 --bind 127.0.0.1 >/tmp/firewall-lab.log 2>&1 &
```

- `-m http.server`: ejecuta el módulo servidor HTTP de Python.
- `8080`: puerto TCP.
- `--bind 127.0.0.1`: limita el listener al loopback del laboratorio.
- `>`: envía salida al log.
- `2>&1`: combina errores con la salida.
- `&`: ejecuta en segundo plano.

Prueba base:

```bash
curl -I --max-time 2 http://127.0.0.1:8080
```

- `-I`: solicita solamente encabezados.
- `--max-time 2`: evita esperar indefinidamente cuando se usa `DROP`.

La respuesta inicial fue:

```text
HTTP/1.0 200 OK
```

## Los diez ejercicios realizados

### 1. Bloquear TCP/8080

```bash
iptables -A INPUT -p tcp --dport 8080 -j DROP
```

La conexión terminó en timeout, confirmando el bloqueo silencioso.

### 2. Permitir TCP/8080

```bash
iptables -I INPUT 1 -p tcp --dport 8080 -j ACCEPT
```

Fue necesario insertar antes del `DROP`; agregar al final no lo habría superado.

### 3. Bloquear una IP específica

```bash
iptables -I INPUT 1 -s 127.0.0.1 -j DROP
```

En el namespace solo se utilizó loopback, por eso `127.0.0.1` representó el origen de práctica. Al no limitar protocolo o puerto, la regla era más amplia.

### 4. Permitir una IP específica

```bash
iptables -I INPUT 1 -s 127.0.0.1 -j ACCEPT
```

Se colocó antes del bloqueo para que actuara como excepción.

### 5. Bloquear según protocolo

Primer intento:

```text
iptables -I REJECT 1 -p tcp
```

El error conceptual fue utilizar `REJECT` donde debía ir una cadena. Después de `-I`, iptables espera una cadena; `REJECT` es un target y debe aparecer después de `-j`.

Regla corregida por Tano:

```bash
iptables -I INPUT 1 -p tcp -j REJECT
```

Se bloqueó todo TCP entrante, no solamente 8080, y `curl` falló inmediatamente.

### 6. Permitir según protocolo

```bash
iptables -I INPUT 1 -p tcp -j ACCEPT
```

El permiso se insertó antes del `REJECT`. El servidor volvió a responder y aumentó el contador de la nueva regla.

### 7. Crear una cadena

```bash
iptables -N WEB_TRAFFIC
```

La cadena apareció inicialmente vacía y con cero referencias.

### 8. Enviar tráfico a la cadena

Intento inicial:

```text
iptables -I INPUT 1 -p tcp -dport 8080 -j WEB_TRAFFIC
```

La corrección fue utilizar `--dport`:

```bash
iptables -I INPUT 1 -p tcp --dport 8080 -j WEB_TRAFFIC
```

Como `WEB_TRAFFIC` estaba vacía, el paquete regresaba a `INPUT` y continuaba con la regla siguiente.

### 9. Eliminar una regla específica

Se consultaron posiciones y se eliminó la regla 2 existente en ese momento:

```bash
iptables -D INPUT 2
```

La regla desapareció y las inferiores se renumeraron. El ejercicio pedía una regla específica, no borrar obligatoriamente la cadena creada.

### 10. Listar todas las reglas

```bash
iptables -L -n -v --line-numbers
```

Al no indicar solamente `INPUT`, se mostraron todas las cadenas de la tabla predeterminada, incluida `WEB_TRAFFIC` y su cantidad de referencias.

## Limpieza del laboratorio

Antes de salir conviene detener el servidor:

```bash
jobs
kill %1
exit
```

`jobs` identifica el trabajo en segundo plano. `kill %1` termina el trabajo número 1 y `exit` abandona la shell. Si quedara otro proceso dentro del namespace, podría mantenerlo vivo; por eso no se debe asumir que salir siempre destruye todos los procesos automáticamente.

## Respaldos y migración

Respaldo en formato iptables:

```bash
sudo iptables-save > reglas-iptables.txt
```

Restauración correspondiente:

```bash
sudo iptables-restore < reglas-iptables.txt
```

Respaldo nativo de nftables:

```bash
sudo nft list ruleset > reglas-nftables.conf
```

Validación sin aplicar:

```bash
sudo nft --check -f reglas-nftables.conf
```

Aplicación nativa:

```bash
sudo nft -f reglas-nftables.conf
```

Los formatos no son directamente intercambiables. Para traducir un ruleset de iptables:

```bash
iptables-restore-translate -f reglas-iptables.txt > reglas-nftables.conf
```

La traducción debe revisarse: extensiones complejas pueden quedar sin convertir o representadas mediante compatibilidad. No se debe mezclar a ciegas herramientas legacy y nativas sobre el mismo sistema de producción.

## Administración en empresas

En entornos grandes no se administran cientos de reglas como comandos sueltos sin registro. Se utilizan:

- Política restrictiva por defecto.
- Cadenas separadas por función.
- Sets o grupos de direcciones y puertos.
- Comentarios, responsables y tickets.
- Archivos versionados con Git.
- Revisión por otra persona.
- Pruebas en laboratorio y staging.
- Aplicación automatizada, por ejemplo con Ansible.
- Backup y plan de reversión.
- Auditorías de reglas duplicadas, sombreadas o vencidas.

Ejemplo de organización:

```text
INPUT
├── SSH_RULES
├── WEB_RULES
├── MONITORING_RULES
└── BLOCKLIST
```

En nftables, los sets permiten agrupar varias IP y mantener una sola regla lógica, en lugar de duplicar reglas para cada administrador.

## Errores y precauciones

- No experimentar en el firewall real de un equipo con servicios importantes.
- No cambiar la política a `DROP` antes de permitir la administración necesaria.
- No borrar o vaciar reglas globalmente sin saber qué herramientas, Docker o servicios las crearon.
- No asumir que una regla nueva reemplaza a una anterior.
- No confiar solo en que la sintaxis fue aceptada: comprobar contadores y tráfico real.
- No usar números de línea antiguos después de insertar o borrar reglas.
- No confundir `-I` con `-A`: insertar no es agregar al final.
- No confundir cadena con target: `INPUT` es cadena; `REJECT` es acción.
- No confundir `-D` con `-X`: una elimina reglas y la otra cadenas personalizadas.
- No mezclar respaldos de iptables y nftables como si tuvieran la misma sintaxis.
- Si se trabaja remotamente, conservar una sesión abierta y un mecanismo probado de rollback.

## Uso de la ayuda

Durante la práctica se utilizó:

```bash
iptables --help
iptables --help | grep -i delete
iptables --help | grep -i chain
man iptables
nft --help
man nft
```

La ayuda mostró, por ejemplo:

```text
--delete  -D chain rulenum
--delete-chain  -X [chain]
```

Leer la forma de uso permitió distinguir eliminar una regla de eliminar una cadena.

## Inglés técnico del módulo

- `firewall` → cortafuegos; sistema de filtrado de tráfico.
- `packet` → paquete de red.
- `ruleset` → conjunto completo de reglas.
- `table` → agrupación de reglas según finalidad.
- `chain` → cadena o punto lógico de recorrido.
- `match` → criterio de coincidencia.
- `target` → acción o destino del salto.
- `append` → agregar al final.
- `insert` → insertar al principio o en una posición.
- `delete` → eliminar una regla.
- `flush` → vaciar reglas de una cadena; operación peligrosa en el host real.
- `default policy` → acción aplicada cuando ninguna regla decide el paquete.
- `source` / `destination` → origen / destino.
- `source port` / `destination port` → puerto de origen / destino.
- `forwarding` → reenvío de paquetes entre interfaces o redes.
- `shadowed rule` → regla que no se alcanza debido a otra anterior.
- `counter` → contador de paquetes o bytes coincidentes.

## Lo que más costó

Lo más importante fue comprender que las reglas no se reemplazan: se acumulan y pueden contradecirse. La posición determina cuál actúa primero. También costó distinguir la cadena de la acción al intentar colocar `REJECT` después de `-I`; el patrón correcto es operación, cadena, posición, coincidencias y `-j` con la acción.

Otro punto relevante fue comprender que crear una cadena no basta. Hay que enviar tráfico hacia ella y agregar decisiones dentro; si termina vacía, el procesamiento regresa a la cadena de origen.

## Qué aprendí

Comprendí la relación entre Netfilter, iptables y nftables; identifiqué tablas, cadenas, coincidencias y targets; y aprendí a leer una regla de izquierda a derecha. En un namespace aislado inicié un servidor TCP/8080, practiqué `ACCEPT`, `DROP` y `REJECT`, filtré por IP y protocolo, comprobé orden y contadores, creé y referencié una cadena, eliminé una regla y listé el ruleset. También comprendí que los respaldos de iptables y nftables tienen formatos diferentes y que una migración debe traducirse y revisarse.

## Para repasar o practicar

- Repetir el recorrido de paquetes por `INPUT`, `OUTPUT`, `FORWARD`, `PREROUTING` y `POSTROUTING`.
- Practicar una política `DROP` por defecto solo dentro de un namespace aislado.
- Agregar reglas para `ESTABLISHED,RELATED` con seguimiento de conexiones.
- Crear reglas reales dentro de `WEB_TRAFFIC` y practicar `RETURN`.
- Limpiar referencias, vaciar y eliminar una cadena personalizada en el orden correcto.
- Comparar el mismo laboratorio escrito con sintaxis nativa de nftables.
- Practicar backups, traducción y validación sin aplicar reglas al host.
- Aprender sets de nftables para grupos de IP o puertos.
- Seguir usando `--help`, `man` y contadores antes de asumir que una regla funciona.
