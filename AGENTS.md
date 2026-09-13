# Continuidad de trabajo — CyberStudy

Estas reglas se aplican a cualquier persona o asistente que trabaje en este proyecto.

## Antes de modificar o documentar

1. Leer completo `ESTADO_PROYECTO.md`; es la fuente canónica del estado real.
2. Leer `README.md` y todos los documentos de `docs/` relevantes. Ante una tarea de documentación o continuidad, leerlos todos.
3. Comparar la documentación con el código y no presentar como activado o probado algo que sólo esté preparado.
4. Si existe una decisión técnica o de producto con alternativas importantes, explicarlas en español simple y consultar a Fernando antes de construir.

## Después de cada cambio

1. Verificar el cambio en proporción a su riesgo.
2. Actualizar `ESTADO_PROYECTO.md` con la fecha, resultado real, pruebas y bloqueos.
3. Actualizar `README.md` si cambia el uso, instalación, persistencia o estado general.
4. Actualizar el documento específico de `docs/` cuando cambie arquitectura, funcionamiento, guía de uso o próximos pasos.
5. No crear documentos duplicados si el tema ya tiene un archivo canónico.

## Seguridad y control del usuario

- No guardar ni publicar secretos, tokens, variables `.env`, configuraciones VPN, flags ni soluciones protegidas de HTB.
- Mantener `ovpn/`, `*.ovpn` y archivos de entorno fuera de Git.
- No automatizar scraping de HTB Academy.
- No ejecutar `git init`, `git commit`, `git push`, despliegues ni publicaciones sin permiso explícito de Fernando.
- Supabase `service_role` nunca puede incorporarse al frontend.

## Comunicación

- Usar español claro, preferentemente argentino.
- Explicar las decisiones sin asumir conocimientos avanzados de desarrollo.
- Registrar hechos comprobados y diferenciar claramente: implementado, configurado, probado y publicado.
