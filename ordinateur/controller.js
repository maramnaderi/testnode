var express = require('express');
var router = express.Router();
const { list, create, update, deleteU, searchByPrice , ordinateurView } = require('./ordinateurService');

router.get('/list', list);
router.post('/create', create);
router.put('/update/:id', update);
router.delete('/delete/:id', deleteU);
router.get('/search', searchByPrice);
router.get('/searchPage', ordinateurView);

module.exports = router;