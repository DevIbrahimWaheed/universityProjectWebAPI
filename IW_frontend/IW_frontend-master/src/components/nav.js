import React from 'react'
import {useContext} from 'react'
import { Menu } from 'antd';
import { Link } from "react-router-dom"; // link router
import UserContext from '../contexts/user';


function Nav(props){
    const context = useContext(UserContext);
    const loggedIn =  context.user.loggedIn;
    console.log(context);
    let LoginNav;
    if(!loggedIn){
        LoginNav = (
        <React.Fragment>
        <Menu.Item key="2">
        <Link to="/signup">Register</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/login">Login</Link>
      </Menu.Item>
        <Menu.Item key="4">
        <Link to="/google">Google Login</Link>
      </Menu.Item>
      </React.Fragment>

        )
    } else{
        LoginNav = (
           <React.Fragment>
            <Menu.Item key="3" onClick={context.logout}>
              <Link to="/">Logout</Link>
      
            </Menu.Item>
            </React.Fragment>
        )
    }
    return (
        <React.Fragment>
     
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
          {LoginNav}
        </Menu>
        </React.Fragment>
      );



}
export default Nav;

