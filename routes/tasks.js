//Tasks Route
const express=require('express');
const router=express.Router();
const TaskController=require('../controllers/taskController')
const auth = require('../middleware/auth');

// api/Task

router.post('/',auth,TaskController.createTask);

router.get('/',auth,TaskController.getTask);

router.put('/:id',auth,TaskController.updateTask);

router.delete('/:id',auth,TaskController.deleteTask);

module.exports=router;