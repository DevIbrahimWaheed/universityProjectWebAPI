import React from 'react';
import {Button, Divider} from 'antd';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import jwt_decode from "jwt-decode" // decode bearer so it now can give us role and id!
import { withRouter } from 'react-router';
import { Redirect,useParams, useRouteMatch , Link} from 'react-router-dom';
function AdminTrandingLicense(props){
    const context = useContext(UserContext);
    const user = context.user
    const tokendata = jwt_decode(context.user.token)
    const id = tokendata.sub
    const {url} = useRouteMatch()
    console.log("url",url)

  
       

  



    // main central area also check user type

    if(!user.loggedIn & context.user === null){
        return <h1>Well this should not work!</h1>
    }

    if(user.loggedIn ){
        console.log(id)

       return (
       // UI design here and a nice layout for dashboard services
        <React.Fragment>

    <Divider orientation="left">Admin Tranding License Centre</Divider>
      <Button>
            <Link to="/admin-trading-license/status">Users Applications</Link>
        </Button>


      <Button>
            <Link to="/admin-trading-license/audits">Audit</Link>
        </Button>

      
   

   


   
    </React.Fragment>
    )
       }
     
     
     

    
}

export default withRouter(AdminTrandingLicense);