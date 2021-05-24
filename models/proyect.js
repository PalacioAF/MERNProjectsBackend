const mongoose=require('mongoose');

const ProyectSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    team:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    registered:{
        type:Date,
        default:Date.now()
    },
});

module.exports=mongoose.model('proyects',ProyectSchema);