import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from 'antd';
import { useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import "../Css/Register.css";

export default function Register() {
  const [CredentialsData, setCredentialsData] = useState({ name: "", email: "", password: "" });
  const history = useNavigate();
  const dispatch = useDispatch();

  const onChangeHandel = (e) => {
    const { name, value } = e.target;
    setCredentialsData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!CredentialsData.name || !CredentialsData.email || !CredentialsData.password) {
      message.error("Please fill in all fields");
      return;
    }
    try {
      dispatch(showLoading());
      const response = await axios.post(`/api/auth/user/register`, CredentialsData);
      dispatch(hideLoading());
      console.log('Backend response:', response.data);

      if (response.data.success) {
        message.success(response.data.message);
        history('/');
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error('Error:', error); // Log the actual error object
      message.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={onSubmit}>
        <h3 className="title">Register Now!</h3>
        <div className="form">
        <label htmlFor="name">UserName</label>
        <input type="name" name="name" placeholder="Name" id="rname" onChange={onChangeHandel} value={CredentialsData.name} />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Email or Phone" id="email" onChange={onChangeHandel} value={CredentialsData.email} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Password" id="password" onChange={onChangeHandel} value={CredentialsData.password} />
        <button type="submit">Register</button>
        <div className="registering">
          Already have an account? <Link to="/login">Login</Link>
        </div>
        {/* <div className="social">
          <div className="go">
            <i className="fab fa-google"></i> Google
          </div>
          <div className="fb">
            <i className="fab fa-facebook"></i> Facebook
          </div>
        </div> */}
        </div>
      </form>
    </div>
  );
}
