import React from "react";
import AuthService from "../../services/auth.service";
import { ISessionUser } from "chore-scheduler-common";
import { useAuth } from "../../hooks/auth";

const Profile: React.FC = () => {
  const authContext = useAuth();
  const user = authContext.user as ISessionUser;
  return user? (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{user.name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {user.id}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>role:</strong>v{user.role}
      </p>
    </div>
  ): (<div></div>);
};

export default Profile;
