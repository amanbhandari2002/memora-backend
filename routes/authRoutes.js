const express =require("express");
const router= express.Router()
const {registerUser,signIn}=require("../controllers/authController")

router.post("/registerUser",registerUser)
router.get('/signIn',signIn)


module.exports= router