import { useEffect, useState } from 'react'
import React from 'react';
import axios from "axios"
import Layout from '../../components/Layout'
import { Button, Table } from 'antd';

const Doctors = () => {

    const [doctors,setdoctors]=useState([])
    const getAlldoctors=async(req,res)=>{
      try {
        const res=await axios.get('/api/auth/admin/getAllDoctors',{
          headers:{
            Authorization:`Bearer ${localStorage.getItem('token')}`
          }
        })
        if(res.data.success){
          setdoctors(res.data.data)
          // console.log("data"+res.data.data)
          // console.log(doctors)
        }
      } catch (error) {
        console.log(error)
      }
    }
    useEffect(() => {
    
      getAlldoctors()
    }, [])
    const columns=[
        {title:"Name",dataIndex:"name",render:(text,record)=>(
            <span>{record.firstName} {record.lastName}</span>
        )},{
            title:"Status",dataIndex:"status"
        },
        {
            title:"Phone",dataIndex:"phone"
        },
        {
            title:"Actions",dataIndex:"actions",render:(text,record)=>(
                <div className="d-flex">
                    {record.status==="pending"? <Button className="btn btn-success">Aprove</Button> :<Button className='btn btn-danger'>Reject</Button>}
                </div>
            )
        }
    ]
    
  return (
    <Layout>
    <div>Doctors</div>
    <Table columns={columns}dataSource={doctors}/>
    </Layout>
   
  )
}

export default Doctors