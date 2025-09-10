const express=require("express");
const router= express.Router();
const userVerifyMiddleware = require("../middlewares/authMiddleware")


router.get('/',userVerifyMiddleware,(req,res)=>{
    res.status(200).json({message:"user is verified",user:req.user})
})

module.exports = router;