import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandler';
import { Redirect } from 'react-router-dom';
// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
    labelCol: { xs: { span: 24 }, sm: { span: 6 } },
    wrapperCol: { xs: { span: 24 }, sm: { span: 12 } }
  };
  const tailFormItemLayout = {
    wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
  };
  
  // define validation rules for the form fields
  const passwordRules = [
      { required: true, message: 'Please input your password!' }
  ];
  
  const emailRules = [
      { required: true, message: 'Please input your Email!', type:"email", whitespace: true }
  ];
  

  const confirmRules = [
        { required: true, message: 'Please confirm your password!' },
        // rules can include function handlers in which you can apply additional logic
        ({ getFieldValue }) => ({
            validator(rule, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject('The two passwords that you entered do not match!');
            }
        })

  ];



  class SignUpForm extends React.Component{

    constructor(props) {
        super(props);
        this.onSignup = this.onSignup.bind(this);
    }
    state = {redirect: null}
    onSignup = (values) =>{
        console.log("values from from are: ",values)
        const {c, ...data}= values
        fetch('https://guru-english-3000.codio-box.uk/api/v1/signup',{
            method:"POST",
            body: JSON.stringify(data),
            headers: {

            'Content-Type': 'application/json',
            }  
        }).then(status).then(json).then(data=>{
            console.log(data)
            this.setState({redirect:'/login'});
            
        }).catch(err =>{
            console.log(err)
           
        })
    };
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} /> 
        }    
        return (
          <Form {...formItemLayout} name="register" onFinish={this.onSignup} scrollToFirstError >
            
            <Form.Item name="email" label="E-mail" rules={emailRules} >
                <Input />
            </Form.Item>
    
            <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
                <Input.Password />
            </Form.Item>
    
            <Form.Item name="confirm" label="Confirm Password" dependencies={['password']}
                hasFeedback rules={confirmRules}>
                <Input.Password />
            </Form.Item>
    
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
        
                    Register
                </Button>
            </Form.Item>
          </Form>
        );
      };

  }
  export default SignUpForm;
