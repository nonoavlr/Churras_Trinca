const jwt = require('jsonwebtoken');

//Middleware com JWT para autenticar as requisições

const auth = (req, res, next) => {
    const token = req.headers.jwt;

    if(!token) return res.send({ error : 'Não autenticado' });

    jwt.verify(token, 'trincaisthebest', (err, decoded) => {

        if (err) return res.send({ error : 'Token inválido! '});
        
        return next();
    });
}

module.exports = auth;