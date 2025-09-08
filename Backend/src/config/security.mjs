import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401).json({ error: "Token no proporcionado" });

    jwt.verify(token, process.env.JWT_SECRET || "PRUEBA_TECNICA_PEDBOX_SECRET", (err, user) => {
        if (err) return res.sendStatus(403).json({ error: "Token inválido" });
        req.user = user;
        next();
    });
}

export default authenticateToken;