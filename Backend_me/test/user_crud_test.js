const Users = require('../models/usersModel');
const bcrypt = require('bcrypt')
const utils = require('../config/jwt.config')

const assert = require('assert')

describe('Sign up Controller', function() {
    
    it('Create CRUD', function(){
        
    
        const addnewUser =  new Users({email:"w", password:"s1", role:'user'});
         addnewUser.save(function(err){
            if(err) done(err);
            else 
            assert(!addnewUser.isNew)
            done()

        })
       
        
    });
    
});

