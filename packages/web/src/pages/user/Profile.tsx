import React, { useEffect } from "react";
import AuthService from "../../services/auth.service";
import { useAuth } from "../../hooks/auth";

const Profile: React.FC = () => {
  const auth = useAuth();
  return  auth.user? (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{auth.user.name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {auth.user.id}
      </p>
      <p>
        <strong>Email:</strong> {auth.user.email}
      </p>
      <p>
        <strong>role:</strong>{auth.user.role}
      </p>
    </div>
  ): (<div></div>);
};

export default Profile;
