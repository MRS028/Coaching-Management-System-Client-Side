import { useState } from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";
import useCourses from "../../../Hooks/useCourses";
import SectionTitle from "../../../Pages/SectionTitle/SectionTitle";
import LoadingSpinner from "../../../Components/LoadingPage/LoadingSpinner";

const ManageCourses = () => {
  const [courses, loading] = useCourses();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  if (loading) {
    return <LoadingSpinner/>;
  }

  // search
  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.class.toLowerCase().includes(searchTerm.toLowerCase()) || 
      course.version.toLowerCase().includes(searchTerm.toLowerCase())
  ).reverse();

  // pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <SectionTitle
        title={"Manage All Courses"}
        subtitle={"Freeze Your Depth"}
      />
      <div className="lg:mx-5 flex flex-col items-start relative">
        <label className="mb-1 font-semibold">Search a course</label>
        <input
          type="text"
          placeholder="Search by title or class or version..."
          className="input input-bordered w-full max-w-lg mb-4 pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute mt-2 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      <div className="overflow-x-auto w-full p-2">
        <table className="table w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead className="border-r border-gray-300">
            <tr className="bg-amber-400 text-xl text-gray-800 border-b border-gray-300">
            <th className="p-3 text-left border-r border-gray-300">#</th>
              <th className="border-r border-gray-300 p-2">Image</th>
              <th className="border-r border-gray-300 p-2">Title</th>
              <th className="border-r border-gray-300 p-2">Class</th>
              <th className="border-r border-gray-300 p-2">Version</th>
              <th className="border-r border-gray-300 p-2">Days</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.map((course,index) => (
              <tr key={course._id} className="hover:bg-gray-100 border-b border-gray-200">
                <td className="p-3 font-semibold border-r border-gray-300">{index+1}</td>
                <td className="w-12 h-14 p-2 border-r border-gray-300">
                  <img
                    src={
                      course.image ||
                      "https://i.ibb.co.com/CpKffDgd/defaultcourse.jpg"
                    }
                    alt={course.title}
                    className="w-full h-full rounded-md object-cover"
                  />
                </td>
                <td className="font-semibold p-2 border-r border-gray-300">{course.title}</td>
                <td className="p-2 border-r border-gray-300">{course.class}</td>
                <td className="p-2 border-r border-gray-300">{course.version}</td>
                <td className="p-2 border-r border-gray-300">{course.days.join(", ")}</td>
                <td className="p-2 space-y-2 lg:space-y-0">
                  <button className="btn btn-sm bg-gradient-to-b from-green-500 to-amber-400 mr-2">
                    <FaEdit className="inline-block" /> Update
                  </button>
                  <button className="btn btn-sm bg-gradient-to-b from-red-500 to-red-600 mr-2">
                    <FaTrash className="inline-block text-white" /> Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination control */}
        
      </div>
      <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="btn btn-sm border-none text-white bg-gradient-to-l from-green-500 to-amber-500 "
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>
          <span className="font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-sm border-none text-white bg-gradient-to-l from-green-500 to-amber-500"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
    </div>
  );
};

export default ManageCourses;
