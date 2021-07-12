import React from 'react'
import { Layout,Breadcrumb} from 'antd';
import { BrowserRouter as Router} from "react-router-dom"; // link router

// dashboard
import Dashboard from '../dashboard'

const {Header,Content,Footer,Sider } = Layout
class DashboardLayout extends React.Component{
  constructor(props){
    super(props)
  
  }
  state = {
    collapsed: false,
  };



  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };


  render(){
    const { collapsed } = this.state;
    const   colorSlider = "#242e41"

    const logo = (
      <a href="#0" aria-label="tld logo" className="logo">
      <img src="/tld_logo.png" alt="TLD Logo"/>
        </a>
    )


if(collapsed === true){


return(
<>
      
<Layout style={{ minHeight: '100vh' }}>
 
<Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} style={{ "background-color":colorSlider}} >

      <Dashboard />

      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background" style={{ padding: 2 }} />
      <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{this.props.title}</Breadcrumb.Item>
      </Breadcrumb>  
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      {this.props.children}
      </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created By Ibrahim Waheed For 6003CEM WEBAPI</Footer>

        </Layout>
   
      </Layout>
     
    </>
)
}
else{
  return(
  <>
      
<Layout style={{ minHeight: '100vh' }}>
 
<Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse} style={{ "background-color": colorSlider }}>
      {logo}
      <Dashboard />

      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
      <Header className="site-layout-background" style={{ padding: 2 }} />
      <Content style={{ margin: '0 16px' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>{this.props.title}</Breadcrumb.Item>
      </Breadcrumb> 
      <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
      {this.props.children}
      </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Created By Ibrahim Waheed For 6003CEM WEBAPI</Footer>

        </Layout>
   
      </Layout>
     
    </>
  )
}
  }

    } 
 export default DashboardLayout        