const express = require('express');
const router = express.Router();
const user = require('./controller/user');
const churras = require('./controller/churras')
const members = require('./controller/members')

//Controle das rotas
router.use('/user', user);
router.use('/churras', churras);
router.use('/members', members);

module.exports = router;