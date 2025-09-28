const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const {getNextMonday}= require('../controllers/commonFunction')

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique:true, required:true},
    password: {type: String, required:true},
    totalStorageUsed: {type:Number,default: 0 },
    totalImageCount: {type:Number,default: 0 },
    imageUploadThisweek: {type:Number,default: 0 },
    imageCountResetat: {type:Date,default: function () { 
            return getNextMonday(); 
        } },
})

userSchema.pre('save', async function(next){
    if(!this.isModified(this.password)) return next();
    this.password=await bcrypt.hash(this.password,12);
    next();
})


module.exports = mongoose.model('User', userSchema)