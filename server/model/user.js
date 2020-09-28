const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//Model do objeto. Cada usuário é um objeto com seus demais objetos (Churras e Membros)

const Members = new Schema({
    name : { type : String, required : true },
    paid : { type : Boolean, required : true },
    amount : { type : Number, required : true }
});

const Churras = new Schema({
    title : { type : String, required : true },
    date : { type : Date, required : true },
    members : [Members]
});


const UserSchema = new Schema({
    email : { type : String, required : true, unique : true, lowercase : true },
    password : { type : String, required : true },
    churras : [Churras]
});

UserSchema.pre('save', function(next){
    let user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, (err, encrypted) => {
        user.password = encrypted;
        return next();
    });
});

module.exports = mongoose.model('User', UserSchema);