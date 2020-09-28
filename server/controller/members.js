const express = require('express');
const router = express.Router();
const User = require('../model/user');
const auth = require('../middleware/auth');

//Handlers de requição dos Membros

router.post('/', auth, async (req, res) => {
    const email = req.headers.email
    const churrasID = req.headers.churrasid

    try{

        if(!email || !churrasID) return res.send({ error : 'Dados insuficientes'});

        await User.findOne({email}).then(user => {

            return user.churras.id(churrasID).members

        }).then(members => res.send({members}));

    }catch (err){
        return res.send({ error : err });
    }
});

router.post('/create', auth, async (req, res) => {
    const email = req.headers.email;
    const churrasID = req.headers.churrasid;
    const member = req.body;

    try{

        if(!email || !churrasID) return res.send({ error : 'Dados insuficientes'});

        await User.findOne({email}).then(user => {

            user.churras.id(churrasID).members.push(member)

            user.save();

            return user.churras.id(churrasID).members

        }).then(members => res.send({members}));

    }catch (err){
        return res.send({ error : err });
    }
});

router.post('/update', auth, async (req, res) => {
    const email = req.headers.email;
    const churrasID = req.headers.churrasid;
    const member = req.body;

    try{

        if(!email || !churrasID) return res.send({ error : 'Dados insuficientes'});

        await User.findOne({email}).then(user => {

            user.churras.id(churrasID).members.id(member._id).set(member)

            user.save();

            return  user.churras.id(churrasID).members

        }).then(members => res.send({members}));

    }catch (err){
        return res.send({ error : err });
    }
});

router.post('/remove', auth, async (req, res) => {
    const email = req.headers.email;
    const churrasID = req.headers.churrasid;
    const member = req.body;

    try{

        if(!email || !churrasID) return res.send({ error : 'Dados insuficientes'});

        await User.findOne({email}).then(user => {

            user.churras.id(churrasID).members.pull(member._id)

            user.save();

            return user.churras.id(churrasID).members

        }).then(members => res.send({members}));

    }catch (err){
        return res.send({ error : err });
    }
});



module.exports = router;