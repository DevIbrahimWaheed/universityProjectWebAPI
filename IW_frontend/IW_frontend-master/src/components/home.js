import React from 'react';
import { PageHeader } from 'antd';


// A custom hook that builds on useLocation to parse
// the query string for you.


function Home(props) {
   
 

 
    return (
        <div className="site-layout-content">
          <div style={{ padding: '2% 20%' }}>
              <h1>Fancy TLD Services</h1>
            <PageHeader className="site-page-header"
              title="TLD Alpha Site..."
              subTitle="Welcome to Home Page."/>
          </div>  
        </div>
    );
  
 
    
   
    


  
  }
  
  export default Home;
  