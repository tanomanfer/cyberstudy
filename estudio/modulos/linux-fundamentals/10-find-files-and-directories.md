# 10 de 30 — Find Files and Directories

**Estado:** Completado

## Resumen

`find` permite buscar desde una ruta combinando filtros:

```bash
find / -type f
find / -type f -name "*.conf"
find / -type f -name "*.log" 2>/dev/null | wc -l
```

También practiqué `-size`, `-newermt`, `which`, `command -v` y `$PATH`. Los patrones con `*` deben ir entre comillas y `2>/dev/null` oculta errores de permisos.

## Qué aprendí

Aprendí a combinar ruta, tipo, nombre, tamaño y fecha, y a contar resultados mediante pipes.

## Para repasar

Las unidades de `-size` y el uso exacto de `-newermt`.
