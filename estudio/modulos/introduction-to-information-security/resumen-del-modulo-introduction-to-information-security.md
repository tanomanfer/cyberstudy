# Resumen del módulo: Introduction to Information Security

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy
**Cobertura:** 24 de 24 secciones

## Visión general

La seguridad de la información protege datos, sistemas y operaciones frente a accesos, cambios, interrupciones o pérdidas no autorizadas. No depende de una sola herramienta: combina personas, procesos, tecnología, gestión de riesgos y mejora continua.

El curso presentó los principios fundamentales, las principales áreas defensivas, amenazas frecuentes y roles profesionales. La idea que conecta todo es que la seguridad debe reducir riesgos de manera proporcional al valor de los activos y a las necesidades del negocio.

## 1. Fundamentos de seguridad de la información

### Activos, amenazas, vulnerabilidades y riesgo

- Un **activo** es algo valioso: datos, sistemas, servicios, dispositivos, reputación o continuidad operativa.
- Una **amenaza** es aquello que podría causar daño.
- Una **vulnerabilidad** es una debilidad que puede ser aprovechada.
- El **riesgo** surge cuando una amenaza puede explotar una vulnerabilidad y generar un impacto.

Una forma útil de razonarlo es: no alcanza con que exista una falla; hay que considerar quién podría aprovecharla, con qué probabilidad y qué consecuencias tendría.

### Tríada CIA

- **Confidencialidad:** solamente acceden quienes están autorizados.
- **Integridad:** la información permanece correcta y no es modificada indebidamente.
- **Disponibilidad:** sistemas y datos están accesibles cuando se necesitan.

Los controles deben equilibrar las tres propiedades. Un sistema muy protegido pero inutilizable no satisface las necesidades de la organización.

### Defensa en profundidad

No se confía en una única barrera. Se combinan controles preventivos, detectivos y correctivos: autenticación, permisos, segmentación, cifrado, monitoreo, copias de seguridad, respuesta a incidentes y capacitación. Si una capa falla, otra puede limitar el daño.

## 2. Áreas principales de protección

### Network Security

Protege comunicaciones, dispositivos y servicios conectados. Firewalls, IDS, IPS, VPN y segmentación cumplen funciones diferentes:

- Un **firewall** permite o bloquea tráfico según reglas.
- Un **IDS** detecta y alerta sobre actividad sospechosa.
- Un **IPS** puede detectar y bloquear automáticamente.
- Una **VPN** protege una comunicación a través de una red no confiable.
- La **segmentación** limita el movimiento lateral entre zonas.

### Application Security

La seguridad debe incorporarse durante todo el ciclo de desarrollo. **Security by Design** significa diseñar controles desde el inicio; agregar seguridad solamente al final suele ser más caro y menos eficaz. Validación de entradas, autenticación, autorización, manejo seguro de errores, revisión de código y actualizaciones reducen fallas explotables.

### Operational Security

Protege las actividades diarias: procedimientos, cambios, accesos, registros, respaldos y manejo de información. El principio de **menor privilegio** entrega únicamente los permisos necesarios. La **separación de funciones** evita que una sola persona controle todo un proceso crítico.

### Disaster Recovery y Business Continuity

- **Disaster Recovery (DR):** restaura tecnología, datos y servicios después de una interrupción.
- **Business Continuity (BC):** permite que la organización continúe sus funciones esenciales mientras se recupera.

Restaurar servidores desde copias o activar un sitio alternativo es DR. Continuar temporalmente con procedimientos manuales, trabajo remoto o proveedores alternativos es BC.

### Cloud Security

La nube utiliza un modelo de **responsabilidad compartida**. El proveedor protege parte de la infraestructura; el cliente sigue siendo responsable de configuraciones, identidades, permisos, datos y uso seguro de los servicios. Migrar a la nube no transfiere automáticamente todo el riesgo.

### Physical Security

Los controles digitales no sirven si cualquiera puede acceder físicamente a equipos o instalaciones. Cerraduras, credenciales, cámaras, guardias, controles ambientales y eliminación segura de soportes forman parte de la defensa.

### Mobile e IoT Security

Los móviles concentran cuentas, datos y autenticadores; requieren bloqueo, cifrado, actualizaciones y capacidad de borrado remoto. Los dispositivos IoT suelen tener recursos limitados, credenciales débiles o actualizaciones deficientes. Un IoT comprometido puede convertirse en puerta de entrada hacia otros sistemas, por lo que debe segmentarse y administrarse con cuidado.

## 3. Amenazas y ataques importantes

### DDoS

Un ataque de **Distributed Denial of Service** utiliza múltiples fuentes, frecuentemente una botnet, para saturar recursos y afectar la disponibilidad. Mitigar implica filtrado, distribución de carga, servicios especializados, capacidad y planes de continuidad; no existe una única regla capaz de detener todos los casos.

### Ransomware

El ransomware cifra o bloquea recursos y exige un pago. La defensa requiere prevención y recuperación: parches, mínimo privilegio, segmentación, protección de endpoints, capacitación, monitoreo y copias aisladas probadas. Pagar no garantiza recuperar los datos ni evitar su publicación.

### Social Engineering

Manipula a las personas para obtener accesos, información o acciones. Phishing, pretexting, baiting y tailgating aprovechan confianza, urgencia, miedo o curiosidad. La defensa combina capacitación con procesos verificables y controles técnicos; no debe depender únicamente de que cada persona “esté atenta”.

### Insider Threats

Una amenaza interna puede ser maliciosa, negligente o accidental. Tiene acceso legítimo o conocimiento del entorno, por lo que puede ser difícil de detectar. Menor privilegio, separación de funciones, monitoreo proporcional y procesos de alta/cambio/baja reducen el riesgo sin asumir que todo empleado es culpable.

### Advanced Persistent Threats

Una **APT** es una campaña avanzada, persistente y dirigida. Busca mantener acceso durante un período prolongado para espionaje, robo o sabotaje. La defensa necesita visibilidad, segmentación, inteligencia, respuesta coordinada y análisis de comportamientos, no solamente firmas conocidas.

### Threat Actors

Los atacantes se diferencian por motivación, recursos y capacidades: ciberdelincuentes buscan beneficio económico; grupos estatales persiguen objetivos estratégicos; hacktivistas actúan por causas; insiders aprovechan acceso interno; script kiddies dependen de herramientas existentes. Comprender la motivación ayuda a priorizar defensas realistas.

## 4. Equipos y colaboración

### Red Team

Simula ataques autorizados para evaluar personas, procesos y tecnología. Busca cumplir objetivos acordados y demostrar rutas de ataque reales sin causar daño innecesario.

### Blue Team

Defiende continuamente: configura controles, monitorea, detecta, investiga, responde y recupera. Su trabajo no termina al bloquear un ataque; debe aprender y mejorar las defensas.

### Purple Team

No es simplemente mezclar colores ni competir. Facilita que Red y Blue compartan técnicas, evidencias y resultados. Una prueba ofensiva tiene más valor cuando el equipo defensivo mejora detecciones y vuelve a comprobarlas.

## 5. Roles profesionales

### CISO

El **Chief Information Security Officer** dirige la estrategia y el programa de seguridad. Gestiona riesgos, alinea protección y objetivos del negocio, coordina incidentes y comunica a la dirección. No ejecuta personalmente todas las tareas técnicas y la seguridad continúa siendo una responsabilidad compartida.

### Penetration Tester

Realiza evaluaciones ofensivas autorizadas con alcance y reglas definidos. Valida vulnerabilidades, mide impacto y produce informes con evidencia y recomendaciones. Un escáner encuentra indicios; el pentester debe interpretarlos y comprobar su riesgo real.

### SOC y SOC Analysts

El **Security Operations Center** monitorea, detecta, analiza y responde continuamente.

- **Tier 1:** triage inicial y escalamiento.
- **Tier 2:** investigación más profunda y casos complejos.
- **Tier 3:** análisis avanzado y respuesta a incidentes críticos.

Una alerta es una señal; todavía debe investigarse antes de considerarla un incidente. Los Threat Hunters buscan amenazas de forma proactiva y los Security Engineers mantienen la tecnología del SOC.

### Bug Bounty Hunter

Busca vulnerabilidades dentro de programas autorizados. Debe respetar estrictamente el **scope** y las **Rules of Engagement**, minimizar el daño y reportar responsablemente. Un activo público no está autorizado por el solo hecho de estar en Internet. Los pagos dependen de validez, originalidad, severidad, impacto y reglas del programa.

## 6. Diferencias esenciales

- **Amenaza vs vulnerabilidad:** la amenaza puede causar daño; la vulnerabilidad es la debilidad aprovechable.
- **Vulnerabilidad vs riesgo:** el riesgo agrega probabilidad, impacto y contexto.
- **IDS vs IPS:** IDS alerta; IPS puede intervenir y bloquear.
- **DR vs BC:** DR recupera tecnología; BC mantiene la operación.
- **Alerta vs incidente:** la alerta requiere análisis; el incidente está confirmado.
- **Escaneo vs pentest:** el escaneo detecta indicios; el pentest valida y contextualiza.
- **Pentest vs bug bounty:** el pentest suele contratarse para un período y alcance; el bounty recompensa reportes válidos según un programa.
- **Red vs Blue:** Red prueba defensas; Blue protege y responde.
- **SOC Manager vs CISO:** el primero dirige la operación diaria del SOC; el segundo dirige la estrategia general.
- **Cumplimiento vs seguridad:** cumplir requisitos ayuda, pero no garantiza una protección eficaz basada en riesgos.

## 7. Principios que atraviesan todo el curso

1. **Autorización:** ninguna técnica ofensiva debe aplicarse fuera de un permiso claro.
2. **Alcance:** saber qué activos y acciones están permitidos evita daños y problemas legales.
3. **Menor privilegio:** reducir accesos limita errores y abusos.
4. **Responsabilidad compartida:** seguridad, nube y respuesta requieren colaboración.
5. **Defensa en profundidad:** varias capas reducen la dependencia de un único control.
6. **Monitoreo y mejora continua:** las amenazas cambian y los controles deben verificarse.
7. **Comunicación:** un hallazgo técnico debe traducirse en impacto y acciones comprensibles.
8. **Continuidad:** prevenir es importante, pero también hay que poder responder y recuperarse.

## 8. Ruta profesional elegida

El objetivo inmediato es avanzar hacia **Security Analyst / SOC**, fortaleciendo redes, sistemas, monitoreo, análisis de alertas y respuesta a incidentes. El objetivo futuro es **Penetration Tester**. La base defensiva será útil para comprender qué rastros dejan los ataques, cómo funcionan los controles y cómo comunicar hallazgos relevantes.

Blue Team y Red Team no son caminos incompatibles. Conocer ataque mejora la defensa y conocer defensa mejora las evaluaciones ofensivas.

## Inglés técnico imprescindible

- `asset` → activo con valor para la organización.
- `threat` → amenaza capaz de causar daño.
- `vulnerability` → debilidad explotable.
- `risk` → combinación de probabilidad, impacto y contexto.
- `security control` → medida para prevenir, detectar o corregir.
- `least privilege` → menor privilegio.
- `defense in depth` → defensa en profundidad.
- `security posture` → estado general de preparación y protección.
- `incident response` → respuesta coordinada ante incidentes.
- `business continuity` → continuidad de las funciones esenciales.
- `scope` → límites autorizados de una evaluación.
- `finding` → hallazgo documentado.
- `remediation` → corrección o mitigación.
- `triage` → clasificación y análisis inicial.
- `threat hunting` → búsqueda proactiva de amenazas.

## Qué aprendí

Comprendí que la seguridad de la información es una disciplina integral basada en riesgos. Puedo relacionar la tríada CIA, defensa en profundidad, redes, aplicaciones, operaciones, continuidad, nube, seguridad física, móviles e IoT. También puedo diferenciar amenazas frecuentes, equipos Red/Blue/Purple y los roles de CISO, pentester, SOC Analyst y bug bounty hunter.

Definí una ruta profesional coherente: comenzar por SOC para construir capacidad defensiva y avanzar más adelante hacia pruebas de penetración autorizadas.

## Para repasar o practicar

- Reforzar la relación entre amenaza, vulnerabilidad, activo, impacto y riesgo.
- Repasar la ubicación y funciones de Security Analyst frente a Penetration Tester.
- Practicar lectura de logs y triage cuando se estudien redes y SOC.
- Explicar con ejemplos DR frente a BC, IDS frente a IPS y alerta frente a incidente.
- Diseñar escenarios sencillos de defensa en profundidad.
- Aplicar siempre autorización, alcance y divulgación responsable en actividades ofensivas.
- Volver a este resumen después de Network Foundations para conectar conceptos con protocolos y tráfico real.
