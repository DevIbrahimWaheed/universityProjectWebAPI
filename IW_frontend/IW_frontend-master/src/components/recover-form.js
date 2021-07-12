import React, { useState, useEffect } from "react";
import { Table, Tag,Popconfirm } from 'antd';
import { status, json } from '../utilities/requestHandler';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import {useParams} from 'react-router-dom';
import { withRouter } from 'react-router';
import jwt_decode from "jwt-decode" // decode bearer so it now can give us role and id!



function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  



function GetRecoverData(props){
  
  const context = useContext(UserContext);
  const [recover,setData] = useState() // hook for dataset
  const { id } = useParams();
  const Bearer = context.user.token
  const decode = jwt_decode(Bearer)
   console.log(decode.role)

   useEffect(()=>{


  
  
 

    fetch(`https://guru-english-3000.codio-box.uk/api/v1/form/${id}/seesoftdel`,{
      method:"GET",headers: {"Authorization": Bearer}}
  ).then(status)
  .then(json)
  .then(result=>{
    
    
    setData(result.data)
  }).catch(err =>{
    console.log(err)
      console.log(`error of id ${id}`);
  })
    },[id]);


  

      const columns = [

  
        {
          title: 'Company Name',
          dataIndex : 'company_name',
          key: 'company_name',
        },
        {
          title: 'Company Address',
          dataIndex : 'company_address',
          key: 'company_address',
        },
        {
          title: 'Company Type',
          dataIndex : 'company_type',
          key: 'company_type',
        },
        {
          title: 'Application Status',
          dataIndex : 'application_status',
          key: 'application_status',
          filters:[
            {text:'New', value: 'new'},
            {text:'Pending', value: 'pending'},
            {text:'Accepted', value: 'accepted'},
            {text:'Rejected', value: 'rejected'}
          ],
          render: application_status => {
          
              
              let color;
                 if (application_status === "new"){
                   color = "gold"
                 }
                 if (application_status === "pending"){
                   color = "cyan"
                 }
                 if (application_status === "accepted"){
                   color = "green"
                 }
                 if (application_status === "rejected"){
                   color = "volcano"
                 }
                 console.log(color)
                return (
                  
                  <Tag color={color}key={application_status}>
                    {capitalizeFirstLetter(application_status)}
                  </Tag>
                );
          
             
         
        }
      },
        {
          title: 'License Type',
          dataIndex : 'license_type',
          key: 'license_type',
        },
        {
          title: 'Your ID',
          dataIndex : 'user',
          key: 'user'
        },
        {
          title:'Action',
          key: 'action',
          render: (text, record) => (
           recover.length >= 1
              ? (
                <Popconfirm title="Sure to Recover?" onConfirm={() => handleRecover(record.user,record._id)}>
                  <a>Recover</a>
                </Popconfirm>
              ) : null
          )
       
        
        }
            
      ]

      const handleRecover = (u,key) =>{
        console.log(key)
        let test = recover.filter((item) => item._id !== key)
        console.log(test , "test")
        setData(test)
        fetch(`https://guru-english-3000.codio-box.uk/api/v1/form/${u}/${key}/softrecover`,{
        method:"PUT",
        headers: {"Authorization": Bearer,
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify({
          role:decode.role
        })
        
      
        }
    ).then(status).then(json).
    then(result=>{
      
      console.log(result)
     

    }).catch(err =>{
      console.log(err)
        console.log(`error of id ${id}`);
    })
    



      }











      if(recover === null){
        return(
          <h1>No delete forms detected</h1>
        )
      }
      return (
        <>
     
          <h1>Check Status</h1>
          <Table columns={columns} dataSource={recover}/>
      
        </>
      )
    
    
    
  

}
  export default withRouter(GetRecoverData)



