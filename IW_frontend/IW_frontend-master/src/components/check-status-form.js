import React, { useState, useEffect } from "react";
import { Table, Tag,Popconfirm , Image } from 'antd';
import { status, json } from '../utilities/requestHandler';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import {useParams} from 'react-router-dom';
import { withRouter } from 'react-router';




function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}



function GetFormData(props){

  const context = useContext(UserContext);
  const [data,setData] = useState([]) // hook for collection
  const [filteredInfo,setFilters] = useState({ filteredInfo: null})
  const [ sortInfo,setSort] = useState({sortInfo:null})

  const { id } = useParams();
  const Bearer = context.user.token



  useEffect(()=>{

    fetch(`https://guru-english-3000.codio-box.uk/api/v1/form/${id}`,{
      method:"GET",headers: {"Authorization": Bearer}}
  ).then(status)
  .then(json)
  .then(result=>{
    console.log(result.body)
    setData(result.body)
  }).catch(err =>{
    console.log(err)
      console.log(`error of id ${id}`);
  })
  
},[id]);
  
      
    let handleChange = (pagination,filters,sorter) => {
      console.log('Various parameters', pagination,filters,sorter);
      setFilters({
        filteredInfo: filters,
     
      });
      setSort({
        sortInfo : sorter
      });
    };

    const columns = [

      {
        title:'image',
        dataIndex:'img',
        key:'image',
        render:(text,record) =>{
          if(record.img === undefined){
            return (<p>no image</p>)
          }
          else{
            console.log(record.img)
            return( <Image
      width={200}
      src={record.img} />)
          }


        }
      },
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
        filters: [
          {text:'New', value: 'new'},
          {text:'Pending', value: 'pending'},
          {text:'Accepted', value: 'accepted'},
          {text:'Rejected', value: 'rejected'},
          {value: null},
        ],
        filteredValue: filteredInfo.application_status ,
        onFilter: (value, record) =>  record.application_status.includes(value),
        sorter: (a,b) => a.application_status.length < b.application_status.length,
        ellipsis: true,
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
        title:'Action',
        key: 'action',
        render: (text, record) => (
         data.length >= 1
            ? (
              
              <Popconfirm title="Sure to delete?"   
               onConfirm={() => handleDelete(record.links.delform,record._id)}>
                <a>Delete</a>
              </Popconfirm>
            ) : null
        )
     
      
      }
          
    ]

    //handle delete
    const handleDelete = (link,id) =>{
      //console.log(link , id)
      let delstate = data.filter((item) => item._id !== id)

      setData(delstate)

       fetch(link,{
        method:"PUT",
        headers: {"Authorization": Bearer,
        'Accept': 'application/json',
        'Content-Type': 'application/json'},

        }
    ).then(status).then(json).
    then(result=>{
      
      console.log(result)
     

    }).catch(err =>{
      console.log(err)
        console.log(`error of id ${id}`);
    })
    

    }


    if(data === null){
      return(
        <h1>Umm add some Application please</h1>
      )
    }
    return (
      <>

        <h1>Check Status</h1>
        <Table columns={columns} 
        dataSource={data} 
        
        onChange={handleChange}/>
    
      </>
    )


    }
  

  export default withRouter(GetFormData)



