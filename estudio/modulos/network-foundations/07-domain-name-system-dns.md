# 7 de 12 — Domain Name System (DNS)

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

El Domain Name System (DNS) relaciona nombres fáciles de recordar, como `www.example.com`, con direcciones IP, como `93.184.216.34`. Los dispositivos necesitan la IP para comunicarse, pero las personas pueden usar nombres. Por eso DNS funciona como una agenda distribuida de Internet.

## Conceptos importantes

### Dominio e IP

Un nombre de dominio identifica un recurso con palabras legibles. Una dirección IP es la etiqueta numérica utilizada para localizar y alcanzar un destino en la red. DNS construye el puente entre ambas representaciones.

### Jerarquía DNS

DNS está organizado como un árbol:

- **Root (`.`):** raíz de la jerarquía.
- **Top-Level Domain (TLD):** terminación como `.com`, `.org`, `.net` o `.ar`.
- **Second-Level Domain:** nombre registrado, como `example` en `example.com`.
- **Hostname o subdomain:** nombre que identifica un servicio o subdivisión, como `www` o `accounts`.

En `accounts.google.com`, `.com` es el TLD, `google` es el dominio de segundo nivel y `accounts` es el hostname o subdominio.

### Resolución DNS

Cuando se solicita `www.example.com`, el equipo primero consulta su caché DNS local. Si no tiene una respuesta vigente, pregunta a un servidor DNS recursivo, normalmente provisto por el ISP o por servicios públicos.

El recursivo realiza el trabajo de búsqueda:

1. Consulta a un servidor raíz.
2. La raíz lo dirige hacia los servidores del TLD `.com`.
3. El servidor TLD indica cuál es el servidor autoritativo de `example.com`.
4. El autoritativo devuelve la respuesta oficial para `www.example.com`.
5. El recursivo entrega la IP al equipo y puede conservarla temporalmente en caché.

La raíz no suele entregar la IP final. Su función es indicar cuál es el siguiente nivel correcto de la jerarquía.

## Comandos y opciones

La sección fue conceptual. Herramientas como `dig`, `host` o `nslookup` permiten consultar DNS, pero no fueron necesarias para resolver el contenido ni se practicaron en esta sección.

## Diferencias que hay que recordar

- **Dominio vs IP:** el dominio es legible para personas; la IP permite localizar el destino en la red.
- **Recursivo vs autoritativo:** el recursivo busca la respuesta en nombre del cliente; el autoritativo posee la información oficial del dominio.
- **Root vs TLD:** la raíz señala los servidores del TLD; el TLD señala el autoritativo del dominio.
- **Caché vs consulta completa:** si existe una respuesta vigente en caché, puede evitarse el recorrido por la jerarquía.
- **Dominio vs URL:** el dominio es solo una parte de una URL, que también puede incluir esquema, ruta y otros componentes.

## Ejemplo práctico

```text
Computadora → DNS recursivo → Root → TLD → DNS autoritativo
Computadora ← DNS recursivo ← 93.184.216.34
```

Con la IP obtenida, el navegador puede iniciar la conexión con el servidor web. DNS localiza el destino; no descarga por sí mismo la página.

## Errores y precauciones

- No asumir que el servidor raíz conoce directamente todas las IP.
- No confundir el servidor recursivo con el autoritativo.
- No confundir `www`, que puede ser un hostname, con el dominio de segundo nivel.
- Una respuesta en caché puede quedar desactualizada hasta que venza su tiempo de validez.
- DNS tradicional no cifra por sí mismo todo el tráfico posterior hacia el sitio.

## Inglés técnico del módulo

- `Domain Name System (DNS)` → sistema que relaciona nombres con información como direcciones IP.
- `domain name` → nombre legible de un dominio.
- `IP address` → dirección utilizada para alcanzar un destino.
- `DNS resolution` → proceso de obtener la respuesta DNS correspondiente a un nombre.
- `recursive DNS server` → servidor que busca la respuesta por el cliente.
- `root server` → servidor que dirige hacia el TLD adecuado.
- `TLD name server` → servidor que dirige hacia el autoritativo del dominio.
- `authoritative name server` → fuente oficial de los registros del dominio.
- `DNS cache` → almacenamiento temporal de respuestas DNS.

## Lo que más costó

El cuestionario propio terminó 6/6. El punto que conviene conservar es que la búsqueda comienza por la caché y que el servidor raíz orienta hacia el TLD, pero no suele responder con la IP final.

## Qué aprendí

Entendí cómo DNS traduce nombres a direcciones IP, cómo se divide un dominio y cómo colaboran caché, recursivo, raíz, TLD y servidor autoritativo para resolver una consulta.

## Para repasar o practicar

- Separar hostname, dominio de segundo nivel y TLD en nombres reales.
- Dibujar el recorrido completo de una consulta sin caché.
- Explicar la diferencia entre servidor recursivo y autoritativo.
- Recordar que la raíz señala el TLD correspondiente.

## Cuestionario de repaso

1. ¿Cuál es la función principal de DNS? — **Respuesta:** Traducir nombres de dominio a direcciones IP u otros datos asociados.
2. En `www.example.com`, ¿cuál es el TLD? — **Respuesta:** `.com`.
3. ¿Qué sucede si la respuesta está vigente en la caché DNS local? — **Respuesta:** Puede utilizarse sin repetir toda la consulta jerárquica.
4. ¿Qué hace normalmente el servidor raíz? — **Respuesta:** Indica dónde consultar por el TLD correspondiente.
5. ¿Qué servidor posee la información oficial del dominio? — **Respuesta:** El servidor autoritativo.
6. ¿Cuál es el orden general después de consultar al recursivo? — **Respuesta:** Root, TLD y servidor autoritativo.
