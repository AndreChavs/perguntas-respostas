const express = require('express')
const app = express() //instancia do express
const bodyParser = require('body-parser')
const {ConnectDB} = require('./database/connection')
const Pergunta = require('./database/Pergunta')
const Resposta = require('./database/Resposta')

//testando a conexão com o bando de dados mysql
ConnectDB()

//Estou dizendo para o express usar o EJS como 'view engine'.
app.set('view engine', 'ejs')
//Injeção de arquivos Estáticos
app.use(express.static('public'))

//Body-Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//rotas
app.get('/', (req, res) => {
  Pergunta.findAll({raw: true, order: [
    ['id','DESC'] //ordenação: DESC = decrescente, ASC = crescente
  ]}).then( perguntas => {
    res.render('index',{
      perguntas: perguntas
    })    
  })  
})

app.get('/perguntar', (req, res) => {
  res.render('perguntar')
})

//Recebe os dados do formulário method='POST'
app.post('/salvarpergunta', (req, res) => {
  const {title, descricao} = req.body  
  Pergunta.create({
    titulo: title,
    descricao: descricao
  }).then(() => {
    res.redirect("/")
  })
})

app.get('/pergunta/:id', (req, res) => {
  let id = req.params.id
  Pergunta.findOne({
    where: {id: id},
    raw: true
  }).then( (pergunta) => {
    console.log(pergunta)
    if (pergunta !== null) {
      Resposta.findAll({
        where: {perguntaId: pergunta.id },
        raw: true,
        order:[
          ['id','DESC']
        ]
      }).then( (resposta) => {
        res.render('pergunta',{
          pergunta: pergunta,
          resposta: resposta
        })
      })
    } else { //pergunta não encontrada
      res.redirect('/')
    }
  })
})

app.post("/responder", (req, res) => {
  const {corpo, pergunta} = req.body //perguntaId
  Resposta.create({
    corpo: corpo,
    perguntaId: pergunta
  }).then(() => res.redirect(`/pergunta/${pergunta}`))
})

app.listen(4000, () => {
  console.log('App rodando')
}) 

