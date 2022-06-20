const express = require('express');
const ItemsController = require('../controllers/ItemsController');
const { isLoggedIn } = require('../lib/auth');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/tasks',isLoggedIn, ItemsController.index);
router.get('/create',isLoggedIn, ItemsController.create);
router.post('/create', isLoggedIn,ItemsController.store);
router.post('/tasks/delete',isLoggedIn, ItemsController.destroy);
router.get('/tasks/edit/:id',isLoggedIn, ItemsController.edit);
router.post('/tasks/edit/:id',isLoggedIn, ItemsController.update);
router.get('/tasks/edit-add/:id', isLoggedIn,ItemsController.editadd);
router.post('/tasks/edit-add/:id', isLoggedIn,ItemsController.updateadd);

module.exports = router;