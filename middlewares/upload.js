const express= require("express")
const multer= require('multer')
const path = require("path")
const multerS3 = require("multer-s3");
const {s3} = require("../controllers/S3actions")


const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + "-" + file.originalname);
    },
  }),
});


module.exports=upload;
