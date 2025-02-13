import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaEye, FaEyeSlash, FaInbox, FaKey } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import useScrolltoTop from "../../../Hooks/useScrolltoTop";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";
import logo from '../../../assets/CMSlogo2.png'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  useScrolltoTop();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    // console.log(data);
  
    logIn(data.email, data.password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: "Login Success",
          text: "Assalamuwalaikum, Welcome to our Coaching",
          icon: "success",
          timer: 1500,
        });
        navigate("/");
  
        // const isAdmin = users.some(
        //   (u) => u.email === user.email && u.role === "admin"
        // );
        // console.log("Is Admin:", isAdmin);
  
        // navigate(isAdmin ? "/dashboard/adminHome" : from, { replace: !isAdmin });
      })
      .catch((error) => {
        // Handle login errors
        console.error("Login Error: ", error.message);
        Swal.fire({
          title: "Login Failed",
          text: `Error: ${error.message}`,
          icon: "error",
          confirmButtonColor: "#d33",
        });
      });
  };
  

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className=" flex justify-center items-center ">
      <div className=" p-8 rounded-lg shadow-lg w-full max-w-md ">
       <div className="flex justify-center">
       <img src={logo} alt=""  className="w-20 h-20 rounded-full border  justify-center"/>
       </div>
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-4 text-gray-800 relative">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <div className="relative">
              <input
                id="email"
                type="email"
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-500" />
              </div>
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6 relative text-gray-800">
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={passwordVisible ? "text" : "password"}
                className={`w-full pl-10 pr-10 py-2 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200`}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaKey className="text-gray-500" />
              </div>
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? (
                  <FaEyeSlash className="text-gray-500" />
                ) : (
                  <FaEye className="text-gray-500" />
                )}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Forget Password Link */}
          <div className="mb-3 text-right">
            <Link
              to="/forgot-password" // Replace with your forgot password route
              className="text-sm text-blue-600 hover:text-blue-700 transition duration-200"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 hover:bg-amber-600 transition duration-200"
          >
            Log In
          </button>

          {/* Have an Account? Section */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {"Don't have an account?"}{" "}
              <Link
                to="/auth/signup" // Replace with your signup route
                className="text-blue-500 hover:text-blue-600 transition duration-200"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      
        <SocialLogin/></div>
     
    </div>
  );
};

export default Login;
