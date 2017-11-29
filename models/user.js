const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const findOneOrCreate = require('mongoose-find-one-or-create');


const UserSchema = Schema({
    email:{type:String,required:true},
    googleId:Number
});

UserSchema.plugin(findOneOrCreate);


module.exports = mongoose.model('User', UserSchema);
