# Ruta de certificación SOC / Blue Team

> Hoja de ruta personal de Tano para pasar de fundamentos de Linux a un perfil laboral SOC Analyst / Blue Team.
>
> **Última actualización:** 2026-09-27  
> **Plataforma principal:** Hack The Box Academy  
> **Suscripción actual:** Student, USD 8 mensuales

## Objetivo profesional

Construir una base técnica sólida, obtener experiencia práctica en análisis defensivo y prepararse progresivamente para estas certificaciones:

1. **HTB Certified Junior Cybersecurity Associate (CJCA)** — nivel inicial, con fundamentos ofensivos y defensivos.
2. **HTB Certified Defensive Security Analyst (CDSA)** — nivel intermedio, enfocado en operaciones SOC, detección, investigación y respuesta a incidentes.

La ruta recomendada es:

```text
Linux Fundamentals
        ↓
Junior Cybersecurity Analyst Job Role Path
        ↓
Repaso y práctica sin soluciones
        ↓
HTB CJCA
        ↓
SOC Analyst Job Role Path
        ↓
Práctica defensiva e informes en inglés
        ↓
HTB CDSA
        ↓
Portfolio y búsqueda laboral SOC L1
```

## Próximo paso confirmado — desde 2026-09-27

Linux Fundamentals ya está completado. El siguiente objetivo no es comprar una certificación ni saltar directamente a máquinas: es ingresar a **Junior Cybersecurity Analyst Job Role Path** y completar los fundamentos que aparecen antes de Linux en el orden oficial actual.

Orden inmediato:

```text
1. Introduction to Information Security — 24 secciones
2. Network Foundations — 12 secciones
3. Introduction to Networking — 21 secciones
4. Linux Fundamentals — ya completado; HTB debería reconocer su progreso en la ruta
5. Introduction to Bash Scripting — 10 secciones
6. Windows Fundamentals — 15 secciones
7. Introduction to Windows Command Line — 23 secciones
```

La próxima sesión debe comenzar con **Introduction to Information Security** si todavía no está completado. Después se continúa con Network Foundations e Introduction to Networking sin saltear el orden. Al llegar nuevamente a Linux Fundamentals, se comprueba que HTB lo marque como completo y se pasa a Bash.

Regla de avance:

- Un módulo activo por vez.
- Resumen explicativo y JSON consolidado al finalizar cada módulo.
- Prácticas seguras antes de avanzar cuando el tema sea técnico.
- Temas difíciles marcados para repaso, sin frenar indefinidamente toda la ruta.
- No comprar el voucher CJCA hasta cumplir los criterios de preparación definidos más abajo.

Fuente oficial verificada el 2026-09-27: [Junior Cybersecurity Analyst Job Role Path](https://academy.hackthebox.com/path/preview/junior-cybersecurity-analyst).

## Qué incluye la suscripción Student

La suscripción Student es una suscripción de **acceso**. Mientras permanezca activa, permite entrar directamente a todos los módulos incluidos hasta Tier II y a varias rutas profesionales, entre ellas:

- Junior Cybersecurity Analyst.
- SOC Analyst.
- Penetration Tester.
- Web Penetration Tester.
- AI Red Teamer.

También incluye Pwnbox ilimitada y envío de créditos CPE.

La suscripción permite estudiar las rutas, pero **no incluye automáticamente los vouchers de los exámenes**. Completar una ruta tampoco otorga por sí solo la certificación profesional.

```text
Suscripción Student → acceso al material de estudio
Ruta al 100%        → preparación curricular completada
Voucher             → derecho a rendir el examen
Examen aprobado     → certificación profesional
```

Fuentes oficiales:

- [Suscripciones de HTB Academy](https://help.hackthebox.com/en/articles/13677074-academy-subscriptions)
- [Certificaciones de HTB Academy](https://academy.hackthebox.com/preview/certifications)
- [Cancelación y conservación del acceso](https://help.hackthebox.com/en/articles/13464739-canceling-an-academy-subscription)

## Etapa 1 — Fundamentos de Linux

**Estado actual:** completada el 2026-09-27. Se alcanzó la sección 30/30 de Linux Fundamentals. CyberStudy conserva 26 cuadernos recuperados: 24 completados, 2 marcados para repasar y 4 huecos documentales que no bloquean el avance.

### Objetivo

Completar las 30 secciones de **Linux Fundamentals** comprendiendo los conceptos, no solamente respondiendo las preguntas.

### Conocimientos que deben quedar firmes

- Navegación y estructura del sistema de archivos.
- Creación, lectura, edición y búsqueda de archivos.
- Redirecciones, pipes y descriptores.
- Permisos, propietarios, usuarios y grupos.
- Procesos, servicios y tareas programadas.
- Redes y servicios como SSH, HTTP, NFS y VPN.
- Administración de paquetes.
- Uso de `--help`, `man`, `apropos` y búsqueda filtrada con `grep`.
- Lectura e interpretación de instrucciones técnicas en inglés.

### Método de trabajo

Para cada módulo:

1. Leer el contenido de HTB.
2. Reproducir ejemplos seguros en una máquina propia o laboratorio autorizado.
3. Resolver las preguntas comprendiendo el procedimiento.
4. Registrar lo que más costó.
5. Crear un resumen explicativo con ejemplos y prácticas.
6. Guardar el Markdown y actualizar el JSON consolidado de CyberStudy.
7. Utilizar el Tutor IA para explicaciones, ejemplos, vistas visuales y examen guiado.

### Criterio para completar esta etapa

- Linux Fundamentals al 100%.
- Poder explicar los comandos principales con palabras propias.
- Poder investigar una opción desconocida mediante la ayuda integrada.
- Resolver ejercicios básicos sin copiar directamente una solución.

## Etapa 2 — Junior Cybersecurity Analyst

### Objetivo

Completar la ruta **Junior Cybersecurity Analyst Job Role Path**, actualmente compuesta por 20 módulos y orientada a construir una base equilibrada entre ataque y defensa.

Ruta oficial:

- [Junior Cybersecurity Analyst Job Role Path](https://academy.hackthebox.com/path/preview/junior-cybersecurity-analyst)

### Orden recomendado por bloques

El orden oficial de HTB debe utilizarse como guía principal. Para organizar el aprendizaje, los contenidos pueden pensarse en estos bloques:

#### Bloque A — Fundamentos generales

- Introducción a seguridad de la información.
- Fundamentos de redes.
- Introducción a networking.
- Linux Fundamentals.
- Windows Fundamentals.

#### Bloque B — Terminal y automatización

- Bash básico.
- Windows Command Line.
- PowerShell.
- Búsqueda, filtrado y automatización de tareas repetitivas.

#### Bloque C — Funcionamiento de aplicaciones y servicios

- Peticiones web.
- Introducción a aplicaciones web.
- Puertos, protocolos y servicios.
- Enumeración con Nmap.

#### Bloque D — Comprender la perspectiva del atacante

- Introducción al pentesting.
- Metodología de evaluación.
- Enumeración y footprinting.
- Explotación básica en entornos autorizados.

El objetivo defensivo no elimina la necesidad de entender ataques: un analista SOC necesita reconocer en tráfico y registros las acciones que realiza un adversario.

#### Bloque E — Defensa y análisis

- Análisis de tráfico de red.
- Gestión de incidentes.
- Windows Event Logs y Sysmon.
- Fundamentos de SIEM y Elastic.
- Introducción a Threat Hunting.

### Práctica paralela

- Guardar consultas útiles de SIEM.
- Crear pequeños análisis de archivos PCAP.
- Identificar eventos importantes de Windows.
- Practicar filtros con Wireshark, Elastic o herramientas incluidas en los módulos.
- Escribir un resumen de incidente de una página.
- Resolver laboratorios sin guardar ni publicar flags.

## Primera certificación — HTB CJCA

### Qué valida

La certificación **HTB Certified Junior Cybersecurity Associate** valida fundamentos prácticos ofensivos y defensivos:

- Identificación de vulnerabilidades comunes.
- Explotación y post-explotación básica en entornos autorizados.
- Monitoreo asistido por SIEM.
- Análisis de tráfico y registros.
- Detección de intrusiones.
- Comunicación y documentación de hallazgos.

### Cuándo comprar el voucher

No comprarlo al comenzar la ruta. Comprar únicamente cuando se cumplan estos criterios:

- [ ] Junior Cybersecurity Analyst completado al 100%.
- [ ] Skills Assessments repetidos sin copiar soluciones.
- [ ] Comandos principales comprendidos y documentados.
- [ ] Capacidad de investigar errores de forma autónoma.
- [ ] Al menos dos prácticas completas realizadas bajo tiempo controlado.
- [ ] Capacidad de redactar hallazgos claros en inglés.
- [ ] Tiempo disponible para rendir antes del vencimiento del voucher.

## Etapa 3 — SOC Analyst

### Objetivo

Completar **SOC Analyst Job Role Path**, ruta orientada al trabajo defensivo de nivel intermedio y preparación directa para CDSA.

HTB considera que los conocimientos de **SOC Analyst Prerequisites** son una base recomendable para tener éxito en esta ruta. La preparación realizada en Junior Cybersecurity Analyst cubre gran parte de esa transición.

Fuentes oficiales:

- [Presentación del SOC Analyst Job Role Path](https://academy.hackthebox.com/news/new-soc-analyst-job-role-path)
- [Presentación de HTB CDSA](https://academy.hackthebox.com/news/launching-htb-cdsa-certified-defensive-security-analyst)

### Áreas principales

- Operaciones de un Security Operations Center.
- Análisis de tráfico de red.
- Monitoreo y consultas en SIEM.
- Windows Event Logs y Sysmon.
- Elastic y Splunk.
- YARA y Sigma.
- IDS/IPS: Suricata, Snort y Zeek.
- Threat Hunting e inteligencia de amenazas.
- Análisis de malware.
- Introducción a DFIR.
- Gestión y respuesta a incidentes.
- Elaboración de informes profesionales.

### Criterio para completar esta etapa

- SOC Analyst al 100%.
- Poder reconstruir una línea temporal de un incidente.
- Relacionar eventos de distintos equipos y fuentes.
- Distinguir un indicador aislado de evidencia suficiente.
- Crear consultas y reglas defensivas propias.
- Elaborar un informe reproducible y accionable.

## Segunda certificación — HTB CDSA

### Qué valida

La certificación **HTB Certified Defensive Security Analyst** evalúa competencias intermedias de:

- Monitoreo de seguridad.
- Investigación y correlación de eventos.
- Detección de incidentes.
- Identificación del alcance y el impacto.
- Respuesta a incidentes.
- Redacción de un informe profesional.

### Preparación final

- [ ] SOC Analyst completado al 100%.
- [ ] Módulos difíciles repasados al menos una vez.
- [ ] Prácticas de tráfico, logs, SIEM y DFIR realizadas sin guía.
- [ ] Reglas Sigma/YARA propias creadas y explicadas.
- [ ] Dos investigaciones completas documentadas.
- [ ] Informe técnico escrito completamente en inglés.
- [ ] Entorno, conexión y tiempo disponibles para el examen.
- [ ] Voucher comprado únicamente cuando exista preparación real.

## Inglés técnico y elaboración de informes

El inglés no debe estudiarse separado del contenido técnico. Debe practicarse durante toda la ruta:

- Leer `--help` y páginas de manual.
- Mantener un glosario inglés → español.
- Escribir títulos y hallazgos breves en inglés.
- Describir evidencia sin realizar afirmaciones no demostradas.
- Diferenciar observación, interpretación, conclusión y recomendación.

Estructura básica de un hallazgo:

```text
Title       → nombre claro del hallazgo
Summary     → qué ocurrió
Evidence    → qué datos lo demuestran
Impact      → por qué importa
Timeline    → orden de los eventos
Conclusion  → conclusión respaldada por evidencia
Remediation → acción recomendada
```

## Portfolio defensivo

El portfolio debe demostrar capacidad sin publicar contenido protegido de HTB.

Proyectos recomendados:

1. Analizador sencillo de logs en Python.
2. Informe de análisis de un PCAP público.
3. Colección comentada de reglas Sigma.
4. Reglas YARA para muestras o patrones seguros.
5. Laboratorio personal con Windows, Sysmon y recolección de eventos.
6. Dashboard de eventos o alertas con datos propios/sintéticos.
7. Plantilla profesional de informe de incidente en inglés y español.

Nunca publicar:

- Flags de HTB.
- Credenciales de laboratorios.
- Archivos `.ovpn`.
- Soluciones de máquinas activas.
- Contenido protegido copiado de Academy.
- Claves API o archivos `.env`.

## Seguimiento general

### Fase 1 — Fundamentos

- [x] Linux Fundamentals completado (2026-09-27).
- [ ] Network Foundations / Introduction to Networking.
- [ ] Windows Fundamentals.
- [ ] Bash y PowerShell básicos.

### Fase 2 — Perfil inicial

- [ ] Junior Cybersecurity Analyst iniciado.
- [ ] Junior Cybersecurity Analyst completado.
- [ ] Repaso general y prácticas cronometradas.
- [ ] Decisión consciente sobre comprar CJCA.
- [ ] CJCA aprobado.

### Fase 3 — Especialización defensiva

- [ ] SOC Analyst iniciado.
- [ ] SOC Analyst completado.
- [ ] Investigaciones defensivas documentadas.
- [ ] Informes técnicos en inglés practicados.
- [ ] Decisión consciente sobre comprar CDSA.
- [ ] CDSA aprobado.

### Fase 4 — Inserción laboral

- [ ] Portfolio defensivo revisado.
- [ ] CV orientado a SOC Analyst L1.
- [ ] Perfil de LinkedIn actualizado.
- [ ] Preguntas técnicas de entrevistas practicadas.
- [ ] Postulaciones registradas y seguidas.

## Regla para modificar esta ruta

Esta hoja de ruta es una guía, no una carrera contra el reloj. Debe actualizarse cuando cambie el objetivo profesional, la oferta oficial de HTB o la disponibilidad real de tiempo y dinero.

No avanzar por presión de completar porcentajes. El criterio principal es poder aplicar y explicar lo aprendido sin depender de una solución copiada.
