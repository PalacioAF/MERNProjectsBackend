//User Route
const express=require('express');
const router=express.Router();
const UserController=require('../controllers/userController')
const auth = require('../middleware/auth');

// api/usuarios

router.post('/',auth,UserController.createUser);

router.get('/',auth,UserController.getUser);

router.get('/:id',auth,UserController.getUserId);   

router.put('/:id',auth,UserController.updateUser);

router.delete('/:id',auth,UserController.deleteUser);  

module.exports=router;