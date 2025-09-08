import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.mjs';
import dotenv from 'dotenv';

dotenv.config();

const SALT_ROUNDS = 10;

export const register = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const user = await User.create({ name, email, password: hashedPassword });

        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "PRUEBA_TECNICA_PEDBOX_SECRET", { expiresIn: '1h' });

        return res.status(201).json({
            user: {id: user.id, name: user.name, email: user.email},
            token
        });
    } catch (error) {   
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'email y password son obligatorios' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "PRUEBA_TECNICA_PEDBOX_SECRET", { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

    return res.json({
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};