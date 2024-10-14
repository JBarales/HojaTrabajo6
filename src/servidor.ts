import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import { User, JwtPayload } from './types';

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const JWT_SECRET = process.env.JWT_SECRET || 'mysecretkey';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30s';

// Arreglo para almacenar usuarios temporalmente
let users: User[] = [
  { dpi: '1234567890', name: 'Juan Pérez', email: 'juan@example.com', password: '12345' }
];

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token requerido.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token no válido o expirado.' });

    req.user = user as JwtPayload; // Ahora TypeScript reconocerá que req.user existe
    next();
  });
};

// Endpoint de login - Generar el token JWT
app.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  // Buscar el usuario por email y contraseña
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas.' });

  // Generar token JWT
  const token = jwt.sign({ dpi: user.dpi, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
  res.json({ token });
});

// Crear nuevo usuario (sin autenticación)
app.post('/users', (req: Request, res: Response) => {
  const newUser: User = req.body;

  // Validar si ya existe un usuario con el mismo DPI nm
  const existingUser = users.find(user => user.dpi === newUser.dpi);
  if (existingUser) {
    return res.status(400).json({ error: 'El DPI ya está registrado.' });
  }

  users.push(newUser);
  res.status(201).json(newUser);
});

// Listar todos los usuarios (requiere autenticación)
app.get('/users', authenticateToken, (req: Request, res: Response) => {
  res.json(users);
});

// Actualizar un usuario existente (requiere autenticación)
app.put('/users/:dpi', authenticateToken, (req: Request, res: Response) => {
  const { dpi } = req.params;
  const updatedUser: Partial<User> = req.body; // Permitir actualización parcial

  const userIndex = users.findIndex(user => user.dpi === dpi);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  users[userIndex] = { ...users[userIndex], ...updatedUser };
  res.json(users[userIndex]);
});

// Eliminar un usuario (requiere autenticación)
app.delete('/users/:dpi', authenticateToken, (req: Request, res: Response) => {
  const { dpi } = req.params;

  const userIndex = users.findIndex(user => user.dpi === dpi);
  if (userIndex === -1) {
    return res.status(404).json({ error: 'Usuario no encontrado.' });
  }

  users.splice(userIndex, 1);
  res.status(204).send();
});

// Ruta raíz para la bienvenida
app.get('/', (req: Request, res: Response) => {
  res.send('Bienvenido a la API de Gestión de Usuarios');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
