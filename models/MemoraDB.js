const mongoose = require("mongoose")


const memoraSchema= new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User' },
    location:String,
    description: String,
    title: String,
    date:Date,
    image:String,
    cordinates:{
        long: Number,
        lat:Number
    },
    imageSize:Number
},{timestamps:true})


module.exports=mongoose.model("Memory",memoraSchema)