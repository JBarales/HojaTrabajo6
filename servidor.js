const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Almacenamiento temporal de usuarios
let users = [];

// Crear nuevo usuario (POST /users)
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
app.get('/users', (req, res) => {
    res.json(users);
});

// Actualizar un usuario (PUT /users/:dpi)
app.put('/users/:dpi', (req, res) => {
    const { dpi } = req.params;
    const { name, email, password } = req.body;

    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    // Si se intenta cambiar el DPI, verificar que no esté registrado
    const existingUser = users.find(user => user.dpi === req.body.dpi);
    if (existingUser && existingUser.dpi !== dpi) {
        return res.status(400).json({ error: 'El nuevo DPI ya está registrado.' });
    }

    users[userIndex] = { ...users[userIndex], name, email, password };
    res.json(users[userIndex]);
});

// Eliminar un usuario (DELETE /users/:dpi)
app.delete('/users/:dpi', (req, res) => {
    const { dpi } = req.params;

    const userIndex = users.findIndex(user => user.dpi === dpi);
    if (userIndex === -1) {
        return res.status(404).json({ error: 'Usuario no encontrado.' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
