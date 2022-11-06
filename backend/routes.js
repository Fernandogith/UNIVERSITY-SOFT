const express = require("express")
const routes = express.Router()
const DashboardController = require ('./controllers/DashboardController')


// Carrega Pessoas
routes.get('/pessoas', DashboardController.carregaPessoas);

// Carrega Pessoas
routes.post('/pessoas', DashboardController.inserePessoas);

// Busca Ultima Matricula
routes.get('/matricula', DashboardController.ultimoNumeroMatricula);



module.exports = routes;