// Importações usando ES Modules
import express from "express";
import dotenv from "dotenv";
import router from "./routes";

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o Express
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Usar o roteador
app.use(router);

// Porta definida nas variáveis de ambiente
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
