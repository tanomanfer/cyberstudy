# Configurar Supabase

CyberStudy funciona sin Supabase. La nube se activa únicamente cuando existe un proyecto configurado.

## 1. Crear o elegir el proyecto

Usar un proyecto Supabase dedicado. No reutilizar uno de producción de otra aplicación.

## 2. Aplicar las migraciones

Desde el SQL Editor del proyecto, ejecutar en orden:

1. `supabase/migrations/0001_initial_schema.sql`
2. `supabase/migrations/0002_app_state_sync.sql`

Las tablas tienen RLS y cada cuenta sólo puede acceder a sus propias filas.

## 3. Configurar el entorno local

Crear `.env.local` desde `.env.example`:

```bash
cp .env.example .env.local
```

Completar:

```dotenv
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=TU_CLAVE_PUBLICA_ANON
```

La aplicación web sólo debe recibir la clave pública `anon`. Nunca usar `service_role`.

## 4. Activar autenticación

En Supabase, mantener habilitado Email en Authentication → Providers. Si la confirmación de email está activa, el usuario deberá confirmar el mensaje antes de iniciar sesión.

## 5. Probar

Reiniciar `npm run dev`, abrir **Nube**, crear una cuenta y comprobar que el estado indique **Datos sincronizados**. Crear un módulo y verificarlo desde otro navegador con la misma cuenta.

## Migración inicial

Al conectar una cuenta, CyberStudy combina por identificador los módulos y sesiones locales con los remotos. No reemplaza a ciegas los datos existentes. Aun con Supabase activo, conviene descargar respaldos JSON periódicos.
