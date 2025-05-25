import React, { useState } from "react";
import { motion } from "framer-motion";
import Login from "../components/Login";
import Register from "../components/Register";
import backGroundImage from "../assets/bg.jpg";

export default function Connect() {
  const [isLogin, setIsLogin] = useState(true);

  const panelVariants = {
    login: { x: "100%" },
    register: { x: "0%" },
  };

  return (
    <div
      style={{ backgroundImage: `url(${backGroundImage})` }}
      className="bg-cover h-screen bg-center flex justify-center items-center"
    >
      <div className="relative w-[70%] h-[90%] overflow-hidden mx-auto  rounded-xl shadow-lg flex ">
        {/* Sliding Panel */}
        <motion.div
          className="absolute w-1/2 h-full bg-[#007BFF] text-white flex flex-col justify-center items-center p-8 z-10 transition-all duration-500"
          variants={panelVariants}
          animate={isLogin ? "login" : "register"}
          transition={{ duration: 0.3 }}
        >
          {isLogin ? (
            <div className="flex flex-col gap-10 text-center">
              <p className="text-center mb-4 text-2xl">It’s nice to see you again</p>
              <h2 className="text-6xl font-bold mb-2">Welcome Back</h2>
              <div className="flex mx-auto gap-5">
                <p className="text-lg">New User ?</p>
                <button onClick={() => setIsLogin(false)} className="bg-white text-[#007DC0] px-5">
                  Register Here
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-10 text-center">
              <p className="text-center mb-4 text-2xl">It’s good to see you</p>
              <h2 className="text-6xl font-bold mb-2">Welcome</h2>
              <div className="flex mx-auto gap-5">
                <p className="text-lg">Already have an account?</p>
                <button onClick={() => setIsLogin(true)} className="bg-white text-[#007DC0] px-5">
                  Login Here
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <div className="w-full flex">
          <div
            className={`w-1/2 h-full bg-white flex flex-col justify-center items-center transition-opacity duration-1000 ${
              isLogin
                ? "opacity-100 transition duration-700 z-0"
                : "opacity-0 transition duration-700 -z-10"
            }`}
          >
            <Login />
          </div>

          <div
            className={`w-1/2 h-full bg-white flex flex-col justify-center items-center transition-opacity  duration-500 ${
              isLogin
                ? "opacity-0 transition duration-700 -z-10"
                : "opacity-100 transition duration-700 z-0"
            }`}
          >
            <Register whenDoneRegister={() => setIsLogin(true)} />
          </div>
        </div>
      </div>
    </div>
  );
}
