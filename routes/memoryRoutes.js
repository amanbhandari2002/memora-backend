const express =require("express");
const router= express.Router()
const upload = require("../middlewares/upload")
const {addMemory ,getUserMemory} = require('../controllers/memoraController')

// const addMemory=require('../controllers/memoraController')
// const getUserMemory= require('../controllers/memoraController')

// router.post('/uploadimage',addMemory);
router.post('/uploadimage',upload.single("image"),addMemory);
router.get('/getUserMemory',getUserMemory)

module.exports=  router