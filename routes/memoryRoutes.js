const express =require("express");
const router= express.Router()
const upload = require("../middlewares/upload")
const {addMemory ,getUserAllMemory,searchUserQuery} = require('../controllers/memoraController')

// const addMemory=require('../controllers/memoraController')
// const getUserMemory= require('../controllers/memoraController')

// router.post('/uploadimage',addMemory);
router.post('/uploadimage',upload.single("image"),addMemory);
router.get('/getUserAllMemory',getUserAllMemory)
router.post('/searchUserQuery',searchUserQuery)

module.exports=  router