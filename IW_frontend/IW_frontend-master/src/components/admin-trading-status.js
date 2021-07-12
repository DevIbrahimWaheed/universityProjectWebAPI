import React,{ useState, useEffect } from 'react';
import { Table, Popconfirm , Select ,Input,Button ,Row, Typography, AutoComplete, Col} from 'antd';
import { status, json } from '../utilities/requestHandler';
import UserContext from '../contexts/user';
import {useContext} from 'react';
import jwt_decode from "jwt-decode" // decode bearer so it now can give us role and id!


const {Option} = Select






function AdminTradingStatus(props) {
  const context = useContext(UserContext);
  const token = jwt_decode(context.user.token);
  const [data,setData] = useState([]) // hook for collection
  const [filteredInfo,setFilters] = useState({ filteredInfo: null})
  const[filteredData,setF] = useState([]) 
  const [value, setValue] = useState('');
  const Bearer = context.user.token
  const id = token.sub



  useEffect(()=>{

    fetch(`https://guru-english-3000.codio-box.uk/api/v1/form/${id}/readall`,{
      method:"GET",headers: {"Authorization": Bearer}}
  ).then(status).then(json)
  .then(result=>{
    setData(result.body)
   
  

  }).catch(err =>{
    console.log(err)
      console.log(`error of id ${id}`);
  })

},[id,Bearer]);


function handleOnChange(link,value) {
  
  console.log(link)
  console.log(value)
 //add fetch request link  // application_status req
  fetch(link, {
    method: "POST",
    headers: {
      "Authorization": Bearer,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      application_status:value
    })
          
})
.then(status)
.then(json)
.then(result =>{
  
  setData(result.body)


})
.catch(error =>{
  console.log(error)
})
  }




function onBlur() {
  console.log('blur');
}

function onFocus() {
  console.log('focus');
}

function onSearch(val) {
  console.log('search:', val);
}

const FilterInput = (
  <Input.Search
    placeholder="Search email"
    value={value}
    allowClear
    onChange ={e=>{
      setValue(e.target.value)
      if(value === ''){
        setData(data)
      }
      let arraynew = data.filter(type=>type.email.includes(value))
      console.log(arraynew)
      setData(arraynew)
    }}
  />
);

const columns = [
  {
    title : FilterInput,
    dataIndex: 'email',
    key: 'email',
  },

  {
    title: 'Application ID',
    dataIndex : '_id',
    key: '_id',
  },
  {
    title: 'User ID',
    dataIndex : 'user',
    key: 'user',
 
  },
  {
    title: 'Application Status',
    dataIndex : 'application_status',
    key: 'ap',
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
    render: (text,record) => {
   
     
  

          return (
         
            <Select
            showSearch
            style={{ width: 200 }}
            placeholder={record.application_status}
            optionFilterProp="children"
            onChange={(text,index) => {
              handleOnChange(record.links.updatestatus,text)
            

            } }
            onFocus={onFocus}
            onBlur={onBlur}
            onSearch={onSearch}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="new" >New</Option>
            <Option value="rejected" >Rejected</Option>
            <Option value="pending" >Pending</Option>
            <Option value="accepted" >Accepted</Option>
          </Select>
          );
    

  }
},
  {
    title:'Action',
    key: 'action',
    key:'links.delform',
    render: (text, record) => (
     data.length >= 1
        ? (
          
          <Popconfirm title="Sure to delete?"   
           onConfirm={() => handleDelete(record._id)}>
          <Button>Change Status</Button>
          </Popconfirm>
        ) : null
    )
 
  
  }
      
]

    //handle delete
    const handleDelete = (id) =>{
      //console.log(link , id)
      let delstate = data.filter((item) => item._id !== id)
      setData(delstate)

    
    }


    if(data === null){
      return(
        <h1>Umm add some Application please</h1>
      )
    }
    return (
      <>

        <h1>Change Application Status , Search , filter</h1>


        <Row>
        <Table columns={columns} 
        dataSource={data} 
        />
        </Row>
    
      </>
    )







  }
  
  export default AdminTradingStatus;
  