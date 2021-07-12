import React from 'react';
import {Menu} from 'antd';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import { Link } from "react-router-dom"; // link router
import jwt_decode from "jwt-decode" // decode bearer so it now can give us role and id!
import {
    CloudOutlined,
    TeamOutlined,
    UserOutlined,
    PieChartOutlined,
    LoginOutlined 
  } from '@ant-design/icons';

const { SubMenu } = Menu;


function Dashboard(props){
    const context = useContext(UserContext);
   
    const user = context.user
    const tokendata = jwt_decode(context.user.token)

    let DashboardSystem;
    const   colorSlider = "#242e41"
       

  
    

    // main central area also check user type

    if(!user.loggedIn){
        return <h1>Please Login or Create An Account Via SignUp</h1>
    }

    if(user.loggedIn & tokendata.role === "user"){
   
       
        DashboardSystem = ( 
          
        
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['sub2']} style={{ backgroundColor: colorSlider }} >
          <SubMenu key="sub2" icon={<PieChartOutlined />} title="Trading License">
        <Menu.Item key="6">
          <Link to="/trading-license">Trading License</Link>
          </Menu.Item>
        <Menu.Item key="7"> 
        <Link to={`/trading-license/recoverforms/${tokendata.sub}`}>Recover Delete Applications</Link>
        </Menu.Item>
        <Menu.Item key="8">
        <Link to={`/trading-license/checkstatusforms/${tokendata.sub}`}>Check Trading License Application Status</Link>
        </Menu.Item>
    
        </SubMenu>
  
        <SubMenu key="sub1" icon={<UserOutlined />} title="User Account Management"> 
        <Menu.Item key="4">
        <Link to="/user-account-management">Account Area</Link>
        </Menu.Item>
        <Menu.Item key="5">
        <Link to={`/user-account-management/changePassword`}>Change your Password</Link>
        </Menu.Item>
        </SubMenu>
     
        <Menu.Item key="2" icon={<TeamOutlined />}> 
        <Link to="/help-desk">Help Desk</Link>
        </Menu.Item>


        <Menu.Item key="3" icon={<LoginOutlined/>}onClick={context.logout}>
              <Link to="/">Logout</Link>
            </Menu.Item>
    
        </Menu>
      
      
     
      
   
    
        )

       return (
       // UI design here and a nice layout for dashboard services
        <>
    
      
      
          {DashboardSystem}
       
    </>
    )
       }
     
       if(user.loggedIn & tokendata.role === "admin"){


        return (
            <React.Fragment>
       
        
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} style={{ backgroundColor: colorSlider }} >
          
        <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to="/admin-trading-license/status"> Staus Application  </Link>
          </Menu.Item>
  
   
 
        <Menu.Item key="2" icon={ <CloudOutlined/>}>
        <Link to="/admin-trading-license/audits">Audit Trail</Link>
        </Menu.Item>
  
     
     
        <Menu.Item key="3" icon={<TeamOutlined />}> 
        <Link to="/admin/help-desk">Help Desk for Direct Messages</Link>
        </Menu.Item>


        <Menu.Item key="4" icon={<LoginOutlined/>}onClick={context.logout}>
              <Link to="/">Logout</Link>
            </Menu.Item>
    
        </Menu>
   
           
       
     
            
     

          
    
  
     </React.Fragment>
   
     )
        }
      
     
    

  

    
}

export default Dashboard;