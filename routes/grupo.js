const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const grupoController = require('../controllers/grupo-controller');

//RETORNA TODOS OS PEDIDOS
router.get('/', grupoController.getGrupo); 
   
//RETORNA PELO ID DO PEDIDO
router.get('/:id_grupo', grupoController.getUmGrupo);


//INSERE UM PEDIDO
router.post('/',grupoController.postGrupo); 

//UPDATE DOS PEDIDOS
router.patch('/',grupoController.updateGrupo);

//DELETA UM PEDIDO
router.delete('/',grupoController.deleteGrupo);   


module.exports = router;

