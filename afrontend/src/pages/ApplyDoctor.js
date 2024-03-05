import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, Button, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import '../Css/ApplyDoc.css'

const ApplyDoctor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinish = async (values) => {
   console.log(values)
  };

  return (
    <Layout>
      <Form layout="vertical" onFinish={handleFinish} className="m-3" style={{width:"58dvw",marginTop:"2rem",marginLeft:"3rem"}}>
        <h4>Personal Details:</h4>
        <Row gutter={20}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span style={{ color: 'white' }}>First Name</span>}
              name="firstName"
              required
              rules={[{ required: true, message: 'Please enter your first name' }]}
            >
              <Input type="text" placeholder="Your first name" className="placeholder-blue" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Last Name</span>}
              name="lastName"
              required
              rules={[{ required: true, message: 'Please enter your last name' }]}
            >
              <Input type="text" placeholder="Your last name" className="placeholder-blue" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Phone</span>}
              name="phone"
              required
              rules={[{ required: true, message: 'Please enter your phone number' }]}
            >
              <Input type="text" placeholder="Your phone number" className="placeholder-blue" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Email</span>}
              name="email"
              required
              rules={[{ required: true, message: 'Please enter your email' }]}
            >
              <Input type="email" placeholder="Your email address" className="placeholder-blue" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Website</span>}
              name="website"
            >
              <Input type="text" placeholder="Your website" className="placeholder-blue" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Address</span>}
              name="address"
              required
              rules={[{ required: true, message: 'Please enter your clinic address' }]}
            >
              <Input type="text" placeholder="Your clinic address" className="placeholder-blue" />
            </Form.Item>
          </Col>
        </Row>
        <h4>Professional Details:</h4>
        <Row gutter={20}>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Specialization</span>}
              name="specialization"
              required
              rules={[{ required: true, message: 'Please enter your specialization' }]}
            >
              <Input type="text" placeholder="Your specialization" className="placeholder-blue" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Experience</span>}
              name="experience"
              required
              rules={[{ required: true, message: 'Please enter your experience' }]}
            >
              <Input type="text" placeholder="Your experience" className="placeholder-blue" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Fees Per Consultation</span>}
              name="feesPerConsultation"
              required
              rules={[{ required: true, message: 'Please enter the fees per consultation' }]}
            >
              <Input type="number" placeholder="Fees per consultation" className="placeholder-blue" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span style={{ color: 'white' }}>Timings</span>}
              name="timings"
              required
            >
              <TimePicker.RangePicker format="HH:mm" className="placeholder-blue" />
            </Form.Item>
          </Col>
        </Row>
        <div className="text-center">
          <Button type="primary" htmlType="submit">Submit</Button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;
