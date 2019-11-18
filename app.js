const express = require('express');
const app = express();
const routes = express.Router();


app.listen('3001', ()=> {
  console.log('servidor rodando na porta 3001')
})

app.use(routes)

routes.get('/user', (req, res)=>{
  const {name, email} = req.query
  return res.json(`Olá ${name}, o seu e-mail é: ${email}?`)
})