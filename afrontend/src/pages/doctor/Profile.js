import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Col, Form, Input, Row, Button, message } from "antd";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user } = useSelector(state => state.user);
  const [doctor, setDoctor] = useState(null);
  const [timings, setTimings] = useState({ fromTime: "", toTime: "" });
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setTimings({ ...timings, [e.target.name]: e.target.value });
  };

  const handleFinish = async (values) => {
    const formattedValues = {
      ...values,
      timings: {
        from: timings.fromTime,
        to: timings.toTime,
      },
    };

    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/auth/doctor/updateDocProfile",
        { ...formattedValues, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Profile updated successfully");
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }

    console.log("Form Values:", formattedValues);
  };

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post('/api/auth/doctor/getDoctorInfo', { userId: params.id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (res.data.success) {
        const doctorData = res.data.Docdata;
        setDoctor(doctorData);
        if (doctorData.timings) {
          setTimings({
            fromTime: doctorData.timings.from || "",
            toTime: doctorData.timings.to || ""
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDoctorInfo();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <Layout>
        <h1>Profile</h1>
        {doctor && (
          <Form
            layout="vertical"
            onFinish={handleFinish}
            initialValues={doctor}
            style={{ width: "60%", marginTop: "2rem", marginLeft: "10%" }}
          >
            <h4>Personal Details:</h4>
            <Row gutter={20}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label={<span style={{ color: "light" }}>First Name</span>}
                  name="firstName"
                  required
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Your first name"
                    className="placeholder-blue"
                    style={{ color: "black" }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label={<span style={{ color: "white" }}>Last Name</span>}
                  name="lastName"
                  required
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Your last name"
                    className="placeholder-blue color"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label={<span style={{ color: "white" }}>Phone</span>}
                  name="phone"
                  required
                  rules={[
                    { required: true, message: "Please enter your phone number" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Your phone number"
                    className="placeholder-blue"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label={<span style={{ color: "white" }}>Email</span>}
                  name="email"
                  required
                  rules={[{ required: true, message: "Please enter your email" }]}
                >
                  <Input
                    type="email"
                    placeholder="Your email address"
                    className="placeholder-blue"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label={<span style={{ color: "white" }}>Website</span>}
                  name="website"
                >
                  <Input
                    type="text"
                    placeholder="Your website"
                    className="placeholder-blue"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label={<span style={{ color: "white" }}>Address</span>}
                  name="address"
                  required
                  rules={[
                    { required: true, message: "Please enter your clinic address" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Your clinic address"
                    className="placeholder-blue"
                  />
                </Form.Item>
              </Col>
            </Row>
            <h4>Professional Details:</h4>
            <Row gutter={20}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label={<span style={{ color: "white" }}>Specialization</span>}
                  name="specialization"
                  required
                  rules={[
                    { required: true, message: "Please enter your specialization" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Your specialization"
                    className="placeholder-blue"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label={<span style={{ color: "white" }}>Experience</span>}
                  name="experience"
                  required
                  rules={[
                    { required: true, message: "Please enter your experience" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Your experience"
                    className="placeholder-blue"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label={
                    <span style={{ color: "white" }}>Fees Per Consultation</span>
                  }
                  name="fessPerConsultation"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter the fees per consultation",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    placeholder="Fees per consultation"
                    className="placeholder-blue"
                  />
                </Form.Item>
              </Col>
              <Col
                xs={24}
                md={12}
                lg={8}
                style={{ display: "flex", flexDirection: "row" }}
              >
                <div style={{ marginRight: "1rem" }}>
                  <Form.Item
                    label={
                      <span style={{ color: "white" }} name="timings">
                        From
                      </span>
                    }
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      type="time"
                      onChange={onChange}
                      value={timings.fromTime}
                      name="fromTime"
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item
                    label={
                      <span style={{ color: "white" }} name="timings">
                        To
                      </span>
                    }
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      type="time"
                      onChange={onChange}
                      value={timings.toTime}
                      name="toTime"
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>
            <div className="text-center">
              <Button type="primary" htmlType="submit" style={{ width: "25%" }}>
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Layout>
    </div>
  );
}

export default Profile;
