const mysql = require('../mysql').pool;

exports.getMarca = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM marca;',
            (error, result, fields) => {
                if(error){return res.status(500).send({ error : error })}
                const response = {
                 quantidade: result.length,
                 marca: result.map(mar =>{
                     return {
                         id_marca: mar.id_marca,
                         nome: mar.nome,
                         request: {
                             tipo: 'GET',
                             descricao: 'Retorna os detalhes de uma marca específica',
                             url: 'http://localhost:3000/marca/' + mar.id_marca
                           }   
                        }
                   })   
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.getUmaMarca = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM marca WHERE id_marca = ?;',
            [req.params.id_marca],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado marca com este ID'
                        })
                        
                    }                
                const response = {
                    mensagem: 'Marca inserida com sucesso',
                    produto:{
                        id_marca:result[0].id_marca,
                        nome: result[0].nome,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todas as marcas',
                            url: 'http://localhost:3000/marca/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )
    });
}

exports.postMarca = (req, res, next) =>{
    console.log(req.file);
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'INSERT INTO marca(nome) VALUES (?)',
            [req.body.nome, req.file.path],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Marca inserida com sucesso',
                    marcaCriada:{
                        id_marca: req.body.id_marca,
                        nome: req.body.nome,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere uma marca',
                            url: 'http://localhost:3000/marca/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )   
    });
}

exports.updateMarca = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'UPDATE marca SET nome = ? WHERE id_grupo = ?',
            [req.body.nome,],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'Marca atualizada com sucesso',
                    marcaAtualizado:{
                        id_marca: req.body.id_marca,
                        nome: req.body.nome,                        
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna os detalhes de uma marca específica',
                            url: 'http://localhost:3000/marca/' + req.body.id_marca
                        }
                    }
                            
                }
                return res.status(202).send(response);
            }
        )   
    });
}

exports.deleteMarca = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'DELETE FROM marca WHERE id_marca = ?',
            [req.body.id_marca],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'marca removida com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um marca',
                        url: 'http://localhost:3000/marca/',
                        body:{
                            id_grupo: 'Number',
                            nome: 'String',
                            
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}