# 30 de 30 — Shortcuts

**Estado:** Completado  
**Curso:** Linux Fundamentals  
**Plataforma:** Hack The Box Academy

## Idea principal

Los atajos de teclado permiten trabajar en la terminal con mayor velocidad, corregir comandos sin reescribirlos, recuperar texto, buscar en el historial y controlar procesos. Aprender unos pocos y convertirlos en hábito aporta más que intentar memorizar una lista completa de una sola vez.

No todos los atajos pertenecen a la misma capa:

```text
Shell          → edición, historial, trabajos y señales
Terminal       → representación de teclas, zoom y combinaciones
Hyprland       → ventanas y cambio de aplicaciones
Aplicación     → atajos propios, por ejemplo Codex o navegador
```

Por eso una combinación puede funcionar diferente en Fish, Bash, Kitty, Codex o Hyprland.

## Autocompletar con Tab

```text
Tab
```

El autocompletado utiliza lo escrito hasta el cursor como contexto. Puede completar o sugerir:

- Comandos.
- Archivos y directorios.
- Opciones.
- Variables.
- Nombres específicos soportados por el shell.

Ejemplo:

```text
cd /home/tano/proy<Tab>
```

Puede completar:

```text
cd /home/tano/proyectos/
```

En Fish las sugerencias y completados suelen ser más ricos que en una configuración Bash básica. No es correcto describir Tab como una operación basada literalmente en STDIN: utiliza el contenido y contexto de la línea de comandos actual.

## Movimiento del cursor

```text
Ctrl+A → principio de la línea
Ctrl+E → final de la línea
Alt+B  → una palabra hacia atrás
Alt+F  → una palabra hacia adelante
Ctrl+← → palabra anterior, según terminal/configuración
Ctrl+→ → palabra siguiente, según terminal/configuración
```

Forma de recordarlo:

```text
A → comienzo del alfabeto / inicio
E → end
B → backward
F → forward
```

Esto permite corregir una ruta, opción o comando largo sin usar el mouse ni borrar todo.

## Borrar y recuperar texto

```text
Ctrl+U → corta desde el cursor hasta el principio
Ctrl+K → corta desde el cursor hasta el final
Ctrl+W → corta la palabra anterior
Ctrl+Y → recupera o pega el último texto cortado
```

Aunque el módulo dice “borrar”, en shells con edición estilo Readline estas operaciones suelen guardar el texto en un área temporal llamada **kill ring**. `Ctrl+Y` realiza **yank**, es decir, recupera ese texto.

Ejemplo:

```text
sudo pacman -S paquete-equivocado
               ↑ cursor
```

`Ctrl+K` puede retirar todo lo situado a la derecha. `Ctrl+Y` lo recupera si fue eliminado accidentalmente.

## Interrumpir un proceso

```text
Ctrl+C → envía SIGINT
```

Ejemplos habituales:

- Detener un `ping`.
- Salir de `journalctl -f`.
- Interrumpir un servidor ejecutándose en primer plano.
- Cancelar un comando que tarda demasiado.

Corrección importante: `Ctrl+C` no garantiza que el proceso sea “matado”. Envía la señal `SIGINT`; el programa puede terminar, manejarla o ignorarla.

Para observar señales disponibles:

```bash
kill -l
```

## Suspender y administrar trabajos

```text
Ctrl+Z → envía SIGTSTP y suspende el proceso actual
```

Suspender no es lo mismo que continuar en segundo plano. Después pueden utilizarse:

```bash
jobs
bg
fg
```

- `jobs`: muestra trabajos controlados por la shell actual.
- `bg`: reanuda un trabajo suspendido en segundo plano.
- `fg`: lleva un trabajo al primer plano.

Ejemplo:

```text
comando largo
Ctrl+Z
bg
jobs
fg
```

También puede iniciarse directamente en segundo plano:

```bash
comando &
```

La práctica del firewall dejó un aprendizaje relacionado: el servidor Python se inició con `&`, sobrevivió al `exit` y mantuvo vivo el namespace. Fue necesario encontrar su PID con `pgrep` y detenerlo. Segundo plano no significa que un proceso vaya a cerrarse automáticamente con la terminal en todos los casos.

## EOF y Ctrl+D

```text
Ctrl+D → indica End-of-File en la entrada
```

Si la línea de una shell está vacía, normalmente finaliza la entrada y cierra esa shell, de manera similar a:

```bash
exit
```

Si un programa espera texto por STDIN, `Ctrl+D` indica que no habrá más datos. Dependiendo del shell y de la posición del cursor también puede comportarse como eliminación hacia adelante; hay que comprender el contexto.

No equivale exactamente a `Ctrl+C`:

```text
Ctrl+C → solicita interrupción mediante SIGINT
Ctrl+D → informa fin de entrada; no es una señal
```

## Limpiar la pantalla

```text
Ctrl+L
```

Equivale visualmente a:

```bash
clear
```

No elimina:

- Historial.
- Comandos ejecutados.
- Procesos.
- Archivos.

Solamente redibuja o limpia la vista de la terminal.

## Historial

```text
Ctrl+R → búsqueda en comandos anteriores
↑      → comando anterior
↓      → comando siguiente
```

En Fish, `Ctrl+R` puede abrir una búsqueda interactiva según la configuración.

Ejemplo de uso:

```text
Ctrl+R
escribir: docker logs
```

Antes de ejecutar un comando recuperado hay que revisarlo. Puede contener:

- Una IP vieja.
- Una ruta que ya no corresponde.
- Un número de regla de firewall que cambió.
- Un nombre de contenedor equivocado.
- Una operación destructiva.

El historial facilita trabajar, pero no valida que el comando siga siendo seguro.

## Atajos de interfaz

### Cambiar de aplicación

```text
Alt+Tab
```

Este atajo pertenece al escritorio/compositor, no a Linux shell. En PerlaNegra lo administra Hyprland y puede estar redefinido.

### Zoom

```text
Ctrl++ → ampliar
Ctrl+- → reducir
```

El zoom depende de la aplicación. Puede funcionar en un navegador y no en otra aplicación, o ser interceptado por la configuración del escritorio. En algunos teclados `+` requiere Shift y la aplicación puede reconocer `Ctrl+=` como equivalente.

No debe confundirse con aumentar el tamaño de la fuente configurada permanentemente en Kitty, Codex o el sistema.

## Resumen para memorizar

```text
Tab     completar
Ctrl+A  principio de línea
Ctrl+E  final de línea
Alt+B   palabra anterior
Alt+F   palabra siguiente
Ctrl+U  cortar hacia el principio
Ctrl+K  cortar hacia el final
Ctrl+W  cortar palabra anterior
Ctrl+Y  recuperar texto cortado
Ctrl+C  enviar SIGINT
Ctrl+Z  suspender con SIGTSTP
Ctrl+D  EOF; salir si la línea está vacía
Ctrl+L  limpiar visualmente
Ctrl+R  buscar historial
↑ / ↓   recorrer historial
```

## Diferencias que hay que recordar

| Acción | Qué hace realmente |
|---|---|
| `Ctrl+C` | Envía SIGINT; el proceso decide cómo responder |
| `Ctrl+Z` | Suspende; no continúa automáticamente en background |
| `Ctrl+D` | Entrega EOF; no envía una señal de terminación |
| `Ctrl+L` | Limpia la vista; no borra historial |
| `Ctrl+U/K/W` | Corta texto que puede recuperarse con `Ctrl+Y` |
| `Alt+Tab` | Lo administra el entorno gráfico |
| `Ctrl++/-` | Depende de la aplicación o terminal |

## Errores y precauciones

- No asumir que `Ctrl+C` fuerza la muerte de todo proceso.
- No confundir suspender con ejecutar en segundo plano.
- No cerrar una terminal suponiendo que todos sus procesos hijos desaparecerán.
- No ejecutar ciegamente un comando recuperado del historial.
- No asumir que atajos gráficos funcionan igual en todas las aplicaciones.
- No utilizar `Ctrl+D` sin recordar que puede cerrar la shell si la línea está vacía.
- Al trabajar como root, revisar especialmente los comandos recuperados antes de presionar Enter.

## Uso de la ayuda

La documentación del shell y de la terminal permite conocer atajos reales de la configuración instalada:

```bash
fish --help
man fish
man bash
man readline
kitty +kitten show_key
```

En Fish también puede utilizarse:

```bash
bind
```

para listar asociaciones actuales. La salida puede ser extensa; puede filtrarse con `grep` o consultarse mediante la documentación.

## Inglés técnico del módulo

- `shortcut` → atajo.
- `auto-complete` → autocompletar.
- `cursor movement` → movimiento del cursor.
- `beginning of line` → principio de la línea.
- `end of line` → final de la línea.
- `backward` / `forward` → hacia atrás / hacia adelante.
- `erase` → borrar; en este contexto muchas veces es cortar.
- `kill ring` → almacenamiento temporal de texto cortado.
- `yank` → recuperar o pegar texto cortado.
- `interrupt` → interrumpir.
- `suspend` → suspender temporalmente.
- `background` / `foreground` → segundo plano / primer plano.
- `end-of-file` → fin de archivo o fin de entrada.
- `command history` → historial de comandos.
- `zoom in` / `zoom out` → ampliar / reducir.

## Lo que más hay que remarcar

Los atajos se aprenden usándolos. Conviene incorporar primero:

```text
Tab, Ctrl+A, Ctrl+E, Ctrl+W, Ctrl+C, Ctrl+L y Ctrl+R
```

Después agregar `Ctrl+U`, `Ctrl+K`, `Ctrl+Y` y control de trabajos con `Ctrl+Z`, `jobs`, `bg` y `fg`.

También hay que distinguir shell, terminal, compositor y aplicación: esa separación explica por qué un mismo atajo puede funcionar en un lugar y ser interpretado de otra manera en otro.

## Qué aprendí

Aprendí a moverme y editar comandos sin depender del mouse, recuperar texto eliminado y buscar en el historial. Comprendí la diferencia entre interrumpir con `Ctrl+C`, suspender con `Ctrl+Z` y finalizar la entrada con `Ctrl+D`. También entendí cómo administrar trabajos con `jobs`, `bg` y `fg`, y por qué los atajos de zoom o cambio de aplicación dependen de Kitty, Codex, Fish o Hyprland.

## Para repasar o practicar

- Utilizar Tab antes de escribir rutas completas.
- Corregir comandos largos con `Ctrl+A`, `Ctrl+E`, `Alt+B` y `Alt+F`.
- Practicar `Ctrl+U`, `Ctrl+K`, `Ctrl+W` y `Ctrl+Y` con texto seguro.
- Ejecutar un comando de prueba, suspenderlo y moverlo entre `bg` y `fg`.
- Buscar comandos seguros mediante `Ctrl+R` y revisarlos antes de ejecutarlos.
- Consultar `bind` para reconocer atajos reales de Fish.
- Diferenciar atajos de la shell, Kitty, Hyprland y Codex.
