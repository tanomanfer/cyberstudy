# Próximos pasos

## Tutor IA — implementado el 2026-09-20

Se implementó un **Tutor IA con DeepSeek** dentro de CyberStudy. Tano confirmó que ya dispone de créditos en la API.

Alcance inicial acordado:

- Panel de chat dentro del módulo que se está estudiando.
- Enviar como contexto los apuntes del módulo abierto.
- Explicar comandos, opciones, errores y ejemplos en español simple.
- No ejecutar comandos ni entregar flags o soluciones directas de HTB.
- Usar `deepseek-flash` con límites de contexto y respuesta para controlar el gasto.
- Llamar a DeepSeek desde una Supabase Edge Function; la clave `DEEPSEEK_API_KEY` debe guardarse como secreto de Supabase y nunca exponerse en React, variables `VITE_*`, `localStorage` o Git.
- Permitir copiar respuestas útiles a las notas solamente mediante una acción explícita del usuario.

Decisiones confirmadas: historial temporal solamente en memoria, máximo de 15 preguntas diarias por usuario y respuestas limitadas en el servidor. Se agregó `supabase/functions/tutor/index.ts`, la migración de cuota diaria y el cliente `src/lib/tutor.ts`. La clave se guardó como secreto de Supabase. Pendiente: prueba manual desde la sesión real y publicación del frontend después de aprobación explícita de Tano.

Extensión inspirada en NotebookLM ya implementada:

- **Explicación simple:** prepara una explicación paso a paso con analogía.
- **Ejemplo práctico:** propone una práctica segura basada en el módulo.
- **Vista visual:** solicita un diagrama ASCII técnico y su explicación.
- **Examen guiado:** realiza una pregunta por turno, espera la respuesta y corrige antes de avanzar.

Los accesos rápidos solamente preparan el texto de la consulta; el usuario debe confirmar con **Preguntar** para consumir una consulta. La función `tutor` fue desplegada nuevamente con las instrucciones actualizadas. El build productivo pasó correctamente. La prueba del navegador confirmó que el panel aparece debajo de la barra del módulo y que **Vista visual** completa la consulta esperada.

Pendiente para la próxima sesión:

1. Probar una respuesta real desde la cuenta de Tano iniciada en CyberStudy.
2. Revisar claridad, longitud y gasto de una consulta normal, una visual y una de examen.
3. Ajustar el prompt o el diseño si la experiencia real lo necesita.
4. Con autorización explícita, hacer commit y push para activar el despliegue automático de Vercel.

### Reorganización del Cuaderno

Incluir en la misma próxima etapa una navegación jerárquica del Cuaderno, preparada para varios cursos:

1. Al entrar a **Cuaderno**, mostrar primero los cursos disponibles como tarjetas o un selector desplegable (por ejemplo, `Linux Fundamentals`, `Redes`, etc.).
2. Al seleccionar un curso, desplegar únicamente sus módulos/cuadernos, ordenados por número.
3. Permitir volver fácilmente a la lista general de cursos y cambiar de curso sin mezclar módulos.
4. Mantener la búsqueda global, pero indicar claramente a qué curso pertenece cada resultado.
5. Recordar el último curso abierto para que el uso cotidiano siga siendo rápido.

Antes de construir, mostrar a Tano una propuesta visual simple y confirmar si prefiere tarjetas de cursos que se expanden o un selector desplegable compacto. La estructura debe seguir funcionando cuando existan muchos cursos y muchos módulos.

### Reorganización de la carpeta local de estudio

Ordenar también los archivos del proyecto con la misma jerarquía curso → módulos. Propuesta inicial:

```text
estudio/
├── README_IA.md
├── INDICE.md
├── cyberstudy-import.json
└── cursos/
    ├── linux-fundamentals/
    │   ├── INDICE.md
    │   ├── 01-linux-structure.md
    │   ├── 01-linux-structure.json
    │   └── 18-task-scheduling.md/.json
    └── redes/
        ├── INDICE.md
        └── ...
```

La carpeta actual `estudio/modulos/linux-fundamentals/` no debe moverse de forma aislada. La migración debe realizarse en un solo cambio controlado:

1. Crear `estudio/cursos/<curso>/` y un índice por curso.
2. Mover sin perder los pares `.md` + `.json` existentes.
3. Actualizar `estudio/INDICE.md`, `estudio/README_IA.md`, `AGENTS.md` y cualquier referencia documental.
4. Mantener `cyberstudy-import.json` como respaldo consolidado de todos los cursos.
5. Validar todos los JSON y comprobar que siguen existiendo los 14 cuadernos actuales.
6. No eliminar la estructura anterior hasta verificar la migración y revisar el diff.

Confirmar con Tano esta estructura antes de mover archivos. No mezclar esta reorganización con la carga de un módulo nuevo para reducir el riesgo de pérdida.

## Corrección pendiente del importador

El importador actual reemplaza todos los datos (`setData(await importData(file))`) en vez de combinarlos. Hasta corregirlo, los JSON individuales son solo respaldos de recuperación y debe importarse siempre `estudio/cyberstudy-import.json`. Evaluar agregar una importación combinada por identificador con vista previa y confirmación.

Orden recomendado después de validar el uso cotidiano del MVP:

1. Aplicar las migraciones y configurar las credenciales del proyecto Supabase de destino.
2. Verificar registro, inicio de sesión y sincronización desde dos navegadores reales.
3. Agregar Google OAuth si resulta más cómodo que email/contraseña.
4. Incorporar indicadores de última sincronización y reintentos sin conexión.
5. Ampliar el lector Markdown únicamente si hacen falta enlaces, tablas u otros elementos no cubiertos.
6. Tests automáticos de cálculos de racha, fechas, importación, lector y sincronización.
7. Diario, repaso espaciado y base de conocimientos (Fase 2).

Ya implementado y probado localmente: respaldo/importación JSON, edición/eliminación, recuperación del temporizador, jerarquía curso/módulo, búsqueda global y lector de apuntes con búsqueda interna.

Implementado y configurado contra el proyecto real: autenticación por email, sincronización multi-dispositivo con Supabase/RLS, cuota diaria del tutor, secreto de DeepSeek y Edge Function `tutor`.

GitHub y Vercel ya están conectados. No hacer commit ni push de los cambios actuales hasta que Tano termine la prueba manual y lo autorice expresamente.

## Criterio para activar Supabase

Conviene hacerlo cuando el flujo de carga ya resulte cómodo o cuando sea necesario usar la app desde más de un navegador/dispositivo. Así no se consolida en la base un formulario que todavía necesita cambios frecuentes.
