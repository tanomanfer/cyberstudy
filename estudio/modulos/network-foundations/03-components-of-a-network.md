# 3 de 12 — Components of a Network

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Una red funciona porque distintos componentes colaboran. Los **hosts** generan o consumen datos; las **NIC** los conectan; switches, access points y routers transportan la información; los medios llevan las señales; los protocolos establecen reglas; y los servidores ofrecen recursos a los clientes.

Un recorrido útil para entender sus relaciones es:

`navegador → NIC → switch o Wi-Fi → router → Internet → servidor web`

Cada componente resuelve un problema diferente. Ningún dispositivo realiza por sí solo todas las funciones de una red.

## Conceptos importantes

### End devices o hosts

Un **end device**, también llamado **host**, origina o recibe información. Computadoras, teléfonos, tablets, impresoras, televisores, dispositivos IoT y servidores pueden ser hosts.

Un host puede actuar como cliente, servidor o ambos según la comunicación. Lo que lo diferencia de un dispositivo intermediario es que produce o consume los datos, mientras el intermediario ayuda principalmente a transportarlos.

### Network Interface Card (NIC)

La NIC es la interfaz que conecta un host a la red. Puede ser Ethernet, Wi-Fi, estar integrada en el equipo o ser virtual. Envía y recibe datos y posee una dirección MAC utilizada en la comunicación de capa 2.

La computadora es el host; la NIC es solo su interfaz de red. Un mismo host puede tener varias NIC: Ethernet, Wi-Fi, VPN, máquinas virtuales o contenedores.

### Switch

Un switch conecta dispositivos dentro de una LAN. Trabaja principalmente en capa 2, aprende qué direcciones MAC están asociadas a sus puertos y entrega las tramas al puerto apropiado.

Su pregunta típica es: **“¿en qué puerto local está esta MAC?”**. Así evita repetir todo el tráfico hacia todos los dispositivos.

### Router

Un router conecta redes diferentes. Trabaja en capa 3, examina direcciones IP y consulta su tabla de enrutamiento para decidir el siguiente camino del paquete.

Su pregunta típica es: **“¿por qué camino alcanzo esta red IP?”**. En redes grandes puede aprender rutas mediante protocolos como OSPF o BGP.

### Hub

Un hub es un dispositivo antiguo de capa 1. Cuando recibe una señal por un puerto, la repite hacia todos los demás sin analizar el destino. Esto genera tráfico innecesario y colisiones.

La analogía ayuda: un hub grita el mensaje para todos; un switch intenta entregarlo solamente al destinatario.

### Access point y módem

Un **access point** incorpora dispositivos Wi-Fi a una red local. Un **módem** adapta la comunicación al medio del proveedor. No son necesariamente routers, aunque un equipo doméstico suele integrar módem, router, switch, firewall y access point en una sola caja.

## Medios, cables y conectores

Los medios transportan físicamente señales:

- Par trenzado Ethernet.
- Fibra óptica.
- Cable coaxial.
- Wi-Fi, Bluetooth y otros medios inalámbricos.

En una LAN cableada es habitual utilizar un **Ethernet cable**, normalmente construido con **twisted pair**, y conectores **RJ-45**.

- **Ethernet:** tecnología de red utilizada en la LAN.
- **Twisted pair:** disposición física de pares de cobre trenzados.
- **RJ-45:** conector situado en los extremos del cable.

La fibra óptica transmite pulsos de luz y resulta adecuada para alta velocidad y grandes distancias con poca pérdida de señal.

## Protocolos

Un protocolo establece reglas compartidas para formatear, direccionar, segmentar, transmitir, recibir e interpretar datos. Ejemplos:

- **TCP/IP:** suite fundamental de comunicación en Internet. HTB esperaba esta expresión completa en su pregunta sobre routing y entrega entre redes; dentro de la suite, IP cumple específicamente el direccionamiento y enrutamiento.
- **HTTP/HTTPS:** comunicación web.
- **FTP:** transferencia de archivos.
- **SMTP:** envío de correo.

Los medios son la carretera; los protocolos son las reglas de tránsito.

## Network management software

El software de administración de red permite monitorear rendimiento, configurar dispositivos, analizar fallas, observar tráfico y aplicar políticas de seguridad. Ayuda a los administradores a mantener disponibilidad y detectar comportamientos anómalos.

## Software firewall

Un firewall de software o **host-based firewall** se ejecuta en un dispositivo y controla su tráfico entrante y saliente mediante reglas.

- Un firewall de host protege un equipo concreto.
- Un firewall de red controla tráfico que atraviesa un límite entre redes.

Se complementan. Bloquear ICMP puede impedir respuestas a `ping`, pero no demuestra por sí solo que el host esté apagado.

## Servidores y clientes

Un servidor ofrece servicios o recursos; un cliente los solicita. Web servers, file servers, mail servers y database servers atienden múltiples solicitudes.

“Servidor” describe principalmente un rol, no necesariamente una máquina enorme. Una computadora común puede ejecutar un servidor local y un servidor potente también puede actuar como cliente de otro servicio.

Cuando se abre una web:

1. El navegador cliente genera una solicitud.
2. La NIC conecta el host con la red.
3. Switch o access point transportan localmente.
4. El router dirige paquetes hacia otras redes.
5. El servidor procesa la solicitud y responde.

## Comandos y opciones

La sección muestra conceptualmente un firewall Linux usando `iptables` para descartar ICMP, pero no enseña una configuración completa. No conviene copiar reglas aisladas sin conocer la política existente, porque un firewall mal configurado puede bloquear acceso legítimo o dejar servicios expuestos.

## Diferencias que hay que recordar

- **Host vs intermediario:** el host origina o consume datos; el intermediario los transporta.
- **NIC vs switch:** la NIC conecta un host; el switch conecta varias interfaces dentro de la LAN.
- **Switch vs router:** el switch usa principalmente MAC dentro de una red; el router usa IP entre redes.
- **Switch vs hub:** el switch dirige tramas; el hub repite señales hacia todos.
- **Access point vs router:** el access point incorpora Wi-Fi a la LAN; el router comunica redes.
- **Medio vs protocolo:** el medio lleva señales; el protocolo define reglas.
- **Cliente vs servidor:** el cliente solicita; el servidor ofrece y responde.
- **Firewall de host vs de red:** uno protege un dispositivo; el otro controla un límite de red.

## Ejemplos prácticos

- Una PC usa su NIC Ethernet para llegar al switch; el switch entrega la trama al servidor local usando MAC.
- Para visitar una web externa, el router lee la dirección IP y envía el paquete hacia el ISP.
- Un hub repetiría el tráfico hacia todos sus puertos, mientras un switch selecciona el puerto del destinatario.
- Un firewall de host puede bloquear `ping` aunque el equipo siga encendido y ofreciendo otros servicios.
- El navegador actúa como cliente y el web server procesa la solicitud y devuelve la página.

## Errores y precauciones

- No confundir RJ-45, que es un conector, con el cable Ethernet.
- No confundir `TCP/IP`, que es una suite, con IP, que cumple específicamente direccionamiento y routing.
- No asumir que access point, módem, switch y router son iguales porque estén integrados en una caja.
- No considerar un host apagado solamente porque no responde a ICMP.
- No copiar reglas de firewall sin comprender su efecto y tener una forma de recuperación.

## Inglés técnico del módulo

- `end device / host` → dispositivo que origina o recibe datos.
- `intermediary device` → dispositivo que facilita el transporte.
- `Network Interface Card (NIC)` → interfaz que conecta un host a la red.
- `switch` → dispositivo de capa 2 que entrega tramas usando MAC.
- `router` → dispositivo de capa 3 que encamina paquetes usando IP.
- `hub` → repetidor multipuerto de capa 1.
- `access point` → punto de acceso inalámbrico a la LAN.
- `network media` → medios cableados o inalámbricos.
- `network management software` → herramientas para supervisar y administrar la red.
- `host-based firewall` → firewall instalado en un dispositivo.
- `client-server model` → relación donde un cliente solicita y un servidor responde.

## Lo que más costó

El cuestionario propio se aprobó 6/6. En el ejercicio de HTB aparecieron dos dificultades de formato: HTB esperaba `TCP/IP` para la pregunta general sobre routing y entrega, aunque IP sea el componente específico de routing; y exigió distinguir cable Ethernet, construcción twisted pair y conector RJ-45.

## Qué aprendí

Entendí cómo hosts, NIC, switches, routers, medios, protocolos, firewalls y servidores colaboran. Puedo seguir el recorrido básico de una solicitud, diferenciar dispositivos de capa 1, 2 y 3, y explicar por qué un conector no es lo mismo que un cable.

## Para repasar o practicar

- Dibujar el recorrido desde un navegador hasta un servidor web.
- Identificar qué equipo usa MAC y cuál usa IP.
- Explicar switch vs hub sin memorizar solamente la capa.
- Diferenciar módem, router, switch y access point en el equipo doméstico.
- Recordar Ethernet cable, twisted pair y RJ-45.
- Diferenciar firewall de host y firewall de red.

## Cuestionario de repaso

1. ¿Cuál es la diferencia principal entre host e intermediario? — **Respuesta:** El host origina o recibe datos; el intermediario ayuda a transportarlos.
2. ¿Qué componente propio utiliza una computadora para conectarse por Ethernet? — **Respuesta:** Una NIC.
3. ¿Por qué un switch es más eficiente que un hub? — **Respuesta:** Utiliza direcciones MAC para dirigir tramas, mientras el hub repite hacia todos los puertos.
4. ¿Qué dispositivo decide cómo salir hacia una red remota? — **Respuesta:** El router.
5. ¿Cuál es la diferencia entre medio y protocolo? — **Respuesta:** El medio transporta señales; el protocolo establece reglas de comunicación.
6. ¿Qué describe el modelo cliente-servidor? — **Respuesta:** El cliente solicita un recurso o servicio y el servidor procesa la solicitud y responde.
