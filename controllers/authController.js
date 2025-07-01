const User = require("../models/User")
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');



function createToken(id){
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn: "7d"});
}


const signIn= async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const alreadyExist= User.findOne({email})
        if (alreadyExist) return res.status(400).json({msg:"user already exists"});
        const currnetUser=await User.create({name,email,password});
        const token= createToken(currnetUser._id);
        res.json({user:{name:currnetUser.name,email:currnetUser.email},token})
    }
    catch(err){
        console.log('errorrrr-------')
    }

}


module.exports={signIn}