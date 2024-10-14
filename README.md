# Hoja6
2		-
 


1	+
# Hoja8
2	+
3	+
1. Descripción de la API
4	+
La API permite gestionar usuarios (crear, listar, actualizar y eliminar) con autenticación mediante JWT para proteger ciertos endpoints. Solo los usuarios autenticados pueden acceder a las rutas protegidas.
5	+
6	+
2. Instrucciones para ejecutar la API localmente
7	+
Clona el repositorio desde GitHub.
8	+
Instala las dependencias usando npm install.
9	+
Configura el archivo .env con las variables necesarias (JWT_SECRET, JWT_EXPIRES_IN, y PORT).
10	+
Inicia el servidor con el comando npm start.
11	+
La API estará disponible en http://localhost:3000>.
12	+
3. URL de la API Desplegada en Render
13	+
La API está desplegada y accesible en: (Link de la API)[https://hojatrabajo6-uqia.onrender.com/]
14	+
15	+
4. Descripción de los Endpoints
16	+
Login (/login): Genera un token JWT para autenticación.
17	+
Crear Usuario (/users): Crea un nuevo usuario (no protegido).
18	+
Listar Usuarios (/users): Devuelve una lista de todos los usuarios (requiere autenticación).
19	+
Actualizar Usuario (/users/:dpi): Actualiza un usuario existente por su DPI (requiere autenticación).
20	+
Eliminar Usuario (/users/:dpi): Elimina un usuario por su DPI (requiere autenticación).
21	+
Para acceder a los endpoints protegidos, debes incluir el token JWT obtenido del login en el header de la solicitud.
22	+
23	+
A la nueva rama se le puso Tarea7.
24	+
25	+
Humberto Jose Barales Diaz - 9490 - 20 - 26164
