require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();


mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
  }
)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(require('./routes'))


app.listen(process.env.PORT || '3001', ()=> {
  console.log('servidor rodando na porta 3001')
})
