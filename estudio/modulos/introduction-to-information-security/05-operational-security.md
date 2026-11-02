# 5 de 24 — Operational Security

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

La seguridad operacional, abreviada **OpSec**, protege los datos, sistemas y actividades cotidianas de una organización durante todo su ciclo de vida. Su objetivo es mantener un entorno seguro para que la información sensible conserve su confidencialidad, integridad y disponibilidad, y solo pueda ser utilizada por personas autorizadas.

OpSec no es una herramienta ni una revisión que se hace una sola vez. Es un proceso continuo: se identifican los activos importantes, se analizan las amenazas y vulnerabilidades, se aplican controles, se monitorea lo que sucede y se ajustan las medidas cuando cambia el entorno.

## Conceptos importantes

### Proceso de OpSec

1. **Identificación de activos:** reconocer qué datos, hardware y software son importantes, dónde se encuentran y qué valor tienen para la organización.
2. **Identificación de amenazas:** analizar qué personas, eventos o situaciones podrían provocar daño.
3. **Identificación de vulnerabilidades:** encontrar debilidades que una amenaza podría aprovechar.
4. **Aplicación de controles y control de acceso:** elegir medidas para reducir el riesgo y decidir quién puede acceder a cada recurso.
5. **Monitoreo y adaptación:** observar continuamente la actividad y modificar las defensas cuando aparecen amenazas, cambios o comportamientos inesperados.

La analogía de una fiesta ayuda a entenderlo: primero se reconocen los objetos valiosos; después se piensa qué podría pasarles; se detectan lugares o situaciones inseguras; se guardan los objetos y se limita quién puede entrar; finalmente se vigila durante el evento y se ajusta el plan si hace falta.

### Control de acceso

El control de acceso determina quién puede utilizar información o sistemas y bajo qué condiciones. Combina:

- **Autenticación:** comprobar la identidad de la persona, por ejemplo con contraseña y un segundo factor.
- **Autorización:** definir qué recursos y acciones tiene permitidos después de identificarse.
- **Revisión de permisos:** auditar regularmente los accesos y retirar los que ya no sean necesarios.

Aplicar el principio de **mínimo privilegio** significa conceder únicamente los permisos necesarios para cumplir una función. Si una persona cambia de puesto o deja la organización, sus accesos deben modificarse o revocarse para evitar privilegios innecesarios.

### Gestión de activos

Una organización no puede proteger correctamente aquello que desconoce. Por eso necesita un inventario actualizado de hardware, software y datos. Saber qué activos existen, dónde están y cuál es su importancia permite asignar controles adecuados y priorizar la corrección de vulnerabilidades.

### Gestión de cambios

Las actualizaciones y modificaciones pueden introducir fallas aunque su objetivo sea mejorar el sistema. La gestión de cambios exige que cada modificación tenga pruebas, revisión y aprobación antes de aplicarse. También permite documentar qué cambió y responder mejor si aparece un problema.

### Concientización de seguridad

Los controles técnicos no alcanzan si las personas no saben reconocer riesgos. La capacitación debe incluir phishing, contraseñas seguras, manejo de información sensible y responsabilidad frente a incidentes. OpSec requiere cooperación desde los empleados hasta la dirección.

### Responsabilidades y pruebas

El equipo de seguridad de la información, normalmente dirigido por el **CISO**, coordina OpSec junto con IT, Recursos Humanos y Legal. Sin embargo, no es responsabilidad exclusiva del CISO: todas las personas de la organización deben respetar los controles y comunicar situaciones sospechosas.

Los equipos internos o consultores externos autorizados pueden evaluar las medidas mediante revisiones, security assessments y penetration testing. Intentan detectar controles de acceso débiles, configuraciones incorrectas o susceptibilidad a ingeniería social antes de que un atacante real las aproveche.

## Comandos y opciones

Esta sección es teórica y no presenta comandos. Los conceptos se aplican mediante procesos organizacionales y controles técnicos como MFA, gestión de permisos, inventarios, monitoreo y auditorías.

## Diferencias que hay que recordar

- **Activo vs amenaza vs vulnerabilidad:** el activo es aquello que se protege; la amenaza es lo que podría causar daño; la vulnerabilidad es la debilidad que puede ser aprovechada.
- **Vulnerabilidad vs control:** primero se identifica la debilidad; después se aplica una medida para reducir el riesgo. No son la misma etapa.
- **Autenticación vs autorización:** la autenticación verifica quién es la persona; la autorización establece qué puede hacer.
- **Inventario vs monitoreo:** el inventario registra qué activos existen; el monitoreo observa qué está ocurriendo con ellos.
- **CISO coordinador vs responsabilidad compartida:** el CISO dirige la estrategia, pero IT, RR. HH., Legal, empleados y directivos también participan en OpSec.

## Ejemplos prácticos

- Una empresa registra una base de datos con información de clientes como activo crítico, encuentra que tiene permisos públicos y limita el acceso. El orden es: **activo → vulnerabilidad → medida de protección**.
- Una persona inicia sesión con contraseña y código temporal: eso es autenticación multifactor. Luego el sistema solo le permite consultar los archivos necesarios para su trabajo: eso es autorización.
- Un empleado cambia de puesto y conserva permisos administrativos. Una auditoría detecta el problema y revoca esos accesos, aplicando mínimo privilegio.
- Antes de instalar una actualización, el equipo la prueba en un entorno controlado, obtiene aprobación y recién después la lleva a producción. Eso es gestión de cambios.
- Una simulación de phishing autorizada permite comprobar si la capacitación funciona y decidir qué aspectos deben reforzarse.

## Errores y precauciones

- No confundir identificar una vulnerabilidad con implementar el control que la corrige.
- No conservar permisos por comodidad cuando una persona cambia de rol o deja la organización.
- No considerar el inventario como un documento estático; debe actualizarse cuando cambian los activos.
- No aplicar modificaciones directamente en producción sin pruebas, aprobación y posibilidad de reversión.
- No pensar que OpSec es responsabilidad exclusiva del CISO o del equipo de seguridad.
- Las pruebas de penetración y las simulaciones de ingeniería social necesitan autorización explícita y un alcance definido.

## Inglés técnico del módulo

- `operational security (OpSec)` → seguridad operacional.
- `critical information asset` → activo de información crítico.
- `asset inventory` → inventario de activos.
- `threat identification` → identificación de amenazas.
- `vulnerability assessment` → evaluación de vulnerabilidades.
- `access control` → control de acceso.
- `authentication` → comprobación de identidad.
- `authorization` → asignación de permisos.
- `multi-factor authentication (MFA)` → autenticación mediante más de un factor.
- `least privilege` → mínimo privilegio.
- `change management` → gestión controlada de cambios.
- `security awareness training` → capacitación y concientización de seguridad.
- `security posture` → estado general de seguridad de una organización.
- `social engineering` → manipulación de personas para obtener acceso o información.

## Lo que más costó

En el cuestionario se respondió correctamente la finalidad de OpSec, la diferencia entre autenticación y autorización, la revocación de permisos, la gestión de cambios y el orden activo-vulnerabilidad-control. El punto que necesitó corrección fue la responsabilidad: inicialmente se atribuyó únicamente al CISO. El CISO coordina la estrategia, pero OpSec requiere la participación de toda la organización.

## Qué aprendí

Entendí que OpSec protege los activos y las operaciones diarias mediante un ciclo continuo de identificación, análisis, controles y monitoreo. Puedo diferenciar autenticación de autorización, reconocer la importancia del inventario y la gestión de cambios, y comprender que el CISO coordina una responsabilidad compartida por toda la organización.

## Para repasar o practicar

- Explicar el ciclo de OpSec con un ejemplo propio.
- Diferenciar activo, amenaza, vulnerabilidad y control.
- Recordar cuándo deben revisarse y revocarse los permisos.
- Practicar la diferencia entre autenticación y autorización.
- Reforzar que OpSec es una responsabilidad compartida y no exclusiva del CISO.

## Cuestionario de repaso

1. ¿Cuál es el objetivo principal de OpSec? — **Respuesta:** Proteger los activos durante las operaciones cotidianas y mantener la confidencialidad, integridad y disponibilidad de la información.
2. ¿Qué diferencia existe entre autenticación y autorización? — **Respuesta:** La autenticación verifica quién es la persona; la autorización determina qué recursos y acciones tiene permitidos.
3. Un empleado cambia de puesto y conserva permisos administrativos que ya no necesita. ¿Qué control falló principalmente? — **Respuesta:** La revisión y revocación de permisos de acceso.
4. ¿Para qué sirve la gestión de cambios? — **Respuesta:** Para probar, revisar y aprobar cambios antes de aplicarlos, reduciendo la posibilidad de introducir vulnerabilidades o fallas.
5. ¿Quién es responsable de OpSec? — **Respuesta:** Toda la organización; el CISO y el equipo de seguridad coordinan el trabajo junto con IT, RR. HH., Legal, empleados y directivos.
6. Una empresa identifica una base con datos sensibles, descubre que está expuesta por una mala configuración y restringe su acceso. ¿Cuál es el orden? — **Respuesta:** Activo → vulnerabilidad → medida de protección.

**Refuerzo:** el CISO coordina la estrategia de OpSec, pero la seguridad operacional depende del comportamiento y las decisiones de toda la organización.
