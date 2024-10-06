require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Variables de entorno
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30s';

// Almacenamiento temporal de usuarios
let users = [
    { dpi: '1234567890', name: 'Juan Pérez', email: 'juan@example.com', password: '12345' }
];

// Middleware para proteger rutas
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) return res.status(401).json({ error: 'Token requerido.' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Token no válido o expirado.' });

        req.user = user;
        next();
    });
};

// Endpoint para login y generar token JWT
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validar credenciales
    const user = users.find(user => user.email === email && user.password === password);
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas.' });

    // Generar token JWT
    const token = jwt.sign({ dpi: user.dpi, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token });
});

// Crear nuevo usuario (sin protección)
app.post('/users', (req, res) => {
    const { dpi, name, email, password } = req.body;

    // Validar si ya existe el DPI
    const existingUser = users.find(user => user.dpi === dpi);
    if (existingUser) {
        return res.status(400).json({ error: 'El DPI ya está registrado.' });
    }

    const newUser = { dpi, name, email, password };
    users.push(newUser);
    res.status(201).json(newUser);
});

// Listar todos los usuarios (GET /users) 
app.get('/users', authenticateToken, (req, res) => {
    res.json(users);
});

// Actualizar un usuario (PUT /users/:dpi) 
app.put('/users/:dpi', authenticateToken, (req, res) => {
    const { dpi } = req.params;
    const { name, email, password } = req.body;

    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    users[userIndex] = { ...users[userIndex], name, email, password };
    res.json(users[userIndex]);
});

// Eliminar un usuario (DELETE /users/:dpi) 
app.delete('/users/:dpi', authenticateToken, (req, res) => {
    const { dpi } = req.params;

    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

// Ruta para la raíz de la API
app.get('/', (req, res) => {
    res.send('API up and running');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});