const mysql = require('../mysql').pool;

exports.getEntradaProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM entrada_produtos;',
            (error, result, fields) => {
                if(error){return res.status(500).send({ error : error })}
                const response = {
                 
                 produtos: result.map(prod =>{
                     return {
                         id: prod.id,
                         id_produto: prod.id_produto,
                         qtde: prod.qtde,
                         valor_unitario: prod.valor_unitario,
                         data_entrada: prod.data_entrada,
                                                                            
                        }
                   })   
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.getUmaEntrada = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM entrada_produtos WHERE id = ?;',
            [req.params.id],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado entrada com este ID'
                        })
                        
                    }                
                const response = {                    
                   
                        id: result[0].id,
                        id_produto: result[0].id_produto,
                        qtde: result[0].qtde,
                        valor_unitario: result[0].valor_unitario,
                        data_entrada: result[0].data_entrada,                   
                            
                }
                return res.status(201).send(response);
            }
        )
    });
}

exports.postProduto = (req, res, next) =>{
    console.log(req.file);
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'INSERT INTO produtos(status, descricao, estoque_min, estoque_max) VALUES (?, ?, ?, ?)',
            [req.body.status, req.body.descricao, req.body.estoque_min, req.body.estoque_max],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado:{
                        id: result.id,
                        status: req.body.status,
                        descricao: req.body.descricao,
                        estoque_min: req.body.estoque_min,
                        estoque_max: req.body.estoque_max,                        
                    }                            
                }
                return res.status(201).send(response);
            }
        )   
    });
}

exports.updateProduto = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'UPDATE produtos SET status = ?, descricao = ?, estoque_min = ?, estoque_max = ? WHERE id = ?',
           [req.body.status, req.body.descricao, req.body.estoque_min, req.body.estoque_max, req.params.id],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoAtualizado:{
                        id: req.params.id,
                        status: req.body.status,
                        descricao: req.body.descricao,
                        estoque_min: req.body.estoque_min,
                        estoque_max: req.body.estoque_max,                        
                    }
                            
                }
                return res.status(202).send(response);
            }
        )   
    });
}

exports.deleteProduto = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'DELETE FROM produtos WHERE id = ?',
            [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um produto',
                        url: 'http://localhost:3000/produtos/',
                        body:{
                            status: 'String',
                            descricao: 'String',
                            estoque_min: 'Number',
                            estoque_max: 'Number',
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}