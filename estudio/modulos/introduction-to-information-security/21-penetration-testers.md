# 21 de 24 — Penetration Testers

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

Un **Penetration Tester**, también llamado **Ethical Hacker**, simula ataques contra sistemas, redes o aplicaciones para descubrir vulnerabilidades antes que un atacante real. Puede usar técnicas ofensivas similares, pero trabaja con autorización, un alcance definido y una finalidad defensiva.

El objetivo no es entrar por entrar: debe comprobar el riesgo real, evitar daños innecesarios, documentar los hallazgos y ayudar a corregirlos.

## Conceptos importantes

### Autorización y alcance

Antes de probar un sistema debe existir permiso explícito, reglas de trabajo y una lista clara de activos autorizados. Probar algo fuera del alcance puede causar daño y convertirse en una actividad ilegal aunque la intención original fuera aprender o ayudar.

### Identificación y validación

El pentester busca software desactualizado, configuraciones inseguras, controles de acceso débiles, servicios expuestos y fallas en aplicaciones. Las herramientas automáticas muestran indicios; el profesional debe validarlos, eliminar falsos positivos y determinar si pueden explotarse.

### Evaluación del riesgo

Una vulnerabilidad es una debilidad. El riesgo agrega contexto: facilidad de explotación, acceso requerido, sistemas afectados, probabilidad e impacto. Dos fallas parecidas pueden tener prioridades diferentes según el entorno.

### Prueba de controles

También comprueba si firewalls, permisos, detecciones y segmentación funcionan como fueron diseñados. Un control existente no sirve de mucho si está mal configurado o puede evadirse con facilidad.

### Informe y colaboración

El informe debe explicar el hallazgo, ubicación, evidencia, impacto y recomendaciones. Tiene que ser comprensible tanto para equipos técnicos como para responsables no técnicos. Desarrolladores, administradores, ingenieros y seguridad colaboran luego en la corrección.

## Comandos y opciones

Esta sección es conceptual y no presenta comandos. En una prueba real, las herramientas y técnicas dependen del alcance autorizado y de las reglas acordadas.

## Diferencias que hay que recordar

- **Pentester vs atacante malicioso:** pueden usar técnicas similares; la autorización y el propósito defensivo cambian completamente la actividad.
- **Escáner vs pentest:** el escáner detecta posibles fallas; el pentester analiza, valida y mide su impacto.
- **Vulnerabilidad vs riesgo:** la vulnerabilidad es una debilidad; el riesgo considera contexto, probabilidad e impacto.
- **Pentester vs CISO:** el pentester realiza evaluaciones técnicas; el CISO dirige estrategia y riesgo general.
- **Prueba puntual vs seguridad continua:** un pentest refleja un alcance y momento determinados, no garantiza seguridad permanente.

## Ejemplos prácticos

- Un escáner informa un servicio vulnerable; el pentester verifica la versión, las condiciones necesarias y el impacto real antes de reportarlo.
- Una segmentación debería impedir avanzar entre redes; la prueba comprueba si ese límite funciona.
- Una falla crítica se documenta con evidencia mínima y segura, sin extraer más datos de los necesarios.
- El informe explica el detalle técnico al administrador y el impacto comercial a la dirección.

## Errores y precauciones

- Nunca probar sistemas sin autorización explícita.
- No salir del alcance aunque aparezca un objetivo interesante.
- No confiar ciegamente en resultados automáticos.
- No causar daño ni conservar información sensible innecesariamente.
- No considerar terminado el trabajo sin un informe útil y recomendaciones.
- No presentar un pentest como garantía contra ataques futuros.

## Inglés técnico del módulo

- `penetration tester` / `pentester` → profesional que realiza pruebas de penetración autorizadas.
- `ethical hacking` → uso autorizado de técnicas ofensivas con propósito defensivo.
- `scope` → activos, límites y actividades autorizadas.
- `rules of engagement` → reglas que definen cómo puede ejecutarse la prueba.
- `finding` → hallazgo documentado.
- `false positive` → resultado que parece una vulnerabilidad pero no lo es.
- `risk assessment` → evaluación de probabilidad, impacto y contexto.
- `remediation` → corrección o mitigación de una vulnerabilidad.

## Lo que más costó

No hubo errores en el cuestionario: las seis respuestas fueron correctas. Conviene conservar la diferencia entre encontrar una señal con un escáner y validar técnicamente su riesgo dentro de un alcance autorizado.

## Qué aprendí

Entendí que un pentester combina conocimiento técnico, análisis, creatividad y comunicación. Su trabajo necesita autorización y alcance, valida vulnerabilidades, evalúa el riesgo y entrega información útil para corregirlas.

## Para repasar o practicar

- Diferenciar escaneo automático de prueba de penetración.
- Explicar por qué autorización y alcance son obligatorios.
- Practicar cómo describir evidencia, impacto y recomendación.
- Comparar vulnerabilidad, explotación y riesgo.
- Recordar que un pentest es una evaluación puntual.

## Cuestionario de repaso

1. ¿Qué diferencia principalmente a un pentester de un atacante malicioso? — **Respuesta:** Actúa con autorización y finalidad defensiva.
2. ¿Por qué no alcanza con ejecutar un escáner automático? — **Respuesta:** Hay que validar los hallazgos y evaluar su riesgo real.
3. ¿Qué debería contener un informe de pentest? — **Respuesta:** Hallazgos, evidencia, impacto y recomendaciones.
4. ¿Por qué es importante la comunicación? — **Respuesta:** Permite explicar los hallazgos a públicos técnicos y no técnicos.
5. ¿Quiénes suelen colaborar para corregir los hallazgos? — **Respuesta:** Desarrollo, administración, ingeniería y seguridad.
6. ¿Qué describe mejor una prueba de penetración? — **Respuesta:** Una evaluación autorizada con momento y alcance definidos.
