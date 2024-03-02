import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useHistory hook
import axios from "axios";
import { message } from 'antd';
import { useState } from "react";
import "../Css/Login.css";

export default function Register() {
  const [CredentialsData, setCredentialsData] = useState({ name:"",email: "", password: "" });
  const history = useNavigate(); // Initialize useHistory hook

  const onChangeHandel = (e) => {
    const { name, value } = e.target;
    // Update CredentialsData with the new value
    setCredentialsData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`/api/auth/user/register`, CredentialsData);
      if (response.data.success) {
        message.success("Registered successfully");
        history('/'); // Redirect to home page after successful registration
      }
    } catch (error) {
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div>
      <div>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
        <form onSubmit={onSubmit}>
          <h3>Register Now !</h3>
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
          <div className="social">
            <div className="go">
              <i className="fab fa-google"></i> Google
            </div>
            <div className="fb">
              <i className="fab fa-facebook"></i> Facebook
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
