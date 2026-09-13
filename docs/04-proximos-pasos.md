# Próximos pasos

Orden recomendado después de validar el uso cotidiano del MVP:

1. Aplicar las migraciones y configurar las credenciales del proyecto Supabase de destino.
2. Verificar registro, inicio de sesión y sincronización desde dos navegadores reales.
3. Agregar Google OAuth si resulta más cómodo que email/contraseña.
4. Incorporar indicadores de última sincronización y reintentos sin conexión.
5. Ampliar el lector Markdown únicamente si hacen falta enlaces, tablas u otros elementos no cubiertos.
6. Tests automáticos de cálculos de racha, fechas, importación, lector y sincronización.
7. Diario, repaso espaciado y base de conocimientos (Fase 2).

Ya implementado y probado localmente: respaldo/importación JSON, edición/eliminación, recuperación del temporizador, jerarquía curso/módulo, búsqueda global y lector de apuntes con búsqueda interna.

Implementado en código pero todavía sin configurar ni probar contra un proyecto real: autenticación por email y sincronización multi-dispositivo con Supabase/RLS.

GitHub pendiente: la autenticación de GitHub CLI está vencida y el entorno actual presenta una carpeta `.git` vacía montada que bloquea `git init`. No existe todavía commit, remoto ni respaldo online.

## Criterio para activar Supabase

Conviene hacerlo cuando el flujo de carga ya resulte cómodo o cuando sea necesario usar la app desde más de un navegador/dispositivo. Así no se consolida en la base un formulario que todavía necesita cambios frecuentes.
