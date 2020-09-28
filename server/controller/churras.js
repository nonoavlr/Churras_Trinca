const express = require('express');
const router = express.Router();
const User = require('../model/user');
const auth = require('../middleware/auth');

//Handlers de requição dos Churras

router.post('/', auth, async (req, res) => {
    const email = req.headers.email

    try{

        if(!email) return res.send({ error : 'Dados insuficientes'});

        await User.findOne({email}).then(user => {

            return user.churras

        }).then(churras => res.send({churras}));

    }catch (err){
        return res.send({ error : err });
    }
});

router.post('/update', auth, async (req, res) => {
    const  email  = req.headers.email;
    const churras = req.body

    try{

        if(!email) return res.send({ error : 'Dados insuficientes'});

        await User.findOne({email}).then((user) => {

            user.churras.id(churras._id).set(churras)

            user.save();

            return user.churras

        }).then((churras) => res.send({churras}));

    }catch (err){
        return res.send({ error : err });
    }
});

router.post('/remove', auth, async (req, res) => {
    const  email  = req.headers.email;
    const churras = req.body;

    try{

        if(!email) return res.send({ error : 'Dados insuficientes'});

        await User.findOne({email}).then((user) => {

            user.churras.pull(churras._id);
            
            user.save();

            return user.churras

        }).then((churras) => res.send({churras}));

    }catch (err){
        return res.send({ error : err });
    }
});

router.post('/create', auth, async (req, res) => {
    const  email  = req.headers.email;
    const churras = req.body;

    try{

        if(!email) return res.send({ error : 'Dados insuficientes'});

        await User.findOne({email}).then((user) => {

            user.churras.push(churras);

            user.save();

            return user.churras

        }).then((churras) => res.send({churras}));

    }catch (err){
        return res.send({ error : err });
    }
});

module.exports = router;
