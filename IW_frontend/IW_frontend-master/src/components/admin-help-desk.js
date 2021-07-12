import React, { useState , useEffect } from 'react';
import {Button,Input , List, Comment,Form , Avatar} from 'antd';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import { status, json } from '../utilities/requestHandler';
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




function AdminActiveChatUsers (props) {
    const [activeUsers , setActiveUsers] = useState([])
    const context = useContext(UserContext);
    const Bearer = context.user.token
    const tokendata = jwt_decode(context.user.token)
    const [data , setData] = useState([])
    const [user , setUser]  = useState({id:null,read:null,post:null})
    const [methods , setMethods] = useState({
      submitting: false,
      value: ''
    })
    const [msg , setMsg] = useState(false)
    
    
  
     
    useEffect(()=>{
    fetch(`https://guru-english-3000.codio-box.uk/api/v1/msg/getlists`,{
      method:"GET",headers: {
          "Authorization": Bearer}})
          .then(status).then(json)
  .then(result=>{
    setActiveUsers(result.body)
    console.log(activeUsers)
    
  }).catch(err =>{
    console.log(err)
      console.log(err);
  }) 
  
  
   
  },[])



 
  useEffect(()=>{    
  if(msg ===true){
      fetch(user.read,{
          method:"GET",headers: {
              "Authorization": Bearer}})
              .then(status).then(json)
      .then(result=>{
  
         
        setData(result.data)
        
      }).catch(err =>{
        console.log(err)
          console.log(err);
      })   
    }
  },[user])
  
  

  
    
  
    
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

      console.log(user.id,tokendata.sub , "post data")
      const adminid = tokendata.sub
    
      fetch(user.post,{method:"POST",headers:{"Authorization": Bearer ,
      'Accept': 'application/json',
      'Content-Type': 'application/json',}
      ,body:JSON.stringify({
          text:methods.value,
          user:user.id,
          adminid
          })})
          .then(status)
          .then(json)
          .then(res => {
            setData(res.data)
            console.log(res)})
          .catch(e => console.log(e))

  
      
    },1000)}   




  
  
    const msgopen = (value , getchatlink ,post) =>{
      console.log(value,getchatlink)
      setUser({id:value,read:getchatlink,post:post})
      console.log(user , "state")
      setMsg(true)
   
    
        
      }

// store value form textbox to state
const handleChange = event => {
  console.log(event.target.value)
    setMethods({
      value:event.target.value
    })
  }

     
    
  if(msg === false){
 
  return(
  <React.Fragment>

  <List
    itemLayout="horizontal"
    dataSource={activeUsers}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src="" />}
          title={<Button onClick={()=> msgopen(item.activeUser.id, item.links.readchats,item.links.post)} >{item.activeUser.id}</Button>}
        />
      </List.Item>
    )}
  />

</React.Fragment>
  )}
  
  else{
  
    return(
      <>
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
      </>
    )
  }      
        
    

} export default AdminActiveChatUsers