const jwttoken = require('jsonwebtoken');

// use dotenv
module.exports = {
JWT_SECRET:"biscut"
}

let JWT_SECRET = "biscut"
/**
 * @param {*} user - The user object. Needed for the passport to issue and set the JWT `sub` payload property to the MongoDB user ID in the db
 * 
 */
 function issueJWT(user,pass=null) {
    const _id = user._id;
    const role = user.role
  
    const expiresIn = '1d';
  
    const payload = {
      sub: _id,
      role:role,
      pass,
      iat: Date.now()
    };
  

    const signedToken = jwttoken.sign(payload, JWT_SECRET, { expiresIn: expiresIn });
  
    return {
      token: "Bearer " + signedToken,
      expires: expiresIn
    }
  }
  /**
   * This function decode sign token allow us content within the token0 
   * @param  {*} token - the jwttoken which is sign
   */
  function decodeToken(token){
    let signtoken = token.replace('Bearer ','')
    let decode = jwttoken.verify(signtoken,JWT_SECRET)
    return decode
  }

  module.exports.issueJWT = issueJWT;
  module.exports.decodeToken = decodeToken;