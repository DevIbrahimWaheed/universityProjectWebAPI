import React from 'react';
import { Form, Input, Button } from 'antd';
import { status, json } from '../utilities/requestHandler';
import UserContext from '../contexts/user';
import { Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode" 
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
]



/**
 * Login form component for app signup.
 */
 class LoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        
    }

    state = {redirect: null}

    static contextType = UserContext;

    login(values) {
        const {email, password} = values;
        console.log(email,password);
        console.log(`logging in user: ${email}`)
        fetch('https://guru-english-3000.codio-box.uk/api/v1/login', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email:email,
                password:password
              })
                  
        })
        .then(status)
        .then(json)
        .then(user => {
            console.log('Logged in successfully');
            console.log(user);
            user.password = password;  // store in context for future API calls
            this.context.login(user);
            console.log(this.context)
            const role = jwt_decode(user.token).role 
            if(role === 'admin')
            {
                this.setState({redirect:'/admin-trading-license'});
            }
            if(role === 'user'){
                this.setState({redirect:'/trading-license'});
            }
                       
            
        })
        .catch(error => {
            console.log(error)
            // TODO: show nicely formatted error message
            console.log('Login failed');
        });  
    }
    
  render() {
    if (this.state.redirect) {
        return <Redirect to={this.state.redirect} />
    }    
    return (
        <Form {...formItemLayout} name="login" onFinish={this.login} scrollToFirstError >
            <Form.Item name="email" label="Email" rules={emailRules} >
                <Input />
            </Form.Item>
            <Form.Item name="password" label="Password" rules={passwordRules} hasFeedback >
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Login</Button>
            </Form.Item>
        </Form>
    );
  };
};

export default LoginForm;
