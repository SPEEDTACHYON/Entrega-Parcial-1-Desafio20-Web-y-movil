const express = require('express');
const cors = require('cors');

const app = express();

// Configurar middlewares (Reglas del servidor)
app.use(cors()); 
app.use(express.json()); 


app.get('/api/estado', (req, res) => {
  res.json({
    mensaje: "¡Servidor Express funcionando correctamente!",
    estado: "OK",
    version: "1.0.0"
  });
});

// Definir el puerto y arrancar el servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});