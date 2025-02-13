import React from 'react';
import { FaUsers, FaBook, FaChartLine, FaCog } from 'react-icons/fa';

const AdminHome = () => {
    return (
        <div className="min-h-screen bg-green-100 p-6">
            {/* Header */}
            <header className="bg-white shadow-md p-4 mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            </header>

            {/* Main Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Card 1: Total Students */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full">
                        <FaUsers className="text-blue-500 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-gray-600 font-semibold">Total Students</h2>
                        <p className="text-2xl font-bold text-gray-800">1,234</p>
                    </div>
                </div>

                {/* Card 2: Total Courses */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-green-100 p-3 rounded-full">
                        <FaBook className="text-green-500 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-gray-600 font-semibold">Total Courses</h2>
                        <p className="text-2xl font-bold text-gray-800">45</p>
                    </div>
                </div>

                {/* Card 3: Performance */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-yellow-100 p-3 rounded-full">
                        <FaChartLine className="text-yellow-500 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-gray-600 font-semibold">Performance</h2>
                        <p className="text-2xl font-bold text-gray-800">89%</p>
                    </div>
                </div>

                {/* Card 4: Settings */}
                <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
                    <div className="bg-red-100 p-3 rounded-full">
                        <FaCog className="text-red-500 text-2xl" />
                    </div>
                    <div className="ml-4">
                        <h2 className="text-gray-600 font-semibold">Settings</h2>
                        <p className="text-2xl font-bold text-gray-800">Configure</p>
                    </div>
                </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                    <div className="border-b pb-4">
                        <p className="text-gray-600">New student registered: John Doe</p>
                        <p className="text-sm text-gray-400">2 hours ago</p>
                    </div>
                    <div className="border-b pb-4">
                        <p className="text-gray-600">Course "Mathematics 101" updated</p>
                        <p className="text-sm text-gray-400">5 hours ago</p>
                    </div>
                    <div className="border-b pb-4">
                        <p className="text-gray-600">New course "Physics 101" added</p>
                        <p className="text-sm text-gray-400">1 day ago</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;