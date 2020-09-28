const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const auth = require('../middleware/auth');

//Handlers de requição do Usuário

function createToken(email){

    return jwt.sign({id : email}, 'trincaisthebest', { expiresIn : '7d' });
};

router.post('/register', async (req, res) => {
    try{

        const { name, email, password } = req.body

        if(!name || !email || !password) return res.send({ error : 'Dados insuficientes' });
        
        if (await User.findOne({ email })) return res.send({ error : 'Usuário já cadastrado!' });

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user })

    }catch (err) {
        return res.send({ error : `${err}` })
    }
});

router.post('/login', async (req, res) => {
    try{

        const { email, password } = req.body;

        if(!email || !password) return res.send({ error : 'Dados insufienctes!' });

        const user = await User.findOne({ email }).select('+password');

        if (!user) return res.send({ error : 'Usuário não registrado!' });

        const key_ok = await bcrypt.compare(password, user.password);

        if (!key_ok) return res.send({ error : 'Erro ao autenticar usuário!' });
        user.password = undefined;

        return res.send({ user : user.email, token : createToken(user.email)})
    }
    catch (err) {

        return res.send({ error : err })
    }
});

router.post('/auth', auth, async (req, res) => {
    try{

        const email = req.headers.email;

        if(!email) return res.send({ error : 'Dados insufienctes!' });

        const user = await User.findOne({ email })

        if (!user) return res.send({ error : 'Usuário não registrado!' });

        return res.send({ user : user.email, token : createToken(user.email) })
    }
    catch (err) {

        return res.send({ error : err })
    }
});

module.exports = router;