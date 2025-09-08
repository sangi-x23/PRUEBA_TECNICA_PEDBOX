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
            return res.json({ message: 'Faltan datos requeridos' });
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        await User.create({ name, email, password: hashedPassword });

        return res.json({
            isSuccess: true
        });
    } catch (error) {   
        return res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.json({ isSuccess: false, message: 'email y password son obligatorios' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.json({ isSuccess: false, message: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.json({ isSuccess: false, message: 'Credenciales inválidas' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "PRUEBA_TECNICA_PEDBOX_SECRET", { expiresIn: process.env.JWT_EXPIRES_IN || '1h' });

    return res.json({
      isSuccess: true,
      token
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};