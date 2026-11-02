# 6 de 24 — Disaster Recovery and Business Continuity

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

**Disaster Recovery (DR)** y **Business Continuity (BC)** permiten que una organización resista interrupciones importantes. Se relacionan, pero no significan lo mismo: DR recupera los sistemas y datos críticos después de un desastre, mientras BC mantiene las operaciones esenciales durante y después del incidente, aunque sea mediante procedimientos alternativos.

Una estrategia conjunta reduce el tiempo de inactividad y la pérdida de datos. También ayuda a limitar pérdidas económicas, mantener la confianza de los clientes, cumplir requisitos regulatorios y proteger la reputación de la organización.

## Conceptos importantes

### Disaster Recovery

DR se concentra en restaurar la tecnología afectada por desastres naturales, incendios, ataques, fallas graves o ciberataques. Un plan puede incluir:

- Copias de seguridad de datos.
- Replicación de sistemas y datos.
- Servidores, sitios o entornos de nube alternativos.
- Procedimientos de recuperación documentados.
- **Failover**, que permite pasar del sistema principal a uno de respaldo.

Su meta es recuperar las partes críticas con la menor interrupción y pérdida de información posibles.

### Business Continuity

BC es más amplio: busca que las funciones importantes del negocio sigan disponibles mientras ocurre la interrupción y durante la recuperación. Puede contemplar:

- Trabajo remoto.
- Oficinas temporales.
- Proveedores alternativos.
- Procedimientos manuales o reducidos.
- Priorización de los servicios esenciales.

En la analogía del concierto, encender un generador para recuperar la electricidad es DR. Trasladar el espectáculo, cambiar su formato o usar recursos alternativos para que continúe es BC.

### RTO y RPO

- **Recovery Time Objective (RTO):** tiempo máximo objetivo que un servicio puede permanecer interrumpido antes de ser recuperado.
- **Recovery Point Objective (RPO):** cantidad máxima tolerable de datos recientes que podrían perderse, expresada como un período de tiempo.

Un RTO de dos horas indica que el servicio debería recuperarse dentro de ese plazo. Un RPO de quince minutos requiere respaldos o replicación suficientemente frecuentes para no perder más de aproximadamente los últimos quince minutos de información.

RTO habla de **tiempo sin servicio**; RPO habla de **datos perdidos desde el último punto recuperable**.

### Responsabilidad y planificación

Un equipo dedicado, normalmente coordinado por un **Business Continuity Manager** o un rol equivalente, prepara y mantiene los planes junto con IT, operaciones y la dirección. Sus tareas incluyen:

- Evaluar riesgos.
- Identificar funciones críticas del negocio.
- Definir RTO y RPO.
- Diseñar estrategias de recuperación y continuidad.
- Documentar responsabilidades y procedimientos.
- Mantener los planes actualizados.

### Pruebas y ejercicios

Un plan no es confiable solamente porque esté escrito. Debe probarse regularmente para verificar que funciona y que cada persona conoce su función.

- **Tabletop exercise:** el equipo recorre y discute un escenario simulado sin ejecutar cambios sobre los sistemas reales.
- **Simulación completa:** se realizan acciones reales, como pasar a sistemas de respaldo o trasladar operaciones a un sitio alternativo.

La frecuencia y el alcance dependen del tamaño, la complejidad y los requisitos regulatorios de la organización. El material indica que muchas empresas realizan pruebas anuales, pero cada organización debe definir una frecuencia acorde con su riesgo.

Los pentesters autorizados pueden identificar vulnerabilidades que comprometan los planes y probar la eficacia de los procedimientos de recuperación.

## Comandos y opciones

Esta sección es teórica y no presenta comandos. La recuperación real depende de las tecnologías y los procedimientos definidos por cada organización.

## Diferencias que hay que recordar

- **DR vs BC:** DR restaura sistemas y datos; BC mantiene funcionando las operaciones esenciales.
- **RTO vs RPO:** RTO mide el tiempo objetivo para recuperar un servicio; RPO mide cuántos datos recientes se tolera perder.
- **Backup vs continuidad:** tener una copia ayuda a recuperar datos, pero no define cómo seguirá trabajando el resto del negocio.
- **Plan escrito vs plan probado:** documentar procedimientos no demuestra que funcionen; las pruebas detectan fallas y entrenan al personal.
- **Tabletop vs simulación completa:** el tabletop analiza respuestas de forma teórica; la simulación completa ejecuta acciones sobre respaldos, sitios o procesos alternativos.

## Ejemplos prácticos

- Se cae el sistema de ventas. IT restaura el servidor desde un respaldo: **DR**. Mientras tanto, los vendedores anotan pedidos en papel: **BC**.
- Una empresa cambia sus servicios hacia una región alternativa de la nube después de una falla: es una acción de DR mediante failover.
- Una oficina queda inutilizable y el personal trabaja desde su casa para continuar las funciones esenciales: es BC.
- Un RTO de cuatro horas con una recuperación que tarda ocho indica que la estrategia actual no cumple el objetivo.
- Un RPO de quince minutos no puede garantizarse si la única copia disponible se realiza una vez por día.

## Errores y precauciones

- No tratar DR y BC como sinónimos: se complementan, pero tienen objetivos distintos.
- No confundir RTO con RPO: uno se refiere al tiempo sin servicio y el otro a la pérdida tolerable de datos.
- No asumir que disponer de backups garantiza la continuidad del negocio.
- No esperar al desastre real para descubrir si los procedimientos funcionan.
- Las simulaciones completas pueden afectar sistemas reales; necesitan planificación, autorización, alcance y mecanismos de reversión.
- Las pruebas de penetración requieren autorización explícita y no deben poner en riesgo los respaldos ni la recuperación.

## Inglés técnico del módulo

- `disaster recovery (DR)` → recuperación ante desastres.
- `business continuity (BC)` → continuidad del negocio.
- `resilience` → capacidad de resistir y recuperarse de una interrupción.
- `downtime` → tiempo durante el cual un servicio no está disponible.
- `data loss` → pérdida de datos.
- `backup` → copia de seguridad.
- `replication` → copia continua o periódica de datos o sistemas hacia otro lugar.
- `failover` → cambio hacia un sistema o sitio alternativo cuando falla el principal.
- `alternate site` → ubicación alternativa para recuperar o continuar operaciones.
- `Recovery Time Objective (RTO)` → tiempo objetivo máximo para recuperar un servicio.
- `Recovery Point Objective (RPO)` → pérdida máxima tolerable de datos medida en tiempo.
- `tabletop exercise` → ejercicio de mesa basado en discutir un escenario.
- `full-scale simulation` → simulación completa con acciones reales.

## Lo que más costó

En el cuestionario se confundió inicialmente el cambio hacia un servidor de respaldo con Business Continuity. La corrección fue distinguir la acción tecnológica de la operación del negocio: restaurar o cambiar el servidor es **Disaster Recovery**; mantener temporalmente las ventas mediante anotaciones en papel es **Business Continuity**. Después del refuerzo, la diferencia se respondió correctamente.

## Qué aprendí

Entendí que DR recupera sistemas y datos, mientras BC mantiene las actividades esenciales aunque sea mediante procedimientos alternativos. Puedo diferenciar RTO de RPO, reconocer los distintos tipos de pruebas y aplicar la diferencia entre recuperación tecnológica y continuidad operativa a un caso práctico.

## Para repasar o practicar

- Explicar DR y BC con ejemplos diferentes al del concierto.
- Resolver casos para distinguir recuperación tecnológica de continuidad operativa.
- Recordar que RTO se relaciona con tiempo sin servicio y RPO con pérdida de datos.
- Comparar tabletop exercises con simulaciones completas.
- Pensar qué funciones serían críticas y qué alternativas necesitarían en una empresa real.

## Cuestionario de repaso

1. ¿Cuál es la diferencia principal entre DR y BC? — **Respuesta:** DR recupera sistemas y datos; BC mantiene las operaciones esenciales del negocio durante y después de la interrupción.
2. Una empresa cambia al servidor de respaldo para recuperar su sistema después de un ataque. ¿Qué aplica principalmente? — **Respuesta:** Disaster Recovery, porque está recuperando la infraestructura tecnológica.
3. ¿Qué indica un RTO de dos horas? — **Respuesta:** Que el servicio debería recuperarse dentro de las dos horas posteriores a la interrupción.
4. ¿Qué indica un RPO de quince minutos? — **Respuesta:** Que la organización acepta perder, como máximo, aproximadamente los últimos quince minutos de datos.
5. ¿Qué diferencia hay entre una prueba de mesa y una simulación completa? — **Respuesta:** En la prueba de mesa se discute el escenario y las respuestas; en la simulación completa se ejecutan acciones reales, como cambiar a respaldos o sitios alternativos.
6. Se corta el sistema de ventas. IT restaura el servidor mientras los vendedores toman pedidos por teléfono. ¿Qué representa cada acción? — **Respuesta:** Restaurar el servidor es DR; mantener las ventas por teléfono es BC.

**Refuerzo:** recuperar el servidor o los datos es DR; continuar trabajando mediante un procedimiento alternativo es BC.
