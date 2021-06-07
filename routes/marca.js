const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const marcaController = require('../controllers/marca-controller');

//RETORNA TODAS AS MARCAS
router.get('/', marcaController.getMarca); 
   
//RETORNA PELO ID DA MARCA
router.get('/:id_marca', marcaController.getUmaMarca);


//INSERE UMA MARCA
router.post('/',marcaController.postMarca); 

//UPDATE DAS MARCAS
router.patch('/',marcaController.updateMarca);

//DELETA UMA MARCA
router.delete('/',marcaController.deleteMarca);   


module.exports = router;

