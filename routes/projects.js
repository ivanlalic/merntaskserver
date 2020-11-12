const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const authM = require('../middleware/authM'); //middleware
const { check } = require('express-validator');

//Create projects
// api/projects
router.post('/',
    authM,
    [
        check('name', 'Name is required').not().isEmpty()
    ],
    projectController.createProject
)

//Get all projects
router.get('/',
    authM,
    projectController.getProjects
)

//Update projects with ID
router.put('/:id',
    authM,
    [
        check('name', 'Name is required').not().isEmpty()
    ],
    projectController.updateProjects
)

//Delete a project
router.delete('/:id',
    authM,
    projectController.deleteProjects
)

module.exports = router;

