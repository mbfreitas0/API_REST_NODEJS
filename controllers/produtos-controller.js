const mysql = require('../mysql').pool;

exports.getProdutos = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM produtos;',
            (error, result, fields) => {
                if(error){return res.status(500).send({ error : error })}
                const response = {
                 
                 produtos: result.map(prod =>{
                     return {
                         id: prod.id,
                         status: prod.status,
                         descricao: prod.descricao,
                         estoque_min: prod.estoque_min,
                         estoque_max: prod.estoque_max,
                                                   
                        }
                   })   
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.getUmproduto = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM produtos WHERE id = ?;',
            [req.params.id],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado produto com este ID'
                        })
                        
                    }                
                const response = {
                    
                    produto:{
                        id: result[0].id,
                        status: result[0].status,
                        descricao: result[0].descricao,
                        estoque_min: result[0].estoque_min,
                        estoque_max: result[0].estoque_max,
                    }
                            
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
           [req.body.status, req.body.descricao, req.body.estoque_min, req.body.estoque_max],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoAtualizado:{
                        id: req.body.id,
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