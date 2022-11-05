const port = 8000
const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const routes = require("./routes")


// Liberar para consultas
app.use(cors())

// Parser no body e aplicar a um objeto possibilitando utilização no backend
app.use(bodyParser.urlencoded({ extended: true }))

// Caso JSON, Parser no body, e aplicar a um objeto possibilitando utilização no backend
app.use(bodyParser.json())

//Utilização das rotas
app.use(routes)

// Escuta porta e dispara função quando rodando
app.listen(port, function() {
    console.log(`BACKEND is running on port ${port}`);
})