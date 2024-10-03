# Hoja6

 API de Gestión de Usuarios
Esta API permite gestionar usuarios, incluyendo la creación, listado, actualización y eliminación de usuarios, con la validación de que no existan usuarios con el mismo DPI en el sistema.

Descripción de la API
La API expone los siguientes endpoints para la gestión de usuarios:

POST /users: Crea un nuevo usuario.
GET /users: Lista todos los usuarios registrados.
PUT /users/: Actualiza un usuario existente basado en su DPI.
DELETE /users/: Elimina un usuario basado en su DPI.


Cada usuario tiene los siguientes atributos:
dpi (string): Documento de Identificación Personal, debe ser único.
name (string): Nombre del usuario.
email (string): Correo electrónico del usuario.
password (string): Contraseña del usuario.


Instrucciones para ejecutar la API localmente
* Clonar el repositorio
* Acceder a la ubicaciond del poryecto usando Visual Studio Code
* Desde la terminal ejecutamos npm install
* Desde la terminal ejecutamos el codigo node servidor.js
* La API estara disponible en la siguiente ruta http://localhost:3000

URL de la API desplegada en Render
La API está desplegada y accesible públicamente en la siguiente URL:

[URL Render](https://hojatrabajo6-1-k8yr.onrender.com)

1. Crear un nuevo usuario
POST /users

Crea un nuevo usuario. Valida que el DPI no esté registrado previamente.

Solicitud (Body JSON):

{
  "dpi": "123456789085",
  "name": "Juan Diaz",
  "email": "juan@test.com",
  "password": "12345"
}

Error (DPI duplicado):

{
  "error": "El DPI ya está registrado."
}


2. Listar todos los usuarios
GET /users

Devuelve un listado de todos los usuarios registrados.

Solicitud: No requiere body.

{
  "dpi": "123456789085",
  "name": "Juan Diaz",
  "email": "juan@test.com",
  "password": "12345"
}

3. Actualizar un usuario existente
PUT /users/:dpi

Actualiza los datos de un usuario existente basado en su DPI.

URL: /users/1234567890

Solicitud (Body JSON):

{
  "name": "Juan Actualizado",
  "email": "nuevoemail@example.com",
  "password": "nuevaPassword"
}

Error (Usuario no encontrado) (Código 404):

{
  "error": "Usuario no encontrado."
}

Eliminar un usuario existente
DELETE /users/:dpi

Elimina un usuario basado en su DPI.

URL: /users/1234567890

Respuesta exitosa (Código 204): No tiene cuerpo de respuesta.

Error (Usuario no encontrado) (Código 404):


{
  "error": "Usuario no encontrado."
}




Humberto Jose Barales Diaz - 9490 - 20- 16264




























