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
                         id_produto: prod.id_produto,
                         id_grupo: prod.id_grupo,
                         id_marca: prod.id_marca,
                         id_locacao: prod.id_locacao,
                         nome: prod.nome,
                         custo: prod.custo,
                         preco: prod.preco,
                         qtd_estoque: prod.qtd_estoque,
                         imagem_produto: prod.imagem_produto,
                          
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
            'SELECT * FROM produtos WHERE id_produto = ?;',
            [req.params.id_produto],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado produto com este ID'
                        })
                        
                    }                
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produto:{
                        id_produto: result[0].id_produto,
                        id_grupo:result[0].id_grupo,
                        id_marca:result[0].id_marca,
                        id_locacao:result[0].id_locacao,
                        nome: result[0].nome,
                        preco: result[0].preco,
                        custo: result[0].custo,
                        qtd_estoque: result[0].qtd_estoque,
                        imagem_produto: result[0].imagem_produto,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os produtos',
                            url: 'http://localhost:3000/produtos/'
                        }
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
           'INSERT INTO produtos(id_grupo, id_marca, id_locacao, nome, preco, custo, qtd_estoque, imagem_produto) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.id_grupo, req.body.id_marca, req.body.id_locacao, req.body.nome, req.body.preco, req.body.custo, req.body.qtd_estoque, req.file.path],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado:{
                        id_produto: result.id_produto,
                        id_grupo: req.body.id_grupo,
                        id_marca: req.body.id_marca,
                        id_locacao: req.body.id_locacao,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        custo: req.body.custo,
                        qtd_estoque: req.body.qtd_estoque,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um produto',
                            url: 'http://localhost:3000/produtos/'
                        }
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
           'UPDATE produtos SET id_grupo = ?, id_marca = ?, id_locacao = ?, nome = ?, preco = ?, custo = ?, qtd_estoque = ? WHERE id_produto = ?',
           [req.body.id_grupo, req.body.id_marca, req.body.id_locacao, req.body.nome, req.body.preco, req.body.custo, req.body.qtd_estoque],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Produto atualizado com sucesso',
                    produtoAtualizado:{
                        id_produto: req.body.id_produto,
                        id_grupo: req.body.id_grupo,
                        id_marca: req.body.id_marca,
                        id_locacao: req.body.id_locacao,
                        nome: req.body.nome,                        
                        preco: req.body.preco,
                        custo: req.body.custo,
                        qtd_estoque: req.body.qtd_estoque,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de um produto específico',
                            url: 'http://localhost:3000/produtos/' + req.body.id_produto
                        }
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
           'DELETE FROM produtos WHERE id_produto = ?',
            [req.body.id_produto],
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
                            id_grupo: 'Number',
                            id_marca: 'Number',
                            id_locacao: 'Number',
                            nome: 'String',
                            preco: 'Number',
                            custo: 'Number',
                            qtd_estoque: 'Number'

                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}