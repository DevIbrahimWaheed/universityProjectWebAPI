# 6003CEM WEB API Server-Side Trading Licence Department
This project is build on Node.js server using Koa Framework. For the Database that is used for this web application is  MongoDB Atlas.

To run this application you must be able to install the require packages , below they are step by step examples on how to run and install.

## Getting started
### Installation

First, clone the repo!
```
git clone https://github.coventry.ac.uk/6003CEM-2021JANMAY/Backend_me
```
install the dependencies
````
cd Backend_me
npm install
````
Okay now you guys should be able to get this running! 

* The app.js contains most of the middleware 
* The index.js runs the app.listen and database connection 
* The route , models , controllers are the key folders that build most of the application

## OpenAPI Documentation
You can read the OpenAPI 3.0 redoc documentation on the route endpoints , where majority of them have been tested
````
http://localhost:8080/resit-defferal-submission/docs/openapi/index.html
````

# Script to Run  Web Server 
The Trading License Department API is RESTful . To run the web app just types
```
npm start
```
You can then test the routes(see the openAPi docs) via 
```
npm run test
```
# JSdoc documetation 
```
http://localhost:3001/resit-defferal-submission/docs/jsdoc/index.html
```
For the test we are using integration test with mocha , chai and supertest
## Troubleshooting

In a lot of cases when there is an issue with node it helps to recreate the
`node_modules` directory  so just in case:

```
rm -r node_modules
npm install
```


