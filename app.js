const express = require('express');
const { Sequelize } = require('sequelize');

const productRoutes = require('./ProductRoutes');

const sequelize = new Sequelize('mysql://user:password@localhost:3306/database');

const app = express();

app.use(express.json()); // Para parsing de application/json

app.use('/products', productRoutes);
app.use('/enderecos', rotasEndereco);

sequelize.authenticate()
  .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
  .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

// Sincronizar os modelos Sequelize com o banco de dados
sequelize.sync().then(() => {
  console.log('Tabelas do banco de dados sincronizadas.');
});

// Iniciar o servidor para ouvir as solicitações na porta especificada
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
