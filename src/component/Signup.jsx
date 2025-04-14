import React, { useState } from "react";
import { Input, Button, Logo } from "./index";
import authService from "../Appwrite/auth";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { login } from "../store/AuthSlice";
import { ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

function Signup() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ṣignup function

  async function signup(data) {
    console.log(data);
    setError(null);
    try {
      const userData = await authService.createAccount(data);
      console.log(userData);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        console.log("User data: from signup ", currentUser);
        if (currentUser) {
          navigate("/login");
          dispatch(login(currentUser));
          Swal.fire({
            icon: "success",
            title: "Account Created!",
            text: "Your account has been created successfully.",
            confirmButtonText: "OK",
          });
        } else {
          toast.error("Error getting user data after signup.");
          console.log("Error getting user data after signup.");
        }
      }
    } catch (error) {
      setError(error.message);
      toast.error("Error creating account: ");
    }
  }

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center">
        <div
          className={`mx-auto w-full max-w-lg md:shadow-2xl md:p-10 p-5 rounded-xl`}
        >
          <Logo width={200} />

          <h2 className="text-center text-2xl md:text-3xl font-bold mb-3">
            Sign up to create an account
          </h2>
          <p className="mb-5 text-gray-600">
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
                {...register("name", {
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
    </>
  );
}

export default Signup;
