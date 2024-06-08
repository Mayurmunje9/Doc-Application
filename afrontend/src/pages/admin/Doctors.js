import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import { Button, Table, message } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  
  const getAllDoctors = async () => {
    try {
      const res = await axios.get("/api/auth/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/auth/admin/changeAccountStatus",
        { doctorId: record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        getAllDoctors(); // Refresh the list after status change
      }
    } catch (error) {
      console.log("error " + error);
      message.error(`Something went wrong`);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <Button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, 'approved')}
            >
              Approve
            </Button>
          ) : (
            <Button className="btn btn-danger" onClick={() => handleAccountStatus(record, 'rejected')}>
              Reject
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <div>Doctors</div>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
