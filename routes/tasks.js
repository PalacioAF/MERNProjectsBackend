//Tasks Route
const express=require('express');
const router=express.Router();
const TaskController=require('../controllers/taskController')

// api/Task

router.post('/',TaskController.createTask);

router.get('/',TaskController.getTask);

router.put('/:id',TaskController.updateTask);

router.delete('/:id',TaskController.deleteTask);

module.exports=router;