import React from "react";
import { Input, Button } from "./index";
import authService from "../Appwrite/auth";
import { login as authLogin } from "../store/AuthSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function login(data) {
    console.log("login compo | is ko yaad se remove krna hai baad m | ",data);
    setError(null);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="flex items-center justify-center">
      <div className={`mx-auto w-full max-w-lg border p-10`}>
        {/* this is for logo */}
        <div className="flex justify-center mb-5">
          <img src="" alt="Logo" className="w-16 h-16" />
        </div>
        <h2 className="text-center text-2xl font-bold mb-5">
          Sign in to your account
        </h2>
        <p>
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="mb-4">
            <Input
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
            <Button>Login</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
