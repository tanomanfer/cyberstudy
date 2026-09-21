# Continuidad de estudio — instrucciones para IA

Esta carpeta es la fuente canónica del progreso de estudio de Tano. Su objetivo es que Codex local, Code Cloud u otra IA puedan retomar CyberStudy sin depender del historial de una conversación ni del `localStorage` de un navegador.

## Archivos canónicos

- `INDICE.md`: estado humano, orden de módulos y pendientes.
- `modulos/`: un archivo Markdown por sección estudiada, y su JSON individual (ver regla principal abajo).
- `cyberstudy-import.json`: respaldo completo (todos los módulos y secciones juntos) listo para importar desde el botón **Importar** de CyberStudy.
- `../respaldo/`: respaldos originales descargados desde la aplicación. Nunca se sobrescriben.

## Qué se importa en la app y qué queda como respaldo

Al cerrar un módulo se generan tres archivos. Con el comportamiento actual de CyberStudy, el botón **Importar reemplaza el estado completo; no combina el archivo nuevo con los datos existentes**. Por eso:

- **Se importa en la app:** `cyberstudy-import.json`, el respaldo consolidado que contiene todos los módulos y secciones. Después de importarlo, la sincronización lo sube a la nube.
- **Queda como respaldo recuperable:** el `.md` del módulo y su `.json` individual hermano. El JSON individual permite reconstruir una sección si se daña el consolidado, pero **no debe importarse directamente en la versión actual**, porque dejaría visible solamente esa sección.

Siempre que se cierre un módulo, informar a Tano que debe importar `estudio/cyberstudy-import.json`. Los JSON individuales seguirán generándose como copias de recuperación hasta que el importador de la aplicación implemente una combinación segura por identificador.

## Regla principal: un JSON por módulo, dentro de la carpeta del curso

Esta es la regla más importante de esta carpeta y no puede saltearse. El objetivo es que cada módulo se pueda recuperar de forma individual aunque se pierda o corrompa `cyberstudy-import.json`.

Por cada sección/módulo trabajado, además del `.md`, debe existir un `.json` **hermano**, mismo nombre, misma carpeta:

```
modulos/<curso>/<numero>-<nombre>.md
modulos/<curso>/<numero>-<nombre>.json
```

Ejemplo real: `modulos/linux-fundamentals/16-package-management.md` y `modulos/linux-fundamentals/16-package-management.json`.

### Formato del JSON individual

Cada JSON de módulo debe tener la misma estructura que espera el importador de CyberStudy, pero recortada a un solo módulo y una sola sección, para que sea importable por sí solo si hiciera falta:

```json
{
  "version": 2,
  "dailyGoalMinutes": 120,
  "modules": [ { /* el objeto completo del módulo/curso, igual que en cyberstudy-import.json */ } ],
  "sections": [ { /* el objeto completo de esta sección, igual que en cyberstudy-import.json */ } ],
  "sessions": [],
  "frozenDays": []
}
```

### Cuándo generarlo o actualizarlo

Cada vez que se crea o actualiza un `.md` de módulo, se debe generar/actualizar en el mismo paso su `.json` hermano con el contenido equivalente, y también reflejarlo en `cyberstudy-import.json` (que sigue siendo el respaldo consolidado de todo el curso). Los tres deben quedar sincronizados: `.md`, `.json` individual y `cyberstudy-import.json`. Validar cada `.json` con `jq empty archivo.json` antes de dar la tarea por terminada.

No alcanza con actualizar solamente `cyberstudy-import.json`: si ese archivo se pierde, corrompe o se sobrescribe mal, cada módulo debe poder recuperarse solo con su propio par `.md` + `.json`.

## Procedimiento obligatorio al terminar un módulo

Cuando Tano pida el resumen de un módulo, la IA debe realizar todo esto en la misma tarea:

1. Crear o actualizar `modulos/<curso>/<numero>-<nombre>.md`.
2. Incluir título, estado, progreso, resumen, comandos, qué aprendí, dificultades y dudas.
3. Crear o actualizar el JSON hermano `modulos/<curso>/<numero>-<nombre>.json` (ver "Regla principal" arriba).
4. Actualizar `INDICE.md`.
5. Incorporar la misma información en `cyberstudy-import.json`, conservando los datos existentes.
6. Validar todos los JSON tocados con `jq empty` y ejecutar `npm run build` si se modificó código.
7. Informar a Tano que debe importar `estudio/cyberstudy-import.json`; no indicar el JSON individual mientras el importador siga reemplazando todo el estado.

No alcanza con entregar el resumen solamente en el chat. El trabajo no está terminado hasta que el `.md`, el JSON individual, el índice y el `cyberstudy-import.json` estén actualizados.

## Calidad mínima obligatoria del resumen

El resumen debe servir para estudiar nuevamente el módulo sin volver a HTB ni buscar explicaciones en otra página. No puede ser una lista breve de temas vistos.

Cada Markdown y el campo `notes` correspondiente del JSON deben contener:

1. Como primera línea, número y nombre oficial: `# <número> de <total> — <nombre del módulo>`.
2. Explicación en español simple de la idea central.
3. Diferencias entre comandos o conceptos parecidos.
4. Sintaxis y opciones importantes explicadas, no solamente enumeradas.
5. Ejemplos prácticos con comandos y el resultado esperado.
6. Advertencias sobre errores comunes o comandos riesgosos.
7. Vocabulario técnico en inglés relevante para aprender a leer `man` y `--help`.
8. Una sección “Qué aprendí”.
9. Una sección “Para repasar o practicar”.

El JSON importable debe llevar la explicación completa en `notes`. No debe reducirse a una ficha de dos o tres oraciones. `learnings` funciona como síntesis y `questions` conserva las dificultades, pero ninguno reemplaza los apuntes completos.

El nombre no puede depender solamente del título de la tarjeta o del nombre del archivo: debe estar escrito dentro del cuerpo de los apuntes. Así, si el texto se copia, exporta o recupera por separado, siempre se sabe a qué módulo pertenece.

## Cómo trabajar durante cada módulo

### Mientras Tano estudia

- Explicar en español argentino simple, sin convertir la respuesta en una definición superficial.
- Acompañarlo para que razone los ejercicios; no adelantar flags ni soluciones protegidas de HTB.
- Registrar mentalmente los conceptos que le cuestan, las preguntas que hace, los errores y las comparaciones que necesita.
- Cuando aparezcan comandos parecidos, explicar la diferencia con ejemplos. Por ejemplo: `useradd` crea y `usermod` modifica.
- Fomentar el uso de `man`, `--help`, `apropos` y filtros con `grep`.
- Ayudarlo a leer la documentación técnica en inglés: identificar verbos, objetos y palabras clave, sin traducir ciegamente todo.
- No marcar ni guardar el módulo como completado hasta que Tano diga claramente que terminó.

### Cuando Tano confirma que terminó

1. Preguntar el nombre o número solamente si todavía no está confirmado.
2. Recuperar de la conversación qué se explicó, qué comandos se usaron y qué parte le costó.
3. Escribir un apunte completo siguiendo la plantilla obligatoria de abajo.
4. Guardar el mismo contenido completo en el campo `notes` del JSON.
5. Usar `learnings` para una síntesis breve en primera persona.
6. Usar `questions` para los temas que debe repasar; no esconder las dificultades dentro del resumen general.
7. Actualizar el progreso del curso según la cantidad de secciones realmente confirmadas.
8. Validar que el número, nombre y estado coincidan en el Markdown, el índice y el JSON.
9. Entregar a Tano el enlace al JSON listo para importar.

## Plantilla obligatoria

````md
# N de TOTAL — Nombre oficial del módulo

**Estado:** Completado o Repasar
**Curso:** Nombre del curso
**Plataforma:** Hack The Box Academy

## Idea principal

Explicación clara de para qué sirve el tema y por qué es importante.

## Conceptos importantes

Explicación desarrollada de cada concepto, no una lista sin contexto.

## Comandos y opciones

```bash
comando --opcion ejemplo
```

Explicar qué hace el comando, cada opción importante y cuándo utilizarlo.

## Diferencias que hay que recordar

Comparar comandos o conceptos que puedan confundirse.

## Ejemplos prácticos

Incluir ejemplos seguros, resultado esperado y razonamiento.

## Errores y precauciones

Explicar errores frecuentes, efectos destructivos o usos que requieren cuidado.

## Inglés técnico del módulo

- `technical term` → significado en español y contexto.

## Lo que más costó

Explicar la dificultad concreta que manifestó Tano y cómo razonarla la próxima vez.

## Qué aprendí

Síntesis en primera persona.

## Para repasar o practicar

Lista concreta de conocimientos o ejercicios pendientes.
````

La plantilla puede adaptarse cuando una sección no contiene comandos, pero nunca deben faltar el nombre del módulo, la explicación desarrollada, los ejemplos, lo que costó, qué aprendí y qué conviene repasar.

## Comprobación antes de terminar

- [ ] El título interno incluye número y nombre oficial.
- [ ] El resumen permite estudiar sin consultar otra fuente.
- [ ] Los comandos tienen explicación y ejemplos.
- [ ] Se conservaron las dificultades reales de Tano.
- [ ] Markdown, índice y JSON contienen el mismo módulo y estado.
- [ ] El JSON conserva todos los módulos anteriores y pasa la validación con `jq`.
- [ ] No se incluyeron flags, soluciones protegidas ni secretos.

## Reglas de contenido

- No almacenar flags, soluciones protegidas, contraseñas, tokens ni archivos VPN.
- No marcar un módulo como completado sin confirmación de Tano o evidencia clara de HTB.
- Si existe material pero no está confirmada su finalización, usar estado `Repasar`.
- No inventar el contenido de secciones faltantes.
- Mantener los nombres y números oficiales del curso cuando estén confirmados.
- El JSON debe conservar `version: 2` y las colecciones `modules`, `sections`, `sessions` y `frozenDays`.

## Cómo retomar

1. Leer este archivo.
2. Leer `INDICE.md`.
3. Abrir el último Markdown registrado.
4. Consultar `cyberstudy-import.json` para comprobar que el cuaderno también existe en el respaldo importable.
5. Continuar solamente con el siguiente módulo que Tano indique.
