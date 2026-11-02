# Estado — CyberStudy

> Historial completo anterior: `docs/historial.md`.

## 🔁 Último traspaso
- **Fecha / IA:** 2026-11-02 · Codex
- **Hice:** implementé entradas `module-summary` sin número ni impacto en progreso; creé y sincronicé el resumen total de *Introduction to Information Security*.
- **Estado:** curso 24/24 (100%); build y validaciones JSON/notas/diff correctas. La regla quedó documentada para todos los cursos futuros.
- **Quedó a medias:** importar otra vez `estudio/cyberstudy-import.json` para que el nuevo resumen aparezca en CyberStudy.
- **Próximo paso:** verificar la tarjeta `Resumen del módulo: Introduction to Information Security`; después comenzar *Network Foundations*.
- **Git:** se autorizó un commit único con todos los cambios actuales; no hacer push sin una nueva confirmación.
- **Archivos tocados:** `src/App.tsx`, `src/types.ts`, `src/lib/markdown.ts`, `src/enhancements.css`, `estudio/README_IA.md`, `estudio/INDICE.md`, consolidado y par `resumen-del-modulo-introduction-to-information-security.*`.

## Cómo está hoy
- Versión 0.2.0, usable a diario. Supabase conectado (proyecto `nogebwczmxtcafmggelf`), login + sync funcionando. Deploy en Vercel activo.
- Jerarquía: certificación → curso → sección. Cuaderno agrupa apuntes por curso.
- Tutor IA implementado (2026-09-20), falta prueba manual con Tano antes de publicarlo.

## Pendientes
- [ ] Probar el Tutor IA con Tano y publicarlo.
- [ ] Confirmar con Tano que la web online tiene todos los módulos (y dejar de depender de `localhost:4173`).
- [ ] Importador: combinar respaldos por id sin borrar módulos. Mientras tanto, importar solo `estudio/cyberstudy-import.json`.
- [ ] Reorganizar `estudio/` como `estudio/cursos/<curso>/` (confirmar estructura antes; preservar los cuadernos).
- [ ] Markdown: tablas y enlaces si hacen falta. Tests de racha/fechas/importación.
- [ ] Fase 2 (diario, repaso espaciado, base de conocimientos): no empezada.
