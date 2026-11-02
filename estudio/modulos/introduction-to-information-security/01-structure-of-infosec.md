# 1 de 24 — Structure of InfoSec

**Estado:** Repasar
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Information Security (InfoSec) es la disciplina que protege la información y los sistemas de accesos, modificaciones o destrucción no autorizados. Esta sección es puramente teórica: da el mapa general de cómo está organizado el mundo digital, quiénes lo defienden, qué conceptos de riesgo existen y qué roles profesionales hay dentro del campo. Sirve como punto de partida antes de entrar a contenido técnico/práctico en módulos siguientes.

## Conceptos importantes

**El mapa del mundo digital:**
- **Client:** la PC/notebook desde la que se accede a servicios en internet.
- **Internet:** la red global de servidores interconectados.
- **Servers:** máquinas que ofrecen un servicio puntual (ej. un servidor web).
- **Network:** cuando varias máquinas/servidores se conectan y se comunican entre sí.
- **Cloud:** data centers que alquilan esa infraestructura interconectada a empresas o personas.

**Los tres equipos de seguridad:**
- **Blue Team:** seguridad interna de la empresa, defiende y responde ante ataques.
- **Red Team:** simula ser el atacante real, buscando huecos antes que un atacante malicioso.
- **Purple Team:** combina miembros de Blue y Red Team trabajando juntos para mejorar la seguridad general.

**La analogía del castillo:** el tesoro es la información; las murallas/puente levadizo son firewalls y cifrado; los guardias son los controles de acceso; los pentesters son caballeros que prueban las defensas simulando ataques; la transformación digital es agrandar el castillo (más valioso, pero también más expuesto y atractivo para ladrones); las amenazas son los ladrones.

**Áreas que cubre InfoSec (lista no exhaustiva):** Network Security, Application Security, Operational Security, Disaster Recovery and Business Continuity, Cloud Security, Physical Security, Mobile Security, IoT Security.

## Diferencias que hay que recordar

**Vulnerabilidad, amenaza y riesgo** — los tres conceptos más importantes de la sección, y los que más se prestan a confusión:

- **Vulnerabilidad (vulnerability):** una debilidad concreta en un sistema (ej. una contraseña débil, un software sin parchear, una mala configuración). Que exista una vulnerabilidad no implica por sí sola que el sistema vaya a ser comprometido.
- **Amenaza (threat):** una causa potencial de daño — puede ser una persona (un atacante) o un evento (un incendio, una inundación). Una amenaza explota vulnerabilidades para comprometer un sistema.
- **Riesgo (risk):** no es un tercer elemento separado, es el resultado de combinar las otras dos: la posibilidad real de que una amenaza explote una vulnerabilidad, y el daño que eso causaría. **Si no existe ninguna amenaza capaz de explotar una vulnerabilidad concreta, el riesgo asociado a esa vulnerabilidad es prácticamente nulo**, aunque la vulnerabilidad siga estando ahí.

Ejemplo para fijarlo: una puerta sin llave (vulnerabilidad) en un barrio sin ladrones (sin amenaza) representa un riesgo bajo. Esa misma puerta sin llave en un barrio con muchos robos (amenaza presente) representa un riesgo alto. La vulnerabilidad es la misma en ambos casos; lo que cambia el riesgo es la presencia de la amenaza.

**CIA triad (lo que InfoSec busca proteger):**
- **Confidencialidad (Confidentiality):** que la información no sea vista por quien no está autorizado.
- **Integridad (Integrity):** que la información no sea modificada sin autorización.
- **Disponibilidad (Availability):** que la información y los servicios estén accesibles cuando se los necesita.

## Roles dentro de InfoSec

| Rol | Qué hace | Relevancia para el camino de Tano |
|---|---|---|
| CISO (Chief Information Security Officer) | Define la estrategia general de seguridad de la organización | Marca las reglas que después un pentester evalúa |
| Security Architect | Diseña sistemas y redes seguras | Construye lo que un pentester intentará vulnerar |
| **Security Analyst** | Monitorea sistemas y analiza datos de seguridad | **Objetivo inmediato de Tano** (camino SOC) |
| **Penetration Tester** | Busca y explota vulnerabilidades de forma legal y ética | **Objetivo a futuro de Tano** |
| Incident Response Specialist | Gestiona y responde a incidentes de seguridad | Trabaja en conjunto con el pentester tras un ataque simulado |
| Compliance Specialist | Asegura el cumplimiento de normas y regulaciones | Usa los reportes de pentesting como respaldo |

## Ejemplos prácticos

No aplica (sección teórica, sin comandos ni ejercicios prácticos en HTB — así lo aclara el propio módulo, pensado para quienes recién arrancan en el campo).

## Errores y precauciones

- No confundir riesgo con amenaza o con vulnerabilidad: son tres conceptos relacionados pero distintos, y es un error común tratarlos como sinónimos.
- No asumir que toda vulnerabilidad implica automáticamente un riesgo alto: depende de si existe una amenaza real capaz de explotarla.

## Inglés técnico del módulo

- `threat` → amenaza, causa potencial de daño.
- `vulnerability` → vulnerabilidad, debilidad explotable de un sistema.
- `risk` → riesgo, combinación de amenaza + vulnerabilidad y el daño potencial resultante.
- `digital transformation` → transformación digital, migración de servicios hacia lo digital/online.
- `penetration tester` → pentester, quien prueba defensas simulando ataques reales.
- `incident response` → respuesta a incidentes.
- `compliance` → cumplimiento normativo.

## Lo que más costó

La diferencia entre **riesgo, amenaza y vulnerabilidad** fue el punto más difícil. En el cuestionario, surgieron dos confusiones concretas:

1. Pensar que el riesgo es un concepto separado e independiente ("no sé" qué es el riesgo), cuando en realidad es el resultado de combinar amenaza + vulnerabilidad.
2. Creer que el riesgo "siempre existe porque los humanos cometen descuidos", en lugar de entender que **sin una amenaza capaz de explotar la vulnerabilidad, el riesgo real es bajo o nulo**, aunque la vulnerabilidad exista.

También costó identificar en la tabla de roles cuál corresponde al objetivo inmediato (Security Analyst / SOC) y cuál al objetivo a futuro ya declarado por Tano (Penetration Tester) — en el primer intento se respondió "CISO", que no corresponde a ninguno de los dos objetivos.

## Qué aprendí

Entendí la estructura general del mundo digital (cliente, servidor, red, internet, nube), la diferencia entre Blue/Red/Purple Team, y sobre todo la relación entre vulnerabilidad, amenaza y riesgo. También identifiqué qué rol de InfoSec corresponde a mi objetivo inmediato (Security Analyst) y cuál a mi objetivo a futuro (Penetration Tester).

## Para repasar o practicar

- Repasar la relación riesgo = amenaza + vulnerabilidad con más ejemplos propios, hasta poder explicarla sin dudar.
- Terminar de memorizar la CIA triad completa (Confidencialidad, Integridad, Disponibilidad) y poder definir cada una sin pistas.
- Repasar la tabla de roles de InfoSec y poder ubicar sin dudar cuál es Security Analyst y cuál Penetration Tester.

## Cuestionario de repaso

1. ¿Cuál es la diferencia entre el Blue Team, el Red Team y el Purple Team? — **Respuesta:** Blue Team defiende y responde ante ataques (seguridad interna); Red Team simula ser el atacante para encontrar fallas; Purple Team combina miembros de ambos equipos trabajando juntos para mejorar la seguridad general.
2. En la analogía del castillo, ¿qué representa la "transformación digital" y por qué se relaciona con más riesgo? — **Respuesta:** Representa agrandar el castillo para guardar más tesoro (mover más servicios a lo digital). Esto atrae a más "ladrones" (amenazas) porque hay más valor en juego y más superficie expuesta, aumentando el riesgo.
3. Explicá la diferencia entre vulnerabilidad, amenaza y riesgo, con un ejemplo de cada una. — **Respuesta:** Vulnerabilidad es una debilidad concreta (ej. una contraseña débil); amenaza es algo o alguien que podría explotar esa debilidad (ej. un atacante); riesgo es la combinación de ambas — la posibilidad real de que la amenaza explote la vulnerabilidad y el daño que eso causaría (ej. que ese atacante use la contraseña débil para robar datos).
4. Si no existe ninguna amenaza capaz de explotar una vulnerabilidad, ¿existe igual el riesgo? ¿Por qué? — **Respuesta:** No, el riesgo real es prácticamente nulo. El riesgo depende de que exista una amenaza capaz de explotar la vulnerabilidad; si esa amenaza no existe o no puede llegar a la vulnerabilidad, no hay riesgo relevante aunque la vulnerabilidad siga presente.
5. De los roles vistos, ¿cuál se relaciona con el objetivo inmediato de Tano (SOC/Blue Team) y cuál con su objetivo a futuro (declarado en esta sesión)? — **Respuesta:** Security Analyst es el objetivo inmediato (monitorea sistemas y analiza datos de seguridad); Penetration Tester es el objetivo a futuro (busca y explota vulnerabilidades de forma legal y ética).
6. ¿Qué significa la sigla InfoSec y qué tres cosas busca proteger en términos generales? — **Respuesta:** InfoSec significa Information Security (seguridad de la información). Busca proteger la Confidencialidad (que no se vea sin autorización), la Integridad (que no se modifique sin autorización) y la Disponibilidad (que esté accesible cuando se necesita) — la llamada CIA triad.
