import React from 'react';
import {Button} from 'antd';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import { Link ,Route} from "react-router-dom"; // link router
import jwt_decode from "jwt-decode" // decode bearer so it now can give us role and id!

function UserAccountManager(props){
    const context = useContext(UserContext);
    const user = context.user
    const tokendata = jwt_decode(context.user.token)
    

       

  



    // main central area also check user type

    if(!user.loggedIn){
        return <h1>Well this should not work!</h1>
    }

    if(user.loggedIn & tokendata.role === "user"){
        console.log(tokendata.sub)

       return (
       // UI design here and a nice layout for dashboard services
        <React.Fragment>
       <h1>User Account Management</h1>
       <Button>
            <Link to="/user-account-management/changePassword">Change Password</Link>
        </Button>
        <Button>
            <Link to="/user-account-management/deleteAccount">Delete Your Account</Link>
        </Button>
        <Button>
            <Link to="/user-account-management/updateDetails">Update Your Details</Link>
        </Button>
        

    </React.Fragment>
    )
       }
     
     
     

    
}

export default UserAccountManager