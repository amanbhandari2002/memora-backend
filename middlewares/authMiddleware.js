const jwt =require('jsonwebtoken');

const verifyToken =(req,res,next)=>{
    const authHeader= req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(!token) return res.status(401).json({message: 'No token provided'});
    try{
        const decode = jwt.verify(token, process.env.JWT_KEY);
        req.user = decode;
        next();
    }catch(err){
        console.log('token verification failed:', err);
        res.status(401).json({message: 'Unauthorized access'});
    }

}

module.exports = verifyToken;