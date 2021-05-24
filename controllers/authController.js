const User=require('../models/user');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

exports.authUser= async (req,res)=>{
        try {
            const{email,password}=req.body;

            let user=await User.findOne({email});

            //Revisar que sea un usuario registrado
            if(!user){
                return res.status(400).json({msg:'User does not exist'});
            }

            //revisar el password
            const passCorrect=await bcryptjs.compare(password,user.password);
            if(!passCorrect){
                return res.status(400).json({msg:'Incorrect Password'});
            }

            //si todo es correcto
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
                res.json({msg:'OK',token});
            }
            )
            
        } catch (error) {
            console.log(error);
            res.status(500).json({msg:'An error occurred please try again'});
        }

}

exports.authenticatedUser=async (req,res)=>{
    try {
        const user=await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:'An error occurred please try again'});
    }
}