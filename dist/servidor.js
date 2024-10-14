"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30s';
// Arreglo para almacenar usuarios temporalmente
let users = [
    { dpi: '1234567890', name: 'Juan Pérez', email: 'juan@example.com', password: '12345' }
];
// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Token requerido.' });
    jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, user) => {
        if (err)
            return res.status(403).json({ error: 'Token no válido o expirado.' });
        req.user = user; // Añadimos los tipos para el usuario en la solicitud
        next();
    });
};
// Endpoint de login - Generar el token JWT
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    // Buscar el usuario por email y contraseña
    const user = users.find(u => u.email === email && u.password === password);
    if (!user)
        return res.status(401).json({ error: 'Credenciales inválidas.' });
    // Generar token JWT
    const token = jsonwebtoken_1.default.sign({ dpi: user.dpi, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token });
});
// Crear nuevo usuario (sin autenticación)
app.post('/users', (req, res) => {
    const newUser = req.body;
    // Validar si ya existe un usuario con el mismo DPI
    const existingUser = users.find(user => user.dpi === newUser.dpi);
    if (existingUser) {
        return res.status(400).json({ error: 'El DPI ya está registrado.' });
    }
    users.push(newUser);
    res.status(201).json(newUser);
});
// Listar todos los usuarios (requiere autenticación)
app.get('/users', authenticateToken, (req, res) => {
    res.json(users);
});
// Actualizar un usuario existente (requiere autenticación)
app.put('/users/:dpi', authenticateToken, (req, res) => {
    const { dpi } = req.params;
    const updatedUser = req.body; // Permitir actualización parcial
    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    users[userIndex] = Object.assign(Object.assign({}, users[userIndex]), updatedUser);
    res.json(users[userIndex]);
});
// Eliminar un usuario (requiere autenticación)
app.delete('/users/:dpi', authenticateToken, (req, res) => {
    const { dpi } = req.params;
    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }
    users.splice(userIndex, 1);
    res.status(204).send();
});
// Ruta raíz para la bienvenida
app.get('/', (req, res) => {
    res.send('Api up and running');
});
// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
