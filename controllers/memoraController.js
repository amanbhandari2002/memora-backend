const express = require("express");
const Memory = require('../models/MemoraDB')
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

// BELOW FUNCTION SENDS THE IMAGE TO PYTHON ML SERVICE TO GENERATE CAPTION
const generateCaption = async (filePath, fileName) => {
    try {
        const form = new FormData();
        form.append("image", fs.createReadStream(filePath), fileName);
        const response = await axios.post(process.env.ML_SERVICE_URL+"/generate-caption", form, {
            headers: form.getHeaders()
        })

        return response.data.caption
    } catch (err) {
        console.error("Error generating caption:", err.message);
        throw err
    }

}


const addMemory = async (req, res) => {
    try {
        const { title, location, date, long, lat } = req.body
        description=await generateCaption(req.file.path, req.file.filename)
        const image=req.file.filename
        const memory=await Memory.create({
            user: req.id,
            location,
            description,
            title,
            date,
            image:image,
            cordinates: { lat, long }
        })

        res.status(201).json({memory})
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const getUserMemory= async (req,res)=>{
    try{
    console.log(req.body._id)
    const userMemory= await Memory.find({user:req._id})
    res.status(200).json({userMemory})
    }catch(err){
        res.status(500).json({err})
    }
}


// const deleteMemory= async (req.res)=>{

// }
module.exports={addMemory ,getUserMemory}
