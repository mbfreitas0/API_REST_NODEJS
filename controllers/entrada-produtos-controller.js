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

exports.postEntrada = (req, res, next) =>{
    console.log(req.file);
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'INSERT INTO entrada_produtos(id_produto, qtde, valor_unitario, data_entrada) VALUES (?, ?, ?, ?)',
            [req.body.status, req.body.descricao, req.body.estoque_min, req.body.estoque_max],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado:{
                        id: result.id,
                        id_produto: req.body.id_produto,
                        qtde: req.body.qtde,
                        valor_unitario: req.body.valor_unitario,
                        data_entrada: req.body.data_entrada,                        
                    }                            
                }
                return res.status(201).send(response);
            }
        )   
    });
}

exports.updateEntrada = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'UPDATE entrada_produtos SET id_produto = ?, qtde = ?, valor_unitario = ?, data_entrada = ? WHERE id = ?',
           [req.body.id_produto, req.body.qtde, req.body.valor_unitario, req.body.data_entrada, req.params.id],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    estoqueAtualizado:{
                        id: req.params.id,
                        id_produto: req.body.id_produto,
                        qtde: req.body.qtde,
                        valor_unit: req.body.valor_unit,
                        data_entrada: req.body.data_entrada,                        
                    }
                            
                }
                return res.status(202).send(response);
            }
        )   
    });
}

exports.deleteEntrada = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'DELETE FROM entrada_produtos WHERE id = ?',
            [req.body.id],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'produto removido com sucesso',
                    request: {
                       
                        body:{
                            id_produto: 'String',
                            qtde: 'String',
                            valor_unitario: 'Number',
                            data_entrada: 'Number',
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}