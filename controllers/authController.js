const User = require('../models/User'); 
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {

     //Check and validate if there are errors in data submited
     const errors = validationResult(req); //returns an array
     if (!errors.isEmpty() ) { //this means erros is not empty
         return res.status(400).json({ errors: errors.array() })
     } 

     //Extract user and password
     const {email, password} = req.body;

     try {
        //Check whether user is a registered one
        let user = await User.findOne({ email });
        if (!user) { // !user = if that user doesn't exist, so...
            return res.status(400).json({msg: 'User does not exist'}); 
        }              

        //Check password
        const rightPass = await bcryptjs.compare(password, user.password); //password is the one you are passing now, user.password is the stored in DB
        if(!rightPass) { //this means that password is incorrect
            return res.status(400).json({msg: 'Wrong password'})
        }

        //If both are correct (email and password)
         //Create and sign JSONWEBTOKEN-JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        // Sign the JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 //1hr
        }, (error, token) => {
            if(error) throw error;
            //Confirm message
            res.json({
                token
            });
        });

        
     } catch (error) { 
         console.log(error);
     }

}

//Get which user is auth
exports.getUserauth = async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password'); //let password aside  
        res.json({user});   


    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'Error'});
    }

}