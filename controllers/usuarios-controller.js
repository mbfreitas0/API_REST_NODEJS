const mysql = require('../mysql').pool;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.cadastroUsuario = (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})}
        conn.query('SELECT * FROM usuarios WHERE email = ?',
        [req.body.email],(error, results)=>{
            if(error){return res.status(500).send({error:error})}
                if(results.length > 0){
                    res.status(409).send({mensagem: 'Usuário já cadastrado'})
                    }else{
                    bcrypt.hash(req.body.senha, 10, (errBcrypt, hash)=>{
                        if(errBcrypt){return res.status(500).send({error:errBcrypt})}
                        conn.query(
                            'INSERT INTO usuarios (email, senha) VALUES (?, ?)',
                            [req.body.email, hash],
                            (error, results)=>{
                                conn.release();
                                if(error){return res.status(500).send({error:error})}
                                response = {
                                    mensagem: 'Usuário criado com sucesso !',
                                    usuarioCriado: {
                                        id_usuario: results.id_usuario,
                                        email: req.body.email
                                    }
                                }
                                return res.status(201).send(response);
                            }
                        ) 
                    })  

                }
        })
        
        
    });
}

exports.getUsuarios = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM usuarios;',
            (error, result, fields) => {
                if(error){return res.status(500).send({ error : error })}
                const response = {
                 
                 usuarios: result.map(usu =>{
                     return {
                         id_usuario: usu.id_usuario,
                         email: usu.email,
                         senha: usu.senha,
                                                   
                        }
                   })   
                }
                return res.status(200).send(response);
            }
        )
    });
}

exports.getUmUsuario = (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error:error })}
        conn.query(
            'SELECT * FROM usuarios WHERE id_usuario = ?;',
            [req.params.id_usuario],
            (error, result, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}

                    if (result.length == 0) {
                        return res.status(404).send({
                          mensagem: 'Não foi encontrado usuário com este ID'
                        })
                        
                    }                
                const response = {
                    mensagem: 'Usuario inserido com sucesso',
                    usuario:{
                        id_usuario: result[0].id_usuario,
                        email:result[0].email,
                        senha:result[0].senha,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os usuarios',
                            url: 'http://localhost:3000/usuarios/'
                        }
                    }
                            
                }
                return res.status(201).send(response);
            }
        )
    });
}

exports.deleteUsuario = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){return res.status(500).send({ error : error })}
        conn.query(
           'DELETE FROM usuarios WHERE id_usuario = ?',
            [req.body.id_usuario],
            (error, resultado, field) => {
                conn.release();
                if(error){return res.status(500).send({ error : error })}
                const response = {
                    mensagem: 'usuario removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um usuario',
                        url: 'http://localhost:3000/usuarios/cadastro',
                        body:{
                            email: 'String',
                            senha: 'String',
                            
                        }
                    }
                }
                return res.status(202).send(response);
            }
        )   
    });
}

exports.loginUsuario = (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})}
                const query = `SELECT * FROM usuarios WHERE email = ?`;
                conn.query(query, [req.body.email], (error, results, fields)=>{
                conn.release();
            if(error){return res.status(500).send({error:error})}
                if(results.length < 1) {
                    return res.status(401).send({mensagem:'Falha na autenticação'})
                    }
                    bcrypt.compare(req.body.senha, results[0].senha, (err, result)=>{
                        if(err){
                            return res.status(401).send({mensagem: 'Falha na autenticação'})}
                                if(result){
                                    const token = jwt.sign({
                                    id_usuario: results[0].id_usuario,
                                    email: results[0].email
                                    },
                                    process.env.JWT_KEY,
                                     {
                                    expiresIn: "24h"
                                    });
                                    return res.status(200).send({mensagem:'Autenticado com sucesso', token: token})}

            });    
        });
     

    });        

}