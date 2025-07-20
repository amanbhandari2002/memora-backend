const express = require("express");
const Memory = require('../models/MemoraDB')


const addMemory = async (req, res) => {
    try {
        console.log("here------", req.body)
        const { title, description, location, date, long, lat } = req.body
        const image=req.file.filename
        console.log('memroooaa----',title,image)
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
    console.log('----jiji')
    console.log(req.body._id)
    const userMemory= await Memory.find({user:req._id})
    console.log('fadasf----',req._id)
    res.status(200).json({userMemory})
    }catch(err){
        res.status(500).json({err})
    }
}


// const deleteMemory= async (req.res)=>{

// }
module.exports={addMemory ,getUserMemory}
