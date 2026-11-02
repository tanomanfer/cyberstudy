# 2 de 24 — Principles of Information Security

**Estado:** Repasar
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

InfoSec no es un conjunto de herramientas sueltas: se apoya en **principios** (qué hay que proteger y por qué), **procesos** (cómo se organiza la protección en el tiempo), **propósitos** (para qué le sirve a una organización) y **herramientas** (con qué se hace en la práctica). Esta sección da ese marco. Sirve para tomar decisiones con criterio: ante cualquier medida de seguridad, poder decir qué principio protege y en qué etapa del proceso entra.

## Conceptos importantes

### Los 6 principios

Los tres primeros son la **CIA triad** (ya vista en la sección 1). Esta sección agrega tres más.

| Principio | Qué garantiza | Contra qué protege | Cómo se implementa |
|---|---|---|---|
| **Confidentiality** (confidencialidad) | Que solo vea la información quien está autorizado | Divulgación no autorizada | Cifrado, controles de acceso |
| **Integrity** (integridad) | Que los datos sean exactos y completos durante toda su vida | Modificación no autorizada | Hashing, firmas digitales |
| **Availability** (disponibilidad) | Que la información esté accesible cuando se la necesita | Cortes o interrupciones del acceso | Redundancia, plan de recuperación ante desastres |
| **Non-repudiation** (no repudio) | Que alguien no pueda negar que firmó o envió algo | Que un autor desconozca lo que hizo | Firmas digitales, logs de auditoría |
| **Authentication** (autenticación) | Verificar la identidad de un usuario, proceso o dispositivo | Que alguien se haga pasar por otro | Contraseñas, biometría, MFA |
| **Privacy** (privacidad) | El manejo correcto de datos personales sensibles | Mal uso de datos personales e incumplimiento legal | Minimización de datos, gestión del consentimiento |

Notas para entender cada uno:
- **No repudio** es clave en comercio electrónico y en lo legal: si firmaste digitalmente un contrato o mandaste una transferencia, quedás "atado" a eso.
- **Privacidad** no es lo mismo que confidencialidad: la confidencialidad protege *cualquier* información de miradas no autorizadas; la privacidad se enfoca en *datos personales* y en cumplir leyes de protección de datos (por ejemplo, juntar solo los datos necesarios y pedir consentimiento).

### Los 7 procesos

Funcionan como un ciclo que se repite:

1. **Risk Assessment** (evaluación de riesgos): identificar amenazas y vulnerabilidades, estimar el impacto y decidir qué priorizar. Acá se aplica lo de la sección 1: riesgo = amenaza + vulnerabilidad.
2. **Security Planning** (planificación): armar estrategias, políticas y procedimientos, y asignar recursos.
3. **Implementation of Security Controls** (implementar controles): poner el plan en marcha con soluciones técnicas y políticas. Hay controles **preventivos** (evitan que pase) y **detectivos** (avisan cuando pasa).
4. **Monitoring and Detection** (monitoreo y detección): vigilar todo el tiempo en busca de eventos raros, con herramientas como **SIEM** e **IDS**. El objetivo es detectar incidentes lo antes posible. **Esto es el trabajo diario de un analista SOC.**
5. **Incident Response** (respuesta a incidentes): reaccionar a un incidente detectado siguiendo procedimientos. Pasos: **aislamiento → erradicación → recuperación**.
6. **Disaster Recovery** (recuperación ante desastres): restaurar sistemas y datos después de un incidente grave, con backups y redundancia, para minimizar la caída y la pérdida de datos.
7. **Continuous Improvement** (mejora continua): aprender de incidentes y de "casi incidentes" (near-misses), actualizar defensas ante amenazas nuevas y hacer auditorías periódicas. Después vuelve a empezar el ciclo.

### Para qué sirve InfoSec (propósitos)

- **Proteger datos sensibles** (datos personales, financieros, secretos comerciales) y evitar filtraciones.
- **Continuidad del negocio:** que la empresa siga funcionando aunque haya incidentes o desastres.
- **Cumplimiento normativo:** respetar leyes y estándares de protección de datos, evitar multas y mantener la confianza de los clientes.
- **Proteger la reputación de la marca.**
- **Proteger la propiedad intelectual** (ideas, inventos, obras) y la ventaja competitiva.
- **Permitir una transformación digital segura:** adoptar tecnología nueva sin abrir agujeros (conecta con la analogía del castillo de la sección 1).

### Herramientas (categorías)

| Herramienta | Para qué sirve |
|---|---|
| Firewall | Controla el tráfico de red que entra y sale |
| IDS / IPS | Vigila actividad sospechosa (IDS) y además la bloquea (IPS) |
| SIEM | Junta y analiza eventos de seguridad de muchas fuentes |
| Vulnerability scanner | Encuentra debilidades en sistemas y aplicaciones |
| Herramientas de pentesting | Simulan ataques (ej. Metasploit, Burp Suite) |
| Herramientas de cifrado | Protegen confidencialidad e integridad |
| Control de acceso | Maneja permisos y autenticación de usuarios |
| Plataformas de concientización | Entrenan a los usuarios en buenas prácticas |

Herramientas puntuales que nombra para pentesting: **Nmap** (escaneo y descubrimiento de red), **Wireshark** (análisis de protocolos/tráfico), **Metasploit** (framework de explotación), **Burp Suite** (pruebas de aplicaciones web), **John the Ripper** (cracking de contraseñas). Además, manejarse en Linux, Windows y macOS.

## Diferencias que hay que recordar

- **Confidencialidad vs privacidad:** confidencialidad = nadie no autorizado ve la información (cualquier información). Privacidad = manejo correcto de *datos personales* y cumplimiento de leyes.
- **Integridad vs no repudio:** los dos usan firmas digitales, pero integridad responde "¿el dato fue modificado?" y no repudio responde "¿quién lo hizo y puede negarlo?".
- **Autenticación vs control de acceso:** autenticación = verificar *quién sos*. Control de acceso = decidir *qué podés hacer* una vez identificado.
- **IDS vs IPS:** IDS *detecta y avisa*; IPS *detecta y bloquea*.
- **Control preventivo vs detectivo:** preventivo evita que el incidente ocurra (ej. firewall); detectivo lo descubre cuando ocurre (ej. SIEM, IDS).
- **Incident Response vs Disaster Recovery:** incident response contiene y elimina la amenaza; disaster recovery restaura sistemas y datos después de un incidente grave.

## Ejemplos prácticos

No hay ejercicios prácticos en esta sección (teórica). Ejemplos para fijar los principios:

- Un banco cifra los datos de las tarjetas → **confidencialidad**.
- Descargás un archivo y comparás su hash con el publicado por el sitio → **integridad**.
- Una web tiene dos servidores, si uno cae el otro responde → **disponibilidad**.
- Firmás digitalmente un contrato y después no podés decir "no fui yo" → **no repudio**.
- Entrás a tu cuenta con contraseña + código del celular (MFA) → **autenticación**.
- Una app pide solo tu email y no tu DNI porque no lo necesita → **privacidad** (minimización de datos).

Ejemplo del ciclo de procesos visto desde el SOC: el **SIEM** dispara una alerta (monitoreo y detección) → se aísla la máquina afectada, se elimina el malware y se recupera el servicio (respuesta a incidentes) → si hubo pérdida de datos, se restaura desde backup (recuperación ante desastres) → se analiza qué falló y se ajustan las reglas (mejora continua).

## Errores y precauciones

- Las herramientas de pentesting (Metasploit, John the Ripper, etc.) **solo se usan con autorización explícita**. Sin permiso, es un delito, aunque la intención sea "probar".
- No pensar que InfoSec es solo la CIA triad: la sección suma no repudio, autenticación y privacidad.
- No pensar que la seguridad termina al instalar herramientas: es un ciclo que se repite (mejora continua).

## Inglés técnico del módulo

- `non-repudiation` → no repudio, no poder negar una acción propia.
- `hashing` → generar una "huella" de un dato para verificar que no cambió.
- `digital signature` → firma digital.
- `audit log` → registro de auditoría.
- `multi-factor authentication (MFA)` → autenticación con más de un factor.
- `data minimization` → juntar solo los datos personales necesarios.
- `consent management` → gestión del consentimiento del usuario.
- `redundancy` → tener componentes duplicados para que no se caiga el servicio.
- `SIEM (Security Information and Event Management)` → sistema que centraliza y analiza eventos de seguridad.
- `IDS / IPS (Intrusion Detection / Prevention System)` → detección / prevención de intrusiones.
- `near-miss` → casi incidente, algo que pudo salir mal y no salió.
- `business continuity` → continuidad del negocio.

## Lo que más costó

Todavía sin dificultades registradas: la sección se guardó a partir del texto de HTB, sin cuestionario hecho. Completar esta parte después del repaso.

## Qué aprendí

Conocí los 6 principios de InfoSec (la CIA triad más no repudio, autenticación y privacidad), el ciclo de 7 procesos de seguridad, para qué le sirve InfoSec a una empresa y las categorías de herramientas. Ubiqué dónde entra el trabajo de un analista SOC: monitoreo y detección (SIEM, IDS) y respuesta a incidentes.

## Para repasar o practicar

- Poder nombrar los 6 principios y dar un ejemplo de cada uno sin mirar.
- Ordenar los 7 procesos del ciclo y explicar qué pasa en cada uno.
- Diferenciar confidencialidad vs privacidad, integridad vs no repudio, IDS vs IPS.
- Hacer el cuestionario de abajo y marcar la sección como Completado.

## Cuestionario de repaso

1. ¿Qué tres principios agrega esta sección a la CIA triad? — **Respuesta:** No repudio (non-repudiation), autenticación (authentication) y privacidad (privacy).
2. ¿Qué principio protege el hashing y cuál protege el cifrado? — **Respuesta:** El hashing protege la integridad (detecta si un dato fue modificado). El cifrado protege la confidencialidad (que no lo lea quien no está autorizado).
3. ¿Cuál es la diferencia entre confidencialidad y privacidad? — **Respuesta:** Confidencialidad es que ninguna persona no autorizada acceda a la información, sea cual sea. Privacidad se enfoca en el manejo correcto de datos personales y en cumplir las leyes de protección de datos (minimización, consentimiento).
4. Un SIEM genera una alerta por un login sospechoso a las 3 a. m. ¿En qué proceso estás y cuál viene después? — **Respuesta:** Estás en Monitoring and Detection. Si se confirma el incidente, sigue Incident Response: aislar, erradicar y recuperar.
5. ¿Qué diferencia hay entre un IDS y un IPS? — **Respuesta:** El IDS detecta actividad sospechosa y avisa; el IPS además la bloquea.
6. ¿Qué hay que tener siempre antes de usar herramientas como Metasploit o John the Ripper contra un sistema? — **Respuesta:** Autorización explícita y por escrito del dueño del sistema. Sin eso, es ilegal.
