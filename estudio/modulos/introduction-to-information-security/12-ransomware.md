# 12 de 24 — Ransomware

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

El **ransomware** es un tipo de malware que bloquea el acceso a archivos o sistemas, normalmente mediante cifrado, y exige un pago para supuestamente restaurarlos. Es una forma de extorsión digital: la víctima necesita sus propios datos para continuar trabajando y el atacante aprovecha esa urgencia para pedir dinero, frecuentemente en criptomonedas.

El problema no termina en el rescate. Un ataque puede detener servicios, provocar pérdida de datos, generar grandes costos de recuperación, dañar la reputación y afectar a clientes, pacientes o ciudadanos que dependen de la organización.

## Conceptos importantes

### Etapas habituales del ataque

1. **Acceso inicial:** el atacante consigue entrar, por ejemplo, mediante un correo de phishing, un enlace, un archivo malicioso o una vulnerabilidad sin corregir.
2. **Ejecución e impacto:** el malware se instala y cifra documentos, imágenes, bases de datos u otros archivos importantes con algoritmos que los vuelven ilegibles sin la clave correspondiente.
3. **Nota de rescate:** la víctima recibe instrucciones para pagar, normalmente con un plazo y amenazas de pérdida permanente de los datos.
4. **Decisión y recuperación:** pagar no garantiza que el atacante entregue una clave, que la clave funcione ni que los sistemas queden seguros.

### Objetivo e impacto

El objetivo habitual del atacante es obtener dinero. Sin embargo, la organización puede sufrir consecuencias mucho más amplias:

- Interrupción de operaciones y servicios esenciales.
- Pérdida temporal o permanente de información.
- Costos de investigación, restauración y nuevas medidas de seguridad.
- Daño reputacional y pérdida de confianza.
- Riesgo para terceros que dependen del servicio afectado.
- Incentivo para que los delincuentes continúen atacando si reciben el pago.

En sectores críticos, como la salud, una interrupción puede impedir acceder a historias clínicas, cancelar tratamientos o desviar ambulancias, por lo que el impacto puede superar ampliamente el daño informático.

### WannaCry

En mayo de 2017, **WannaCry** se propagó rápidamente y afectó a más de 200.000 computadoras en más de 150 países. Aprovechó una vulnerabilidad de Microsoft Windows, especialmente en equipos que no habían instalado actualizaciones de seguridad recientes.

El sistema de salud británico fue uno de los afectados: hubo personal sin acceso a registros, cirugías canceladas y ambulancias desviadas. El caso mostró que una vulnerabilidad sin corregir puede causar consecuencias globales y afectar infraestructura crítica.

### Pago y recuperación

El rescate no es una compra confiable. El atacante puede desaparecer, entregar una clave defectuosa o volver a atacar a una víctima que demostró estar dispuesta a pagar. La recuperación debe basarse en un plan previo, copias de seguridad protegidas, sistemas actualizados y una respuesta coordinada al incidente.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. La prevención y recuperación reales dependen de las herramientas, los procedimientos y la infraestructura de cada organización.

## Diferencias que hay que recordar

- **Ransomware vs malware:** malware es la categoría general de software malicioso; ransomware es un tipo de malware orientado a bloquear datos o sistemas y exigir un rescate.
- **Cifrado legítimo vs cifrado malicioso:** el cifrado legítimo protege información con autorización y gestión de claves; el ransomware cifra sin permiso para impedir el acceso y extorsionar.
- **Rescate vs costo total:** el rescate es solamente el pago solicitado; el costo total también incluye interrupción, recuperación, investigación, seguridad y daño reputacional.
- **Backup vs garantía automática:** una copia de seguridad ayuda a recuperar datos, pero puede quedar inutilizada si está conectada, también es cifrada o nunca se probó su restauración.
- **Pagar vs recuperar:** pagar no garantiza recibir una clave funcional ni evita futuros ataques.

## Ejemplos prácticos

- Un empleado abre un adjunto de phishing y el malware cifra los documentos compartidos de la empresa.
- Un hospital pierde temporalmente el acceso a registros de pacientes y debe cancelar o desviar servicios.
- Una biblioteca no puede prestar libros ni acceder a su catálogo digital; el daño también alcanza a estudiantes e investigadores.
- Una empresa restaura sus datos desde copias protegidas y probadas, evitando depender de la promesa del atacante.
- Un equipo Windows sin parches queda expuesto a una vulnerabilidad conocida, como ocurrió durante WannaCry.

## Errores y precauciones

- No asumir que pagar garantiza la recuperación de los datos.
- No abrir enlaces o adjuntos inesperados sin verificar su origen.
- No postergar actualizaciones de seguridad críticas sin evaluar el riesgo.
- No mantener todas las copias de seguridad permanentemente conectadas al mismo entorno.
- No confiar en un backup que nunca fue probado mediante una restauración.
- Ante un incidente, evitar acciones improvisadas que destruyan evidencia o propaguen el malware; corresponde aislar los sistemas afectados y activar el procedimiento de respuesta autorizado.

## Inglés técnico del módulo

- `ransomware` → malware que bloquea datos o sistemas y exige un rescate.
- `ransom` → rescate o pago exigido por el atacante.
- `malware` → software malicioso.
- `encryption` → cifrado que transforma datos para impedir su lectura sin una clave.
- `decryption key` → clave necesaria para descifrar la información.
- `phishing email` → correo engañoso utilizado para robar información o instalar malware.
- `malicious attachment` → archivo adjunto preparado para causar daño.
- `security update` → actualización que corrige vulnerabilidades.
- `downtime` → período durante el cual un sistema o servicio no está disponible.
- `backup` → copia de seguridad utilizada para recuperar datos.

## Lo que más costó

No hubo errores en el cuestionario: las seis respuestas fueron correctas. Conviene mantener presente que el daño no se limita al cifrado ni al dinero solicitado: la interrupción, la recuperación y la pérdida de confianza pueden ser mucho más costosas.

## Qué aprendí

Entendí que el ransomware es un malware de extorsión que suele cifrar información para exigir un pago. Puedo explicar sus etapas, reconocer el phishing y los sistemas sin actualizar como posibles vías de entrada, describir el caso WannaCry y justificar por qué pagar no garantiza recuperar los datos.

## Para repasar o practicar

- Explicar las etapas de un ataque de ransomware con un ejemplo propio.
- Diferenciar malware general de ransomware.
- Recordar por qué pagar no garantiza la recuperación.
- Relacionar actualizaciones y copias de seguridad protegidas con la reducción del impacto.
- Identificar consecuencias operativas, económicas, reputacionales y humanas.

## Cuestionario de repaso

1. ¿Cuál es el objetivo habitual del ransomware? — **Respuesta:** Extorsionar a la víctima bloqueando sus datos y exigiendo un pago.
2. ¿Cuál puede ser una vía inicial de acceso? — **Respuesta:** Un correo de phishing con un archivo o enlace malicioso.
3. ¿Qué hace normalmente el ransomware después de ingresar? — **Respuesta:** Cifra los archivos para volverlos ilegibles sin una clave.
4. ¿Qué garantiza pagar el rescate? — **Respuesta:** Nada; el atacante puede no entregar una clave funcional ni restaurar los datos.
5. ¿Por qué WannaCry afectó especialmente a ciertos equipos Windows? — **Respuesta:** Porque no tenían instaladas actualizaciones de seguridad recientes.
6. ¿Cuál es un impacto indirecto del ransomware? — **Respuesta:** El daño reputacional y la pérdida de confianza, además de la interrupción y los costos de recuperación.
