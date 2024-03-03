import React from "react";
import '../Css/Layout.css'
import { Link ,useLocation} from "react-router-dom";
import { Sidebarmenu } from "../Data/Data";
const Layout = () => {
    const location =useLocation()

  return (
    <div className="main">
      <div className="layout">
        <div className="sidebar">
          <div className="logo"><h4>Doc Appointment</h4></div>
          <div className="menu">{Sidebarmenu.map(menu=>{
            const isActive=location.pathname===menu.path
            return (
               <>
               <div className={`menu-item ${isActive&& 'active'}`}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>
                {menu.name}
                </Link>
               </div>
               </>
            )
            })}</div>
        </div>
        <div className="content">
            <div className="header">Header</div>
            <div className="body">Body</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
