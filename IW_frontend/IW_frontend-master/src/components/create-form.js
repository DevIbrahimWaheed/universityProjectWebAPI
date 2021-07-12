import React from 'react';
import { Form, Input ,Button  } from 'antd';
import UserContext from '../contexts/user';
import { UploadOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode" // decode bearer so it now can give us role and id!


// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
  };
  const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
  };
  
  // define validation rules for the form fields




  // end  of validation rules for TLD



  class CreateTLDForm extends React.Component{
      constructor(props){
          super(props)
          this.state = {
            selectedFile:null
        }
          
          this.createForm = this.createForm.bind(this)
          

          this.fileInput = React.createRef();
      }
      static contextType = UserContext;
    
      componentDidMount() {
         const tokendata = jwt_decode(this.context.user.token)
        console.log(tokendata)
        /* perform a side-effect at mount using the value of UserContext */
      }


      state = {redirect:null} // redirect to application area account/applications -- > should allow user to create more applications--
      // thus loopable 

 

    


      createForm = (values) =>{ 
         console.log("outsitePost");
          let Bearer = this.context.user.token 
          const tokendata = jwt_decode(this.context.user.token) // maybe params??
          let userId = tokendata.sub
          const{company_name,company_address,company_type,license_type} = values
          console.log(values)
         
      
    
    
             const reader = new FileReader();
          if(!this.state.selectedFile){
       try{
              console.log("inside");
           const response =  fetch(`https://guru-english-3000.codio-box.uk/api/v1/form/${userId}/create`,{
              method:"POST",headers: {"Authorization": Bearer,
              'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({
                user: userId,
              company_name:company_name,
              company_address:company_address,
              company_type:company_type,
              license_type:license_type
            
            })})
              if(response.ok){
                return response
            }

            
        }catch(e){
                 return e
          }
          }
           else{ 
           reader.readAsDataURL(this.state.selectedFile)
          reader.onloadend = async () =>{
            console.log(this.state.selectedFile)
        try{
              console.log("inside");
           const response = await fetch(`https://guru-english-3000.codio-box.uk/api/v1/form/${userId}/create`,{
              method:"POST",headers: {"Authorization": Bearer,
              'Content-Type': 'application/json;charset=utf-8'},
                body: JSON.stringify({
                user: userId,
              company_name:company_name,
              company_address:company_address,
              company_type:company_type,
              license_type:license_type,
              img:reader.result
            
            })})
              if(response.ok){
                return response
            }

            
        }catch(e){
                 return e
          } 


                }
             } 
            
     

      };


    

      fileSelectedHandle = event =>{
          console.log(event.target.files[0])
          this.setState({
              selectedFile:event.target.files[0]
          })

       
        
      }
      
   

 
      render(){
          
    



        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} /> 
        } 
        return(
            <>
            <Form {...formItemLayout} name="application" onFinish={this.createForm} scrollToFirstError>
                <Form.Item name="company_name"
                 label="Company Name"
                 rules={[
                    {
                    required: true,
                    },
                ]}
                 >
                    <Input/>
                </Form.Item>
                <Form.Item name="company_address"
                 label="Company Address"
                  rules={[
                    {
                    required: true,
                    },
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="company_type"
                 label="Company Type"
                rules={[
                    {
                    required: true,
                    },
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item name="license_type"
                 label="License Type"
                rules={[
                    {
                    required: true,
                    },
                ]}>
                    <Input/>
                </Form.Item>
                <Form.Item type='file' name='image'
                 label="Image Upload">

               
                 <input type="file" accept="image/jpeg" onChange={this.fileSelectedHandle}/>
                  
   
            
                   </Form.Item>
                   <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" icon={<UploadOutlined />}>
        
                    Send Application
                </Button>
            </Form.Item>
           


            </Form>
            </>
        )

      }




  }
  export default CreateTLDForm