import React from "react";
import Layout from "../components/Layout";
import { Tabs, message, notification } from "antd";
import useSelection from "antd/es/table/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import {  useNavigate } from "react-router-dom";

const Notification = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
  const { user } = useSelector((state) => state.user);
  const handleAllRead = async() => {
    try {
        dispatch(showLoading())
        const res=await axios.post('/api/auth/user/getNotifications',{userId:user._id},{
            //We need to pass this header as we have passed authorization as a Middleware in the route 
            //router.post('/getNotifications',authMiddlewares,getNotificationsController)
            headers:{
                Authorization :("Bearer "+localStorage.getItem('token'))
            }
        })
        dispatch(hideLoading());
        if(res.data.success){
            message.success(res.data.message)
        }else{
            message.error(
                res.data.error
            )
        }
    } catch (error) {
        dispatch(hideLoading())
        console.log(error) 
        message.error("something went wrong ")
    }
  };
  const handleDeleteAllRead = () => {};
  return (
    <Layout>
      <h4 className="p-3 text-center" style={{ color: "white" }}>Notification</h4>
      <Tabs>
        <Tabs.TabPane  tab={<span style={{ color: "white" }}>UnRead</span>} key={0} style={{ backgroundColor: "gray", color: "white" }}>
          <div className="-d-flex justify-content-end">
            <h4 className="p-2" onClick={handleAllRead}>
              Mark all read
            </h4>
          </div>
          {
            user?.notification.map(notificationMsg =>(
                <div style={{cursor:"pointer"}}onClick={navigate(notificationMsg.onClickPath)} className="card"  >
                    <div className="card-text text-dark  ">
                        {notificationMsg.message}
                    </div>
                </div>
            ))
          }
        </Tabs.TabPane>
        <Tabs.TabPane  tab={<span style={{ color: "white" }}>Read</span>} key={1} style={{ backgroundColor: "gray", color: "white" }}>
          <div className="-d-flex justify-content-end">
            <h4 className="p-2" onClick={handleDeleteAllRead}>
              Delete all read
            </h4>
          </div>
          {
            user?.seenNotification.map(seenNotificationMsg =>(
                <div style={{cursor:"pointer"}}onClick={navigate(seenNotificationMsg.onClickPath)} className="card"  >
                    <div className="card-text text-dark  ">
                        {seenNotificationMsg.message}
                    </div>
                </div>
            ))
          }
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notification;
