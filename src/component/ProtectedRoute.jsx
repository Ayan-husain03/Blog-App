import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";



function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Redirect to the login page if not authenticated
    isAuthenticated ? navigate("/") : navigate("/login");
  }, [isAuthenticated, navigate]);

  return (
    isAuthenticated ? children : navigate("/login")
  );
}

export default ProtectedRoute;
