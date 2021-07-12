import React from 'react';
import { Button } from 'antd';
import { status, json } from '../utilities/requestHandler';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';
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

  class DeleteTLDForm extends React.Component{
      constructor(props){
          super(props)
         this.state = {
             form:[]
         }
        
      }
      static contextType = UserContext;
    
   
      componentDidMount() {

        const id = this.props.match.params.id; 
        console.log("this is ID" + id)
        const Bearer = this.context.user.token
     
        fetch(`https://guru-english-3000.codio-box.uk/api/v1/form/${id}`,{
            method:"GET",
                headers: {
                  "Authorization": Bearer,
                }
            }
        ).then(status).then(json).
        then(forms =>{
                this.setState({form:forms.data})
                console.log(this.state.form)

        }).catch(err =>{
            console.log(`error of id ${id}`);
        })

      }

        render(){
                if(!this.state.form){
                return <h2>Well no forms created</h2>
                }
                else{
                    return (
                    <React.Fragment>                    
                        <h2>Delete Forms</h2>
                        <div>
                        <ul>
                        {this.state.form.map(form => (
            <li key={form}>
            {form._id}
            <br/>
            {form.user}
            <br/>
            {form.company_name}
            <br/>
            {form.company_address}
            <br/>
            {form.company_type}
            <br/>
            {form.license_type}
            </li>
          ))}
                        </ul>
                         </div>
        </React.Fragment>

                        
                        
                        )
                }
            
           
        }

      }
  export default withRouter(DeleteTLDForm)