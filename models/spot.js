const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const SpotSchema = Schema({
    owner:{type:Schema.ObjectId,ref:"User"},
    description:{type:String},
    lat:{type:Number,default:0},
    lng:{type:Number,default:0},
    rating:{type:Number,default:0},
    address:{type:String}
    
})


module.exports=mongoose.model('Spot',SpotSchema);
