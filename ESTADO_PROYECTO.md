# Estado del proyecto

## 🔁 Último traspaso
- **Fecha / IA:** 2026-11-24 · Claude Code
- **Hice:** etapa 1 de 4 del módulo **Máquinas CTF**: menú nuevo, dashboard (estados, % resueltas, horas, aprendizaje, barras por dificultad/SO/técnicas), filtros combinables + orden + tabla/tarjetas (preferencias en localStorage), alta/edición/borrado con validaciones y ficha de detalle.
- **Decisiones:** máquinas en el mismo JSON (`machines?` opcional, sin subir versión); capturas futuras dentro del JSON (1 MB); Importar conserva las máquinas si el archivo no trae `machines`; sync une máquinas por id y respeta `deletedIds`. Lógica en `src/features/machines/machines.ts` (normaliza URLs solo http(s), IP, fechas, límites).
- **Validación:** `npm run build` OK; probado en navegador: alta, IP inválida rechazada, importar respaldo sin máquinas las conserva, `javascript:` descartado, filtros combinados, tabla y detalle; sin errores de consola. Datos de prueba borrados.
- **Pendiente:** etapa 2 (writeup por secciones, editor MD con vista previa, copiar comandos, capturas, export MD/PDF), etapa 3 (relación con secciones, ver máquinas desde el curso, CSV import/export), etapa 4 (Vitest). Ya existe relación máquina→curso desde el formulario.
- **Git:** sin commit ni push de la etapa 1.
- **Archivos:** `src/types.ts`, `src/lib/storage.ts`, `src/lib/supabase.ts`, `src/App.tsx`, nuevos `src/components/ui.tsx` y `src/features/machines/{machines.ts,MachinesView.tsx,machines.css}`.
