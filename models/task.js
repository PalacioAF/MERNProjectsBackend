const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    status: {
        type:String,
        required:true
    },
    proyect: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proyects'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = mongoose.model('tasks', TaskSchema);