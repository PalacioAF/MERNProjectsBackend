//Proyects Route
const express=require('express');
const router=express.Router();
const ProyectController=require('../controllers/proyectController')
const auth = require('../middleware/auth');

// api/Proyect

router.post('/',ProyectController.createProyect);

router.get('/',auth,ProyectController.getProyect);

router.put('/:id',ProyectController.updateProyect);  

router.delete('/:id',ProyectController.deleteProyect);

module.exports=router;