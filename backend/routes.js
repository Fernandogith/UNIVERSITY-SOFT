const express = require("express")
const routes = express.Router()
const DashboardController = require ('./controllers/DashboardController')


// Carrega Pessoas
routes.post('/pessoas', DashboardController.carregaPessoas);

// Carrega Pessoas do ID Informado
routes.get('/proximo-id', DashboardController.ProximoId);

// Salva Pessoas
routes.post('/insere-pessoas', DashboardController.inserePessoas);

// Atualizar Pessoas
routes.put('/atualiza-pessoas', DashboardController.atualizaPessoas);

// Deleta Pessoas
routes.post('/deleta-pessoas', DashboardController.deletaPessoas);

// Busca Ultima Matricula
routes.get('/matricula', DashboardController.BuscaProximoNumeroMatricula);



module.exports = routes;