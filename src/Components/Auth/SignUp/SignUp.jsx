import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaVenusMars,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useScrolltoTop from "../../../Hooks/useScrolltoTop";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import logo from "../../../assets/CMSlogo2.png";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import SocialLogin from "../SocialLogin/SocialLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  useScrolltoTop();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      Swal.fire({
        title: "Loading...",
        text: "Please wait while we process your request.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Upload profile image
      const imageFile = { image: data.profileImage[0] };
      const res = await axiosPublic.post(image_hosting_api, imageFile, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const photoURL = res.data?.data?.display_url;

      // Create user account
      const userCredential = await createUser(data.email, data.password);
      const loggedUser = userCredential.user;
      console.log("User created:", loggedUser);

      // Update user profile
      await updateUserProfile(data.fullName, photoURL);

      // Prepare user data for database
      const userInfo = {
        name: data.fullName,
        email: data.email,
        photoURL: photoURL,
        role: data.role,
        created: new Date(),
        phone: data.phone,
        gender: data.gender,
      };

      // Add teacher-specific fields if role is teacher
      if (data.role === "teacher") {
        userInfo.classes = [
          { id: 1, name: "seven", students: 0 },
          { id: 2, name: "ten", students: 0 },
          { id: 3, name: "nine", students: 0 },
          { id: 4, name: "eight", students: 0 },
          { id: 5, name: "six", students: 0 },
        ];
        userInfo.students = 0;
        userInfo.rating = 0;
        userInfo.status = "active"; // Add teacher status
      }

      // Save user to database
      const dbResponse = await axiosPublic.post("/users", userInfo);

      if (dbResponse.data.insertedId) {
        reset();
        Swal.fire({
          title: "Sign Up Successful!",
          text: `Welcome ${data.fullName}! Your ${data.role} account has been created.`,
          icon: "success",
          timer: 2000,
        });
        navigate("/");
      }
    } catch (error) {
      Swal.close();
      console.error("Signup error:", error);
      Swal.fire({
        title: "Registration Failed",
        text: error.message || "An error occurred during registration. Please try again.",
        icon: "error",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="min-h-screen pt-6 pb-6 flex justify-center items-center bg-gray-50">
      <Helmet>
        <title>Sign Up || OCMS</title>
      </Helmet>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-center">
          <img
            src={logo}
            alt="OCMS Logo"
            className="w-20 h-20 rounded-full border justify-center"
          />
        </div>
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Create Your Account
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-4 text-gray-800 relative">
            <label htmlFor="fullName" className="block text-gray-600 mb-2">
              Full Name
            </label>
            <div className="relative">
              <input
                id="fullName"
                type="text"
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500`}
                placeholder="Enter your full name"
                {...register("fullName", { 
                  required: "Full Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters"
                  }
                })}
              />
              <FaUser className="absolute left-3 top-3 text-gray-500" />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
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
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500`}
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4 text-gray-800 relative">
            <label htmlFor="phone" className="block text-gray-600 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <input
                id="phone"
                type="tel"
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500`}
                placeholder="01XXXXXXXXX"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: "Invalid Bangladeshi phone number"
                  }
                })}
              />
              <FaPhone className="absolute left-3 top-3 text-gray-500" />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Gender */}
          <div className="mb-4 text-gray-800 relative">
            <label htmlFor="gender" className="block text-gray-600 mb-2">
              Gender
            </label>
            <div className="relative">
              <select
                id="gender"
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.gender ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500`}
                {...register("gender", { required: "Gender is required" })}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <FaVenusMars className="absolute left-3 top-3 text-gray-500" />
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
            )}
          </div>

          {/* Password */}
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
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500`}
                placeholder="At least 6 characters"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters"
                  }
                })}
              />
              <FaKey className="absolute left-3 top-3 text-gray-500" />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Profile Picture */}
          <div className="mb-6">
            <label htmlFor="profileImage" className="block text-gray-600 mb-2">
              Profile Picture
            </label>
            <div className="relative">
              <input
                id="profileImage"
                type="file"
                accept="image/*"
                {...register("profileImage", {
                  required: "Profile picture is required"
                })}
                className="w-full opacity-0 absolute cursor-pointer"
              />
              <label
                htmlFor="profileImage"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-500"
              >
                <span className="text-gray-500">
                  {watch("profileImage")?.[0]?.name || "Choose profile picture"}
                </span>
                <FaUpload className="text-gray-500" />
              </label>
            </div>
            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-1">{errors.profileImage.message}</p>
            )}
          </div>

          {/* Role Selection */}
          <div className="mb-6 text-gray-800">
            <label className="block text-gray-600 mb-2">Register As</label>
            <div className="flex items-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="student"
                  {...register("role", { required: "Please select a role" })}
                  className="form-radio text-amber-500"
                />
                <span>Student</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="teacher"
                  {...register("role", { required: "Please select a role" })}
                  className="form-radio text-amber-500"
                />
                <span>Teacher</span>
              </label>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg hover:bg-amber-600 transition duration-200 font-medium"
          >
            Create Account
          </button>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-amber-600 hover:text-amber-700 font-medium"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>

        <SocialLogin />
      </div>
    </div>
  );
};

export default SignUp;