import React, { useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { loginSchema } from "../schemas/LoginSchema";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../provider/AuthProvider";
import { Email } from "../icons/Email";
import { Key } from "../icons/Key";

function Login() {
  const { token, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: async (values) => {
        await handleLogin();
      },
    });

  const handleLogin = async () => {
    try {
      const res = await axios.post(`http://localhost:7460/api/auth/login`, {
        email: values.email,
        password: values.password,
      });

      const newToken = res.data.token;
      if (newToken) {
        toast.success("Login successful !", { duration: 2000 });
        login(newToken);
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error(`${err.response.data.message}`, {
          duration: 2000,
        });
      } else {
        toast.error("Registration failed! Something went wrong!", {
          duration: 2000,
        });
        console.log(err);
      }
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} autoComplete="off">
        <h2 className="text-6xl font-extrabold text-[#007DC0] text-center mb-10">
          Login
        </h2>

        <div className="mb-10">
          <div className="mb-10 w-[80%] mx-auto">
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

          <div className="mb-10 w-[80%] mx-auto">
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
        </div>

        <div className="flex">
          <div className="flex mx-auto gap-10 text-lg">
            <p>forgot the password ?</p>
            <Link className="text-[#007DC0] underline">reset password</Link>
          </div>
        </div>

        <div className="text-center mt-10 ">
          <button
            className="bg-[#007DC0] w-[50%] text-md text-white font-bold"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
