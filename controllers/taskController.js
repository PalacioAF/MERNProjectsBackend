const Task=require('../models/task');
const Proyect = require('../models/proyect');

exports.createTask=async (req,res)=>{
    try {
        const {name,description,proyect,user}=req.body;
        const newTask={};

        const ProyectPresent = await Proyect.findById(proyect);
        if(!ProyectPresent) {
            return res.status(404).json({msg: 'Project Not Found'})
        }

        let task=await Task.findOne({name,proyect});

        if(task){
            return res.status(400).json({msg:'Task Already Exists'});
        }
    
        newTask.name=name;
        newTask.description=description;
        newTask.status='Backlog';
        newTask.proyect=proyect;
        newTask.user=user;
        
        //crea el nuevo usuario
        task=new Task(newTask);

        //guarda usuario
        await task.save();

        //Mensaje
         res.status(201).json({msg:'Correctly Created Task'});

    } catch (error) {
        res.status(500).json({msg:'An error occurred please try again'});
    }
}

exports.getTask = async (req, res) => {
    try {

        // Obtener Tareas de proyecto
        const { proyect } = req.query;
        const ProyectPresent = await Proyect.findById(proyect);
        if(!ProyectPresent) {
            return res.status(404).json({msg: 'Project Not Found'})
        }
        const tasks = await Task.find({ proyect });
        res.json({ output:tasks });
    } catch (error) {
        res.status(500).send('An error occurred please try again');
    }
}


exports.updateTask=async (req,res)=>{
    try {
        const {name,description,user}=req.body;
        
        let task = await Task.findById(req.params.id);
        if(!task){
            return res.status(400).json({msg:'Task Not Found'});
        }

        const newTask={};
    
        newTask.name=name;
        newTask.description=description;
        newTask.user=user;

        // actualizar
        task = await Task.findByIdAndUpdate({ _id: req.params.id }, { $set : newTask}, { new: true });

        res.json({msg:'Task Update Successfully'});

    } catch (error) {
        res.status(500).json({msg:'An error occurred please try again'});
    }
}

exports.deleteTask = async (req, res ) => {
    try {
        // revisar el ID 
        let task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(400).json({msg: 'Task Not Found'})
        }

        await Task.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Task Deleted'})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'An error occurred please try again'});
    }
}
