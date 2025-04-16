import React from "react";
import { useSelector } from "react-redux";

function UserData() {
  const user = useSelector((state) => state.auth.user);
  return (
    <div>
      <h2 className="text-black bg-gray-400 px-5 p-1">{user.name}</h2>
    </div>
  );
}

export default UserData;
