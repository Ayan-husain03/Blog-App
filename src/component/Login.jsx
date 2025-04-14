import React from "react";
import { Input, Button, Logo } from "./index";
import authService from "../Appwrite/auth";
import { login as authLogin } from "../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function login(data) {
    setError(null);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
          Swal.fire({
            icon: "success",
            title: "Login Successful!",
            text: "Welcome back 😊",
            confirmButtonText: "Continue",
            timer: 2000,
          });
        }
      }
    } catch (error) {
      setError("Invalid password");
      toast.error("Error logging in ");
      console.log(error);
    }
  }
  return (
    <>
      <ToastContainer />
      <div className="flex justify-center">
        <div className={`mx-auto w-full max-w-lg md:shadow-2xl md:p-10 p-5`}>
          {/* this is for logo */}
          <Logo width={200} />
          <h2 className="text-center text-2xl  font-bold mb-5">
            Sign in to your account
          </h2>
          <p className="mb-5 text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <form onSubmit={handleSubmit(login)}>
            <div className="mb-4">
              <Input
                className="mb-5"
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ||
                      "Invalid email address",
                  },
                })}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full mt-5">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
