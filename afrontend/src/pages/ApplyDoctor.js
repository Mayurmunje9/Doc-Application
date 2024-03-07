import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useState } from "react";
import axios from "axios";
import "../Css/ApplyDoc.css";

const ApplyDoctor = () => {
  const { user } = useSelector(state=>state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [timings, setTimings] = useState({ fromTime: "", toTime: "" });
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
        "/api/auth/user/applyDoctor",
        { ...formattedValues, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading())
      if(res.data.success){
        message.success("Applied as a doctor Successfully"+res.data.success)
        navigate('/')

      }
      else{
        message.error(res.data.error)
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went wrong");
    }

    console.log("Form Values:", formattedValues);
  };

  return (
    <Layout>
      <Form
        layout="vertical"
        onFinish={handleFinish}
        className=""
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
    </Layout>
  );
};

export default ApplyDoctor;
