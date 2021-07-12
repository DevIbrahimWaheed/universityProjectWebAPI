import React ,{useState}from 'react';
import {Button, Divider} from 'antd';
import { status, json } from '../utilities/requestHandler';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import jwt_decode from "jwt-decode" // decode bearer so it now can give us role and id!
import { withRouter } from 'react-router';
import { Redirect,
useParams,
 useRouteMatch ,
  Link
} from 'react-router-dom';




function TrandingLicense(props){
 
    const context = useContext(UserContext);
    localStorage.setItem("tokenKey",JSON.stringify(context.user.token))
    let token = JSON.parse(localStorage.getItem("tokenKey")) || []
    const user = context.user
    const tokendata = jwt_decode(token)
    const id = tokendata.sub
    const {url} = useRouteMatch()
    console.log("url",url)
    console.log(token); 
 



    

    // main central area also check user type

    if(!user.loggedIn){
        return <h1>Well this should not work!</h1>
    }

    if(user.loggedIn){
        console.log(id)

       return (
       // UI design here and a nice layout for dashboard services
        <React.Fragment>

    <Divider orientation="left">Tranding License Centre</Divider>
      <Button>
            <Link to="/trading-license/createform">Create a Trading License Application</Link>
        </Button>


      <Button>
            <Link to={`/trading-license/recoverforms/${id}`}>Recover Delete Applications</Link>
        </Button>

        <Button>
            <Link to={`/trading-license/checkstatusforms/${id}`}>Check Trading License Application Status</Link>
        </Button>
   

   


   
    </React.Fragment>
    )
       }
     
     
     

    
}

export default withRouter(TrandingLicense);