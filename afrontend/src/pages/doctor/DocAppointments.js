import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import moment from "moment";
import { Button, Table, message } from "antd";

const DocAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/auth/doctor/docAppointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        console.log("API Response Data: ", res.data.data);
        setAppointments(res.data.data);
        console.log("appointments om set appointments :",appointments)
      }
    } catch (error) {
      console.log("Error fetching appointments: ", error);
    }
  };
  useEffect(() => {
    console.log("Updated Appointments State: ", appointments);
  }, [appointments]);
  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        '/api/auth/doctor/appointmentStatus',
        { appointmentId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log("Error updating appointment status: ", error);
      message.error("Something went wrong: " + error);
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
          {record.userInfo[0].name} {record.doctorId.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (text, record) => (
        <span>
          {record.doctorId.phone}
        </span>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          Time:{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <Button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approve")}
              >
                Approve
              </Button>
              <Button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Appointments</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DocAppointments;
