const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');

//Create a new task
exports.createTask = async(req, res) => {

    //Check if there are errors
    const errors = validationResult(req); //returns an array
    if (!errors.isEmpty() ) { //this means erros is not empty
        return res.status(400).json({ errors: errors.array() })
    } 

    //Extract project and check if it exist
    const{ project } = req.body;

    try {

        const projectExist = await Project.findById(project);
        if(!projectExist) {
            return res.status(404).json({msg: 'Project not found'});
        }

        //check if actual project belongs to auth user
        if(projectExist.createdby.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        //Create task
        const task = new Task(req.body);
        await task.save();
        res.json({ task })
        
    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }

}

//Get tasks by project
exports.getTasks = async(req, res) => {

    try {
        //Extract project and check if it exist
        const{ project } = req.query;

        const projectExist = await Project.findById(project);
        if(!projectExist) {
            return res.status(404).json({msg: 'Project not found'});
        }

        //check if actual project belongs to auth user
        if(projectExist.createdby.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        //Get tasks by project
        const tasks = await Task.find({ project }).sort({ created: -1 });
        res.json({ tasks });



    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }
}

//Update Task
exports.updateTask = async (req, res) => {
    try {
        //Extract project and check if it exist
        const{ project, name, status } = req.body;

        //Check if task exist or not
        let task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).json({msg: 'Task does not exist'});
        }

        //Extract project
        const projectExist = await Project.findById(project);
        

        //check if actual project belongs to auth user
        if(projectExist.createdby.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        //Create object with this information
        const newTask = {};

            newTask.name = name;
            newTask.status = status;
        
        //Save task
        task = await Task.findOneAndUpdate({ _id : req.params.id }, newTask, { new: true});

        res.json({ task })


    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }
}

//Delete Task
exports.deleteTask = async(req, res) => {
    try {
        //Extract project and check if it exist
        const{ project } = req.query;

        //Check if task exist or not
        let task = await Task.findById(req.params.id);
        if(!task) {
            return res.status(404).json({msg: 'Task does not exist'});
        }

        //Extract project
        const projectExist = await Project.findById(project);
        

        //check if actual project belongs to auth user
        if(projectExist.createdby.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        //Delete task
        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({msg: 'Task deleted'});


    } catch (error) {
        console.log(error);
        res.status(500).send('Error')
    }
}