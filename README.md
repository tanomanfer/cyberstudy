# CyberStudy

Aplicación personal para registrar estudio técnico, con foco inicial en Hack The Box Academy y una estructura abierta a otras plataformas como TryHackMe, PortSwigger Academy o cursos propios.

## Estado actual

Aplicación local-first funcional (`v0.2.0`):

- Dashboard con objetivo diario, resumen semanal, racha y módulos activos.
- Tracker de módulos con plataforma, categoría, dificultad, estado y progreso.
- Sesiones manuales con aprendizajes, dificultades, comprensión y tags.
- Timer en vivo que convierte el tiempo medido en una sesión editable.
- Congelamiento justificado de días para conservar la racha.
- Exportación individual a Markdown con frontmatter compatible con Obsidian.
- Persistencia local con copia secundaria de recuperación.
- Respaldo e importación de todos los datos en JSON.
- Edición y eliminación confirmada de módulos y sesiones.
- Temporizador recuperable después de recargar o cerrar la pestaña.
- Código preparado para sincronización opcional con Supabase; configuración y prueba real todavía pendientes.
- Cuaderno con lector amplio, secciones de resumen/apuntes/dudas y búsqueda dentro de cada módulo.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir `http://localhost:4173`.

## Importante sobre los datos

La aplicación guarda primero en `localStorage`, bajo la clave actual `cyberstudy:data:v2`, y conserva una copia secundaria. La clave v1 se mantiene para recuperación durante la migración. Usá siempre `http://localhost:4173`: otro host, navegador o perfil tiene un almacenamiento diferente. El botón **Respaldo** descarga una copia completa y **Importar** permite recuperarla.

Supabase está implementado en el código pero todavía no está configurado ni probado en este proyecto. Para activarlo, aplicá las migraciones de `supabase/migrations/`, copiá `.env.example` como `.env.local` y completá la URL y la clave pública `anon`. Nunca coloques la `service_role` en esta aplicación.

La sincronización combina los registros locales y remotos por identificador antes de subirlos. De esta forma, conectar una cuenta por primera vez no borra lo que ya estaba guardado en el navegador.

## Seguridad

- No se guardan contraseñas ni secretos en esta versión.
- Los archivos `.env*` reales están ignorados; `.env.example` documenta las variables esperadas.
- Las notas se almacenan como Markdown plano. El lector representa un subconjunto mediante componentes React y nunca inyecta el contenido como HTML.
- La futura base Supabase usa `user_id` y RLS en todas las tablas personales.
- No se scrapea HTB ni se almacenan flags, contraseñas o soluciones protegidas. El progreso de HTB se actualiza manualmente porque no existe una integración oficial configurada.

## Documentación

- [`docs/01-documento-maestro-cyberstudy.md`](docs/01-documento-maestro-cyberstudy.md): visión y roadmap.
- [`docs/02-arquitectura-y-decisiones.md`](docs/02-arquitectura-y-decisiones.md): arquitectura actual y razones.
- [`docs/03-guia-de-uso.md`](docs/03-guia-de-uso.md): uso cotidiano.
- [`docs/04-proximos-pasos.md`](docs/04-proximos-pasos.md): trabajo pendiente y orden sugerido.
- [`ESTADO_PROYECTO.md`](ESTADO_PROYECTO.md): estado canónico para retomar el trabajo.

## Scripts

```bash
npm run dev      # servidor de desarrollo
npm run build    # chequeo TypeScript y build productivo
npm run preview  # previsualizar el build
```
