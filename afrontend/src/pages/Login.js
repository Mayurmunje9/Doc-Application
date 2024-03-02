import React from "react";
import "../Css/Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
export default function Login() {
  const history = useNavigate();
  const [Credentials, setCredentials] = useState({ email: "", password: "" });

  const onChangeHandel = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Credentials:", Credentials);
    try {
      const res = await axios.post("/api/auth/user/login", Credentials);
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        console.log("Login Successful");
        message.success("Login Successful");
        history("/"); // Redirect to home page after successful login
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  
  return (
    <div>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={onSubmit}>
        <h3>Login Here</h3>

        <label htmlFor="username">Username</label>
        <input
          type="email"
          name="email"
          placeholder="Email or Phone"
          id="username"
          onChange={onChangeHandel}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          onChange={onChangeHandel}
        />

        <button type="submit">Log In</button>
        <div className="registering">
          Don't have a account? <Link to="/register">Register</Link>{" "}
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
  );
}
