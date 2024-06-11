import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import { Row } from "antd";
import Doctor from "./Doctor";
export default function HomePage() {
  const [doctors, setdoctors] = useState([])

  const getAllDoctors = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const res = await axios.get(
        "/api/auth/user/getAllDoctors",
     
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if(res.data.success){
        setdoctors(res.data.data)
        console.log("got Doctors")
      }
    } catch (error) {
      console.log("get Doctors error "+error)
    }
  };


  useEffect(() => {
    getAllDoctors();
  }, []);

  return (
    <>
      <Layout >
      <div><h1>Home page</h1> </div>
      <Row>
         {doctors && doctors.map(doctor =>(
          <Doctor doctor={doctor} />
         ))}
      </Row>
      </Layout>
    </>
  );
}
