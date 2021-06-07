const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const usuariosController = require('../controllers/usuarios-controller');

//RETORNA TODOS OS USUARIOS
router.get('/', usuariosController.getUsuarios);

//RETORNA OS DADOS DE UM USUARIO
router.get('/:id_usuario', usuariosController.getUmUsuario);

//DELETA UM USUARIO
router.delete('/', usuariosController.deleteUsuario);

router.post('/cadastro', usuariosController.cadastroUsuario);

router.post('/login', usuariosController.loginUsuario); 

module.exports = router;