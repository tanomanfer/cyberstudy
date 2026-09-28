# ESTADO_PROYECTO — CyberStudy

> Archivo canónico de estado. Complementa `README.md` y los documentos de `docs/`.

## Última actualización
2026-09-27 — Tano finalizó la sección 30/30, `Shortcuts`, y confirmó el cierre de `Linux Fundamentals`. Se creó el Markdown completo y JSON individual, se actualizó el índice, el respaldo consolidado y la hoja de ruta SOC/Blue Team. El curso padre quedó `Completado` al 100% en CyberStudy con fecha 2026-09-27. La cobertura documental real se conserva por separado: existen 26 cuadernos, 24 completados y 2 para repasar; faltan materiales verificables de las secciones 8, 9, 12 y 13, pero esos huecos no bloquean el avance. El módulo 30 explica autocompletado, movimiento, edición, historial, EOF, señales y control de trabajos, corrigiendo que `Ctrl+C` no garantiza matar un proceso, `Ctrl+Z` suspende y `Ctrl+D` entrega EOF. La ruta siguiente registrada es iniciar fundamentos de redes dentro de `Junior Cybersecurity Analyst Job Role Path`, antes de considerar el voucher CJCA. No se hizo commit ni push.

2026-09-27 — Tano completó la sección 29/30, `Solaris`, tratándola como repaso comparativo de prioridad menor. Se creó el Markdown completo y JSON individual, se actualizó el índice y se incorporó la sección al respaldo consolidado. El progreso confirmado pasó a 23 de 30 (77%). El apunte compara Linux y Solaris y desarrolla ZFS, SMF, Zones, DTrace, RBAC, IPS, NFS, `showrev`, `svcs`, `pkg`, `pfiles` y `truss`. Se corrigieron varias simplificaciones de HTB: ZFS y SMF cumplen funciones distintas; Linux no usa ZFS de manera general; el módulo mezcla gestión de paquetes de Solaris 10 y 11; `/etc/dfs/dfstab` ya no es el mecanismo vigente en Solaris 11.4; `-perm -4000` no demuestra un modelo de permisos diferente; y `strace` sí puede seguir hijos y señales. No se hizo commit ni push.

2026-09-27 — Tano completó la sección 28/30, `System Logs`. Se creó el Markdown completo y JSON individual, se actualizó el índice y se incorporó la sección al respaldo consolidado. El progreso confirmado pasó a 22 de 30 (73%). El apunte diferencia logs de kernel, sistema, autenticación, aplicaciones, acceso, auditoría y seguridad; desarrolla lectura de entradas, `journalctl`, `tail`, `grep`, archivos rotados, retención, persistencia y un método de investigación por línea de tiempo. Se adaptó el contenido de HTB a CachyOS/Arch: `journalctl` es la fuente principal y las rutas `/var/log/syslog`, `auth.log` y `kern.log` no son universales. También se corrigió que una línea de sudo demuestra autorización efectiva, no necesariamente pertenencia a un grupo específico, y se remarcaron integridad, centralización, sincronización horaria y protección de datos sensibles. No se hizo commit ni push.

2026-09-27 — Tano completó la sección 27/30, `Firewall Setup`, incluyendo los diez ejercicios propuestos. Se creó un laboratorio temporal con `unshare --net --mount-proc bash`, loopback y un servidor Python en TCP/8080 para no alterar el firewall real ni las redes Docker de PerlaNegra. Practicó reglas por puerto, IP y protocolo; diferencias entre `ACCEPT`, `DROP` y `REJECT`; inserción, orden, contadores, creación y referencia de `WEB_TRAFFIC`, eliminación y listado. Se documentaron los errores `REJECT` usado como cadena y `-dport` con un solo guion, junto con su razonamiento. Se creó el Markdown completo y JSON individual, se actualizó índice y respaldo consolidado; el progreso confirmado pasó a 21 de 30 (70%). También se aclaró la capa `iptables v1.8.13 (nf_tables)`, la sintaxis nativa de nftables y la traducción —no equivalencia directa— de respaldos. No se hizo commit ni push.

2026-09-27 — Tano completó la sección 26/30, `Linux Security`. Se creó el Markdown completo y su JSON individual, se actualizó el índice y se incorporó la sección al respaldo consolidado. El progreso confirmado pasó a 20 de 30 secciones (67%). El apunte desarrolla defensa en profundidad, superficie de ataque, actualizaciones correctas para Debian y CachyOS/Arch, mínimo privilegio, sudoers, protección de SSH, firewall, Fail2ban, auditoría, permisos world-writable, SUID/SGID, Cron, SELinux, AppArmor y herramientas como Lynis, Snort, rkhunter y chkrootkit. Se aclaró que TCP Wrappers es un mecanismo histórico no soportado por muchos servicios actuales y que no reemplaza un firewall. No se hizo commit ni push.

2026-09-27 — Tano completó la sección 25/30, `Remote Desktop Protocols in Linux`. Se creó el Markdown completo y su JSON individual, se actualizó el índice y se incorporó la sección al respaldo consolidado. El progreso confirmado pasó a 19 de 30 secciones (63%). El apunte diferencia X11, XDMCP, VNC y RDP; explica displays, puertos, cliente/servidor X y túneles SSH. También conserva la práctica real en PerlaNegra: Hyprland funciona sobre Wayland y mantiene compatibilidad X11 mediante `Xwayland :0 -rootless`, sin que eso implique por sí solo un listener TCP 6000. Se aclaró que VNC no debe considerarse automáticamente cifrado y que conviene restringirlo y protegerlo mediante SSH, VPN o TLS. No se hizo commit ni push.

2026-09-27 — Tano completó la sección 24/30, `Network Configuration`, y pidió marcarla explícitamente como tema a repasar. Se creó el Markdown completo y su JSON individual, se actualizó el índice y se incorporó la sección al respaldo consolidado. El progreso confirmado pasó a 18 de 30 secciones (60%). El apunte explica interfaces, IP, CIDR, gateway, DHCP, DNS, rutas, métricas, herramientas modernas, NetworkManager, diagnóstico por capas, sockets, monitoreo y controles DAC/MAC/RBAC/NAC. Se utilizó la red real observada de PerlaNegra para explicar cable, Wi-Fi, bridges y `veth` de Docker. También se corrigieron ejemplos antiguos o específicos de Ubuntu (`ifconfig`, `netstat`, `/etc/network/interfaces`, edición directa de `resolv.conf` y TCP Wrappers). No se hizo commit ni push.

2026-09-23 — Tano completó la sección 23/30, `Containerization`. Se creó el Markdown completo y su JSON individual, se actualizó el índice y se incorporó la sección al respaldo consolidado. El progreso confirmado pasó a 17 de 30 secciones (57%). El apunte pone especial énfasis en los comandos Docker y conserva la práctica real con `cyberstudy-nginx`: listado, imagen, `run`, publicación local `8082:80`, `curl`, logs y `exec`. También explica imágenes, contenedores, volúmenes, bind mounts, Dockerfile, Compose, redes, seguridad, LXC, Incus, VMs y DockerLabs. Se documentaron el error `docker ps image ls`, el permiso del socket Docker, los contenedores productivos existentes y la necesidad de aislar laboratorios vulnerables. No se hizo commit ni push.

2026-09-22 — Tano completó la sección 22/30, `File System Management`. Se creó el Markdown completo y su JSON individual, se actualizó el índice y se incorporó la sección al respaldo consolidado. El progreso confirmado pasó a 16 de 30 secciones (53%). El apunte desarrolla discos, particiones, sistemas de archivos, journaling, inodes, archivos regulares, directorios, enlaces simbólicos y duros, montaje y desmontaje, `/etc/fstab`, UUID, swap, zram e hibernación. Se documentó con datos observados de PerlaNegra que disponer de 32 GB de RAM reduce la necesidad de swap intensiva pero no la vuelve automáticamente inútil. Se evitaron operaciones destructivas y se priorizaron consultas y prácticas seguras en `/tmp`. No se hizo commit ni push.

2026-09-22 — Tano completó la sección 21/30, `Backup and Restore`. Se creó el Markdown completo y su JSON individual, se actualizó el índice y se incorporó la sección al respaldo consolidado. El progreso confirmado pasó a 15 de 30 secciones (50%). El apunte explica la utilidad personal de respaldar partes importantes de `/home`, diferencia copia, sincronización, versionado y restauración, desarrolla `rsync`, barra final, `--dry-run`, `--delete`, SSH, claves, Cron y regla 3-2-1. También conserva el error real de haber pegado `echo` y `rsync` sin separarlos, junto con el método para diagnosticarlo y el hábito de consultar `--help`. No se hizo commit ni push.

2026-09-22 — Tano completó la sección 20/30, `Working with Web Services`. Se creó un apunte autosuficiente y su JSON individual, se actualizó el índice y se incorporó la sección al respaldo consolidado. El progreso confirmado pasó a 14 de 30 secciones (47%). Se remarcó la dificultad principal: HTTP es el protocolo, mientras que Apache, Python, PHP y Node/npm son herramientas diferentes capaces de servir mediante HTTP. También se documentó un método para resolver consignas identificando acción, herramienta obligatoria, dirección, puerto y opción corta/larga, junto con prácticas de `curl`, `wget`, contenido estático/dinámico y consulta de `--help`. No se hizo commit ni push.

2026-09-22 — Se creó `docs/06-ruta-certificacion-soc-blue-team.md` como hoja de ruta profesional permanente. Define el recorrido Linux Fundamentals → Junior Cybersecurity Analyst → CJCA → SOC Analyst → CDSA, diferencia acceso de Student y voucher de examen, establece criterios concretos antes de comprar cada examen e incluye práctica, inglés técnico, portfolio y checklists. Se enlazó desde `README.md`. No se hizo commit ni push.

2026-09-20 — Se amplió el Tutor IA siguiendo el principio de NotebookLM de estudiar desde fuentes propias. Se agregaron cuatro accesos rápidos que preparan consultas basadas en el módulo abierto: explicación simple, ejemplo práctico seguro, vista visual mediante diagramas ASCII y examen guiado de una pregunta por turno. No se agregó otra API ni generación de imágenes; los recursos visuales técnicos se generan como texto estructurado para mantener precisión y bajo costo. La Edge Function actualizada quedó desplegada, el build pasó y se verificaron los controles con un navegador aislado. Pendiente para mañana: probar respuestas reales desde la sesión autenticada de Tano y luego decidir commit/push.

2026-09-20 — Se implementó la primera versión del Tutor IA con DeepSeek dentro del lector de módulos. El chat usa los apuntes del módulo abierto como contexto, conserva el historial únicamente en memoria mientras el lector está abierto, permite copiar o agregar respuestas al cuaderno mediante acción explícita y limita el uso a 15 preguntas diarias por usuario. La llamada se realiza mediante la Edge Function autenticada `tutor`; `DEEPSEEK_API_KEY` quedó guardada como secreto de Supabase y nunca se expone al frontend. Se aplicó la migración `20260920193000_tutor_daily_quota.sql` y se desplegó la función. Pendiente: prueba manual desde una sesión real y posterior commit/push únicamente con autorización de Tano.

2026-09-17 — Se agregó como tarea la reorganización de la carpeta local de estudio para reflejar la jerarquía curso → módulos. Propuesta: migrar de `estudio/modulos/linux-fundamentals/` a `estudio/cursos/<curso>/`, incorporar un índice por curso y mantener `estudio/cyberstudy-import.json` como consolidado general. La migración debe actualizar todas las referencias, preservar cada par `.md` + `.json` y comprobar los 14 cuadernos antes de retirar la estructura anterior. No se movieron archivos todavía; confirmar primero con Tano.

2026-09-17 — Se agregó al alcance de la próxima tarea una reorganización del Cuaderno para múltiples cursos. Al entrar, deberá mostrar primero los cursos disponibles (por ejemplo, Linux Fundamentals y Redes); al elegir uno, se desplegarán solamente sus módulos ordenados. Debe permitir volver/cambiar de curso, conservar la búsqueda global indicando el curso de cada resultado y recordar el último curso abierto. Antes de implementarlo, presentar a Tano una propuesta visual y confirmar tarjetas expandibles vs selector compacto.

2026-09-17 — **Registro histórico, resuelto el 2026-09-20:** se acordó integrar un Tutor IA con DeepSeek dentro de los módulos usando una Supabase Edge Function, clave protegida, contexto limitado y restricciones contra flags o soluciones directas de HTB.

2026-09-17 — Se comprobó un problema del flujo de importación: el botón **Importar** reemplaza todo el estado local en lugar de combinar registros. Al importar el JSON individual de la sección 17 quedó visible un solo cuaderno. Tano recuperó correctamente los 14 cuadernos importando `estudio/cyberstudy-import.json`. Se corrigieron las instrucciones: hasta modificar el código, importar siempre el consolidado; los JSON individuales quedan únicamente como respaldo recuperable.

2026-09-17 — Tano completó la sección 18/30, `Task Scheduling`. Se creó el apunte canónico y su JSON individual importable, se actualizó el índice y se incorporó la sección al respaldo consolidado. El progreso confirmado pasó a 12 de 30 secciones (40%). Se documentó especialmente la dificultad para localizar e inspeccionar `dconf.service`: distinguir servicios del sistema y del usuario, interpretar una propiedad vacía o un bus de usuario no disponible, buscar el archivo con `find` y examinar su propiedad con `grep`.

2026-09-16 — Se amplió `estudio/README_IA.md` con el método exacto de trabajo durante y después de cada módulo, una plantilla obligatoria de resumen y una lista de comprobación. Esto deja documentado cómo acompañar los ejercicios, registrar dificultades, enseñar lectura técnica en inglés y mantener sincronizados Markdown, índice y JSON.

2026-09-16 — Se agregó una regla de identificación obligatoria: todo resumen debe comenzar dentro de su propio contenido con el número y el nombre oficial del módulo (`# N de 30 — Nombre`). Se corrigieron las 12 entradas actuales del JSON para que ningún apunte quede sin contexto si se copia o recupera por separado.

2026-09-16 — Se corrigió el estándar de los resúmenes: los apuntes dentro de CyberStudy deben ser material autosuficiente para repasar, con explicación, ejemplos, diferencias, precauciones, vocabulario técnico y práctica. Se amplió la sección 15 tanto en Markdown como en `cyberstudy-import.json`. `estudio/README_IA.md` ahora prohíbe reducir `notes` a una ficha breve.

2026-09-16 — Tano completó la sección 15/30, `User Management`. Se guardó el resumen en `estudio/modulos/linux-fundamentals/15-user-management.md`, se actualizó el índice y se incorporó al JSON importable. Se destacó como punto a reforzar la opción de `su` para ejecutar un único comando como otro usuario y el hábito de investigar con `comando --help`, leyendo e interpretando las descripciones técnicas en inglés. El progreso registrado pasó a 11 de 30 secciones confirmadas (37%).

2026-09-16 — Se creó `estudio/` como fuente canónica y permanente para la continuidad entre Codex local y Code Cloud. Incluye instrucciones para IA, índice, un Markdown por sección recuperada y `estudio/cyberstudy-import.json` listo para importar. `AGENTS.md` ahora obliga a actualizar Markdown, índice y JSON cada vez que termina un módulo; un resumen dejado solo en el chat ya no cuenta como trabajo terminado.

2026-09-16 — Se comprobó que el respaldo sincronizado contenía solo el curso padre `Linux Fundamentals` al 25%, sin módulos hijos. Se revisaron tareas anteriores de Codex y se recuperaron resúmenes verificables de las secciones 1–7, 10, 11 y 14; también se agregó la sección 16 como `Repasar`, porque existe contenido de gestión de paquetes pero no confirmación de que se haya completado. Se generó `estudio/cyberstudy-import.json`, válido para importar desde la aplicación, sin modificar el respaldo original de `respaldo/`. Las secciones 8, 9, 12, 13 y 15 no se reconstruyeron porque no se encontró contenido suficiente para hacerlo sin inventar datos.

2026-09-16 — Tano hizo el login+sync manual pendiente: creó la cuenta (email+contraseña) desde `http://localhost:4173`, confirmó el mail y el botón "Nube" pasó a mostrar "Sincronizado" (subida a Supabase completada). Después inició sesión con la misma cuenta en `https://cyberstudy-iota.vercel.app` para bajar los datos ahí. **El pendiente crítico de la entrada anterior (2026-09-15) queda resuelto** — Supabase ya no está vacío y la web online debería reflejar los mismos datos que local. Sin verificar todavía: que los módulos de HTB cargados esos días aparezcan completos en la web online (en la captura de la sync se vio "Cursos: 1", "Cuaderno: 0" — confirmar con Tano si eso coincide con lo que tenía cargado antes de dar el pendiente por cerrado del todo).

2026-09-15 — Claude Code conectó Supabase (proyecto real, migraciones aplicadas) y desplegó la app a Vercel con deploy automático por `git push` (ver "Estado observado"). **Pendiente crítico:** los datos de estudio de Tano (incluidos módulos de HTB Academy cargados en los últimos días) siguen únicamente en el `localStorage` de su navegador en `http://localhost:4173` — todavía NO se subieron a Supabase ni aparecen en la web online. No se perdió nada, pero falta el paso manual de login+sync (ver "Pendiente inmediato").

2026-09-13 — Se inicializó git y se publicó el repositorio en GitHub (ver "Estado observado"). Antes: Codex agregó y verificó el lector amplio de apuntes, documentó su funcionamiento y corrigió inconsistencias entre los documentos del proyecto.

## Resumen rápido para retomar
- App personal de seguimiento de estudio para la reconversión de Fernando (Tano) a ciberseguridad/IT (perfil objetivo: SOC Analyst / Blue Team / Linux / Networking).
- Foco principal: tracker de HTB Academy (cursos padre + módulos hijos numerados), sesiones de estudio genéricas (con timer en vivo o carga manual) y dashboard con racha/objetivo diario.
- Exportación de notas a Markdown con frontmatter compatible con Obsidian.
- Cuaderno con lector amplio por módulo, búsqueda interna, contador y resaltado de coincidencias.
- Versión actual: `0.2.0`.

## Cambio funcional 2026-09-27 — Jerarquía de estudio

- Se agregó el nivel **Certificación / ruta** sobre los cursos existentes.
- La jerarquía visible queda: certificación → curso → sección/cuaderno.
- Se creó la ruta **Junior Cybersecurity Analyst (CJCA)** y Linux Fundamentals quedó en la posición oficial 4, completado al 100%.
- Rutas muestra el panorama general y sus cursos; el contenido profundo se consulta en Cuaderno.
- Cuaderno ahora agrupa los 26 apuntes por curso y ordena sus secciones por número.
- El almacenamiento pasa de v2 a v3 con migración automática y sin borrar los datos anteriores.
- `estudio/cyberstudy-import.json` quedó actualizado al formato v3.

## Cómo se pidió trabajar (de `docs/prompt-codex-cyberstudy.md`)
- Ante cualquier decisión técnica/producto donde exista una alternativa mejor, **preguntar primero**, no asumir.
- Priorizar velocidad para tener algo usable ya, no arquitectura perfecta.
- Explicar decisiones técnicas en español simple (Tano está aprendiendo).
- **Documentación obligatoria desde el primer commit** en `docs/` y `README.md` para que cualquier otra IA o persona retome el proyecto sin reexplicación — regla fija para todos los proyectos de Tano, no solo este. Este archivo (`ESTADO_PROYECTO.md`) es parte de esa regla y no existía hasta ahora.
- No automatizar scraping de HTB Academy ni almacenar/publicar flags o soluciones protegidas bajo ninguna circunstancia.
- Seguridad no negociable: nada de secretos en el repo (`.env.example` versionado, `.env*` real en `.gitignore`), validación de entradas, Markdown sin inyección de HTML, `service_role` de Supabase nunca en el frontend.

## Stack real (distinto de lo que pedía el documento maestro)
- El documento maestro (`docs/01-documento-maestro-cyberstudy.md`) especifica TanStack Start/Router + shadcn/ui.
- Lo que realmente se construyó: **React 19 + Vite + TypeScript puro**, sin shadcn ni TanStack — ver `docs/02-arquitectura-y-decisiones.md`, Decisión 003. Motivo documentado: reducir piezas para tener algo funcionando el mismo día. Queda pendiente evaluar TanStack si en algún momento se justifican rutas protegidas/operaciones de servidor.
- Backend opcional: Supabase (Postgres + Auth + RLS), con 2 migraciones en `supabase/migrations/` (`20260915195900_initial_schema.sql`, `20260915195901_app_state_sync.sql` — renombradas el 2026-09-15 al formato timestamp que exige la CLI de Supabase, mismo contenido que las `0001`/`0002` originales).

## Estado observado
- **Repositorio git inicializado y publicado**: rama `main`, primer commit `6ee4f40` (2026-09-13), remoto en `https://github.com/tanomanfer/cyberstudy` (privado). Codex había reportado que no podía correr `git init` (carpeta `.git` vacía montada) y que la sesión de `gh` estaba vencida; ninguna de las dos cosas era real al verificarlo desde otra sesión — no había bloqueo ni sesión vencida, y se completó sin inconvenientes. Se excluyeron del commit archivos de build (`vite.config.js`, `vite.config.d.ts`, `*.tsbuildinfo`), agregados ahora a `.gitignore`.
- Persistencia principal: `localStorage` del navegador (clave actual `cyberstudy:data:v2`; v1 se conserva como origen de migración, con copia secundaria de recuperación). **Sigue siendo la única fuente real de los datos de estudio de Tano** (los cargados estos últimos días, incluyendo módulos de HTB Academy) — están en `http://localhost:4173`, en el navegador donde se usó, y no se tocaron.
- **Supabase ahora SÍ está conectado** (2026-09-15): proyecto real creado (`nogebwczmxtcafmggelf`, cuenta `nicolettifernando02@gmail.com`), migraciones aplicadas, credenciales en `.env.local` (local, gitignoreado) y como variables de entorno en Vercel (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, tipo "config" porque la anon key es pública por diseño). La sincronización funciona por login (email+contraseña) vía el botón "Nube" de la UI — sin login, todo sigue siendo local.
- **Login+sync ya se hizo** (2026-09-16): Tano creó la cuenta desde `http://localhost:4173`, confirmó el mail, y el botón "Nube" mostró "Sincronizado" (subida a Supabase OK). Supabase ya tiene datos reales, no está vacío.
- **App desplegada en Vercel** (2026-09-15): producción en `https://cyberstudy-iota.vercel.app`, proyecto `cyberstudy` en la cuenta `tanomanfer-4974`. Deploy automático activado: cada `git push` a `main` dispara un build y deploy solos (repo GitHub conectado vía GitHub App, con permisos ajustados para incluir `tanomanfer/cyberstudy`). Verificado funcionando con un push de prueba el mismo día.
- **La web online ya se sincronizó** (2026-09-16): Tano inició sesión con la misma cuenta en `https://cyberstudy-iota.vercel.app` para bajar los datos. Pendiente de doble-chequeo (no verificado por el agente): que todos los módulos de HTB de los últimos días efectivamente aparezcan ahí — en la captura de la sync local se vio solo "Cursos: 1, Cuaderno: 0, Dudas: 0, Sesiones: 0", que podría ser normal o podría indicar que falta algo. Confirmar con Tano.
- Carpeta `ovpn/` con archivos `.ovpn` (configs de VPN de HTB Academy) — correctamente ignorada en `.gitignore` (`ovpn/`, `*.ovpn`), así que no hay riesgo de filtrarlos si se inicializa git.
- El lector Markdown muestra un subconjunto seguro y suficiente para estudiar: encabezados, párrafos, listas numeradas/no numeradas y bloques de código. Se construye con componentes React y no inyecta HTML.

## Documentación existente y su fiabilidad
- `docs/01-documento-maestro-cyberstudy.md` — visión y roadmap original. La propuesta de stack es histórica; el stack real está documentado en Decisión 003.
- `docs/02-arquitectura-y-decisiones.md` — el más confiable; documenta las decisiones reales tomadas y por qué se desvió del plan original.
- `docs/03-guia-de-uso.md` — uso cotidiano.
- `docs/04-proximos-pasos.md` — orden de trabajo pendiente, diferenciando lo implementado de lo activado y probado.
- `docs/05-configurar-supabase.md` — guía correcta para activar Supabase cuando se decida usarlo.
- `README.md` — resumen operativo actualizado; aclara que Supabase está implementado pero todavía no configurado ni probado.

## Pendiente inmediato
- Reorganizar la carpeta local de estudio como `estudio/cursos/<curso>/`, con índice por curso y pares `.md` + `.json`, después de confirmar la estructura y con una migración verificada que preserve los 14 cuadernos actuales.
- Reorganizar **Cuaderno** con navegación curso → módulos, pensando en futuros cursos como Redes. Confirmar primero con Tano el diseño visual (tarjetas expandibles o selector compacto).
- **Tutor IA implementado (2026-09-20):** falta probarlo manualmente con la sesión real de Tano y, después de su aprobación, publicar el frontend mediante el flujo GitHub/Vercel.
- Corregir el importador para que pueda combinar respaldos por identificador sin borrar módulos existentes. Mientras tanto, importar únicamente `estudio/cyberstudy-import.json`.
- **Ya resuelto (2026-09-16):** el login+sync manual que estaba pendiente (subir de local a Supabase, bajar en la web online) se hizo. Falta solo confirmar con Tano que los módulos de HTB de estos días aparecen completos en `https://cyberstudy-iota.vercel.app` — si todo coincide, ya puede usar solo la web online y dejar de depender de `localhost:4173`.
- Completar el soporte Markdown si se necesitan tablas, enlaces u otros elementos; los tests automáticos de racha/fechas/importación siguen pendientes.
- Fase 2 completa (diario, repaso espaciado, base de conocimientos) no empezada.

## Reglas de trabajo
- Español argentino simple; Tano está aprendiendo, explicar los cambios técnicos sin tecnicismos innecesarios.
- Una tarea a la vez, esperar confirmación antes de encadenar la siguiente.
- No hacer `git commit` ni `git push` sin permiso explícito de Fernando (aplica también a un futuro `git init`).
- No automatizar scraping de HTB Academy ni almacenar contenido protegido (flags, soluciones) bajo ninguna circunstancia.
- Cualquier decisión técnica/producto con alternativas: preguntar antes de construir, no asumir.
- Registrar acá (no solo en `docs/`) decisiones, cambios de estado real y bloqueos, para que Codex, Claude Code o Code Cloud puedan retomar sin repreguntar.

## Último cambio funcional verificado

**Fecha:** 2026-09-13

- Se separó la lectura de la edición de módulos.
- **Abrir** desde Cuaderno, Dudas, Cursos o resultados globales muestra un lector ancho.
- El lector organiza `Qué aprendí`, `Apuntes completos` y `Dudas para practicar`.
- Incluye búsqueda dentro del módulo, cantidad de coincidencias y resaltado visual.
- Desde el lector se puede pasar al formulario de edición o descargar el `.md`.
- Verificación realizada en navegador con un módulo de prueba: renderizado de encabezados, listas y bloque Bash; búsqueda de `grep` con 2 coincidencias; transición a edición; cero errores o advertencias de consola.
- `npm run build` completó correctamente.
