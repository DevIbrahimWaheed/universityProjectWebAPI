/**
 *  
 *
 * @module test/test_helper
 *  
 * @param  {} ctx the context from koa allows req and res calls to be made
 */
const mongoose = require('mongoose');



mongoose.Promise = global.Promise;
const MONGODB_URI = "mongodb+srv://test:123@cluster0.srg3a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI,{
    useNewUrlParser : true,
    useUnifiedTopology :true,
    useFindAndModify: true});
  
mongoose.connection
    .once('open', () => console.log('Connected!'))
    .on('error', (error) => {
        console.warn('Error : ', error);
    });
      
    // runs before each test // add this to DB test not here!
    before(async function(){
          mongoose.connection.collection('users').deleteMany({}, function(res){}); // it is now guaranteed to finish before it()
           mongoose.connection.collection('tldforms').deleteMany({}, function(res){}); // it is now guaranteed to finish before it()


     });



const bcrypt = require('bcrypt')
const Users = require('../models/usersModel');
const Application = require('../models/applicationModel');
 // helpers
async function hashPassword(password){
  return await bcrypt.hash(password,10);
}

async function passwordValidate(non_hash_pass,hash_pass){
  return await bcrypt.compare(non_hash_pass,hash_pass);
}


 before(async() => {
     // Create two accounts and uses a test database
    // user role  
    const hash_pass = await hashPassword("AAA")
    return Users.create({email:"test@test.com",password:hash_pass});

    // admin role
  
    return Users.create({email:"admin@test.com",password:hash_pass,role:"admin"});


 });


// setup behaviors main objective is to test form routes thus setup is really important
before(async () =>{
  const createdUser = await Users.findOne({email:"test@test.com"});
 
  
    return  Application.create(
        {user:createdUser._id,
         company_name:"test" ,
        company_address:"test road",
        company_type:"limited",
        license_type:"R45",
        application_status:'new',
        isActive:true
   
      });
});


