const mongoose=require('mongoose');

const UsuarioSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    userName:{
        type:String,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        trim:true
    },
    register:{
        type:Date,
        default:Date.now()
    }
});

module.exports=mongoose.model('users',UsuarioSchema);