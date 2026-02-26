const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const topicoRoutes = require('./routes/topicoRoutes');
const respostaRoutes = require('./routes/respostaRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/topicos', topicoRoutes);
app.use('/api/respostas', respostaRoutes);



sequelize.sync()
  .then(() => {
    console.log('Banco sincronizado');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Erro ao iniciar aplicação:', err);
  });