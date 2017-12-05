const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./user");
const RatedSpot = require("./ratedSpot");

const SpotSchema = Schema({
    owner:{type:Schema.ObjectId,ref:"User"},
    description:{type:String},
    lat:{type:Number,default:0},
    lng:{type:Number,default:0},
    rating:{type:Number,default:0},
    address:{type:String},
    amountOfPeopleRated:{type:Number}
    
})

SpotSchema.methods.changeRating=function(oldRating,newRating){
    this.rating -= parseInt(oldRating);
    this.rating += parseInt(newRating);
    this.save();
    return this.rating;
}

SpotSchema.methods.getRating=function(){
    return round(this.rating/amountOfPeopleRated);
}

SpotSchema.methods.setAmountOfPeopleRated=function(value){
    this.amountOfPeopleRated = value;
    this.save();
    console.log(this.amountOfPeopleRated);
}


module.exports=mongoose.model('Spot',SpotSchema)
