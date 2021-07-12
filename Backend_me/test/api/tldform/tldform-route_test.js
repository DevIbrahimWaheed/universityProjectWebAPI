
const supertest = require('supertest')
const expect = require('chai').expect
const app = require('../../../app').callback()
const request = supertest(app)
const Application = require('../../../models/applicationModel');
const utils = require('../../../config/jwt.config')
const Users = require('../../../models/usersModel');


describe('Form Routes', () => {
it('Route form test Should 202', async ()=> {
    const res = await request.get('/api/v1/form')
    
    expect(res.statusCode).equal(202)
    

})

                    
})
        
   
// so much neater than users ....practice makes perfect!
describe('GET user id specific Forms', () => {
    it('User Can access it form via id', async ()=> {
        before(async() => {
            it('Access /:id', async() => {
                 const res = await request.get(`/api/v1/form/${decode.sub}`)
                 .auth(token,{type:"bearer"})
                 expect(res.statusCode).equal(202)
            });
        });
    })
    it('User cant access other ids', async ()=> {
     const res = await request.get(`/api/v1/form/212`)
    expect(res.statusCode).equal(401)
        
    })
})

describe('POST Form Create', () => {
    it('Form Status 200', async() => {
        before(async() => {
const res=  request.post('/api/v1/login')
 .send({ email: 'test@test.com', password: "AAA" })
 .set('Accept', 'application/json')
 .set('Content-Type', 'application/json')
 const decode = utils.decodeToken(res.body.token)
 let token = res.body.token.replace('Bearer ','')

        });
        it('Access Route', async() => {
        const res = await request.post(`/api/v1/form/${decode.sub}/create`)
                 .auth(token,{type:"bearer"})
                 .send({
                company_name:"user",
                 company_address:"test",
                 company_type:"test",license_type:"test",
                 application_status:"new"})
                 expect(res.statusCode).equal(200)
        });
        
    });
   it('Form Status 409', async() => {
        const res = await request.post(`/api/v1/form/4448546/create`)
           .send({
                company_name:"user",
                 company_address:"test",
                 company_type:"test",license_type:"test",
                 application_status:"new"})
                 expect(res.statusCode).equal(401)
        
    });  
});


//  get/:id/seeofdel 

// so much neater than users ....practice makes perfect!
describe('soft delete access', () => {
    it('soft delete return 202', async ()=> {
        before(async() => {
            it('Access /:id', async() => {
                 const res = await request.get(`/api/v1/form/${decode.sub}/seeofdel`)
                 .auth(token,{type:"bearer"})
                 expect(res.statusCode).equal(202)
            });
        });
    })
    it('unauth user soft delete access 401', async ()=> {
     const res = await request.get(`/api/v1/form/212/seeofdel`)
    expect(res.statusCode).equal(404)
        
    })
})


// so much neater than users ....practice makes perfect!
describe('GET soft delete  access', () => {
    it('soft delete return 202', async ()=> {
        before(async() => {
            it('Access /:id', async() => {
                 const res = await request.put(`/api/v1/form/${decode.sub}/seeofdel`)
                 .auth(token,{type:"bearer"})
                 expect(res.statusCode).equal(202)
            });
        });
    })
    it('unauth user soft delete access 401', async ()=> {
     const res = await request.get(`/api/v1/form/212/seeofdel`)
    expect(res.statusCode).equal(404)
        
    })
})

// so much neater than users ....practice makes perfect!
describe('PUT soft delete  access', () => {
    it('Allow PUT softdelform', async ()=> {
        before(async() => {
            const appdata = await Application.find({user:decode.sub})
            console.log(appdata._id)
            it('Access /:id', async() => {
                 const res = await request.put(`/api/v1/form/${decode.sub}/${appdata._id}/softdelform`)
                 .auth(token,{type:"bearer"})
                 expect(res.statusCode).equal(202)
                 console.log("Works")
            });
        });
    })
    it('Not Allow PUT softdelform Status 404', async ()=> {
     const res = await request.put(`/api/v1/form/212/softdelform`)
    expect(res.statusCode).equal(404)
        
    })
})


// so much neater than users ....practice makes perfect!
describe('PUT soft recvoer  access', () => {
    it('Allow PUT recover status 202', async ()=> {
        before(async() => {
            const appdata = await Application.find({user:decode.sub})
            console.log(appdata._id)
            it('Access /:id', async() => {
                 const res = await request.put(`/api/v1/form/${decode.sub}/${appdata._id}/softrecover`)
                 .auth(token,{type:"bearer"})
                 expect(res.statusCode).equal(202)
                 console.log("Works")
            });
        });
    })
    it('Not Allow PUT recover Status 401', async ()=> {
     const res = await request.put(`/api/v1/form/212/2/softrecover`)
    expect(res.statusCode).equal(401)
    })
})


// get/:id/readall  




describe('GET READ ALL FORMS ONLY AUTH ADMIN USERS', () => {
     it('return 401 unauthorised', async() => {
       
  before(async() => {

     const res= await request.post('/api/v1/login')
      .send({ email: 'test@test.com', password: "AAA" })
      .set('Accept', 'application/json')
      const auth = res.body
      it('Access Get /:id/user', async() => {
            const decode = utils.decodeToken(auth.token)
            let signtoken = auth.token.replace('Bearer ','')
            const res = await request.get(`/api/v1/form/${decode.sub}/readall`)
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
            const res = await request.get(`/api/v1/form/${decode.sub}/readall`)
            .auth(signtoken,{type:"bearer"})
            expect(res.statusCode).equal(200)  //only adim

      });});
     })


})

describe('POST update applciation status', () => {
    it('Allow  update return status 202', async ()=> {
        before(async() => {
            const data= await Users.find({email:"test@test.com"});

           const appdata = await Application.find({user:data._id})
            console.log(appdata._id)
            it('Access /:id', async() => {
                 const res = await request.put(`/api/v1/form//${appdata._id}/updatestatus`).send({"application_status":"rejected"})
                 .auth(token,{type:"bearer"})
                 expect(res.statusCode).equal(202)
                 console.log("Works")
            });
        });
    })
    before(async() => {
        const data= await Users.find({email:"test@test.com"});

           const appdata = await Application.find({user:data._id})
            console.log(appdata._id)

        it('Not Allow return Status 401', async ()=> {
     const res = await request.post(`/api/v1/form/${appdata._id}/updatestatus`)
    expect(res.statusCode).equal(401)
    })
        
    });
    
})

