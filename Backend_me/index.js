const app = require('./app');
let port = process.env.PORT || 3000;
const db = require("./models/access")

db.mongoose.connect(db.url,{
    useNewUrlParser : true,
    useUnifiedTopology :true,
    useFindAndModify: true
}).then(()=>{console.log("connect to the database")}).catch(err =>{
    console.log("cannot access to the db!",err);
    process.exit();
})



app.listen(port)
console.log(`This to see if the API server that we create works ${port}`)

