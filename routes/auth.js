// Routes to auth user
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const authM = require('../middleware/authM');

//Create user - Log In
// api/auth
router.post('/',
    authController.authUser
);

//Get auth user
router.get('/',
    authM,
    authController.getUserauth

)

module.exports = router;
