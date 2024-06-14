import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {  useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";
import Users from "./pages/admin/Users";
import Doctors from "./pages/admin/Doctors";
import Profile from "./pages/doctor/Profile"
import BookingPage from "./pages/BookingPage";
import Appointnents from "./pages/Appointnents";
import DocAppointments from "./pages/doctor/DocAppointments";
export default function App() {
  const { loading } = useSelector((state) => state.alerts);
  return (
    <div>
      <BrowserRouter>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  {" "}
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            /> <Route
            path="/appointments"
            element={
              <ProtectedRoute>
                <Appointnents/>
              </ProtectedRoute>
            }
          />
            <Route
            path="/doctor-appointments"
            element={
              <ProtectedRoute>
                <DocAppointments/>
              </ProtectedRoute>
            }
          />
             <Route
              path="/apply-doctor"
              element={
                <ProtectedRoute>
             <ApplyDoctor/>
                </ProtectedRoute>
              }
            />
             <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
            <Users/>
                </ProtectedRoute>
              }
            />
             <Route
              path="/admin/doctors"
              element={
                <ProtectedRoute>
          <Doctors/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoute>
             <Notification/>
                </ProtectedRoute>
              }
            />
            <Route
              path="/doctor/profile/:id"
              element={
                <ProtectedRoute>
          <Profile/>
                </ProtectedRoute>
              }
            />
             <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoute>
       <BookingPage/>
                </ProtectedRoute>
              }
            />
            
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}
