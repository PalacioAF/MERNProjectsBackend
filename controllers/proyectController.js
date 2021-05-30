const Proyect=require('../models/proyect');
const Task=require('../models/task');

exports.createProyect=async (req,res)=>{
    try {
        const {name,description,creator,team}=req.body;
        const newProyect={};

        let proyect=await Proyect.findOne({name});

        if(proyect){
            return res.status(400).json({msg:'Project Already Exists'});
        }
    
        newProyect.name=name;
        newProyect.description=description;
        newProyect.creator=creator;
        newProyect.team=team;
        
        //crea el nuevo usuario
        proyect=new Proyect(newProyect);

        //guarda usuario
        await proyect.save();

        //Mensaje
         res.status(201).json({msg:'Correctly Created Project'});

    } catch (error) {
        res.status(500).json({msg:'An error occurred please try again'});
    }
}

exports.getProyect = async (req, res) => {
    try {
        // Obtener Proyectos
        let proyects
        if(req.user.role=="admin"){
             proyects = await Proyect.find().populate('team').populate('creator')
        }
        else if(req.user.role=="user"){
             proyects = await Proyect.find({team:req.user.id}).populate('team').populate('creator')

        }
        res.json({ output:proyects });
    } catch (error) {
        res.status(500).send('An error occurred please try again');
    }
}


exports.updateProyect=async (req,res)=>{
    try {
        let proyect = await Proyect.findById(req.params.id);
        if(!proyect){
            return res.status(400).json({msg:'Project Not Found'});
        }

        const {name,description,creator,team}=req.body;
        const newProyect={};
    
        newProyect.name=name;
        newProyect.description=description;
        newProyect.creator=creator;
        newProyect.team=team;

        // actualizar
        proyect = await Proyect.findByIdAndUpdate({ _id: req.params.id }, { $set : newProyect}, { new: true });

        res.json({msg:'Proyect Update Successfully'});

    } catch (error) {
        res.status(500).json({msg:'An error occurred please try again'});
    }
}

exports.deleteProyect = async (req, res ) => {
    try {
        // revisar el ID 
        let proyect = await Proyect.findById(req.params.id);
        if(!proyect) {
            return res.status(400).json({msg: 'Project Not Found'})
        }

        await Task.deleteMany({ proyect: req.params.id });
        await Proyect.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Project Deleted'})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'An error occurred please try again'});
    }
}
