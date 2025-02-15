import React, { useState } from "react";
import { FaEdit, FaSearch, FaTrash, FaUser, FaUsers } from "react-icons/fa";
import useUsers from "../../../Hooks/useUsers";
import SectionTitle from "../../../Pages/SectionTitle/SectionTitle";
import LoadingSpinner from "../../../Components/LoadingPage/LoadingSpinner";

const ManageTeachers = () => {
  const [users, loading] = useUsers();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const itemsPerPage = 6;

  if (loading) {
    return <LoadingSpinner/>;
  }

  // Sorting: Newest users first
  const sortedUsers = users.sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );

  // Filtering: Search by name or email
  const filteredTeachers = sortedUsers
    .filter((user) => user?.role === "teacher") 
    .filter(
      (user) =>
        `${user?.name} ${user?.email}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );

  // Pagination Logic
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredTeachers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div>
      <SectionTitle title={"Manage Teachers"} subtitle={"Dreams come true"} />

      {/* Search Box */}
      <div className="lg:mx-5 flex flex-col items-start relative">
        <label className="mb-1 font-semibold">Search a Teacher</label>
        <input
          type="text"
          placeholder="Search by title or class or version..."
          className="input input-bordered w-full max-w-lg mb-4 pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute mt-2 left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>

      <div className="overflow-x-auto w-full p-4 bg-white shadow-lg rounded-lg">
        <table className="table w-full border border-gray-300">
          <thead>
            <tr className="bg-amber-400 text-xl text-gray-800">
            <th className="p-3 text-left border-r border-gray-300">#</th>
              <th className="p-3 text-left border-r border-gray-300">Photo</th>
              <th className="p-3 text-left border-r border-gray-300">Name</th>
              <th className="p-3 text-left border-r border-gray-300">Email</th>
              <th className="p-3 text-left border-r border-gray-300">Phone</th>
              <th className="p-3 text-left border-r border-gray-300">Role</th>
              <th className="p-3 text-left border-r border-gray-300">Version</th>
              <th className="p-3 text-left border-r border-gray-300">Created</th>
              <th className="p-3 text-center border-r border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user,index) => (
              <tr key={user?.email} className="hover:bg-gray-100 border-b border-r border-gray-300">
                <td className="p-3 font-semibold border-r border-gray-300">{index+1}</td>
                <td className="p-3 border-r border-gray-300">
                  <img
                    src={
                      user?.photoURL ||
                      "https://i.ibb.co.com/XLq7gMH/Sample-User-Icon.png"
                    }
                    alt={user?.name || "N/A"}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td className="p-3 font-semibold border-r border-gray-300">{user?.name || "N/A"}</td>
                <td className="p-3 border-r border-gray-300">{user?.email || "N/A"}</td>
                <td className="p-3 border-r border-gray-300">{user?.phone?.trim() || "N/A"}</td>
                <td className="p-3 border-r border-gray-300">{user?.role?.trim() || "N/A"}</td>
                <td className="p-3 border-r border-gray-300">{user?.version?.trim() || "N/A"}</td>
                <td className="p-3 border-r border-gray-300">
                  {user?.created
                    ? new Date(user.created).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="p-3 flex gap-2 border-r border-gray-300">
                  <button className="btn btn-sm bg-gradient-to-b from-green-500 to-amber-400 text-white">
                    <FaEdit className="inline-block" /> Edit
                  </button>
                  <button className="btn btn-sm bg-gradient-to-b from-red-500 to-red-600 text-white">
                    <FaTrash className="inline-block" /> Delete
                  </button>
                  <button className="btn btn-sm bg-gradient-to-b from-green-500 to-amber-400 text-white">
                    <FaUser className="inline-block" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="btn btn-sm border-none text-white bg-gradient-to-l from-green-500 to-amber-500"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>
        <span className="font-semibold">
          Page {currentPage} of {totalPages || 1}
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

export default ManageTeachers;
