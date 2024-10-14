Este proyecto es una API REST construida con Node.js, Express, y migrada a TypeScript, diseñada para la gestión de usuarios. La API permite realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre usuarios, con la adición de un sistema de autenticación basado en JSON Web Tokens (JWT).

Funcionalidades Clave
Autenticación con JWT: Los usuarios deben autenticarse enviando sus credenciales (email y contraseña) a través del endpoint /login. Si las credenciales son válidas, el servidor devuelve un token JWT que puede ser utilizado para acceder a rutas protegidas.

Operaciones CRUD sobre usuarios:

Crear: Los administradores pueden crear nuevos usuarios enviando su información (DPI, nombre, email, y contraseña) al servidor.
Leer: Se puede obtener una lista de todos los usuarios registrados.
Actualizar: Se pueden actualizar los datos de un usuario existente, utilizando su DPI como identificador.
Eliminar: Los usuarios pueden ser eliminados mediante su DPI.
Protección de Endpoints: Los endpoints que permiten listar, actualizar y eliminar usuarios están protegidos con JWT. Solo los usuarios autenticados pueden realizar estas operaciones.

Cómo Funciona
Registro de Usuarios:

El endpoint /users permite registrar un nuevo usuario, enviando un objeto con las propiedades dpi, name, email y password.
Se verifica que no exista otro usuario con el mismo DPI antes de guardarlo en la base de datos (en este caso, un arreglo en memoria).
Login y Generación de JWT:

El usuario envía su email y password al endpoint /login.
Si las credenciales coinciden con un usuario existente, se genera un token JWT que es válido por un período de tiempo determinado (por ejemplo, 30 segundos).
Este token debe incluirse en las solicitudes a las rutas protegidas, usando el encabezado Authorization: Bearer <token>.
Acceso a Rutas Protegidas:

Una vez autenticado, el usuario puede acceder a rutas protegidas como /users (para listar todos los usuarios), /users/:dpi (para actualizar o eliminar usuarios).
El middleware authenticateToken valida que el token JWT sea válido antes de permitir el acceso.
Validaciones de Tipo con TypeScript:

Se utilizan las características de TypeScript para definir y validar los tipos de datos esperados en las solicitudes, como la interfaz User que garantiza que los datos de los usuarios tengan la estructura adecuada.
Esto mejora la seguridad del código, evitando errores de tipo en tiempo de ejecución y asegurando que los datos procesados sean correctos.
Ejemplo de Flujo de Trabajo
Un usuario envía una solicitud de login con su email y contraseña.
Si las credenciales son correctas, recibe un token JWT.
Con este token, puede hacer una solicitud GET a /users para obtener la lista de usuarios, o enviar solicitudes PUT o DELETE para modificar o eliminar usuarios.
Si el token es inválido o ha expirado, el servidor devuelve un error 401 o 403.

Humberto Jose Barales Diaz - 9490 - 20 - 26164
