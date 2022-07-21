const mongoose = require('mongoose')

const productschema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    image:String,
    packinfo:String

})

const Movie = mongoose.model('movie',productschema)
module.exports= Movie;

