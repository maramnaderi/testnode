var express = require('express')
var router = express.Router()
const { list, create, update, deleteU,findById,findByEmail,findByNom,findByAge,chatView} = require('./chatService')


router.get('/list', list)
router.post('/create/', create)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteU)
router.get('/findById/:id', findById);
router.get('/findByNom/:nom', findByNom);
router.get('/findByEmail/:email', findByEmail);
router.get('/findByAge/:age', findByAge);
router.get('/chatView',chatView);












module.exports = router