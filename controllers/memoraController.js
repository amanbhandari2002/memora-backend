const express = require("express");
const Memory = require('../models/MemoraDB')
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const { generateSignedUrl } = require("../controllers/S3actions")
const mongoose = require('mongoose');
const { ObjectId } = mongoose;
// BELOW FUNCTION SENDS THE IMAGE TO PYTHON ML SERVICE TO GENERATE CAPTION


const generateCaption = async (filePath, fileName, user_uid) => {
    try {
        console.log('dafaakkk--')
        const signedURL = await generateSignedUrl(fileName)
        console.log("ab kya chuda----->", signedURL)
        const response = await axios.post(process.env.ML_SERVICE_URL + "/generate-caption", { filePath: signedURL, fileName, user_uid })

        return response.data.caption
    } catch (err) {
        console.error("Error generating caption:", err.message);
        throw err
    }

}


const addMemory = async (req, res) => {
    try {
        console.log("hereryoo---")
        const { title, location, date, long, lat } = req.body
        const Uploadedimage = req.file
        console.log("titelle---", Uploadedimage, title)
        console.log('filekey---->', req.file.key)
        console.log('uid bc---->', req.body.user_id)
        description = await generateCaption(req.file.location, req.file.key, req.body.user_id)
        // description='Temp description'
        console.log("got here-----image--->", description)

        const image = req.file.key
        const memory = await Memory.create({
            user: req.body.user_id,
            location,
            description,
            title,
            date,
            image: image,
            cordinates: { lat, long }
        })

        res.status(201).json({ memory })
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
}

const getUserAllMemory = async (req, res) => {
    try {
        console.log('sdfsdfdssd-')
        console.log('2342---', req.query.user_id)
        const user_id = req.query.user_id;
        const userMemory = await Memory.find({ user: user_id })

        for (let key in userMemory) {

            const signedURL = await generateSignedUrl(userMemory[key].image)  // Generating Singned url to access image urls from AWS s3.

            userMemory[key].image = signedURL
        }
        res.status(200).json({ userMemory })
    } catch (err) {
        res.status(500).json({ err })
    }
}

const searchUserQuery = async (req, res) => {
    try {
        const response = await axios.post(process.env.ML_SERVICE_URL + "/search-image-vector", { query: req.body.query, user_id: req.body.user_id })

        const searchedData = response.data

        for (let i = 0; i < searchedData.results.length; i++) {
            const signedURL = await generateSignedUrl(searchedData.results[i].payload.image_name);
            searchedData.results[i].payload.image = signedURL; // add new property
        }
        res.status(200).json(searchedData)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ err })
    }
}


// const deleteMemory= async (req.res)=>{

// }
module.exports = { addMemory, getUserAllMemory, searchUserQuery }
