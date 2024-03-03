import React from "react";
import "../Css/Login.css";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { UseDispatch, useDispatch } from "react-redux";
import { hideLoading,showLoading } from "../redux/features/alertSlice";
import { message } from "antd";
import axios from "axios";

export default function Login() {
  const dispatch=useDispatch();
  const history = useNavigate();
  const [Credentials, setCredentials] = useState({ email: "", password: "" });

  const onChangeHandel = (e) => {
    setCredentials({ ...Credentials, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Credentials:", Credentials);
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/auth/user/login", Credentials);
      const data = res.data; // No need to call res.json()
      dispatch(hideLoading())
      if (data.success) {
        const token = data.authToken;
        localStorage.setItem("token", token);
        console.log("Login Successful", token);
        message.success("Login Successful");
        history("/"); // Redirect to home page after successful login
      } else {
        message.error(data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
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
          Don't have an account? <Link to="/register">Register</Link>{" "} {/* Corrected Link component */}
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
