const express = require('express');
const ListController = require('../controllers/ListController');
const { isLoggedIn } = require('../lib/auth');
const routerList = express.Router();

routerList.get('/lists', isLoggedIn, ListController.index2);
routerList.get('/createLista',isLoggedIn, ListController.createLista);
routerList.post('/createLista', isLoggedIn,ListController.storeLista);
routerList.post('/tasks/deleteLista', isLoggedIn,ListController.destroyLista);

///////ORDEMAMIENTO/////////
routerList.get('/listitem/:id', isLoggedIn,ListController.index3);
routerList.get('/tasks/expel/:id',isLoggedIn, ListController.updateexpel);

routerList.get('/ordenarfCreacion/:id',isLoggedIn, ListController.itemsFecha);
routerList.get('/ordenarflimite/:id',isLoggedIn, ListController.itemsFlimite);
routerList.get('/ordenarPrioridad/:id', isLoggedIn,ListController.itemsPrioridad);

module.exports = routerList;