import axios from "axios";
import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { Table } from "antd";
const Appointnents = () => {
  const [appointments, setAppointments] = useState([]);
  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/auth/user/userAppointment", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorId.firstName} {record.doctorId.lastName}
        </span>
      ),
    },
    {
        title: "Phone",
        dataIndex: "[phone]",
        render: (text, record) => (
          <span>
            {record.doctorId.phone} 
          </span>
        ),
      },{
        title: "Date & Time",
        dataIndex: "date",
        render: (text, record) => (
          <span>
          {moment(record.date).format("DD-MM-YYYY")} {" "}
          Time: {' '}
          {moment(record.time).format("HH:mm")}
          </span>
        ),
      },{
        title: "Status",
        dataIndex: "status",
       
      },
  ];

  return (
    <Layout>
      <h1>Appointnents</h1>
      <Table columns={columns} dataSource={appointments}/>
    </Layout>
  );
};

export default Appointnents;
