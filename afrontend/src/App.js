import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UseSelector, useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";
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
              path="/notification"
              element={
                <ProtectedRoute>
             <Notification/>
                </ProtectedRoute>
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}
