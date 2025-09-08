import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/database.mjs";
import authRouter from "./routes/auth.routes.mjs";
import subredditRouter from "./routes/subreddit.routes.mjs";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api", subredditRouter);

app.get("/", (req, res) => {
  res.send("API Funcionando!");
});

const start = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión a la base de datos establecida");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
    } catch (error) {
        console.error("No se pudo conectar a la base de datos:", error);
        process.exit(1);
    }
};

start();
