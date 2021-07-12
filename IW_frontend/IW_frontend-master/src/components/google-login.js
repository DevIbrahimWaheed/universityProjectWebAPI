import React ,{useState,useEffect}from 'react';
import {Button} from 'antd';
import { status, json } from '../utilities/requestHandler';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import { Redirect,useLocation} from 'react-router-dom';

import {GoogleOutlined} from '@ant-design/icons';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}



function GoogleLogin(props){
let query = useQuery();
let code
const context = useContext(UserContext);
const [link, setLink] = useState({})
const [redirect,setRe] = useState()


useEffect(()=>{

fetch(`https://guru-english-3000.codio-box.uk/api/v1/login/google`,{
      method:"GET"})
  .then(status).then(json)
  .then(result=>{
  
    setLink(result)
    
    
  }).catch(err =>{
    console.log(err)
     
  })




},[])
    
   




   code  = query.get("code")

if(code !== null){

 fetch(`https://guru-english-3000.codio-box.uk/api/v1/auth/google/`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            'Content-Type': 'application/json',
            },body:JSON.stringify({
              code
            })
                  
        })
        .then(status)
        .then(json)
        .then(user => {
          console.log(user)
          context.login(user)   
                                
        })
        .catch(error => {
            console.log(error)
            // TODO: show nicely formatted error message
            console.log('Login failed');
        });




}
     

 

console.log(link.data)
console.log(redirect)

       
    
 if(!context.user.loggedIn){
        return  ( 
          <div className="site-layout-content">
          <div style={{ padding: '2% 20%' }}>
              <h1>Sign in Via Google</h1>s
               <Button icon={<GoogleOutlined />} href={link.data}> Google </Button>
          </div>  
        </div>
        )
       
    }
  
  else{
     return <Redirect to="/trading-license"/>
  }  



    
}

export default GoogleLogin