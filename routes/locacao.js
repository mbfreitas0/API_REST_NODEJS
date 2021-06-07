const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const locacaoController = require('../controllers/locacao-controller');

//RETORNA TODAS AS LOCAÇÕES
router.get('/', locacaoController.getLocacao); 
   
//RETORNA PELO ID DA LOCACAO
router.get('/:id_locacao', locacaoController.getUmaLocacao);


//INSERE UMA LOCACAO
router.post('/',locacaoController.postLocacao); 

//UPDATE DAS LOCACAO
router.patch('/',locacaoController.updateLocacao);

//DELETA UMA LOCACAO
router.delete('/',locacaoController.deleteLocacao);   


module.exports = router;

