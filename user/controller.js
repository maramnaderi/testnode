var express = require('express')
var router = express.Router()
const { list, create, update, deleteU,findById,findByEmail,findByNom,findByAge } = require('./userService')
//var validate = require('../middleware/validation')


router.get('/list', list)
router.post('/create',/* validate,*/ create);
router.post('/create/:age',/*validate,*/ create);


router.put('/update/:id', update)
router.delete('/delete/:id', deleteU)
router.get('/findById/:id', findById);
router.get('/findByNom/:nom', findByNom);
router.get('/findByEmail/:email', findByEmail);
router.get('/findByAge/:age', findByAge);


module.exports = router