const Koa = require('koa');
const cors = require('@koa/cors')
const app = new Koa();
const bodyParser = require('koa-bodyparser');







const directMsg = require('./routes/directmsg')
const users = require('./routes/users')
const tldform = require('./routes/tldform')


app.use(bodyParser())
app.use(cors());
app.use(directMsg.routes());
app.use(users.routes())
app.use(tldform.routes());



module.exports = app
