"use strict";

const router = require("express").Router();
const pug = require("pug");
const Spot = require('../models/spot');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


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
.post('/upvote',function(req,res){
    console.log(req.body);
});


module.exports = router;