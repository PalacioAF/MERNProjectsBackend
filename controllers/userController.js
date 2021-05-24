const User=require('../models/user');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.createUser=async (req,res)=>{
    try {
        const {firstName,lastName,userName,email,password,role}=req.body;
        const newUser={};

        let user=await User.findOne({email});

        if(user){
            return res.status(400).json({msg:'User Already Exists'});
        }
    
        newUser.firstName=firstName;
        newUser.lastName=lastName;
        newUser.userName=userName;
        newUser.email=email;
        //Hashear el password
        const salt=await bcryptjs.genSalt(10);
        newUser.password=await bcryptjs.hash(password,salt);
        newUser.role=role;
        
        //crea el nuevo usuario
        user=new User(newUser);

        //guarda usuario
        await user.save();

        //crear y firmar el JWT
        const payload={
            user:{
                id:user.id,
                role:user.role
            }
        }

        //firmar el JWT
        jwt.sign(payload,process.env.SECRET,{
            expiresIn:3600
        },(error,token)=>{
            if(error) throw error;
            //Mensaje
            res.json({msg:'User Created Successfully'});
        }
        )
    } catch (error) {
        res.status(500).json({msg:'An error occurred please try again'});
    }
    
}

exports.getUser = async (req, res) => {
    try {
        // Obtener los usuarios
        const users = await User.find(req.query);
        res.json({ output:users });

    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred please try again');
    }
}

exports.getUserId = async (req, res) => {
    try {
        // Obtener usuario por id
        const user = await User.findById(req.params.id);
        res.json({ output:user });
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred please try again');
    }
}

exports.updateUser=async (req,res)=>{
    try {
        let user=await User.findById(req.params.id);

        if(!user){
            return res.status(400).json({msg:'User Not Found'});
        }

        const {firstName,lastName,userName,email,password,role}=req.body;
        const newUser={};
    
        newUser.firstName=firstName;
        newUser.lastName=lastName;
        newUser.userName=userName;
        newUser.email=email;
        //Hashear el password
        const salt=await bcryptjs.genSalt(10);
        newUser.password=await bcryptjs.hash(password,salt);
        newUser.role=role;

        // actualizar
        user = await User.findByIdAndUpdate({ _id: req.params.id }, { $set : newUser}, { new: true });

        res.json({msg:'User Update Successfully'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'An error occurred please try again'});
    }
}

exports.deleteUser = async (req, res ) => {
    try {
        // revisar el ID 
        let user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({msg: 'User Not Found'})
        }
        await User.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'User Deleted'})

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'An error occurred please try again'});
    }
}