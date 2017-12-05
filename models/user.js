const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const findOneOrCreate = require("mongoose-find-one-or-create");
const RatedSpot = require("./ratedSpot");
const Spot = require("./spot");

const UserSchema = Schema({
  email: { type: String, required: true },
  googleId: Number,
  ratedSpots: [{ type: Schema.ObjectId, ref: "RatedSpot" }]
});

UserSchema.plugin(findOneOrCreate);

UserSchema.methods.checkIfSpotAlreadyRated = function(spotId) {
  return new Promise((resolve, reject) => {
    let eureka;
    var itemsProcessed = 0;
    if (this.ratedSpots.length > 0){
        this.ratedSpots.forEach(ratedSpot => {
            RatedSpot.findById(ratedSpot).then(foundspot => {
              if (foundspot.spot == spotId) {
                eureka = foundspot;
              }
              itemsProcessed ++;
              if (itemsProcessed === this.ratedSpots.length) {
                resolve(eureka);
              }
            });
          });  
    }
    else{resolve(eureka);}
    
  });
};
UserSchema.methods.updateRating = function(spotId, newRating) {
  let oldRating;
  let r;

  this.checkIfSpotAlreadyRated(spotId).then(s => {
    if (s) {
        oldRating = s.rating;
      RatedSpot.findById(s._id).then(spot => {
        spot.givenRating = newRating;
        spot.save();
        this.save();
        Spot.findById(spotId).then(foundspot=>{
            foundspot.changeRating(oldRating,newRating);
            s.getAmountOfPeopleRated(foundspot._id).then(amount=>{   
                r = foundspot.setAmountOfPeopleRated(amount); 
                return r;                        
            })
        })
      });
    } else {
      let newSpot = new RatedSpot({
        _id: new mongoose.Types.ObjectId(),
        spot: spotId,
        givenRating: newRating
      });
      newSpot.save().then(savedSpot => {
        this.ratedSpots.push(savedSpot);
        this.save();
        Spot.findById(spotId).then(foundspot=>{
            foundspot.changeRating(0,newRating);
            savedSpot.getAmountOfPeopleRated(foundspot._id).then(amount=>{
                r = foundspot.setAmountOfPeopleRated(amount);
                return r;             
            })
        })
      });
    }
    
    
  });
};

module.exports = mongoose.model("User", UserSchema)
