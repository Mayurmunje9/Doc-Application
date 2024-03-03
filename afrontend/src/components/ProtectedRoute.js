// ProtectedRoute.js
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";

export default function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(showLoading());
        const response = await axios.post(
          "/api/auth/user/getUserDetails",
          { token: localStorage.getItem("token") },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (response.data.success) {
          dispatch(setUser(response.data.Data));
        } else {
          <Navigate to="/login" />;
          localStorage.clear()
        }
      } catch (error) {
        dispatch(hideLoading());
        localStorage.clear()
        console.log(error);
      }
    };

    if (!user) {
      getUser();
    }
  }, [dispatch, user]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
