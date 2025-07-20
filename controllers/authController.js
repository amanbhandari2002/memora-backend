const User = require("../models/User")
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');



function createToken(id){
    return jwt.sign({id},process.env.JWT_KEY,{expiresIn: "7d"});
}


const registerUser= async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const alreadyExist= await User.findOne({email})
        if (alreadyExist) return res.status(400).json({msg:"user already exists"});
        const currnetUser=await User.create({name,email,password});
        const token= createToken(currnetUser._id);
        res.json({user:{name:currnetUser.name,email:currnetUser.email},token})
    }
    catch(err){
        console.log('errorrrr-------')
    }

}

const signIn = async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const inDBusersEmail=await User.findOne({email})
        console.log('dafakk-----',inDBusersEmail)
        const cryptPassword=inDBusersEmail.password
        const isPasswordMatching= await bcrypt.compare(password,cryptPassword)
        if(!isPasswordMatching){
            res.status(401).json({message:'unauthorised user'})
        }
        console.log(isPasswordMatching,'----');
        const token= createToken(inDBusersEmail._id);
        res.json({user:name,token})
    }
    catch(err){
        res.status(401).json({message:err})
    }
}


module.exports={registerUser,signIn}