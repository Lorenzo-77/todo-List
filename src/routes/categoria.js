const express = require('express');
const CategoriController = require('../controllers/CategoriController');
const { isLoggedIn, auth } = require('../lib/auth');
const routerCategoria = express.Router();

routerCategoria.get('/createCategoria',isLoggedIn,auth("Admin"), CategoriController.createCategoria);
routerCategoria.post('/createCategoria',isLoggedIn,CategoriController.storeCategoria);

module.exports = routerCategoria;