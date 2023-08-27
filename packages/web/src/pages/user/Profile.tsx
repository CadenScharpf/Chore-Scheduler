import React from "react";
import AuthService from "../../services/auth.service";

const Profile: React.FC = () => {
  const currentUser = AuthService.getCurrentUser();

  return  currentUser? (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.email}
      </p>
      <p>
        <strong>role:</strong>v{currentUser.role}
      </p>
    </div>
  ): (<div></div>);
};

export default Profile;
