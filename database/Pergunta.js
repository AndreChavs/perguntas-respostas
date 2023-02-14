const Sequelize = require('sequelize')
const {connection} = require('./connection')
const Pergunta = connection.define('pergunta',{
  titulo:{
    type: Sequelize.STRING, //texto curto
    allowNull: false
  },
  descricao:{
    type: Sequelize.TEXT, //texto longo
    allowNull: false
  }
});
Pergunta.sync({force:false}).then(() => {})

module.exports = Pergunta