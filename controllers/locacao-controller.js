const mysql = require('../mysql').pool;

exports.getLocacao = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM locacao;',
            (error, result, fields) => {
                if(error){return res.status(500).send({ error : error })}
                const response = {
                 quantidade: result.length,
                 locacao: result.map(loc =>{
                     return {
                         id_locacao: loc.id_locacao,
                         nome: loc.nome,
                         request: {
                             tipo: 'GET',
                             descricao: 'Retorna os detalhes de uma marca específica',
                             url: 'http://localhost:3000/locacao/' + loc.id_locacao
                           }   
                        }
                   })   
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.getUmaLocacao = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM locacao WHERE id_locacao = ?;',
            [req.params.id_locacao],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado locação com este ID'
                        })
                        
                    }                
                const response = {
                    mensagem: 'Locação inserida com sucesso',
                    produto:{
                        id_locacao:result[0].id_locacao,
                        nome: result[0].nome,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todas as locacoes',
                            url: 'http://localhost:3000/locacao/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )
    });
}

exports.postLocacao = (req, res, next) =>{
    console.log(req.file);
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'INSERT INTO locacao(nome) VALUES (?)',
            [req.body.nome, req.file.path],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Locacao inserida com sucesso',
                    marcaCriada:{
                        id_locacao: req.body.id_locacao,
                        nome: req.body.nome,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere uma locacao',
                            url: 'http://localhost:3000/locacao/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )   
    });
}

exports.updateLocacao = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'UPDATE locacao SET nome = ? WHERE id_locacao = ?',
            [req.body.nome,],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Locacao atualizada com sucesso',
                    locacaoAtualizado:{
                        id_locacao: req.body.id_locacao,
                        nome: req.body.nome,                        
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de uma locacao específica',
                            url: 'http://localhost:3000/locacao/' + req.body.id_locacao
                        }
                    }
                            
                }
                return res.status(202).send(response);
            }
        )   
    });
}

exports.deleteLocacao = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'DELETE FROM locacao WHERE id_locacao = ?',
            [req.body.id_locacao],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'locacao removida com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere uma locacao',
                        url: 'http://localhost:3000/locacao/',
                        body:{
                            id_locacao: 'Number',
                            nome: 'String',
                            
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}