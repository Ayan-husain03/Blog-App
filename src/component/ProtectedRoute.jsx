import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = useSelector((state) => state.auth.status);

  useEffect(() => {
    // Redirect to the login page if not authenticated
    isAuthenticated ? navigate("/") : navigate("/login");
    setLoading(false);
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      {loading ? <div>Loading...</div> : children}
    </div>
  );
}

export default ProtectedRoute;
