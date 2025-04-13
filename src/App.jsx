import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import authService from "./Appwrite/auth";
import { login, logout } from "./store/AuthSlice";
import { Header, Footer } from "./component";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    // Check if user is logged in
    async function checkUser() {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    }
    checkUser();
   
  }, []);

  return !loading ? (
    <div className="min-h-screen text-center bg-amber-200">
      <Header />
      <Outlet />
      <Footer />
    </div>
  ) : (
    <div className="text-5xl text-center p-32">Loading...</div>
  );
}

export default App;
