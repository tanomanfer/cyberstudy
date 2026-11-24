# Estado del proyecto

## 🔁 Último traspaso
- **Fecha / IA:** 2026-11-24 · Claude Code
- **Hice:** etapa 2 de 4 de **Máquinas CTF**: writeup por máquina con 8 secciones (Resumen, Reconocimiento, Enumeración, Explotación, Escalada, Flags, Conclusiones, Referencias) + pestaña de notas privadas y vista completa. Editor con vista previa, "Usar guía", bloque de comandos, capturas (botón o Ctrl+V, 1 MB c/u, tope 3 MB por writeup), export `.md` y PDF vía impresión del navegador.
- **Seguridad:** las flags guardan solo obtenida/fecha/evidencia; si la evidencia parece una flag no deja guardar. Lo que parezca `HTB{…}` o hash de 32 hex se reemplaza por `[REDACTADO]` en `.md` y PDF; notas privadas, IP, ayuda e IA nunca se exportan.
- **Extra:** el lector Markdown pasó a `src/components/markdown.tsx` (lo usan Cuaderno, tutor y writeups); ahora los bloques de código tienen botón Copiar y colores para comandos de terminal.
- **Validación:** `npm run build` OK; probado en navegador: pestañas, vista previa, copiar, guardado (writeup + notas), bloqueo de flag en evidencia, PDF con redacción, export `.md` sin notas ni flags; sin errores de consola. Datos de prueba borrados.
- **Pendiente:** etapa 3 (relación con secciones, ver máquinas desde el curso, CSV import/export), etapa 4 (Vitest). Sección 4 de Introduction to Networking cuando Tano la pase.
- **Git:** etapa 2 sin commit ni push.
- **Archivos:** `src/types.ts`, `src/App.tsx`, `src/features/machines/{machines.ts,MachinesView.tsx,machines.css}`, nuevos `src/components/markdown.tsx`, `src/features/machines/{writeup.ts,WriteupEditor.tsx}`.
