// Layout.js
import React from "react";
import "../Css/Layout.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AdminMenu, Sidebarmenu, UserMenu } from "../Data/Data";
import { useSelector } from "react-redux";
import { Badge,Avatar } from "antd";
const Layout = ({children}) => {
  const history = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const logout = (e) => {
    localStorage.removeItem('token');
    history("/login");
  };
  const Sidebarmenu = user?.isAdmin ? AdminMenu : UserMenu;
  console.log(user)

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo">
            <h4>Doc Appointment</h4>
          </div>
          <div className="menu">
            {Sidebarmenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <>
                  <div className={`menu-item ${isActive && "active"}`}>
                    <i className={menu.icon}></i>
                    <Link to={menu.path}>{menu.name}</Link>
                  </div>
                </>
              );
            })}
            <div className={`menu-item `}>
              <i className={`fa-solid fa-right-from-bracket`}></i>
              <Link to="/login" onClick={logout}>
                Logout
              </Link>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="header-content">
            <Badge count={user&& user.notification.length}>
      {/* <Avatar shape="square" size="large" /> */}
              <i style={{cursor:"pointer"}} className="fa-solid fa-bell" onClick={()=>{history('/notification')}}></i>
    </Badge>
              <Link to="/profile">{user?.name}</Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
