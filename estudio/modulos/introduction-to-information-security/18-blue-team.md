# 18 de 24 — Blue Team

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

El **Blue Team** es el conjunto de especialistas que protege la infraestructura digital de una organización. Su trabajo abarca prevención, monitoreo, detección, respuesta y mejora continua. No espera solamente a que ocurra un ataque: mantiene las defensas, busca amenazas ocultas y aprende de cada incidente para fortalecer la seguridad futura.

La comparación con el sistema inmunológico ayuda a entender su función: identifica comportamientos extraños, neutraliza amenazas, ayuda a recuperar los sistemas y conserva lo aprendido para responder mejor la próxima vez.

## Conceptos importantes

### Integrantes principales

- **Security Analysts:** vigilan redes, sistemas y alertas para encontrar anomalías. Analizan señales y deciden cuáles requieren investigación.
- **Incident Responders:** actúan cuando existe un incidente. Investigan, contienen la propagación, eliminan la amenaza, recuperan sistemas y documentan las lecciones.
- **Threat Hunters:** buscan proactivamente amenazas que pueden estar ocultas aunque ninguna herramienta haya generado una alerta clara.
- **Security Engineers:** diseñan, implementan y mantienen controles como firewalls, acceso, cifrado y plataformas de detección.

Los roles se complementan. El analista puede descubrir una alerta, el responder contener el incidente, el hunter buscar actividad relacionada que no fue detectada y el engineer corregir el control que permitió el ataque.

### Security Operations Center

El **Security Operations Center (SOC)** es el centro operativo desde el cual se coordinan muchas actividades defensivas. Suele funcionar las 24 horas porque las amenazas no respetan horarios. Recibe alertas, analiza eventos, coordina investigaciones y mantiene visibilidad sobre el entorno.

Blue Team describe las funciones y personas defensivas; SOC describe el centro de operaciones donde muchas de esas tareas se organizan.

### Cuatro objetivos

1. **Monitoreo continuo:** observar actividad, detectar accesos no autorizados y reconocer patrones sospechosos.
2. **Implementación de controles:** desplegar firewalls, permisos, parches, cifrado y otras medidas preventivas.
3. **Respuesta a incidentes:** investigar, contener, erradicar, recuperar y aprender.
4. **Colaboración y capacitación:** trabajar con otras áreas, formar empleados y actualizar las habilidades del propio equipo.

### Herramientas de monitoreo

- **SIEM:** centraliza registros y eventos de distintas fuentes y ayuda a relacionarlos.
- **IDS:** detecta actividad que puede indicar una intrusión.
- **EDR:** ofrece visibilidad, investigación y respuesta sobre endpoints como computadoras y servidores.
- **Plataformas de análisis:** encuentran patrones y comportamientos anómalos.

Estas herramientas no sustituyen el análisis humano. Una alerta puede ser un ataque real o un falso positivo y debe interpretarse dentro de su contexto.

### Respuesta a incidentes

El proceso presentado sigue un orden lógico:

1. **Investigar:** comprender qué ocurrió, cómo ingresó y qué alcance tiene.
2. **Contener:** impedir que continúe propagándose o causando daño.
3. **Erradicar:** eliminar malware, cuentas, accesos o causas del incidente.
4. **Recuperar:** restaurar sistemas y comprobar que funcionen de forma segura.
5. **Aprender:** actualizar controles, reglas y procedimientos para evitar repeticiones.

### Mejora continua

El Blue Team actualiza parches, protocolos, reglas de detección, capacitación y procedimientos. También sigue nuevas técnicas de ataque. Una defensa que no evoluciona pierde eficacia frente a amenazas cambiantes.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. SIEM, IDS y EDR son categorías de herramientas; su sintaxis depende del producto utilizado y del entorno autorizado.

## Diferencias que hay que recordar

- **Security Analyst vs Threat Hunter:** el analista trabaja principalmente con monitoreo y alertas; el hunter busca amenazas que pueden no haber generado alertas.
- **Incident Responder vs Security Engineer:** el responder gestiona incidentes; el engineer construye y mantiene controles.
- **Blue Team vs SOC:** Blue Team es la función defensiva; SOC es el centro operativo que coordina gran parte de esa función.
- **SIEM vs IDS vs EDR:** SIEM reúne y correlaciona eventos; IDS detecta posibles intrusiones; EDR se concentra en endpoints y permite investigar o responder.
- **Contención vs erradicación:** contener limita el daño; erradicar elimina la amenaza y su causa.
- **Reacción vs mejora continua:** responder resuelve el incidente actual; aprender y adaptar defensas reduce incidentes futuros.

## Ejemplos prácticos

- El SIEM relaciona un inicio de sesión inusual con actividad sospechosa en un servidor.
- Un analista revisa la alerta y determina que necesita investigación.
- El Incident Responder aísla el equipo afectado para contener el ataque.
- Un Threat Hunter busca la misma técnica en otros endpoints aunque no haya alertas.
- Un Security Engineer modifica reglas y corrige configuraciones para cerrar la debilidad.
- El equipo capacita a empleados si el acceso inicial provino de phishing.

## Errores y precauciones

- No tratar cada alerta como incidente confirmado ni ignorarla sin análisis.
- No confundir contención rápida con solución definitiva.
- No recuperar un sistema antes de eliminar la causa del compromiso.
- No depender de una sola herramienta; la visibilidad surge de varias fuentes.
- No guardar el aprendizaje solamente en un informe: debe convertirse en controles y procedimientos.
- Preservar registros y evidencia durante la respuesta.

## Inglés técnico del módulo

- `Blue Team` → equipo defensivo de seguridad.
- `Security Analyst` → especialista que monitorea y analiza actividad.
- `Incident Responder` → especialista que contiene y resuelve incidentes.
- `Threat Hunter` → especialista que busca amenazas ocultas proactivamente.
- `Security Engineer` → profesional que diseña y mantiene controles.
- `Security Operations Center (SOC)` → centro de operaciones de seguridad.
- `Security Information and Event Management (SIEM)` → plataforma para centralizar y relacionar eventos.
- `Intrusion Detection System (IDS)` → sistema de detección de intrusiones.
- `Endpoint Detection and Response (EDR)` → detección y respuesta en endpoints.
- `security posture` → capacidad general de protección de una organización.

## Lo que más costó

No hubo errores en el cuestionario: las seis respuestas fueron correctas. Conviene mantener clara la diferencia entre los cuatro roles y recordar que el Threat Hunter actúa proactivamente incluso sin una alerta inicial.

## Qué aprendí

Entendí que el Blue Team previene, monitorea, detecta, responde y aprende. Puedo diferenciar sus cuatro roles principales, explicar la función del SOC y ordenar correctamente las etapas de respuesta a incidentes.

## Para repasar o practicar

- Asociar cada rol con una situación concreta.
- Diferenciar SIEM, IDS y EDR.
- Practicar el orden investigar, contener, erradicar, recuperar y aprender.
- Explicar por qué un hunter busca más allá de las alertas.
- Relacionar cada incidente con una mejora defensiva posterior.

## Cuestionario de repaso

1. ¿Cuál es la función principal de los Security Analysts? — **Respuesta:** Monitorear sistemas y analizar actividades sospechosas.
2. ¿Quién busca amenazas ocultas aunque todavía no exista una alerta clara? — **Respuesta:** Threat Hunter.
3. ¿Cuál es la función principal de los Security Engineers? — **Respuesta:** Diseñar, implementar y mantener defensas técnicas.
4. ¿Cuál es el orden correcto de la respuesta a un incidente? — **Respuesta:** Investigar, contener, erradicar, recuperar y aprender.
5. ¿Qué herramienta reúne y relaciona registros y eventos de diferentes fuentes? — **Respuesta:** SIEM.
6. ¿Por qué se compara al Blue Team con un sistema inmunológico? — **Respuesta:** Porque detecta, neutraliza y recuerda amenazas para mejorar la defensa futura.
