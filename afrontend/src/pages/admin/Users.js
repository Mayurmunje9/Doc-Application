import { useEffect, useState } from 'react';
import React from 'react';
import axios from "axios";
import Layout from '../../components/Layout';
import { Table } from 'antd';
import "../../Css/Table.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  
  const getAllUsers = async () => {
    try {
      const res = await axios.get('/api/auth/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsers();
    console.log(users);
  }, []);

  // antd table columns
  const columns = [
    {
      title: "Name",
      dataIndex: 'name'
    },
    {
      title: "Email",
      dataIndex: "email"
    },
    {
      title: "Doctor",
      dataIndex: "isdoctor",
      render: (text, record) => (
        <span style={{ color: record.isdoctor ? 'green' : 'red' }}>
          {record.isdoctor ? "Yes" : "No"}
        </span>
      )
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className='btn btn-danger buttons'>Block</button>
        </div>
      )
    }
  ];

  return (
    <Layout>
      <div className='' style={{ color: "white" }}>Users</div>
      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 4 }} // Limit the number of rows per page to 5
      />
    </Layout>
  )
}

export default Users;
