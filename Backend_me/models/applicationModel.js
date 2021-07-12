/**

* A module that Create the Schema Design for MongoDB using the Mongoose Lib .

* @module model/applicationModel

* @author Ibrahim Waheed

* @see controllers/* for the CRUD function developed base off this Model */


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
      

const ApplicationSchema = new Schema({
        user:{type:Schema.Types.ObjectId,ref:"users" ,unique:false ,required:true},
            company_name: {type: String, required:true},
            company_address: {type: String, required:true},
            company_type: {type: String, required:true},
            license_type: {type: String, required:true},
            //default will be set as false
            application_status: {type:String, required:true,
            default: 'new',
            enum:['new','pending','accepted','rejected']},
            isActive:{type:Boolean,default:true},
            img:{type: String}
        }
       )
     
     
    
       
const Application = mongoose.model('tldforms', ApplicationSchema);
/** ApplicationSchema Model base of Schema Design*/
module.exports = Application;



