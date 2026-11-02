# CyberStudy

> Reglas del proyecto. Las leen Codex y Claude Code (Claude vía `CLAUDE.md` → `@AGENTS.md`).
> Reglas generales de Tano: `~/.codex/AGENTS.md`. Estado y traspaso: `ESTADO_PROYECTO.md`.
> Historial viejo: `docs/historial.md`. Decisiones de arquitectura: `docs/02-arquitectura-y-decisiones.md`.
> Leé `README.md` o `docs/` **solo si la tarea lo necesita**, no por defecto.

## Qué es
App personal para trackear la reconversión de Tano a ciberseguridad (SOC Analyst / Blue Team): rutas/certificaciones → cursos HTB Academy → secciones/cuaderno, sesiones con timer, dashboard con racha, exportación Markdown/Obsidian, tutor IA.

## Stack
React 19 + Vite + TypeScript puro (sin TanStack ni shadcn, a propósito: Decisión 003). Supabase (Postgres + Auth + RLS) para sincronizar; `localStorage` como base local (formato v3 con migración automática).
Producción: `https://cyberstudy-iota.vercel.app` (deploy automático con cada push a `main`).

## Comandos
- `npm run dev` · `npm run build` · `npm run preview` (puerto 4173)

## Módulos de estudio (cuando Tano termina una sección)
1. No dejar el resumen solo en la conversación: crear/actualizar el `.md` en `estudio/modulos/`.
2. Actualizar `estudio/INDICE.md` y `estudio/cyberstudy-import.json` (para el botón **Importar**). Validar el JSON.
3. Formato y reglas detalladas: `estudio/README_IA.md` (leerlo solo para estas tareas).

## Reglas críticas
- Nada de secretos en el repo: `.env*`, `ovpn/`, `*.ovpn` fuera de git. `service_role` de Supabase nunca en el frontend.
- No automatizar scraping de HTB Academy. No guardar flags ni soluciones protegidas.
- El lector Markdown no inyecta HTML (se arma con componentes React).
- Diferenciar siempre: implementado / configurado / probado / publicado.
- Decisión técnica con alternativas importantes → explicarlas simple y preguntar antes de construir.
