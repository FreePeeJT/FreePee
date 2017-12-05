"use strict";

const router = require("express").Router();
const pug = require("pug");
const Spot = require('../models/spot');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
const User = require('../models/user');


router

.get('/',function(req,res){
    res.json({message:'API'});
})

.get('/getspots',function(req,res){
    Spot.find({}).then(spots=>{
        res.json(spots);
    })
})

.post('/newspot',function(req,res){
    if(req.user){
        let spot = new Spot({
            _id: new mongoose.Types.ObjectId(),
            owner:req.user.uid,
            lat:req.body.lat,
            lng:req.body.lng,
            description:req.body.description,
            address:req.body.address
        })
        spot.save().then(savedSpot=>{
            res.redirect('/');
        });
    }
   
})

.post('/changerating',function(req,res){
    User.findById(req.user.uid).then(user=>{
        let task = user.updateRating(req.body.spotId,req.body.givenRating);
        res.send(task);
        })
    

})


module.exports = router;