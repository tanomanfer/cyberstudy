# 4 de 24 — Application Security

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

La seguridad de aplicaciones protege el software, los datos que procesa y la infraestructura que utiliza durante todo su ciclo de vida: planificación, diseño, desarrollo, pruebas, publicación y mantenimiento. No es una revisión que se realiza una sola vez al final. El código cambia, aparecen vulnerabilidades nuevas y evolucionan las técnicas de ataque, por lo que la seguridad debe mantenerse de forma continua.

El objetivo es preservar la tríada CIA:

- **Confidencialidad:** solo las personas autorizadas pueden acceder a la información.
- **Integridad:** los datos no pueden modificarse indebidamente.
- **Disponibilidad:** la aplicación y la información deben estar accesibles cuando se necesitan.

## Conceptos importantes

### Seguridad durante todo el ciclo de vida

La primera etapa consiste en desarrollar la aplicación de forma segura: diseñar una autenticación adecuada, escribir código resistente a vulnerabilidades conocidas, cifrar datos sensibles y pensar anticipadamente qué amenazas podrían afectarla.

Después hay que buscar puntos débiles mediante revisiones de código, análisis automatizados, fuzzing y pruebas de penetración autorizadas. Publicar la aplicación tampoco termina el trabajo: es necesario monitorearla, aplicar parches y volver a probarla cada vez que cambian el código, la infraestructura o las amenazas.

Entre las vulnerabilidades mencionadas se encuentran:

- **SQL injection:** el atacante manipula una entrada para alterar una consulta a la base de datos.
- **Cross-site scripting (XSS):** se introduce contenido o código malicioso que puede ejecutarse en el navegador de otra persona.
- **Buffer overflow:** un programa intenta escribir más información de la que un espacio de memoria puede contener, lo que puede provocar fallos o comportamientos peligrosos.

### Security by Design

**Security by Design** significa incorporar la seguridad desde la planificación, en vez de intentar agregarla cuando la aplicación ya está terminada. La analogía de la casa ayuda a recordarlo: conviene decidir desde el comienzo dónde estarán las cerraduras, qué materiales se utilizarán y cómo funcionará la vigilancia.

Algunas prácticas son:

- **Threat modeling:** imaginar amenazas y caminos de ataque posibles antes de construir.
- **Secure code reviews:** revisar el código buscando errores y decisiones inseguras.
- Diseñar correctamente la autenticación y los permisos.
- Proteger servidores, bases de datos y servicios asociados.
- Definir controles de seguridad desde el comienzo del proyecto.

Esto no vuelve invulnerable a la aplicación. Permite descubrir y reducir riesgos cuando todavía son más fáciles y baratos de corregir.

### Responsabilidad compartida

- Los **desarrolladores** escriben código seguro e implementan controles.
- Los **arquitectos de seguridad** diseñan la estructura general de protección.
- Los equipos de **operaciones o IT** protegen y mantienen el entorno de producción.
- Los **testers y penetration testers** buscan vulnerabilidades y simulan ataques autorizados.
- El **Application Security Manager** coordina políticas y controles específicos de las aplicaciones.
- El **CISO** dirige la estrategia general, los riesgos y el cumplimiento de seguridad de la organización.

La seguridad de una aplicación no depende de una sola persona ni únicamente del CISO.

## Comandos y opciones

Esta sección es teórica y no presenta comandos ejecutables. El pseudocódigo del material no es un programa real: representa las etapas de construir de forma segura, inspeccionar debilidades y mantener la protección con el tiempo.

## Diferencias que hay que recordar

- **Autenticación vs autorización:** la autenticación comprueba quién es el usuario; la autorización determina qué recursos y acciones tiene permitidos después de ingresar.
- **Análisis estático vs dinámico:** el estático examina el código o sus componentes sin ejecutar la aplicación; el dinámico analiza su comportamiento mientras está funcionando.
- **Prueba puntual vs proceso continuo:** una prueba describe el estado observado en un momento; el monitoreo, los parches y las evaluaciones repetidas mantienen la seguridad frente a cambios posteriores.
- **Código vs infraestructura:** un código bien protegido puede quedar expuesto si el servidor, la base de datos, la nube o las credenciales están mal configurados.
- **Security by Design vs seguridad agregada al final:** diseñar controles desde el principio reduce riesgos y costos; revisar únicamente al final puede descubrir problemas estructurales demasiado tarde.

## Ejemplos prácticos

- Una persona inicia sesión con su contraseña y segundo factor: el sistema comprueba su identidad (**autenticación**). Luego intenta abrir datos de otro usuario y el sistema se lo impide según sus permisos (**autorización**).
- Una herramienta estática puede señalar una consulta SQL construida de forma insegura antes de ejecutar el programa. Una prueba dinámica intenta interactuar con la aplicación funcionando para observar su respuesta.
- Un equipo publica una aplicación cuyo código fue revisado, pero deja la base de datos expuesta con permisos excesivos. La aplicación sigue siendo insegura porque la infraestructura también forma parte del sistema.
- Después de una actualización, el equipo repite las pruebas porque el cambio podría haber introducido una vulnerabilidad nueva.

## Errores y precauciones

- No dejar todas las pruebas para el final por presión para publicar rápidamente.
- No suponer que una evaluación anterior garantiza seguridad permanente.
- No confundir una autenticación correcta con permisos bien configurados.
- No proteger solamente el código e ignorar servidores, bases de datos, servicios en la nube y dependencias.
- Las pruebas de penetración y los ataques simulados requieren autorización explícita y un alcance definido.
- Ninguna herramienta encuentra todas las vulnerabilidades; los distintos métodos se complementan.

Omitir controles para lanzar más rápido puede ocasionar filtraciones, pérdidas económicas, interrupciones, daño reputacional, consecuencias legales y pérdida de confianza.

## Inglés técnico del módulo

- `application security` → seguridad de aplicaciones.
- `software development lifecycle` → ciclo de vida del desarrollo de software.
- `security by design` → seguridad incorporada desde el diseño.
- `threat modeling` → modelado de amenazas.
- `secure coding` → programación segura.
- `code review` → revisión de código.
- `vulnerability` → vulnerabilidad o debilidad explotable.
- `security control` → medida o control de seguridad.
- `static analysis` → análisis del código sin ejecutar la aplicación.
- `dynamic analysis` → análisis de la aplicación funcionando.
- `fuzzing` → pruebas con entradas inesperadas, inválidas o aleatorias.
- `patch` → corrección o parche.
- `ongoing monitoring` → monitoreo continuo.
- `data breach` → filtración o exposición de datos.

## Lo que más costó

En el cuestionario costó identificar que la responsabilidad de Application Security es compartida. La respuesta inicial atribuyó la responsabilidad solamente al CISO. La corrección fue recordar que el CISO dirige la estrategia general, mientras desarrolladores, arquitectos, operaciones y testers cumplen funciones concretas. En el ejemplo de un servidor de producción mal configurado, se identificó correctamente que el equipo principal para intervenir es operaciones o IT.

## Qué aprendí

Entendí que Application Security protege la aplicación, sus datos y su infraestructura durante todo el ciclo de vida. Puedo diferenciar autenticación de autorización, análisis estático de dinámico y una prueba puntual de un proceso continuo. También comprendí que la seguridad debe diseñarse desde el comienzo y que la responsabilidad se distribuye entre desarrollo, seguridad, operaciones, testers y gestión.

## Para repasar o practicar

- Recordar qué función cumple cada equipo en Application Security.
- Explicar con un ejemplo la diferencia entre autenticación y autorización.
- Comparar análisis estático, análisis dinámico, fuzzing y penetration testing.
- Identificar qué partes de la infraestructura pueden volver insegura a una aplicación con código bien escrito.
- Relacionar controles concretos con confidencialidad, integridad y disponibilidad.

## Cuestionario de repaso

1. ¿Cuándo debería comenzar Application Security? — **Respuesta:** Desde la planificación y el diseño, y debe continuar durante todo el ciclo de vida.
2. Una aplicación permite iniciar sesión correctamente, pero un usuario puede ver datos privados de otras personas. ¿Cuál es el problema principal? — **Respuesta:** La autorización, porque los permisos permiten acceder a recursos indebidos.
3. ¿Qué significa Security by Design? — **Respuesta:** Incorporar la seguridad desde el diseño y mantenerla durante el desarrollo, en vez de agregarla únicamente al final.
4. ¿Qué diferencia principal existe entre análisis estático y dinámico? — **Respuesta:** El estático analiza el código o sus componentes sin ejecutar la aplicación; el dinámico observa la aplicación mientras funciona.
5. ¿Quiénes son responsables de la seguridad de una aplicación? — **Respuesta:** Es una responsabilidad compartida entre desarrolladores, arquitectos de seguridad, operaciones, testers y responsables de gestión como AppSec Manager o CISO.
6. ¿Por qué las evaluaciones de seguridad deben repetirse? — **Respuesta:** Porque el código y la infraestructura cambian, y aparecen vulnerabilidades y técnicas de ataque nuevas.

**Refuerzo:** si el servidor de producción está mal configurado aunque el código sea seguro, el equipo principal para intervenir es **operaciones o IT**.
