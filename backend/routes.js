const express = require("express")
const routes = express.Router()
const DashboardController = require ('./controllers/DashboardController')

//Rota GET
routes.get('/', DashboardController.index)




module.exports = routes;