const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Read token from header
    const token = req.header('x-auth-token');

    //Check if there is no token
    if(!token) {
        return res.status(401).json({msg: 'There is no token, access denied'})
    }



    //validate token
    try {
        const hashed = jwt.verify(token, process.env.SECRET);
        req.user = hashed.user; //adding hashed to the object user in payload of userController
        next();
        
    } catch (error) {
        res.status(401).json({msg:'Token is not valid'});
    }

}