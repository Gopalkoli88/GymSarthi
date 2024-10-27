import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const token = useSelector((state) => state.user.token);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
