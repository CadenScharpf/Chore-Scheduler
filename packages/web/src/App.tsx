import * as React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import { IUser } from "chore-scheduler-common";

import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import EventBus, { EventMap } from "./common/EventBus";
import { useAuth } from "./hooks/auth";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/public/Landing";
import NavBar from "./components/NavBar";
import { Box, Container } from "@mui/material";


const layoutParams = {
  navHeight: 64,
}
const App: React.FC = () => {
  const auth = useAuth();
  return (
    <>
      <Box sx={{height: layoutParams.navHeight}} component="nav">
        <NavBar />
      </Box>
      <Box sx={{height:`calc(100vh - ${layoutParams.navHeight}px)`}} component="section">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute roles={[1, 0]}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </>
  );
};

export default App;
