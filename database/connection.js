const {Sequelize} = require('sequelize')
const connection = new Sequelize('guiaperguntas','admin','root',{
  host:'localhost',
  dialect:'mysql'
})

async function ConnectDB() {
  try {
    await connection.authenticate()
    console.log('Conexão com mysql bem sucedida')    
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }  
}
module.exports = {
  connection,
  ConnectDB
}