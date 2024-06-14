import React from "react";
import "../Css/Layout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AdminMenu, Sidebarmenu, UserMenu } from "../Data/Data";
import { useSelector } from "react-redux";
import { Badge } from "antd";

const Layout = ({ children }) => {
  const history = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);

  const logout = (e) => {
    localStorage.removeItem("token");
    history("/login");
  };

  //*********Doctor Menu**************/
  const DoctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house-user",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list-ul",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-regular fa-user",
    },
  ];

  // Determine the menu based on user role
  const Sidebarmenu = user?.isAdmin
    ? AdminMenu
    : user?.isdoctor
    ? DoctorMenu
    : UserMenu;

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h4 style={{fontSize:"1rem"}}>Doc Appointment</h4>
          </div>
          <div className="menu">
            {Sidebarmenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <Link key={menu.path} to={menu.path} style={{ textDecoration: 'none' }}>
                  <div className={`menu-item ${isActive && "active"}`}>
                    <i style={{fontSize:"1rem"}} className={menu.icon}></i>
                    <span>{menu.name}</span>
                  </div>
                </Link>
              );
            })}
              <Link to="/login" onClick={logout} style={{textDecoration: 'none' }}>
            <div className={`menu-item`}>
              <i style={{fontSize:"1rem"}} className={`fa-solid fa-right-from-bracket`}></i>
               <span>Logout</span> 
            </div>
              </Link>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content">
              <div className="uper-box">
              <Badge count={user && user.notification.length}>
                <i
                  style={{ cursor: "pointer",fontSize:"1rem" }}
                  className="fa-solid fa-bell "
                  onClick={() => {
                    history("/notification");
                  }}
                ></i>
              </Badge>
              <Link style={{fontSize:"0.8rem"}} to="/profile">{user?.name}</Link>
            </div>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
