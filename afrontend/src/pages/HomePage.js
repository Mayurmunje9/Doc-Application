import React from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
export default function HomePage() {
  const getUserDetails=async()=>{
    const token=localStorage.getItem("token")
    console.log(token)
try {
  const res=await axios.post('/api/auth/user/getUserDetails',{},{
    headers:{
      Authorization:"Bearer "+localStorage.getItem("token")
    }
  })
} catch (error) {
  
}
  }
useEffect(() => {
getUserDetails();
}, [])

  return (
    <>
    <Layout/>
    <div > </div>
    </>
  )
}

