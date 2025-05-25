import React, { useEffect, useState } from "react";
import { useAuth } from "../provider/AuthProvider";
import { Logout } from "../icons/Logout";
import { Link } from "react-router-dom";
import axios from "axios";

function Admin() {
  const { user, token, logout } = useAuth();
  const [usersNumber, setUsersNumber] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:7460/api/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setUsersNumber(res.data);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#001F3F] to-[#3b9aff]">
      <div className="bg-white rounded-xl shadow-lg text-center max-w-xl w-full border-3 border-blue-600">
        <div className="flex items-center bg-blue-600 rounded-t-lg p-3 justify-between">
          <p className="text-3xl flex text-white">Admin Page</p>
          <button
            className="flex gap-5 text-2xl px-6 bg-white items-center"
            onClick={() => logout()}
          >
            Logout
            <Logout />
          </button>
        </div>
        <div className="p-6 flex flex-col gap-5 space-y-5">
          <p className="text-2xl font-bold">Welcome {user.username}</p>
          <div className="mx-auto flex gap-10 text-xl">
            <div className="flex flex-col items-start font-bold text-blue-600 space-y-3">
              <p>Users numbers:</p>
              <p>Changes:</p>
            </div>
            <div className="space-y-3">
              <p>{usersNumber}</p>
              <p>0000</p>
            </div>
          </div>

          <div className="flex">
            <div className="flex mx-auto gap-5">
              <Link to={"/"}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold  transition duration-300">
                  Profile Page
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
