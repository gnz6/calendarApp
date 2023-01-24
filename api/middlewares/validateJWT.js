const {response} = require('express');
const jwt = require('jsonwebtoken');


const validateJWT = (req, res = response, next) => {

    const token = req.headers['x-access-token'];
    if(!token) return res.status(401).send({message: 'No token provided.'});
    
    try {
        const validateToken = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = validateToken.uid;
        req.name = validateToken.name;
       

        next();
        
    } catch (error) {
      console.log(error);
      return res.status(401).send({ok:false, msg: 'Invalid token.'});
        
    }
}


module.exports = {
    validateJWT
}