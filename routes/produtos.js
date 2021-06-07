const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const multer = require('multer');
const login = require('../middleware/login');
const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});
const fileFilter = (req, file, cb)=>{
    if (file.mimetype === 'image/jpg' || file.mimetype ==='image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }
}
const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:fileFilter
 });
 const produtosController = require('../controllers/produtos-controller');

//RETORNA TODOS OS PRODUTOS
router.get('/', produtosController.getProdutos);
//INSERE UM PRODUTO
router.post('/',login.obrigatorio, upload.single('produto_imagem'),produtosController.postProduto);  

//RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', produtosController.getUmproduto);

//ALTERA UM PRODUTO
router.patch('/',login.obrigatorio, produtosController.updateProduto);

//DELETA UM PRODUTO
router.delete('/', login.obrigatorio, produtosController.deleteProduto);   


module.exports = router;
