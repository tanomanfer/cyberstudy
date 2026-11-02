# 9 de 24 — Mobile Security

**Estado:** Completado
**Curso:** Introduction to Information Security (módulo 1 de 20 — Junior Cybersecurity Analyst Job Role Path)
**Plataforma:** Hack The Box Academy

## Idea principal

**Mobile Security** protege los teléfonos y las tabletas, los datos que almacenan o transmiten, las redes a las que se conectan y las aplicaciones que ejecutan. Estos dispositivos contienen credenciales, mensajes, contactos, información bancaria y acceso a sistemas laborales, por lo que perder el equipo también puede significar exponer información sensible.

La protección debe aplicarse en varias capas. Un PIN ayuda a impedir el acceso al equipo, pero no reemplaza el cifrado, una conexión segura ni el control de las aplicaciones instaladas.

## Conceptos importantes

### Device Security

Protege el acceso al dispositivo mediante PIN o contraseña, autenticación biométrica y bloqueo automático. El **borrado remoto** permite eliminar la información cuando el equipo se pierde o es robado, siempre que la función haya sido configurada y el dispositivo pueda recibir la orden.

### Data Security

El **cifrado** vuelve ilegibles los datos sin la clave correcta. Los backups seguros permiten recuperar la información si el dispositivo se pierde, falla o debe borrarse. Las estrategias de prevención de pérdida de datos ayudan a evitar que información sensible sea compartida o filtrada indebidamente.

### Network Security

Una red Wi-Fi pública puede permitir que terceros observen o manipulen tráfico inseguro. Una VPN crea un túnel cifrado entre el dispositivo y un punto confiable, pero no vuelve segura una aplicación maliciosa ni corrige una mala configuración del teléfono.

### Application Security

Las aplicaciones deben provenir de fuentes confiables, mantenerse actualizadas y solicitar solamente los permisos necesarios. Una aplicación de linterna no debería necesitar contactos, mensajes ni micrófono. Revisar y rechazar permisos innecesarios reduce el impacto de aplicaciones invasivas o comprometidas.

### Responsabilidad compartida

- **IT** implementa redes, cifrado y herramientas de administración.
- El **CISO** define la estrategia, evalúa riesgos y verifica el cumplimiento.
- Los **equipos de seguridad** prueban controles e identifican vulnerabilidades.
- El **IT Security Manager** supervisa las operaciones cotidianas.
- Los **usuarios** protegen el equipo, actualizan las aplicaciones y evitan permisos innecesarios.

## Comandos y opciones

Esta sección es teórica y no presenta comandos. La configuración concreta depende de Android, iOS y las herramientas de administración utilizadas por la organización.

## Diferencias que hay que recordar

- **Cifrado vs backup:** el cifrado evita leer los datos sin la clave; el backup permite recuperarlos.
- **Bloqueo vs borrado remoto:** el bloqueo dificulta el acceso; el borrado remoto elimina la información cuando el equipo ya no está bajo control.
- **VPN vs seguridad total:** la VPN protege el canal de red, pero no vuelve confiables al dispositivo, las aplicaciones ni los sitios visitados.
- **Permiso necesario vs excesivo:** una aplicación debe acceder solamente a los recursos indispensables para su función.

## Ejemplos prácticos

- Se pierde un teléfono corporativo: el bloqueo y el cifrado dificultan el acceso; el borrado remoto reduce la posibilidad de exposición.
- Una aplicación de linterna solicita contactos y micrófono: se rechazan esos permisos porque no son necesarios.
- Un usuario necesita conectarse desde una Wi-Fi pública: utiliza una VPN corporativa y evita operaciones sensibles si no puede verificar la red.
- El teléfono se rompe: un backup seguro permite recuperar los datos en otro dispositivo.

## Errores y precauciones

- No depender solamente del PIN; también se necesitan cifrado, actualizaciones y control de aplicaciones.
- No conceder permisos por costumbre ni instalar aplicaciones desde fuentes desconocidas.
- No asumir que una VPN protege contra aplicaciones maliciosas o phishing.
- El borrado remoto debe configurarse antes de perder el dispositivo y puede depender de la conectividad.
- Los backups también contienen información sensible y deben estar protegidos.

## Inglés técnico del módulo

- `mobile security` → seguridad de dispositivos móviles.
- `device security` → protección del acceso al dispositivo.
- `data security` → protección de los datos almacenados y procesados.
- `network security` → protección de las comunicaciones de red.
- `application security` → seguridad de las aplicaciones.
- `remote wipe` → borrado remoto.
- `encryption` → cifrado.
- `secure backup` → copia de seguridad protegida.
- `permission management` → administración de permisos.
- `app vetting` → evaluación de una aplicación antes de aprobarla o instalarla.

## Lo que más costó

No hubo errores en el cuestionario: las seis respuestas fueron correctas. Conviene mantener presente que una VPN protege el tráfico, pero no reemplaza las demás capas de seguridad.

## Qué aprendí

Entendí que Mobile Security combina la protección del dispositivo, los datos, la red y las aplicaciones. Puedo diferenciar cifrado de backup, reconocer permisos excesivos y explicar por qué la responsabilidad se comparte entre IT, seguridad, responsables de estrategia y usuarios.

## Para repasar o practicar

- Revisar los permisos concedidos a las aplicaciones del teléfono.
- Comprobar que el bloqueo, el cifrado, el backup y el borrado remoto estén configurados.
- Explicar qué protege una VPN y qué problemas no resuelve.
- Practicar la clasificación de controles según las cuatro capas.

## Cuestionario de repaso

1. ¿Cuáles son las cuatro capas principales de Mobile Security? — **Respuesta:** Dispositivo, datos, red y aplicaciones.
2. ¿Para qué sirve el borrado remoto? — **Respuesta:** Para eliminar la información si el dispositivo se pierde o es robado.
3. ¿Cuál es la diferencia entre cifrado y backup? — **Respuesta:** El cifrado protege la lectura de los datos; el backup permite recuperarlos.
4. ¿Qué riesgo presenta una red Wi-Fi pública? — **Respuesta:** Puede permitir que terceros espíen o manipulen el tráfico inseguro.
5. Una aplicación de linterna solicita contactos, mensajes y micrófono. ¿Qué corresponde hacer? — **Respuesta:** Rechazar los permisos que no necesita.
6. ¿Quién es responsable de Mobile Security? — **Respuesta:** IT, los equipos de seguridad, los responsables de estrategia y los usuarios.
