import { useEffect, useState } from 'react'
import React from 'react';
import axios from "axios"
import Layout from '../../components/Layout'
import { Table } from 'antd';


const Users = () => {
  const [users,setUsers]=useState([])
  const getAllUsers=async(req,res)=>{
    try {
      const res=await axios.get('/api/auth/admin/getAllUsers',{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        setUsers(res.data.data)
        // console.log("data"+res.data.data)
        // console.log(users)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
  
    getAllUsers()
  }, [])
  
  //antd tabel col
  const columns=[
    {
      title:"Name",dataIndex:'name'
    },{
      title:"Email",dataIndex:"email"
    },{
      title:"Doctor",dataIndex:"isDoctor",render:(text,record)=> {<span>{record.isdoctor ? "Yes":"No"}</span>}
    },{
      title:"Actions",dataIndex:"actions",render:(text,record)=>(
        <div className="d-flex">
          <button className='btn btn-danger'>Block</button>
        </div>
      )
    }
  ]
  return (
    <Layout>
    <div className='d-flex justify-content-center'><h1 style={{color:"white"}}>Users</h1></div>
    <Table columns={columns}dataSource={users}/>
    </Layout>
  )
}

export default Users