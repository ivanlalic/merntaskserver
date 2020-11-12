const User = require('../models/User'); 
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.createUser = async (req, res) => {
    
 
    //Check and validate if there are errors in data submited
    const errors = validationResult(req); //returns an array
    if (!errors.isEmpty() ) { //this means erros is not empty
        return res.status(400).json({ errors: errors.array() })
    } 

    //Extract email and password
    const { email, password } = req.body;

 
    try {
        //Validate user is unique //User is the model
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exist' })
        }

        //Create new user
        user = new User(req.body);

        //hash password
        const salt = await bcryptjs.genSalt(10); 
        user.password = await bcryptjs.hash(password, salt);
        
    
        //Save new user
        await user.save();

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
        res.status(400).send('hubo un error');
    }
};