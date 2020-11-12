// Routes to creat user
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

//Create user
// api/users

router.post('/',
    [
        check('name', 'Name is requiered').not().isEmpty(),
        check('email', 'Add a valid Email').isEmail(),
        check('password', 'Password should be at least 6 characters').isLength({min: 6}) 
    ],
    userController.createUser
);

module.exports = router;
