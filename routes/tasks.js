const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authM = require('../middleware/authM'); //middleware
const { check } = require('express-validator');

//Create Task
// api/tasks
router.post('/',
    authM,
    [
        check('name', 'Name is required').not().isEmpty(),
        check('project', 'Project is required').not().isEmpty()
    ],
    taskController.createTask
);

//Get tasks by project
router.get('/',
    authM,
    taskController.getTasks

)


//Update Task
router.put('/:id',
    authM,
    taskController.updateTask
);

//Delete Task
router.delete('/:id',
    authM,
    taskController.deleteTask
)

module.exports = router;