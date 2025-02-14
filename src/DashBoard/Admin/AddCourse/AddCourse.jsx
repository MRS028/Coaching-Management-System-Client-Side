import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useImageUpload from "../../../Hooks/useImageUpload";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useaxiosSecure";
import SectionTitle from "../../../Pages/SectionTitle/SectionTitle";
import useScrolltoTop from "../../../Hooks/useScrolltoTop";

const AddCourse = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { uploadImage, uploading, imageUrl, error } = useImageUpload();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    useScrolltoTop();
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    Swal.fire({
      title: "Processing Your Request",
      text: "This may take a few moments. Please wait...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    let uploadedUrl = imageUrl;
    if (selectedFile && !imageUrl) {
      uploadedUrl = await uploadImage(selectedFile);

      //  setImageUrl(uploadedUrl);
    }

    if (!uploadedUrl) {
      alert("Please upload an image first!");
      return;
    }

    const courseData = {
      ...data,
      count: 0,
      date: new date(),
      image: uploadedUrl,
      subjects: data.subjects
        ? data.subjects.split(",").map((s) => s.trim())
        : [],
      days: data.days ? data.days.split(",").map((d) => d.trim()) : [],
      facilities: data.facilities
        ? data.facilities.split(",").map((f) => f.trim())
        : [],
    };
    //console.log("Final Course Data:", courseData);

    const res = await axiosSecure.post("/course", courseData);
    console.log("Course Added to db:", res.data);
    if (res.data.insertedId) {
      Swal.close();
      reset();
      navigate("/dashboard/manageCourses");
      Swal.fire({
        title: "Course Added Successfully",
        icon: "success",
        draggable: true,
        timer: 2000,
      });
    }

    // alert("Course added successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100  lg:p-6 flex items-center justify-center">
      <div className="bg-white p-2 lg:p-6 rounded-lg shadow-md w-full">
        <SectionTitle
          title={" Add New Course"}
          subtitle={"Dreams are Comming true In Sha Allah"}
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center"></h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Course Title */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Course Title
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="SSC Science Special"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Course Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none px-4 py-2 border rounded-lg"
              onChange={handleImageChange}
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>
            )}
          </div>

          {/* Class */}
          <div>
            <label className="block text-gray-700 font-semibold">Class</label>
            <input
              type="text"
              {...register("class")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none px-4 py-2 border rounded-lg"
              placeholder="Class 9-10"
            />
          </div>

          {/* Version */}
          <div>
            <label className="block text-gray-700 font-semibold">Version</label>
            <select
              {...register("version")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none px-4 py-2 border rounded-lg"
            >
              <option value="English">English</option>
              <option value="Bangla">Bangla</option>
            </select>
          </div>

          {/* Subjects */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Subjects
            </label>
            <input
              type="text"
              {...register("subjects")}
              className="w-full px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none py-2 border rounded-lg"
              placeholder="Physics, Chemistry, Biology"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Duration
            </label>
            <input
              type="text"
              {...register("duration")}
              className="w-full px-4 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none py-2 border rounded-lg"
              placeholder="8 months"
            />
          </div>

          {/* Fee */}
          <div>
            <label className="block text-gray-700 font-semibold">Course Fee</label>
            <input
              type="text"
              {...register("fee")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none px-4 py-2 border rounded-lg"
              placeholder="5000 BDT/month"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              {...register("description")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none px-4 py-2 border rounded-lg"
              placeholder="Course details..."
              rows="3"
            ></textarea>
          </div>

          {/* Contact */}
          <div>
            <label className="block text-gray-700 font-semibold">Contact</label>
            <input
              type="text"
              {...register("contact")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none px-4 py-2 border rounded-lg"
              placeholder="019XXXXXXXX"
            />
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 font-semibold">Time</label>
            <input
              type="text"
              {...register("time")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none px-4 py-2 border rounded-lg"
              placeholder="04:00PM - 06:00PM"
              defaultValue={"04:00PM - 06:00PM"}
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Location
            </label>
            <input
              type="text"
              {...register("location")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none px-4 py-2 border rounded-lg"
              placeholder="Thana Road, Savar"
              defaultValue={"Thana Road, Savar"}
            />
          </div>

          {/* Days */}
          <div>
            <label className="block text-gray-700 font-semibold">Days</label>
            <input
              type="text"
              {...register("days")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none px-4 py-2 border rounded-lg"
              placeholder="SUN, TUES, THURS"
              defaultValue={"SUN, TUES, THURS"}
            />
          </div>

          {/* Facilities */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Facilities
            </label>
            <input
              type="text"
              {...register("facilities")}
              className="w-full focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none px-4 py-2 border rounded-lg"
              placeholder="Model Tests, Q&A Sessions"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full  bg-gradient-to-r from-green-500 to-amber-500 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-amber-600 focus:outline-none"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCourse;
