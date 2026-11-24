# 6 de 12 — Network Address Translation (NAT)

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

NAT permite que varios dispositivos con direcciones IP privadas compartan una dirección IP pública para comunicarse por Internet. Esto conserva el espacio limitado de IPv4 y evita asignar una dirección pública exclusiva a cada equipo de una red doméstica o empresarial.

El router modifica información de los paquetes y conserva una tabla de traducciones para saber a qué dispositivo interno debe entregar cada respuesta.

## Conceptos importantes

### IP privada e IP pública

Las direcciones privadas se usan dentro de redes locales y no son enrutadas por la Internet pública. Los rangos definidos por RFC 1918 son:

- `10.0.0.0` a `10.255.255.255`
- `172.16.0.0` a `172.31.255.255`
- `192.168.0.0` a `192.168.255.255`

Distintas redes pueden reutilizar esas direcciones sin entrar en conflicto. Una dirección pública, en cambio, es globalmente enrutable y normalmente es asignada por el proveedor de Internet.

### Traducción de salida y respuesta

Cuando un equipo privado inicia una conexión, el router reemplaza la dirección privada de origen por su dirección pública y registra la relación en su tabla NAT. El servidor remoto responde a la dirección pública. Al recibir la respuesta, el router consulta la tabla, reconstruye el destino privado y entrega el tráfico al equipo correcto.

Ejemplo conceptual:

```text
203.0.113.50:4444 ↔ 192.168.1.10:5555
```

La combinación de IP y puerto permite distinguir conexiones que comparten la misma IP pública.

### Tipos de NAT

- **Static NAT:** mapeo fijo uno a uno entre una IP privada y una pública.
- **Dynamic NAT:** toma una IP pública de un pool disponible cuando se necesita.
- **PAT o NAT Overload:** varios dispositivos comparten una IP pública y se diferencian mediante puertos. Es la modalidad habitual en hogares y oficinas pequeñas.

### Port forwarding

Las conexiones iniciadas desde Internet no tienen necesariamente una traducción previa en la tabla. Para publicar un servidor interno se configura **port forwarding**, que dirige un puerto público concreto hacia una IP y un puerto privados.

### NAT y seguridad

NAT reduce la exposición directa de las direcciones internas, pero no reemplaza un firewall. NAT traduce direcciones y puertos; un firewall permite o bloquea tráfico según reglas. Los routers domésticos suelen integrar ambas funciones, lo que puede hacerlas parecer iguales.

## Comandos y opciones

Esta sección es conceptual. Herramientas como `ip address`, `ip route`, `ss` y capturas con `tcpdump` pueden ayudar a observar direcciones, rutas y puertos, pero no fueron necesarias para resolverla.

## Diferencias que hay que recordar

- **IP privada vs pública:** la privada se reutiliza dentro de una red local; la pública es enrutable globalmente.
- **Static NAT vs Dynamic NAT:** Static mantiene un mapeo fijo; Dynamic asigna temporalmente desde un pool.
- **NAT vs PAT:** NAT es el concepto general; PAT permite compartir una IP diferenciando conexiones con puertos.
- **NAT vs firewall:** NAT traduce; el firewall filtra.
- **Conexión saliente vs entrante:** la saliente crea una traducción; una entrante hacia un servidor suele requerir port forwarding.

## Ejemplos prácticos

Una notebook `192.168.1.10` visita una web. El router sustituye esa IP por su dirección pública `203.0.113.50` y registra los puertos utilizados. El servidor responde al router; la tabla NAT indica que la respuesta pertenece a la notebook y permite entregársela.

Si se desea publicar un servidor web interno en `192.168.1.20:80`, puede configurarse una regla que envíe un puerto de la IP pública hacia ese destino privado. Esa regla debe acompañarse con controles de firewall y una configuración segura del servicio.

## Errores y precauciones

- No asumir que NAT cifra el tráfico.
- No tratar NAT como reemplazo de un firewall.
- No confundir un rango privado con una dirección pública accesible desde Internet.
- No abrir port forwarding sin evaluar el servicio expuesto y aplicar controles de seguridad.
- No olvidar que PAT utiliza puertos para separar conexiones detrás de una misma IP pública.

## Inglés técnico del módulo

- `Network Address Translation (NAT)` → traducción de direcciones de red.
- `private IP address` → dirección reutilizable dentro de una red privada.
- `public IP address` → dirección enrutable en Internet.
- `translation table` → tabla que relaciona conexiones públicas y privadas.
- `Static NAT` → traducción fija uno a uno.
- `Dynamic NAT` → asignación desde un conjunto de IP públicas.
- `Port Address Translation (PAT)` → traducción que distingue conexiones mediante puertos.
- `NAT Overload` → otro nombre habitual para PAT.
- `port forwarding` → redirección de un puerto público hacia un servicio interno.

## Lo que más costó

El cuestionario terminó 6/6 después de corregir dos puntos: el router no difunde cada respuesta, sino que consulta su tabla de traducciones; y para publicar un servidor interno se necesita port forwarding, no DHCP.

## Qué aprendí

Entendí por qué NAT conserva direcciones IPv4, cómo una IP pública puede representar a varios dispositivos, cómo la tabla NAT devuelve las respuestas al equipo correcto y por qué NAT, PAT, firewall y port forwarding cumplen funciones diferentes.

## Para repasar o practicar

- Reconocer los tres rangos privados de RFC 1918.
- Dibujar una traducción entre IP y puerto privados y públicos.
- Comparar Static NAT, Dynamic NAT y PAT.
- Explicar por qué NAT no reemplaza un firewall.
- Razonar cuándo hace falta port forwarding.

## Cuestionario de repaso

1. ¿Por qué se utiliza principalmente NAT en IPv4? — **Respuesta:** Para conservar direcciones públicas permitiendo que varios dispositivos las compartan.
2. ¿`192.168.1.10` pertenece a un rango público o privado? — **Respuesta:** A un rango privado.
3. ¿Qué modalidad diferencia mediante puertos a varios dispositivos que comparten una IP pública? — **Respuesta:** PAT o NAT Overload.
4. ¿Cómo identifica el router el dispositivo interno al que pertenece una respuesta? — **Respuesta:** Consulta su tabla de traducciones y conexiones.
5. ¿Cuál es la diferencia entre NAT y un firewall? — **Respuesta:** NAT traduce direcciones y puertos; el firewall aplica reglas de filtrado.
6. ¿Qué suele necesitar un servidor interno para aceptar conexiones iniciadas desde Internet? — **Respuesta:** Port forwarding.
