import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarker,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaUpload,
  FaBook,
  FaSchool,
  FaLanguage,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import useScrolltoTop from "../../../Hooks/useScrolltoTop";
import useAuth from "../../../Hooks/useAuth";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

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
  const [profileImage, setProfileImage] = useState(null);
  const { createUser, updateUserProfile } = useAuth();

  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Loading...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // console.log(data);

    const imageFile = { image: data.profileImage[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const photoURL = res.data?.data?.display_url;
    console.log();

    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log("User created: ", loggedUser);

        updateUserProfile(data?.fullName, photoURL)
          .then(() => {
            const userInfo = {
              name: data.fullName,
              email: data.email,
              photoURL: photoURL,
              class: data.class,
              school: data.school,
              version: data.language,
              created: new Date(),
              phone: data.phone
            };
            console.log(userInfo);

            axiosPublic
              .post("/users", userInfo)
              .then((res) => {
                Swal.close();
                if (res.data.insertedId) {
                  reset();
                  Swal.fire({
                    title: "Sign Up Successful",
                    text: "Assalamuwalaikum, Welcome to our MediCamp",
                    icon: "success",
                    timer: 1500,
                  });

                  navigate("/");
                }
              })
              .catch((err) => {
                // console.log(err);
                Swal.close();
                Swal.fire({
                  title: "An Error Occurred",
                  text:
                    err.message ||
                    "Something went wrong. Please try again later.",
                  icon: "error",
                });
              });
          })
          .catch((err) => {
            // console.log(err);
            Swal.close();
            Swal.fire({
              title: "An Error Occurred",
              text:
                err.message || "Something went wrong. Please try again later.",
              icon: "error",
            });
          });
      })
      .catch((err) => {
        // console.log(err);
        Swal.close();
        Swal.fire({
          title: "An Error Occurred",
          text: err.message || "Something went wrong. Please try again later.",
          icon: "error",
        });
      });

    // console.log(data);
    if (profileImage) {
      console.log("Profile Image:", profileImage);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <div className="min-h-screen pt-6 pb-6 flex justify-center items-center bg-gray-50">
      <Helmet>
        <title>SignUP || OCMS</title>
      </Helmet>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          Register
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name Input */}
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
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200`}
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full Name is required" })}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-500" />
              </div>
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

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

          {/* Phone Number Input */}
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
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200`}
                placeholder="Enter your phone number"
                {...register("phone", {
                  required: "Phone Number is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaPhone className="text-gray-500" />
              </div>
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* School name */}
          <div className="mb-4 text-gray-800 relative">
            <label htmlFor="school" className="block text-gray-600 mb-2">
              School Name
            </label>
            <div className="relative">
              <select
                id="school"
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.school ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none`}
                {...register("school", { required: "School name is required" })}
              >
                <option value="">Select your school</option>
                <option value="teacher" className="text-red-500 font-semibold">Teacher</option>
                
                <option value="BPATC School & College">
                  BPATC School & College
                </option>
                <option value="Cant. Public School">Cant. Public School</option>
                <option value="Morning Glory School">
                  Morning Glory School
                </option>
                <option value="Fair Anjuman School">Fair Anjuman School</option>
                <option value="Savar Model School">Savar Model School</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSchool className="text-gray-500" />
              </div>
            </div>
            {errors.school && (
              <p className="text-red-500 text-sm mt-1">
                {errors.school.message}
              </p>
            )}
          </div>
          {/* Class Input */}
          <div className="mb-4 text-gray-800 relative">
            <label htmlFor="class" className="block text-gray-600 mb-2">
              Class
            </label>
            <div className="relative">
              <select
                id="class"
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.class ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none`}
                {...register("class", { required: "Class is required" })}
              >
                <option value="">Select your class</option>
                <option value="teacher" className="text-red-500 font-semibold">Teacher</option>
        

                {[...Array(10).keys()].map((i) => (
                  <>
                    <option key={i + 3} value={i + 3}>
                      {i + 3}th Class
                    </option>
                  </>
                ))}
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBook className="text-gray-500" />{" "}
                {/* আইকন হিসেবে FaBook ব্যবহার করা হয়েছে */}
              </div>
            </div>
            {errors.class && (
              <p className="text-red-500 text-sm mt-1">
                {errors.class.message}
              </p>
            )}
          </div>
          {/*study Version */}
          <div className="mb-4 text-gray-800 relative">
            <label htmlFor="language" className="block text-gray-600 mb-2">
              Language Version
            </label>
            <div className="relative">
              <select
                id="language"
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.language ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none`}
                {...register("language", {
                  required: "Please select a language version",
                })}
              >
                <option value="">Select language version</option>
                <option value="teacher" className="text-red-500 font-semibold">Teacher</option>
                <option value="english">English</option>
                <option value="bangla">Bangla</option>
              </select>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLanguage className="text-gray-500" />
              </div>
            </div>
            {errors.language && (
              <p className="text-red-500 text-sm mt-1">
                {errors.language.message}
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

          {/* Profile Picture Upload */}
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
                  required: "Profile image is required",
                })}
                className="w-full opacity-0 absolute cursor-pointer"
              />
              <label
                htmlFor="profileImage"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between cursor-pointer hover:border-blue-500 transition-all duration-300"
              >
                <span className="text-gray-500">
                  {watch("profileImage")?.[0]?.name || "Choose a file"}
                </span>
                <FaUpload className="text-gray-500" />
              </label>
            </div>
            {errors.profileImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.profileImage.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-600 hover:bg-amber-600 transition duration-200"
          >
            Register
          </button>

          {/* Already have an Account? Section */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {"Already have an account?"}{" "}
              <Link
                to="/auth/login" // Replace with your login route
                className="text-blue-500 hover:text-blue-600 transition duration-200"
              >
                Log In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
