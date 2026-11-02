# 10 de 24 — Internet of Things Security

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

El **Internet of Things (IoT)** reúne objetos conectados a Internet capaces de enviar y recibir datos: termostatos, cámaras, cerraduras, relojes, sensores industriales y vehículos. **IoT Security** protege esos dispositivos, la información que procesan y las redes por las que se comunican frente a accesos no autorizados, robo de datos y otros ataques.

Un dispositivo pequeño puede convertirse en una puerta de entrada hacia toda la red. En ambientes industriales, comprometer sensores o controles también puede interrumpir procesos o causar daños físicos.

## Conceptos importantes

### Limitaciones de los dispositivos

Muchos equipos IoT tienen poca memoria y capacidad de procesamiento. Esto dificulta incorporar controles avanzados sin afectar su rendimiento. Además, suelen desplegarse en grandes cantidades y en lugares muy diferentes, lo que complica inventariarlos, actualizarlos y monitorearlos.

### Riesgo para el resto de la red

Un atacante que compromete un termostato o una cámara puede intentar usar ese punto inicial para alcanzar computadoras, servidores u otros datos. El impacto real no depende solamente de la función visible del dispositivo, sino también de su conexión y de los permisos que posee.

### Responsabilidad compartida

- El **CISO** o responsable de IoT coordina la estrategia y la gestión general.
- Los **fabricantes** aplican diseño seguro, eliminan funciones innecesarias y publican actualizaciones oportunas.
- Los **administradores de red** segmentan las redes, monitorean el tráfico e implementan sistemas de detección de intrusiones.
- Los **desarrolladores** protegen las aplicaciones mediante autenticación, cifrado y prácticas de desarrollo seguro.
- La **organización y los usuarios** deben configurar correctamente los equipos, cambiar credenciales predeterminadas e instalar actualizaciones.

### Segmentación de red

La **network segmentation** coloca los dispositivos IoT en una red o zona separada de los sistemas sensibles. Si una cámara o un termostato resulta comprometido, la segmentación limita su comunicación y dificulta que el atacante avance hacia computadoras o servidores importantes.

### Caso del sistema HVAC

Un sistema inteligente de calefacción, ventilación y aire acondicionado puede parecer ajeno a los datos comerciales. Sin embargo, si está conectado a la red sin controles adecuados, una vulnerabilidad puede dar acceso inicial a un atacante y terminar afectando sistemas con información de clientes.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. La implementación depende del fabricante, el sistema de administración y la tecnología de red utilizada.

## Diferencias que hay que recordar

- **Función física vs riesgo digital:** un termostato controla temperatura, pero su conexión puede abrir una ruta hacia otros sistemas.
- **Seguridad del dispositivo vs seguridad de red:** el fabricante debe proteger el equipo; la organización también debe controlar dónde se conecta y con qué sistemas puede comunicarse.
- **Segmentación vs protección absoluta:** segmentar limita el movimiento del atacante, pero no corrige una contraseña débil ni reemplaza las actualizaciones.
- **Autenticación vs cifrado:** la autenticación verifica quién accede; el cifrado protege la confidencialidad de los datos.

## Ejemplos prácticos

- Las cámaras se colocan en una red separada sin acceso directo a las computadoras administrativas.
- Se cambia la contraseña predeterminada de una cerradura inteligente antes de conectarla.
- Un administrador inventaría los dispositivos y revisa si siguen recibiendo actualizaciones.
- Un sistema de detección alerta sobre tráfico extraño originado por un sensor industrial.
- Una organización reemplaza un dispositivo cuyo fabricante dejó de publicar parches.

## Errores y precauciones

- No conservar usuarios o contraseñas predeterminados.
- No conectar dispositivos IoT directamente a redes sensibles sin segmentación.
- No asumir que un dispositivo es inofensivo por tener una función sencilla.
- No ignorar equipos antiguos que ya no reciben actualizaciones.
- No habilitar servicios o funciones que no sean necesarios.
- En sistemas industriales, cualquier prueba requiere autorización y medidas que eviten daños físicos o interrupciones.

## Inglés técnico del módulo

- `Internet of Things (IoT)` → Internet de las cosas.
- `connected device` → dispositivo conectado.
- `secure design` → diseño que incorpora seguridad desde el comienzo.
- `network segmentation` → división de la red en zonas separadas.
- `intrusion detection system` → sistema que detecta actividad sospechosa.
- `default credentials` → credenciales configuradas de fábrica.
- `security update` → actualización que corrige vulnerabilidades.
- `attack surface` → conjunto de puntos que podrían ser atacados.
- `HVAC` → calefacción, ventilación y aire acondicionado.

## Lo que más costó

No hubo errores en el cuestionario: las seis respuestas fueron correctas. El punto que conviene mantener presente es que segmentar contiene un ataque, pero debe combinarse con actualizaciones, autenticación segura y una configuración mínima.

## Qué aprendí

Entendí que un dispositivo IoT vulnerable puede servir como entrada hacia otros sistemas. Puedo explicar las limitaciones de estos equipos, la importancia de segmentar la red y las responsabilidades de fabricantes, administradores, desarrolladores y organizaciones.

## Para repasar o practicar

- Identificar dispositivos IoT presentes en una red doméstica o empresarial.
- Pensar qué comunicaciones necesita realmente cada dispositivo.
- Explicar cómo la segmentación reduce el movimiento lateral.
- Revisar credenciales predeterminadas, actualizaciones y funciones innecesarias.
- Diferenciar las responsabilidades del fabricante y de la organización.

## Cuestionario de repaso

1. ¿Qué es un dispositivo IoT? — **Respuesta:** Un objeto conectado que puede enviar o recibir datos.
2. ¿Por qué muchos dispositivos IoT tienen controles limitados? — **Respuesta:** Porque suelen tener poca memoria y capacidad de procesamiento.
3. ¿Qué riesgo presenta comprometer un termostato inteligente? — **Respuesta:** Puede servir como punto de entrada hacia otros sistemas de la red.
4. ¿Quién debe diseñar el dispositivo de forma segura y publicar actualizaciones? — **Respuesta:** El fabricante.
5. ¿Para qué sirve la segmentación de red? — **Respuesta:** Para aislar dispositivos y limitar el avance de un atacante.
6. ¿Quién es responsable de IoT Security? — **Respuesta:** Es una responsabilidad compartida entre fabricantes, administradores, desarrolladores y la organización.
