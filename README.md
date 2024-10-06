# Hoja7

1. Descripción de la API
La API permite gestionar usuarios (crear, listar, actualizar y eliminar) con autenticación mediante JWT para proteger ciertos endpoints. Solo los usuarios autenticados pueden acceder a las rutas protegidas.

2. Instrucciones para ejecutar la API localmente
Clona el repositorio desde GitHub.
Instala las dependencias usando npm install.
Configura el archivo .env con las variables necesarias (JWT_SECRET, JWT_EXPIRES_IN, y PORT).
Inicia el servidor con el comando npm start.
La API estará disponible en http://localhost:3000>.
3. URL de la API Desplegada en Render
La API está desplegada y accesible en: (Link de la API)[https://hojatrabajo6-uqia.onrender.com/]

4. Descripción de los Endpoints
Login (/login): Genera un token JWT para autenticación.
Crear Usuario (/users): Crea un nuevo usuario (no protegido).
Listar Usuarios (/users): Devuelve una lista de todos los usuarios (requiere autenticación).
Actualizar Usuario (/users/:dpi): Actualiza un usuario existente por su DPI (requiere autenticación).
Eliminar Usuario (/users/:dpi): Elimina un usuario por su DPI (requiere autenticación).
Para acceder a los endpoints protegidos, debes incluir el token JWT obtenido del login en el header de la solicitud.

A la nueva rama se le puso Tarea7.

Humberto Jose Barales Diaz - 9490 - 20 - 26164
