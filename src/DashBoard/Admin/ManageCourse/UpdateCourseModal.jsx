import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useaxiosSecure";
import useImageUpload from "../../../Hooks/useImageUpload";
import { FaCross, FaEdit } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const UpdateCourseModal = ({ course, onClose, refetch }) => {
  const { uploadImage, uploading, imageUrl, error } = useImageUpload();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (course) {
      Object.keys(course).forEach((key) => setValue(key, course[key]));
    }
  }, [course, setValue]);

  const onSubmit = async (data) => {
    // Swal.fire({
    //   title: "Updating Course...",
    //   allowOutsideClick: false,
    //   showConfirmButton: false,
    //   didOpen: () => {
    //     Swal.showLoading();
    //   },
    // });

    let updatedData = {
      ...data,
      date: new Date(),
      fee: parseInt(data.fee),
      image: course.image,
    };

    if (imageUrl) {
      updatedData.image = imageUrl;
    }
    // console.log(updatedData);
    const confirm = await Swal.fire({
      title: "Are you sure to Update this Course?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#1bb1b1",
      confirmButtonText: "Yes, Update it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.patch(`/course/${course._id}`, updatedData);
    //   console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.close();
        Swal.fire({
          title: "Course Updated Successfully!",
          icon: "success",
          timer: 2000,
        });
        refetch();
        onClose();
      } else {
        Swal.fire({
          title: "No Changes Made!",
          icon: "info",
          timer: 2000,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 p-1  flex items-center justify-center bg-opacity-50  z-50">
      <div className="bg-white p-6 rounded-lg border border-gray-500 max-h-[90vh] overflow-y-auto shadow-lg w-full max-w-3xl">
        <div className="flex right-3 md:hidden fixed">
          {" "}
          <button
            className="btn-neutral text-red-600 font-semibold"
            onClick={onClose}
          >
            <FaX size={20} />
          </button>
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Update Course</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 gap-4">
          <div>
            <label className="block text-xl text-gray-700">Course Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700">Class</label>
            <input
              type="text"
              {...register("class")}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700">Version</label>
            <select
              {...register("version")}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="English">English</option>
              <option value="Bangla">Bangla</option>
            </select>
          </div>

          <div>
            <label className="block text-xl text-gray-700">Subjects</label>
            <input
              type="text"
              {...register("subjects")}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700">Duration</label>
            <input
              type="text"
              {...register("duration")}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700">Course Fee</label>
            <input
              type="text"
              {...register("fee")}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700">Description</label>
            <textarea
              {...register("description")}
              className="w-full px-3 py-2 border rounded-md"
              rows="3"
            ></textarea>
          </div>

          <div>
            <label className="block text-xl text-gray-700">Contact</label>
            <input
              type="text"
              {...register("contact")}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700">Time</label>
            <input
              type="text"
              {...register("time")}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700">Location</label>
            <input
              type="text"
              {...register("location")}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700">Days</label>
            <input
              type="text"
              {...register("days")}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block text-xl text-gray-700">Facilities</label>
            <input
              type="text"
              {...register("facilities")}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Image Upload Section */}
          <div>
            <label className="block text-xl text-gray-700">Course Image</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-3 py-2 border rounded-md"
              onChange={(e) => uploadImage(e.target.files[0])}
            />
            {uploading && <p className="text-blue-500">Uploading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="w-32 h-20 rounded-md"
                />
              </div>
            )}
          </div>

          <div className="col-span-2 pt-4 flex justify-between">
            <button
              type="button"
              className="px-4 bg-red-500 py-2  text-white rounded-md"
              onClick={onClose}
            >
              Cancel <FaX className="inline-block" />
            </button>
            <button
              type="submit"
              className="btn  font-semibold  bg-gradient-to-r from-green-500 to-amber-500 text-white py-2 px-4 rounded-lg hover:from-green-600 hover:to-amber-600 focus:outline-none "
            >
              Update Course <FaEdit size={20} className="inline-block" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourseModal;
