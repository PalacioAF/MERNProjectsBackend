//Proyects Route
const express=require('express');
const router=express.Router();
const ProyectController=require('../controllers/proyectController')
const auth = require('../middleware/auth');

// api/Proyect

router.post('/',auth,ProyectController.createProyect);

router.get('/',auth,ProyectController.getProyect);

router.put('/:id',auth,ProyectController.updateProyect);  

router.delete('/:id',auth,ProyectController.deleteProyect);

module.exports=router;