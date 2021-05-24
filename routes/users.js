//User Route
const express=require('express');
const router=express.Router();
const UserController=require('../controllers/userController')

// api/usuarios

router.post('/',UserController.createUser);

router.get('/',UserController.getUser);

router.get('/:id',UserController.getUserId);   

router.put('/:id', UserController.updateUser);

router.delete('/:id',UserController.deleteUser);  

module.exports=router;