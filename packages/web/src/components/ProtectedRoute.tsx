import { UserRoles } from "chore-scheduler-common";
import React, { useEffect } from "react";
import { useAuth } from "../hooks/auth";
import { Navigate } from "react-router-dom";

interface IProtectedRouteProps {
  children: React.ReactNode;
  roles: UserRoles[];
}
export function ProtectedRoute(props: IProtectedRouteProps) {
  const { children, roles } = props;
  const auth = useAuth();

  return auth.user && auth.user.role && roles.indexOf(auth.user.role) !== -1 ? (
    <>{children}</>
  ) :  (
    <div>Not Authorized</div>
  );
}

export default ProtectedRoute;
