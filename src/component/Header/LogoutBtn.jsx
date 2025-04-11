import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../Appwrite/auth";
import { logout } from "../../store/AuthSlice";

function LogoutBtn() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error("Error logging out:", error);
      throw error;
    }
  };
  return (
    <button
      className="px-5 py-2 rounded-xl bg-red-600 text-white"
      onClick={handleLogout}
    >
      LogoutBtn
    </button>
  );
}

export default LogoutBtn;
