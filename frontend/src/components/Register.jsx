import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { registerSchema } from "../schemas/RegisterSchema";
import toast from "react-hot-toast";
import { Email } from "../icons/Email";
import { Key } from "../icons/Key";
import { Profile } from "../icons/Profile"
import { Lock } from "../icons/Lock"

function Register(props) {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        username: "",
        email: "",
        number: "",
        isAdmin: false,
        password: "",
        confirmPassword: "",
      },
      validationSchema: registerSchema,
      onSubmit: async (values, { resetForm }) => {
        await handleRegister();
        resetForm();
      },
    });

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:7460/api/auth/register", {
        username: values.username,
        email: values.email,
        number: values.number,
        password: values.password,
        isAdmin: values.isAdmin,
      });

      if (res.status === 201) {
        toast.success(`${res.data.message}`, { duration: 3000 });

        setTimeout(() => {
          props.whenDoneRegister();
        }, 500);
      } else {
        toast.error("Error Registering!", { duration: 2000 });
        resetForm();
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        toast.error("Email is already in use. Please try a different one.", {
          duration: 2000,
        });
      } else {
        toast.error("Registration failed! Something went wrong!", {
          duration: 2000,
        });
      }
    }
  };
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2 className="text-6xl font-extrabold text-[#007DC0] text-center mb-2">
          Register
        </h2>
        <div className="mb-2">
          <div className="mb-2 w-[80%] mx-auto">
            <div className="flex mx-auto w-full">
              <div className="bg-[#007DC0] rounded-l-md w-10 flex">
                <Profile className="text-3xl text-white mx-auto my-auto" />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="username"
                  placeholder="username"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.username && touched.username
                      ? "input-error rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#c00000]"
                      : "rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#007DC0]"
                  }
                />
              </div>
            </div>
            {errors.username && touched.username && (
              <p className="text-xs mb-1 text-red-500">{errors.username}</p>
            )}
          </div>

          <div className="mb-2 w-[80%] mx-auto">
            <div className="flex mx-auto w-full">
              <div className="bg-[#007DC0] rounded-l-md w-10 flex">
                <Email className="text-3xl text-white mx-auto my-auto" />
              </div>
              <div className="w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? "input-error rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#c00000]"
                      : "rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#007DC0]"
                  }
                />
              </div>
            </div>
            {errors.email && touched.email && (
              <p className="text-xs mb-1 text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="mb-2 w-[80%] mx-auto">
            <div className="flex mx-auto w-full">
              <div className="bg-[#007DC0] rounded-l-md w-10 flex">
                <Profile className="text-3xl text-white mx-auto my-auto" />
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="number"
                  placeholder="phone number"
                  value={values.number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.number && touched.number
                      ? "input-error rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#c00000]"
                      : "rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#007DC0]"
                  }
                />
              </div>
            </div>
            {errors.number && touched.number && (
              <p className="text-xs mb-1 text-red-500">{errors.number}</p>
            )}
          </div>

          <div className="mb-2 w-[80%] mx-auto">
            <div className="flex mx-auto w-full">
              <div className="bg-[#007DC0] rounded-l-md w-10 flex">
                <Lock className="text-3xl text-white mx-auto my-auto" />
              </div>
              <div className="w-full">
                <select
                  name="isAdmin"
                  value={values.isAdmin === true ? "true" : "false"}
                  onBlur={handleBlur}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "isAdmin",
                        value: e.target.value === "true",
                      },
                    })
                  }
                  className={
                    errors.isAdmin && touched.isAdmin
                      ? "input-error rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#c00000]"
                      : "rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#007DC0]"
                  }
                >
                  <option value="false">Member</option>
                  <option value="true">Admin</option>
                </select>
              </div>
            </div>
            {errors.isAdmin && touched.isAdmin && (
              <p className="text-xs mb-1 text-red-500">{errors.isAdmin}</p>
            )}
          </div>

          <div className="mb-2 w-[80%] mx-auto">
            <div className="flex mx-auto w-full">
              <div className="bg-[#007DC0] rounded-l-md w-10 flex">
                <Key className="text-3xl text-white mx-auto my-auto" />
              </div>
              <div className="w-full">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password
                      ? "input-error rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#c00000]"
                      : "rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#007DC0]"
                  }
                />
              </div>
            </div>
            {errors.password && touched.password && (
              <p className="text-xs mb-1 text-red-500">{errors.password}</p>
            )}
          </div>

          <div className="mb-5 w-[80%] mx-auto">
            <div className="flex mx-auto w-full">
              <div className="bg-[#007DC0] rounded-l-md w-10 flex">
                <Key className="text-3xl text-white mx-auto my-auto" />
              </div>
              <div className="w-full">
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirm password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "input-error rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#c00000]"
                      : "rounded-r-md bg-[#D7F1FF] p-2 w-full border-b-2 border-[#007DC0]"
                  }
                />
              </div>
            </div>
            {errors.confirmPassword && touched.confirmPassword && (
              <p className="text-xs mb-1 text-red-500">{errors.confirmPassword}</p>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            className="bg-[#007DC0] w-[50%] text-white text-md font-bold"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
