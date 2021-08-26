const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const entradaprodutoController = require('../controllers/entrada-produtos-controller');

//RETORNA TODOS AS ENTRADAS DE  PRODUTOS
router.get('/', entradaprodutoController.getEntradaProdutos);

//INSERE UMA ENTRADA DE PRODUTO
router.post('/', entradaprodutoController.postEntrada);

//RETORNA OS DADOS DE UMA ENTRADA DE PRODUTO
router.get('/:id', entradaprodutoController.getUmaEntrada);

//ALTERA UMA ENTRADA DE PRODUTO
router.put('/:id', entradaprodutoController.updateEntrada);

//DELETA UMA ENTRADA DE PRODUTO
router.delete('/:id', entradaprodutoController.deleteEntrada);   


module.exports = router;
