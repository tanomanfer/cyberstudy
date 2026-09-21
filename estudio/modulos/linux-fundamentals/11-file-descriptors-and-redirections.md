# 11 de 30 — File Descriptors and Redirections

**Estado:** Completado

## Resumen

Los flujos principales son STDIN (`0`), STDOUT (`1`) y STDERR (`2`).

- `>` guarda reemplazando.
- `>>` agrega al final.
- `<` toma entrada desde un archivo.
- `2>` redirige errores.
- `2>/dev/null` descarta errores.
- `|` conecta la salida de un comando con la entrada del siguiente.

```bash
find /etc -name "*.conf" 2>/dev/null | grep systemd | wc -l
```

## Qué aprendí

Aprendí a separar entrada, salida y errores, guardar resultados y construir cadenas de comandos mediante pipes.

## Para repasar

Más combinaciones de redirecciones y heredoc (`<<`).
