import React, { useEffect } from "react";
import { useAuth } from "../provider/AuthProvider";
import { Logout } from "../icons/Logout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UpdateSchema } from "../schemas/UpdateSchema";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";

function Update() {
  const { user, logout, setUser } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();
  
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        number: "",
        password: "",
      },
      validationSchema: UpdateSchema,
      onSubmit: async (values, { resetForm }) => {
        await handleUpdate();
        resetForm();
      },
    });

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        `http://localhost:7460/api/edit-info/${user._id}`,
        {
          username: values.username !== "" ? values.username : user.username,
          email: values.email !== "" ? values.email : user.email,
          number: values.number !== "" ? values.number : user.number,
          confirmationPassword: values.password,
        }
      );

      if (res.status === 200) {
        toast.success(`${res.data.message}`, { duration: 2000 });
        setUser(res.data.updatedUser)
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(`${error.response.data.message}`, {duration: 2000})
      } else {
        toast.error("Error updating user! something went wrong!", {
        duration: 2000,
      });
      }
      console.log(error)
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#001F3F] to-[#3b9aff]">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg text-center max-w-3xl w-full border-3 border-blue-600"
      >
        <div className="flex items-center justify-center bg-blue-600 rounded-t-lg p-3">
          <p className="text-3xl flex text-white">Edit Info</p>
          
        </div>
        <div className="p-6 flex flex-col gap-5 space-y-1">
          <div className="mx-auto w-[70%] flex flex-col text-xl space-y-3">
            <div>
              <div className="flex mb-1 justify-between">
                <p className="text-blue-600 font-bold">Username:</p>
                <p>{user.username}</p>
              </div>
              <div className="mb-2 mx-auto">
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username
                      ? "input-error rounded-md bg-[#D7F1FF] w-full border-b-2 border-[#c00000]"
                      : "rounded-md bg-[#D7F1FF] w-full border-b-2 border-[#007DC0]"
                  }
                />
                {errors.username && touched.username && (
                  <p className="text-xs mb-1 text-red-500">{errors.username}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <p className="text-blue-600 font-bold">Email:</p>
                <p>{user.email}</p>
              </div>
              <div className="mb-2 mx-auto">
                <input
                  type="text"
                  name="email"
                  placeholder="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "input-error rounded-md bg-[#D7F1FF] w-full border-b-2 border-[#c00000]"
                      : "rounded-md bg-[#D7F1FF] w-full border-b-2 border-[#007DC0]"
                  }
                />
                {errors.email && touched.email && (
                  <p className="text-xs text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <p className="text-blue-600 font-bold">Number:</p>
                <p>{user.number}</p>
              </div>
              <div className="mb-2 mx-auto">
                <input
                  type="text"
                  name="number"
                  placeholder="phone number"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.number && touched.number
                      ? "input-error rounded-md bg-[#D7F1FF] w-full border-b-2 border-[#c00000]"
                      : "rounded-md bg-[#D7F1FF] w-full border-b-2 border-[#007DC0]"
                  }
                />
                {errors.number && touched.number && (
                  <p className="text-xs text-red-500">{errors.number}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex mb-1 justify-between">
                <p className="mx-auto text-blue-600 font-bold">
                  Enter current password to confirm
                </p>
              </div>
              <div className="mb-2 mx-auto">
                <input
                  type="password"
                  name="password"
                  placeholder="enter password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "input-error rounded-md bg-[#D7F1FF] w-full border-b-2 border-[#c00000]"
                      : "rounded-md bg-[#D7F1FF] w-full border-b-2 border-[#007DC0]"
                  }
                />
                {errors.password && touched.password && (
                  <p className="text-xs text-red-500">{errors.password}</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex">
            <div className="flex mx-auto gap-10 w-[80%]">
              <button
              type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-400 w-1/2 hover:bg-gray-700 text-white font-semibold  transition duration-300"
              >
                cancel
              </button>
              <button
                disabled={
                  values.username === "" &&
                  values.email === "" &&
                  values.number === ""
                }
                type="submit"
                className="bg-blue-600 w-1/2 hover:bg-blue-700 disabled:bg-blue-300 disabled:hover:bg-blue-300 text-white font-semibold  transition duration-300"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Update;
