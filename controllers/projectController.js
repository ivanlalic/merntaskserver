const Project = require('../models/Project');
const { validationResult } = require('express-validator');



exports.createProject = async (req, res) => {

    //Check if there are errors
    const errors = validationResult(req); //returns an array
    if (!errors.isEmpty() ) { //this means erros is not empty
        return res.status(400).json({ errors: errors.array() })
    } 

    try {
        //Create a new project
        const project = new Project(req.body);

        //Save user that created via JWT
        project.createdby = req.user.id;

        //Save project
        project.save();
        res.json(project);


    } catch (error) {
        console.log(error);
        res.status(500).send('There is a error');
    }
}

//Get all projects of actual user

exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ createdby: req.user.id }).sort({ date: -1 }); //that req.user is stored en authM.js so we can use it
        res.json({ projects })
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error');
    }
} 

//Update a project
exports.updateProjects = async (req, res) => {
    //Check if there are errors
    const errors = validationResult(req); //returns an array
    if (!errors.isEmpty() ) { //this means erros is not empty
        return res.status(400).json({ errors: errors.array() })
    }

    //Extract project information 
    const { name } = req.body;
    const newProject = {};

    if(name) {
        newProject.name = name;
    }

    try {
        //check id
        let project = await Project.findById(req.params.id);            //Project is models

        //if projects exist or not
        if(!project) {
            return res.status(404).json({msg: 'Project not found'});
        }
        //verify project creator
        if(project.createdby.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }
        //update project
        project = await Project.findByIdAndUpdate({ _id: req.params.id}, { $set: newProject }, { new: true });
        res.json({project});

    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
}

//Delete a project with ID
exports.deleteProjects = async (req, res) => {
    try {
        //check id
        let project = await Project.findById(req.params.id);            //Project is models

        //if projects exist or not
        if(!project) {
            return res.status(404).json({msg: 'Project not found'});
        }
        //verify project creator
        if(project.createdby.toString() !== req.user.id) {
            return res.status(401).json({msg: 'Not authorized'});
        }

        //Delete project
        await Project.findOneAndRemove({ _id: req.params.id });
        res.json({msg: 'Project deleted'});

    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error')
    }
}