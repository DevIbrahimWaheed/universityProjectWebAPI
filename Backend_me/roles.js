const AccessControl = require("accesscontrol")
const ac = new AccessControl();

exports.roles=(function(){
ac.grant("user").readAny("tldform").updateOwn("tldform").readOwn("tldform")
ac.grant("admin").extend("user").updateAny("tldform").deleteAny("tldform")

// issues with readAny!
ac.grant("admin").readAny("usersarea")


// werid readOwn doesnt work as indented
ac.grant("user").updateOwn("userarea").readAny("usersarea")
ac.grant("admin").extend("user").updateAny("userarea").deleteAny("userarea")  


// msg route
ac.grant("user").updateOwn("msg").readOwn("msg")
ac.grant("admin").extend("user").readAny("msg").updateAny("msg").deleteAny("msg")  

return ac
})();