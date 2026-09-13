# Guía de uso

## Inicio recomendado de una jornada

1. Abrí CyberStudy.
2. En **Módulos**, registrá el módulo de HTB Academy que estés cursando.
3. Desde la barra inferior, iniciá el timer.
4. Al terminar, elegí **Finalizar y guardar**.
5. Completá tema, aprendizajes y dificultades. La duración ya estará cargada.
6. Ajustá el progreso del módulo desde su tarjeta.
7. Descargá un **Respaldo** al finalizar la jornada, especialmente si todavía no conectaste Supabase.

## Sesión manual

Usala cuando ya estudiaste y no activaste el timer. El dato mínimo es tema, fecha y duración. Registrar “qué aprendí” hace que el historial sea mucho más útil para futuros repasos.

## Racha y congelamiento

Un día tiene actividad si contiene al menos una sesión, sin exigir una duración mínima. **Congelar hoy** marca una ausencia justificada y mantiene la continuidad. No agrega minutos estudiados.

## Markdown y Obsidian

En cada módulo o sesión se puede elegir **Exportar a Obsidian**. El navegador descarga un `.md` con frontmatter YAML y contenido Markdown plano. Después se mueve manualmente al vault deseado.

## Leer y buscar apuntes

1. Entrá en **Cuaderno** para ver todos los módulos guardados.
2. Pulsá **Abrir** en un módulo. Se mostrará una vista amplia pensada para leer, no para editar.
3. Usá **Buscar dentro de este módulo** para encontrar un comando o concepto. La aplicación indica la cantidad de coincidencias y las resalta.
4. Desde el lector podés elegir **Editar** o **Descargar .md**.

El buscador superior sigue siendo global: busca en todos los cursos, módulos, apuntes, aprendizajes, dudas y sesiones.

## Editar y respaldar

Cada módulo y sesión conserva una acción **Editar**. La eliminación pide confirmación. **Respaldo** descarga un JSON con toda la aplicación; **Importar** valida y restaura ese archivo.

El temporizador se recupera si la página se recarga accidentalmente.

## Privacidad y sincronización

Sin una cuenta conectada, los datos no salen del navegador. Con Supabase configurado y una cuenta iniciada, los registros locales se combinan con la copia privada de esa cuenta y se sincronizan automáticamente. Las políticas RLS impiden que otra cuenta lea esos datos.

Usá siempre `http://localhost:4173`; `127.0.0.1` y una IP local se consideran sitios diferentes.
