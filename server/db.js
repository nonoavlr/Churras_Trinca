const mongoose = require('mongoose');

//Configuração do db

const url = 'mongodb+srv://usuario_admin:user4dmin@clusterapi.owrwm.mongodb.net/<dbname>?retryWrites=true&w=majority';
const options = { reconnectTries : Number.MAX_VALUE, reconnectInterval : 500, poolSize : 5, useNewUrlParser : true };

mongoose.connect(url, options);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
    console.log('Aplicação conectada ao banco de dados!')
});
 
module.exports = mongoose;