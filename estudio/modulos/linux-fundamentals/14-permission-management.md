# 14 de 30 — Permission Management

**Estado:** Completado

## Resumen

Los permisos se dividen entre propietario (`u`), grupo (`g`) y otros (`o`). Los valores son lectura (`r=4`), escritura (`w=2`) y ejecución (`x=1`).

```bash
ls -l
chmod 754 archivo
chmod u+x archivo
chown usuario:grupo archivo
```

En directorios, `r` lista nombres, `w` permite crear, borrar o renombrar y `x` permite atravesar. SUID ejecuta con los privilegios del propietario; SGID con los del grupo; el sticky bit evita borrar archivos ajenos en carpetas compartidas como `/tmp`.

## Qué aprendí

Aprendí a interpretar permisos simbólicos y octales y a reconocer SUID, SGID y sticky bit como puntos importantes de seguridad.

## Para repasar

Conversión entre permisos simbólicos y octales, y revisión segura de archivos SUID/SGID.
