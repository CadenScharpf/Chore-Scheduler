import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import {IUser} from 'chore-scheduler-common';

import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";

import EventBus, { EventMap } from "./common/EventBus";

interface AuthBus extends EventMap {
  "logout": () => void;
}

const App: React.FC = () => {
  //const [showAdminBoard, setShowAdminBoard] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);

  const authBus = EventBus<AuthBus>();
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    authBus.once("logout", logOut);
  }, [authBus]);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    //setShowAdminBoard(false);
  };

  return (
    
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
  );
};

export default App;