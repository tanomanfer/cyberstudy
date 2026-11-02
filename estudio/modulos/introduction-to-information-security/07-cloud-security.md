# 7 de 24 — Cloud Security

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

**Cloud Security** reúne las medidas destinadas a proteger datos, aplicaciones, cuentas y recursos cuando se utilizan servicios en la nube. El entorno es compartido y parte de su funcionamiento depende de un proveedor externo, pero eso no elimina las obligaciones de seguridad del cliente.

La analogía del depósito permite entenderlo: la empresa propietaria protege el edificio y las instalaciones comunes, mientras cada cliente debe cerrar correctamente su unidad y cuidar su llave. En la nube, esta división se conoce como **modelo de responsabilidad compartida**.

## Conceptos importantes

### Modelo de responsabilidad compartida

La seguridad se divide entre varias partes:

- El **proveedor cloud** protege la infraestructura general del servicio.
- El **cliente o administrador** configura los accesos y protege sus cuentas, aplicaciones y datos.
- El **equipo de seguridad** define estrategias, evalúa riesgos y supervisa los controles técnicos y humanos.

La división exacta puede depender del servicio contratado, pero la idea central no cambia: usar un proveedor seguro no protege al cliente de sus propias credenciales débiles, permisos excesivos o configuraciones públicas.

### Amenazas principales

- **Data breach:** una persona no autorizada accede a información sensible.
- **API insegura:** una interfaz vulnerable o mal protegida permite acciones o accesos indebidos.
- **Mala configuración:** un recurso queda expuesto por ajustes incorrectos, como un almacenamiento configurado como público.
- **Account hijacking:** un atacante roba credenciales o una sesión y toma el control de una cuenta.

Estas amenazas pueden relacionarse. Por ejemplo, el secuestro de una cuenta administrativa puede permitir cambiar permisos y provocar una filtración de datos.

### Protección de datos

El cifrado ayuda a impedir que la información sea comprensible para una persona no autorizada:

- **Cifrado en reposo:** protege los datos mientras están almacenados.
- **Cifrado en tránsito:** protege los datos mientras viajan entre usuarios, aplicaciones o servicios.

El cifrado no reemplaza al control de acceso. Si una cuenta autorizada es robada o tiene permisos excesivos, el atacante podría acceder a los datos mediante esa identidad.

### Identity and Access Management

**IAM** administra identidades y accesos. Define quién puede ingresar, cómo demuestra su identidad y qué recursos puede utilizar. Incluye usuarios, roles, autenticación y permisos.

Los accesos deben seguir el principio de mínimo privilegio: cada identidad recibe solamente los permisos necesarios para realizar su función. También deben revisarse y retirarse cuando dejan de ser necesarios.

### Seguridad de red

La seguridad de red controla y protege las comunicaciones dentro del entorno cloud y entre la nube y otros sistemas. El material menciona firewalls y VPN como ejemplos de controles que limitan conexiones y protegen datos en movimiento.

### Cumplimiento y gobernanza

**Compliance** y **governance** establecen cómo deben tratarse los datos y recursos para cumplir leyes, regulaciones, estándares y políticas internas. No alcanza con que una solución funcione técnicamente: también debe respetar las obligaciones aplicables a la organización.

### Gestión continua y pruebas

Cloud Security requiere atención permanente porque aparecen amenazas y vulnerabilidades nuevas. Entre las tareas necesarias están:

- Corregir vulnerabilidades.
- Actualizar protocolos y controles.
- Monitorear actividades sospechosas.
- Revisar identidades y permisos.
- Capacitar a los usuarios.
- Realizar evaluaciones y pruebas autorizadas.

Los pentesters pueden simular ataques con autorización para descubrir debilidades antes de que sean aprovechadas por atacantes reales.

## Comandos y opciones

Esta sección es teórica y no presenta comandos. Las configuraciones concretas dependen del proveedor y del servicio utilizado.

## Diferencias que hay que recordar

- **Seguridad del proveedor vs seguridad del cliente:** el proveedor protege la infraestructura general; el cliente protege sus configuraciones, identidades, aplicaciones y datos.
- **Falla del proveedor vs mala configuración del cliente:** si el servicio funciona pero el administrador deja un recurso público mediante sus permisos, es una mala configuración del cliente.
- **Autenticación vs autorización:** la autenticación comprueba quién es la persona; la autorización determina qué puede hacer.
- **Cifrado en reposo vs en tránsito:** uno protege datos almacenados y el otro datos que se están transfiriendo.
- **Data breach vs account hijacking:** una filtración expone información; un secuestro de cuenta entrega al atacante el control de una identidad.
- **IAM vs seguridad de red:** IAM controla identidades y permisos; la seguridad de red controla comunicaciones y conexiones.

## Ejemplos prácticos

- Un administrador deja un bucket accesible públicamente. El servicio del proveedor funciona bien, pero los permisos del cliente son incorrectos: es una **mala configuración del cliente**.
- El proveedor protege físicamente sus centros de datos, mientras el cliente activa MFA y limita los permisos de sus administradores: ambos cumplen partes diferentes del modelo compartido.
- Una base de datos cifra sus archivos almacenados y las conexiones utilizan un canal cifrado: hay protección en reposo y en tránsito.
- Un atacante roba las credenciales de un administrador y entra como si fuera esa persona: es account hijacking.
- Una política permite que una aplicación lea solamente un depósito específico en vez de todos los recursos de la cuenta: aplica mínimo privilegio mediante IAM.

## Errores y precauciones

- No asumir que migrar a la nube transfiere toda la responsabilidad al proveedor.
- No confundir un recurso mal configurado por el cliente con una falla de la infraestructura del proveedor.
- No dejar almacenamientos, bases de datos, APIs o paneles accesibles públicamente sin una necesidad validada.
- No asignar permisos administrativos para resolver tareas que requieren accesos menores.
- No confiar solamente en el cifrado e ignorar identidades, permisos y credenciales.
- Las pruebas de seguridad cloud requieren autorización explícita y deben respetar las reglas del proveedor.

## Inglés técnico del módulo

- `cloud security` → seguridad de servicios y recursos en la nube.
- `shared responsibility model` → modelo de responsabilidad compartida.
- `cloud service provider` → proveedor de servicios cloud.
- `data breach` → filtración o acceso no autorizado a datos.
- `insecure API` → interfaz de programación insegura.
- `misconfiguration` → configuración incorrecta.
- `cloud storage` → almacenamiento en la nube.
- `account hijacking` → secuestro o toma de control de una cuenta.
- `data at rest` → datos almacenados.
- `data in transit` → datos mientras se transfieren.
- `Identity and Access Management (IAM)` → gestión de identidades y accesos.
- `least privilege` → mínimo privilegio.
- `compliance` → cumplimiento de leyes, normas o requisitos.
- `governance` → reglas y supervisión para administrar recursos y datos.

## Lo que más costó

En el cuestionario costó distinguir una falla del proveedor de una mala configuración del cliente. Inicialmente se atribuyó al proveedor que un almacenamiento estuviera público. El refuerzo fue recordar que, si el servicio funciona correctamente pero los permisos fueron dejados abiertos por el administrador, debe corregirlos el cliente. Después del ejemplo del depósito y la puerta sin llave, se identificó correctamente al administrador como responsable.

## Qué aprendí

Entendí el modelo de responsabilidad compartida: el proveedor protege la infraestructura general y el cliente administra sus accesos, configuraciones, aplicaciones y datos. Puedo reconocer amenazas cloud comunes, diferenciar el cifrado en reposo del cifrado en tránsito y explicar por qué un bucket público por permisos incorrectos es responsabilidad del administrador.

## Para repasar o practicar

- Explicar el modelo de responsabilidad compartida con un ejemplo propio.
- Clasificar casos como falla del proveedor o mala configuración del cliente.
- Diferenciar data breach, API insegura y account hijacking.
- Repasar qué controla IAM y cómo se aplica mínimo privilegio.
- Recordar la diferencia entre cifrado en reposo y en tránsito.

## Cuestionario de repaso

1. ¿Qué significa el modelo de responsabilidad compartida? — **Respuesta:** El proveedor y el cliente protegen partes diferentes del entorno cloud.
2. Un administrador deja un almacenamiento cloud accesible públicamente. ¿Qué problema representa? — **Respuesta:** Una mala configuración del cliente.
3. ¿Qué área determina qué usuarios pueden acceder a cada recurso? — **Respuesta:** Identity and Access Management (IAM).
4. ¿Cuál es la diferencia entre cifrado en reposo y en tránsito? — **Respuesta:** En reposo protege datos almacenados; en tránsito los protege mientras se transfieren.
5. Un atacante roba las credenciales del administrador y controla su cuenta cloud. ¿Qué ocurrió? — **Respuesta:** Account hijacking.
6. El proveedor mantiene segura su infraestructura, pero el cliente concede permisos excesivos. ¿Quién debe corregir principalmente esos permisos? — **Respuesta:** El cliente o administrador.

**Refuerzo:** si el servicio cloud funciona pero un recurso quedó público debido a sus permisos, el problema es una mala configuración del cliente y debe corregirla su administrador.
