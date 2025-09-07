import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("API Funcionando!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});