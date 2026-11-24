# 5 de 12 — Dynamic Host Configuration Protocol (DHCP)

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

DHCP configura automáticamente los dispositivos cuando se conectan a una red. Puede entregar una dirección IP, máscara de subred, puerta de enlace predeterminada y servidores DNS, evitando configurar cada equipo manualmente y reduciendo conflictos por direcciones duplicadas.

La dirección se concede durante un tiempo limitado llamado **lease time**. Cuando deja de utilizarse, puede regresar al conjunto de direcciones disponibles para ser asignada a otro dispositivo.

## Conceptos importantes

### Servidor y cliente DHCP

El **DHCP server** administra un conjunto o pool de direcciones disponibles y los parámetros de red. En una casa suele ser el router; en una organización puede ser un servidor dedicado.

El **DHCP client** es el dispositivo que solicita configuración: computadora, celular, impresora u otro equipo conectado.

### Proceso DORA

La asignación inicial se resume como **DORA**:

1. **Discover:** el cliente difunde un mensaje para encontrar servidores DHCP.
2. **Offer:** un servidor ofrece una IP y parámetros de red.
3. **Request:** el cliente indica que acepta y solicita formalmente esa oferta.
4. **Acknowledge:** el servidor confirma la concesión y el cliente puede usarla.

Una forma simple de recordarlo es: “¿hay un servidor?” → “te ofrezco esta IP” → “quiero esa IP” → “queda asignada”.

### Lease time y renovación

La asignación no es necesariamente permanente. Antes de vencer, el cliente intenta renovar la concesión. Como ya conoce al servidor y posee una IP, normalmente envía un **DHCP Request** y recibe un **DHCP Acknowledge** si la renovación es aceptada; no necesita repetir siempre las cuatro etapas de DORA.

## Comandos y opciones

La sección es conceptual. En Linux, herramientas como `ip address` permiten observar la IP recibida y `ip route` permite ver el gateway, pero no fueron necesarias para comprender el proceso presentado.

## Diferencias que hay que recordar

- **Configuración manual vs DHCP:** la primera se escribe en cada equipo; DHCP la distribuye automáticamente.
- **Servidor vs cliente DHCP:** el servidor administra y ofrece; el cliente descubre, solicita y utiliza.
- **Asignación vs propiedad:** recibir una IP no significa ser su dueño permanente; se concede durante un lease.
- **DORA inicial vs renovación:** el inicio usa Discover, Offer, Request y Acknowledge; la renovación suele usar Request y Acknowledge.
- **DHCP vs DNS:** DHCP entrega configuración; DNS traduce nombres a direcciones IP.

## Ejemplos prácticos

Una notebook nueva se conecta a la red de una oficina. Envía Discover; el servidor ofrece `192.168.1.10`; la notebook responde Request y el servidor confirma con Acknowledge. La notebook también puede recibir máscara, gateway y DNS. Antes de vencer el lease, solicita continuar usando esa dirección.

## Errores y precauciones

- No asumir que una IP entregada por DHCP es permanente.
- No confundir DHCP con DNS: pueden trabajar juntos, pero resuelven problemas diferentes.
- No asignar manualmente una dirección dentro del pool DHCP sin coordinación, porque puede producir un conflicto.
- No interpretar Offer como asignación definitiva: la confirmación llega con Acknowledge.

## Inglés técnico del módulo

- `Dynamic Host Configuration Protocol` → protocolo de configuración dinámica de hosts.
- `address pool` → conjunto de direcciones disponibles.
- `lease` / `lease time` → concesión y duración de uso de una dirección.
- `Discover` → búsqueda de servidores DHCP.
- `Offer` → propuesta de configuración.
- `Request` → solicitud o aceptación del cliente.
- `Acknowledge` → confirmación del servidor.
- `renewal` → renovación de una concesión.

## Lo que más costó

El cuestionario terminó 6/6 después de corregir dos puntos: una concesión es temporal, no permanente, y la renovación normalmente utiliza Request y Acknowledge sin repetir todo DORA.

## Qué aprendí

Entendí cómo DHCP evita configurar manualmente cada equipo, qué información puede entregar, cómo funciona DORA y por qué las direcciones se conceden durante un tiempo que debe renovarse.

## Para repasar o practicar

- Memorizar DORA entendiendo la función de cada mensaje.
- Diferenciar asignación inicial de renovación.
- Identificar IP, máscara, gateway y DNS dentro de una configuración.
- Explicar por qué el pool permite reutilizar direcciones.

## Cuestionario de repaso

1. ¿Cuál es la función principal de DHCP? — **Respuesta:** Asignar automáticamente direcciones IP y otros parámetros de red.
2. ¿Quién suele funcionar como servidor DHCP en una red doméstica? — **Respuesta:** El router.
3. ¿Cuál es el orden correcto de DORA? — **Respuesta:** Discover, Offer, Request y Acknowledge.
4. ¿Qué sucede durante DHCP Offer? — **Respuesta:** El servidor propone una dirección IP y parámetros de red.
5. ¿Qué significa que una IP tenga tiempo de concesión? — **Respuesta:** Que fue entregada por un período limitado.
6. ¿Qué intercambio se usa normalmente para renovar la concesión? — **Respuesta:** Request y Acknowledge.
