import React, { useState } from "react";
import { Input, Button } from "./index";
import authService from "../Appwrite/auth";
import { useForm } from "react-hook-form";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  //   const dispatch = useDispatch();
  const navigate = useNavigate();

  // ṣignup function

  async function signup(data) {
    setError(null);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          navigate("/login");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div className={`mx-auto w-full max-w-lg border p-10 rounded-xl`}>
        {/* this is for logo  */}
        <div>
          <img src="" alt="Logo" className="w-16 h-16 mx-auto mb-5" />
        </div>
        <h2 className="text-center text-2xl font-bold mb-5">
          Sign up to create an account
        </h2>
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form onSubmit={handleSubmit(signup)}>
          <div className="space-y-4">
            <Input
              label="Enter username"
              placeholder="Enter your username"
              {...register("username", {
                required: true,
              })}
            />
            <Input
              label="Enter Email"
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
              label="Enter Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
