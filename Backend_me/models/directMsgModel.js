/**

* A module that Create the Schema Design for MongoDB using the Mongoose Lib .

* @module model/directMsgModel

* @author Ibrahim Waheed

* @see controllers/* for the CRUD function developed base off this Model */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
      
const directMsg = new Schema(
    {
        message:{ 
            text:{type:String, require:true}
            },
            
        users:[{
        user: { type:Schema.Types.ObjectId, ref:'users',unique:false  ,required:true }
        }],
            sender:{type:Schema.Types.ObjectId,ref:"users" ,unique:false  ,required:true},
            // for pagination! ONLY SEND RECENT CHATS!
            read:{type:Date}
    },
        {
            timestamps: true
        }
    
    )
    
     
    

const DirectMsg = mongoose.model('directmsg', directMsg);
/** DirectMsg Model base of Schema Design*/
module.exports = DirectMsg;









    // pseudocode
    //post
    
    // create! in by sender id usertype01 [text Hi Admin1] tag in users! [usertype01]!
    //get in help desk live chat view! yes say usertype01 is login then post data will be used in UI list view Comment using antd  
    // find usertype01 id see message! annd update to sender id
    // now Admin looks at list of messages from different sender! select sender id usertype01 now admin becomes part of users! array 
    //and with post a message in and become sender admin [text Hi usertype1] in user[usertype01,Admin1]

