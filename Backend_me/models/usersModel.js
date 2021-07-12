/**

* A module that Create the Schema Design for MongoDB using the Mongoose Lib .

* @module model/userModel

* @author Ibrahim Waheed

* @see controllers/* for the CRUD function developed base off this Model*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
  
const UserSchema = new Schema({
 
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    role:{
        type:String ,
        default: 'user',
        enum:['user','admin']
    }

 })
   

const User = mongoose.model('users', UserSchema);
/** User Model base of Schema Design*/
module.exports = User;



