# 10 de 12 — Network Security

**Estado:** Completado
**Progreso de la sección:** 100%
**Curso:** Network Foundations (módulo 2 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

La seguridad de red protege datos, dispositivos y servicios conectados. No depende de una sola herramienta: combina controles preventivos, detectivos y correctivos para mantener la confidencialidad, integridad y disponibilidad de la información.

## Conceptos importantes

### Tríada CIA

- **Confidentiality:** solo acceden quienes están autorizados.
- **Integrity:** los datos no se alteran de forma indebida.
- **Availability:** sistemas y datos están disponibles cuando se necesitan.

### Firewalls, IDS e IPS

Un **firewall** permite o bloquea tráfico según reglas. Puede filtrar por direcciones, puertos, protocolos, estado de las conexiones o contenido de aplicación, según su tipo.

Un **IDS** inspecciona actividad y genera alertas, pero normalmente no bloquea por sí solo. Un **IPS** trabaja en línea: detecta y también puede detener tráfico malicioso. Colocar un IPS en línea le permite bloquear, pero también exige reglas cuidadosas para evitar interrupciones por falsos positivos.

### Métodos de detección

- **Signature-based:** compara con patrones conocidos. Es preciso frente a amenazas conocidas, pero puede no reconocer ataques nuevos o modificados.
- **Anomaly-based:** busca desviaciones respecto de un comportamiento normal. Puede detectar actividad desconocida, aunque suele producir más falsos positivos.

### Defensa en profundidad

La `defense in depth` combina varias capas: segmentación, autenticación, mínimos privilegios, firewalls, IDS/IPS, actualizaciones, monitoreo, copias de seguridad y respuesta a incidentes. Si una capa falla, otra puede reducir el impacto.

## Comandos y opciones

La sección fue principalmente conceptual. En un sistema real, las reglas y alertas deben revisarse con las herramientas autorizadas de cada entorno; no se debe asumir que una alerta confirma por sí sola un ataque.

## Diferencias que hay que recordar

- **IDS vs IPS:** el IDS detecta y alerta; el IPS detecta y puede bloquear.
- **Firewall vs IDS/IPS:** el firewall aplica reglas de acceso; IDS/IPS analiza patrones o comportamientos potencialmente maliciosos.
- **Firmas vs anomalías:** las firmas buscan amenazas conocidas; las anomalías buscan comportamientos fuera de lo normal.
- **Prevención vs detección:** impedir una acción y descubrir que ocurrió son funciones diferentes y complementarias.

## Ejemplos prácticos

Si llega tráfico a un puerto que la política no permite, el firewall puede descartarlo. Si una secuencia coincide con una firma de ataque, el IDS puede alertar al equipo; un IPS podría además interrumpirla. Una defensa completa también limita permisos, registra eventos y conserva respaldos.

## Errores y precauciones

- No confundir una alerta con una confirmación: debe investigarse el contexto.
- No asumir que un firewall reemplaza antivirus, monitoreo o actualizaciones.
- Un IPS mal ajustado puede bloquear tráfico legítimo.
- La detección por anomalías necesita una línea base razonable.
- Ningún control aislado elimina todo el riesgo.

## Inglés técnico del módulo

- `Confidentiality, Integrity, Availability` → confidencialidad, integridad y disponibilidad.
- `firewall rule` → regla que permite o bloquea tráfico.
- `Intrusion Detection System (IDS)` → sistema de detección y alerta.
- `Intrusion Prevention System (IPS)` → sistema que detecta y puede bloquear.
- `signature-based detection` → detección mediante patrones conocidos.
- `anomaly-based detection` → detección mediante desviaciones de una línea base.
- `false positive` → actividad legítima identificada erróneamente como amenaza.
- `defense in depth` → varias capas de protección complementarias.

## Lo que más costó

El punto principal para conservar es la diferencia operativa entre IDS e IPS: ambos detectan, pero el IPS está preparado para actuar en línea y bloquear. También conviene recordar que firmas y anomalías se complementan y tienen limitaciones diferentes.

## Qué aprendí

Entendí cómo la tríada CIA orienta la protección de redes y cómo firewalls, IDS, IPS, firmas, anomalías y defensa en profundidad cumplen funciones distintas pero complementarias.

## Para repasar o practicar

- Explicar IDS e IPS con un ejemplo propio.
- Reconocer falsos positivos y falsos negativos.
- Comparar detección por firmas y por anomalías.
- Diseñar varias capas de defensa para una red doméstica o pequeña empresa.

## Cuestionario de repaso

1. ¿Qué tres propiedades forman la tríada CIA? — **Respuesta:** Confidencialidad, integridad y disponibilidad.
2. ¿Qué hace normalmente un IDS al detectar actividad sospechosa? — **Respuesta:** Genera una alerta para que sea investigada.
3. ¿Qué capacidad adicional tiene un IPS frente a un IDS? — **Respuesta:** Puede bloquear o detener el tráfico malicioso.
4. ¿Qué busca la detección basada en firmas? — **Respuesta:** Patrones conocidos asociados con amenazas identificadas.
5. ¿Qué riesgo tiene la detección basada en anomalías? — **Respuesta:** Puede generar falsos positivos al marcar comportamientos legítimos poco habituales.
6. ¿Por qué se utiliza defensa en profundidad? — **Respuesta:** Para que varias capas reduzcan el daño si una protección falla.
