const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOneOrCreate = require('mongoose-find-one-or-create');



const ratedSpotSchema = Schema({
    spot:{type:Schema.ObjectId,ref:"Spot"},
    givenRating:{type:Number}
});

ratedSpotSchema.methods.getAmountOfPeopleRated = function(spotId){
    return this.db.model('RatedSpot').find({'spot':spotId}).then(spots=>{
        return spots.length;
    }).catch(function(){
        console.log('first to vote');
        return 1;
    })
}




module.exports = mongoose.model('RatedSpot', ratedSpotSchema)
