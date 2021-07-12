import React, { useState , useEffect } from 'react';
import {Button,Input , List, Comment,Form , Avatar} from 'antd';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import { status, json } from '../utilities/requestHandler';
import {  Redirect } from "react-router-dom"; // link router
import jwt_decode from "jwt-decode" // decode bearer so it now can give us role and id!


const { TextArea } = Input;










const MessageList = ({comments}) => (

  <List
  dataSource={comments}
  header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
  itemLayout="horizontal"
  renderItem={props => <Comment  content={props.message.text} author={props.sender} avatar={
    <Avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt={props.sender}
      />
  } />}
  />
  )
  


  const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
  <Form.Item>
  <TextArea rows={4} onChange={onChange} value={value} />
  </Form.Item>
  <Form.Item>
  <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
    Add Comment
  </Button>
  </Form.Item>
  </>
  );




function HelpDesk(props){
  const context = useContext(UserContext);
  const Bearer = context.user.token
    const user = context.user


    const tokendata = jwt_decode(context.user.token)
    const [data , setData] = useState([])
    const [ links , setLink] = useState([])
    const [methods , setMethods] = useState({
      submitting: false,
      value: ''
    })
    
    
     
  
    // incharge of post when submit and timeout for data loading ease
    const handleSubmit = () =>{
      if(!methods.value){
        return;
      }
      setMethods({submitting:true,})
     

      setTimeout(() =>{
        setMethods({
          submitting:false,
          value:'',
          
        });

      
        fetch(links.post,{method:"POST",headers:{"Authorization": Bearer ,
        'Accept': 'application/json',
        'Content-Type': 'application/json',}
        ,body:JSON.stringify({
            text:methods.value})})
            .then(status)
            .then(json)
            .then(res => {
              setData(res.data)
              console.log(res)})
            .catch(e => console.log(e))
        
      
           
        
    
      
        
      },1000)

    }
 
    // store value form textbox to state
    const handleChange = event => {
    
      setMethods({
        value:event.target.value
      })
  
  }        

     
    
    

   
  useEffect(()=>{
        fetch(`https://guru-english-3000.codio-box.uk/api/v1/msg/${tokendata.sub}/usermsg`,{
            method:"GET",headers: {
                "Authorization": Bearer}})
                .then(status).then(json)
        .then(result=>{
            setLink(result.links)
           
          setData(result.data)
          
        }).catch(err =>{
          console.log(err)
            console.log(`error of id ${tokendata.sub}`);
        })   
    },[tokendata.sub])

    
     
        


    if(user.loggedIn & tokendata.role === "user"){

        // let ButtonSend  = (<Button onClick={postMessage} >Send </Button>)
        

       

        return (
        // UI design here and a nice layout for dashboard services
         <React.Fragment>
        <h1>help Desk MESSAGE</h1>
        
        {data.length > 0 && <MessageList comments={data} />}
        <Comment
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={methods.submitting}
              value={methods.value}
            />
          }
        />
    
     </React.Fragment>
     )
        }
      
        if(user.loggedIn & tokendata.role === "admin"){
 
 
         return (
             <React.Fragment>
         
         <Redirect to={'/trading-license'}></Redirect>
   
      </React.Fragment>
    
      )
         }
       

}
        

      
export default HelpDesk;