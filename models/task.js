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
        ref: 'Proyects'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }
});

module.exports = mongoose.model('tasks', TaskSchema);