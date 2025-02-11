import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FaGoogle, FaFacebook } from "react-icons/fa"; // Add social icons
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAuth from "../../../Hooks/useAuth";
import { FcGoogle } from "react-icons/fc";


const SocialLogin = () => {
  const { googleSignIn, facebookSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photoURL: result.user?.photoURL,
          class: " ",
          created: new Date(),
          version: " ",
          school: " ",
          phone: " ",


        };

        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            Swal.fire({
              title: "Login Success",
              text: "Assalamuwalaikum, Welcome to our Coaching",
              icon: "success",
              showConfirmButton: true,
              timer: 1500,
            });
            navigate(from, { replace: true });
          })
          .catch((err) => {
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Failed to create user",
              text: err.message,
              showConfirmButton: true,
            });
          });
      })
      .catch((err) => {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Google Sign-in Failed",
          text: err.message,
          showConfirmButton: true,
        });
      });
  };

  const handleFacebookSignIn = () => {
    facebookSignIn() // Assuming you have facebookSignIn method in AuthContext
      .then((result) => {
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
          photoURL: result.user?.photoURL,
          role: "user",
        };

        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            Swal.fire({
              title: "Login Success",
              text: "Assalamuwalaikum, Welcome to our MediCamp",
              icon: "success",
              showConfirmButton: true,
              timer: 1500,
            });
            navigate(from, { replace: true });
          })
          .catch((err) => {
            Swal.fire({
              position: "top",
              icon: "error",
              title: "Failed to create user",
              text: err.message,
              showConfirmButton: true,
            });
          });
      })
      .catch((err) => {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "Facebook Sign-in Failed",
          text: err.message,
          showConfirmButton: true,
        });
      });
  };

  return ( <div className="">
    <div className="divider ">
      <p className="text-amber-600 font-semibold">Or</p>
    </div>
    <div className="space-y-3">
    <button onClick={handleGoogleSignIn} className="btn w-full hover:bg-amber-600">
      <FcGoogle /> Continue With Google
    </button>
    <button
          onClick={handleFacebookSignIn}
          className="btn w-full hover:bg-amber-600"
        >
          <FaFacebook size={20} />
          <span>Sign In with Facebook</span>
        </button>
    </div>
  </div>
  );
};

export default SocialLogin;
