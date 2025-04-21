import { FaCheckCircle } from "react-icons/fa";

const AlreadyEnrolled = () => {
    return (
        <div className="flex flex-col items-center justify-center h-96 text-center px-4">
            <FaCheckCircle className="text-green-500 text-6xl mb-4 animate-bounce" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">You are already enrolled!</h2>
            <p className="text-lg text-gray-600 max-w-md">
                You've already registered for this course. Please check your dashboard for more details.
            </p>
            <a
                href="/dashboard/myCourses"
                className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300"
            >
                Go to My Courses
            </a>
        </div>
    );
};

export default AlreadyEnrolled;
