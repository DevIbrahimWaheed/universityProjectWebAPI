/**

* A module that was in semi development main objective was to give schema access via access.js which will hide the 
* secret keys
* @module models/access

* @author Ibrahim Waheed

* @see controllers/* interaction with controllers however now legacy code 
*/

const dbConfig = require("../config/db.config.js");
const mongoose = require("mongoose");

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

module.exports = db;
