import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import React from 'react';
import './App.css';


//layouts
// import Nav from './components/nav';
import Login from './components/login'
import Home from './components/home';
import SignUp from './components/signup'
import UserContext from './contexts/user';

// trading license components
import TrandingLicense from './components/trading-license';
import CreateTLDForm  from './components/create-form';
import UpdateTLDForm from './components/update-form'
import RecoverTLDForm from './components/recover-form'
import CheckStatusTLDForm from './components/check-status-form' // shows datatable which has CRUD operations at user level

// User Account Managerment Views
import UserAccountManager from './components/user-account-management';
import ChangePass from './components/user-changepass'



// Help Desk
import HelpDesk from './components/help-desk'

// Admin Dashboard
import AdminActiveChatUsers from './components/admin-help-desk';
import AdminTradingStatus from './components/admin-trading-status';
import AdminTradingAudit from './components/admin-trading-audit';
import AdminTrandingLicense from './components/admin-tranding-license';




// Dashboard Custom Router 
// import DR from './components/layout/dashboard-routes';
import DashboardLayout from './components/layout/dashboard-layout';


// Guest Router
import GR from './components/layout/guest-routes';
// import GuestLayout from './components/layout/guest-layout';

// Google Login Test
import GoogleLogin from './components/google-login'




class App extends React.Component { 
constructor(props){

  super(props);
  this.state = {
    user:{loggedIn:false},
    hasError:false
  
  }
  this.login = this.login.bind(this)
  this.logout = this.logout.bind(this)

 }


login(user){
  console.log("User is login")
  user.loggedIn = true;
  console.log(user)
  this.setState({user:user});
  
}
logout(){
  console.log("Remove User")
  this.setState({user: {loggedIn:false}});

}



render () {
  const context = {
    user: this.state.user,
    login: this.login,
    logout: this.logout
    
  };




  return(
    <UserContext.Provider value={context}>
      
     <Router>
       <Switch>
   
      <GR path="/login" children={<Login />} />
      <GR path="/signup" children={<SignUp />} />
       <GR path="/google" children={<GoogleLogin />} exact />
      <GR path="/" children={<Home />} exact />
     
    <Route path ={["/admin-trading-license","/admin-trading-license/status","/admin/help-desk","/admin/active"] }>
      <DashboardLayout>
        <Switch>
       <Route path="/admin-trading-license" children={<AdminTrandingLicense/>} exact/>
      <Route path="/admin-trading-license/status" children={<AdminTradingStatus/>} exact/>
      <Route path="/admin-trading-license/audits" children={<AdminTradingAudit/>} exact/>
      <Route path="/admin/help-desk" children={<AdminActiveChatUsers/>} exact  />
      </Switch>
      </DashboardLayout>
      </Route>
 
      
      <Route path={["/trading-license",
      "/trading-license/createform",
      "/trading-license/checkstatusforms",
      "/trading-license/recoverforms",
      "/trading-license/updateforms",
      "/help-desk",
      "/user-account-management",
      "/user-account-management/changePassword"]}>
      <DashboardLayout>
       <Switch>
         {/*Fancy Form View */}
         <Route path="/trading-license" children={<TrandingLicense />}  exact />
               
      <Route path="/trading-license/updateforms/:id" children={<UpdateTLDForm/>} exact/>
      <Route path="/trading-license/createform" children={<CreateTLDForm/>}/>   
      <Route path="/trading-license/checkstatusforms/:id" children={<CheckStatusTLDForm/>} exact/>
      <Route path="/trading-license/recoverforms/:id" children={<RecoverTLDForm/>} exact/> 
      <Route path="/help-desk" children={<HelpDesk/>} exact  />
      <Route path="/user-account-management" children={<UserAccountManager/>} exact/>
      <Route path="/user-account-management/changePassword/" children={<ChangePass/>} exact/>
      </Switch> 
       </DashboardLayout>
      </Route>
      
      </Switch>

   </Router>
        

 
      </UserContext.Provider>  
    
  );
    

}
}


export default App;
