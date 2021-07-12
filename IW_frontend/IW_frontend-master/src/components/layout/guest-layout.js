import React, { Component } from 'react'
import { Layout} from 'antd';
import { BrowserRouter as Router} from "react-router-dom"; // link router

// nav
import Nav from '../nav'

const {Header,Content,Footer } = Layout

function GuestLayout(props){

   
 

return(
<>
      
   
<Layout>
 



     <Header>
 <Nav />
        </Header>
      <Content>
      {props.children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created for 6003CEM Web API Development</Footer>
 
   

     </Layout>
    
     
    </>
)
    } 
 export default GuestLayout        