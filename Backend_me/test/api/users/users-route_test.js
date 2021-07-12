
const supertest = require('supertest')
const expect = require('chai').expect
const app = require('../../../app').callback()
const request = supertest(app)
const Users = require('../../../models/usersModel');
const utils = require('../../../config/jwt.config')



describe('GET test', () => {
    it('Should 201', async ()=> {
        const res = await request.get('/api/v1/')
        
        expect(res.statusCode).equal(201)
       

    })
})

describe('POST  Sign  up', () => {
  before(async() => {
    const res = await Users.remove({ email: 'test@test.com' })
  });
   it('OK, creating a New Account show JWTtoken', async() => {
    const res = await request.post('/api/v1/signup')
      .send({ email: 'test@test.com', password: "AAA" })
        
        const body = res.body;
        expect(body).to.contain.property('token');
        expect(body).to.contain.property('expiresIn');


  });

    
})
describe('POST  Login', () => {


   it('Login', async() => {
       const res= await request.post('/api/v1/login')
      .send({ email: 'test@test.com', password: "AAA" })
      .set('Accept', 'application/json')
       
        expect(res.body).to.contain.property('token');
        expect(res.body).to.contain.property('expiresIn');


  });

    
})

describe('GET Id user', () => {
     it('return 200', async() => {
       
  before(async() => {

     const res= await request.post('/api/v1/login')
      .send({ email: 'test@test.com', password: "AAA" })
      .set('Accept', 'application/json')
      const auth = res.body
      it('Access Get /:id/user', async() => {
        const decode = utils.decodeToken(auth.token)
        const res = await request.get(`/api/v1/${decode.sub}/user`)
    .auth(signtoken,{type:"bearer"})
    expect(res.statusCode).equal(200)

      });
      

 });
    
    
    
    });
    
});

describe('PUT Id user', () => {
     it('return 200', async() => {
       
  before(async() => {
     

     const res= await request.post('/api/v1/login')
      .send({ email: 'test@test.com', password: "AAA" })
      .set('Accept', 'application/json')
      const auth = res.body
      it('Access Get /:id/user', async() => {
        const decode = utils.decodeToken(auth.token)
  
    let signtoken = auth.token.replace('Bearer ','')
    const res = await request.get(`/api/v1/${decode.sub}/user`)
    .auth(signtoken,{type:"bearer"})
    expect(res.statusCode).equal(200)

      });
      

 });
     })
})


describe('del Id user', () => {
     it('return 401 unauthorised', async() => {
       
  before(async() => {

     const res= await request.post('/api/v1/login')
      .send({ email: 'test@test.com', password: "AAA" })
      .set('Accept', 'application/json')
      const auth = res.body
      it('Access Get /:id/user', async() => {
        const decode = utils.decodeToken(auth.token)
  
 
    let signtoken = auth.token.replace('Bearer ','')
    const res = await request.get(`/api/v1/${decode.sub}/user`)
    .auth(signtoken,{type:"bearer"})
    expect(res.statusCode).equal(401) // a user type cannot delete users!

      });});
     })
         it('return 200 admin user', async() => {
       
  before(async() => {

     const res= await request.post('/api/v1/login')
      .send({ email: 'admin@test.com', password: "AAA" })
      .set('Accept', 'application/json')
      const auth = res.body



      it('Access Get /:id/user', async() => {
    const decode = utils.decodeToken(auth.token)
   
    let signtoken = auth.token.replace('Bearer ','')
    const res = await request.get(`/api/v1/${decode.sub}/user`)
    .auth(signtoken,{type:"bearer"})
    expect(res.statusCode).equal(401) // a user type cannot delete users!

      });});
     })


})



// only admin user!
describe('GET /Users Admin Only', () => {
  
    it('Should 200 Admin Only', async ()=> {
       before(async() => {

     const res= await request.post('/api/v1/login')
      .send({ email: 'admin@test.com', password: "AAA" })
      .set('Accept', 'application/json')
      const auth = res.body



      it('Access Get Users Admin', async() => {
    let signtoken = auth.token.replace('Bearer ','')
     const res = await request.get('/api/v1/users')
        .send({ email: 'admin@test.com', password: "AAA" })
         .auth(signtoken,{type:"bearer"})
          .set('Accept', 'application/json')
        
        expect(res.statusCode).equal(200)

      });});
     })
       
       
 it('Should 401 Users Only', async ()=> {
       before(async() => {

     const res= await request.post('/api/v1/login')
      .send({ email: 'admin@test.com', password: "AAA" })
      .set('Accept', 'application/json')
      const auth = res.body



      it('Access Get /users User ', async() => {
    let signtoken = auth.token.replace('Bearer ','')
     const res = await request.get('/api/v1/users')
        .send({ email: 'admin@test.com', password: "AAA" })
         .auth(signtoken,{type:"bearer"})
          .set('Accept', 'application/json')
        
        expect(res.statusCode).equal(401)

      });});
     })



})
        

