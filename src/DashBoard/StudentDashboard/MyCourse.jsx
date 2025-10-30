import {
  FaBookOpen,
  FaChalkboardTeacher,
  FaWhatsapp,
  FaFacebookMessenger,
  FaLink,
  FaDownload,
  FaMoneyBillAlt,
  FaChevronDown,
  FaChevronUp,
  FaUserGraduate,
  FaClock,
  FaDollarSign,
  FaPlayCircle,
  FaChartLine,
  FaCalendarCheck,
  FaCertificate,
  FaComments,
  FaVideo,
  FaFilePdf,
  FaArrowRight,
  FaStar,
  FaTrophy,
  FaExclamationTriangle,
  FaSync
} from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../Pages/SectionTitle/SectionTitle";
import useScrolltoTop from "../../Hooks/useScrolltoTop";
import useAxiosSecure from "../../Hooks/useaxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const MyCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  useScrolltoTop();

  // Fetch enrolled courses from server
  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (!user?.email) {
        setError("User not authenticated");
        setLoading(false);
        return;
      }

      console.log("Fetching courses for:", user.email);
      
      const response = await axiosSecure.get(`/enrollments/student/${user.email}`);
      console.log("Server response:", response.data);

      if (response.data.success) {
        // Initialize progress as 0 for all courses
        const coursesWithProgress = response.data.data.map(course => ({
          ...course,
          progress: 0, // Set initial progress to 0
          completedLessons: 0,
          totalLessons: course.subjects?.split(',').length * 4 || 12, // Dynamic total lessons
          startDate: course.enrollmentDate || new Date().toISOString(),
          estimatedCompletion: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString()
        }));
        setCourses(coursesWithProgress);
      } else {
        setCourses([]);
        setError(response.data.message || "No courses found");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      const errorMessage = error.response?.data?.message || error.message || "Failed to load your courses";
      setError(errorMessage);
      setCourses([]);
      
      Swal.fire({
        icon: "error",
        title: "Loading Failed",
        text: errorMessage,
        timer: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMyCourses();
    }
  }, [user, axiosSecure]);

  const toggleDetails = (id) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handlePayment = (course) => {
    navigate("/dashboard/paymentHistory", { 
      state: { 
        courseId: course.courseID,
        courseName: course.courseTitle,
        amount: course.fee
      } 
    });
  };

  const handleStartLearning = (course) => {
    navigate(`/course/learning/${course.courseID}`, { 
      state: { course } 
    });
  };

  const handleDownloadCertificate = async (course) => {
    try {
      if (course.progress < 100) {
        Swal.fire({
          icon: "warning",
          title: "Course Not Completed",
          text: `You need to complete the course (${course.progress}% done) to download certificate`
        });
        return;
      }

      const response = await axiosSecure.post('/generate-certificate', {
        studentId: course.studentID,
        courseId: course.courseID,
        courseName: course.courseTitle,
        studentName: course.name
      });

      if (response.data.success) {
        window.open(response.data.certificateUrl, '_blank');
      }
    } catch (error) {
      console.error("Certificate download error:", error);
      Swal.fire({
        icon: "error",
        title: "Download Failed",
        text: "Failed to download certificate"
      });
    }
  };

  const handleJoinWhatsappGroup = (course) => {
    const whatsappLink = course.whatsappGroup || "https://wa.me/01966601000";
    window.open(whatsappLink, '_blank');
  };

  const handleProvideFeedback = (course) => {
    navigate("/feedback", { 
      state: { 
        courseId: course.courseID,
        courseName: course.courseTitle
      } 
    });
  };

  const handleMarkLessonComplete = async (courseId) => {
    try {
      const updatedCourses = courses.map(course => {
        if (course._id === courseId && course.progress < 100) {
          const newProgress = Math.min(course.progress + 8.33, 100);
          const newCompletedLessons = Math.min(course.completedLessons + 1, course.totalLessons);
          return {
            ...course,
            progress: newProgress,
            completedLessons: newCompletedLessons
          };
        }
        return course;
      });
      
      setCourses(updatedCourses);
      
      Swal.fire({
        icon: "success",
        title: "Progress Updated!",
        text: "Great job! You've completed a lesson.",
        timer: 2000,
        showConfirmButton: false
      });
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const handleRetry = () => {
    fetchMyCourses();
  };

  const filteredCourses = courses.filter(course => {
    if (activeTab === "all") return true;
    if (activeTab === "in-progress") return course.progress > 0 && course.progress < 100;
    if (activeTab === "completed") return course.progress === 100;
    if (activeTab === "not-started") return course.progress === 0;
    return true;
  });

  const getProgressColor = (progress) => {
    if (progress === 0) return "bg-gray-300";
    if (progress < 30) return "bg-red-500";
    if (progress < 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getProgressText = (progress) => {
    if (progress === 0) return "Not Started";
    if (progress < 100) return "In Progress";
    return "Completed";
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading Your Courses</h3>
          <p className="text-gray-500">We're preparing your learning journey...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
          <FaExclamationTriangle className="text-6xl text-red-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Failed to Load Courses</h3>
          <p className="text-gray-600 mb-2">{error}</p>
          <p className="text-gray-500 text-sm mb-6">
            This might be because you haven't enrolled in any courses yet or there's a connection issue.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={handleRetry}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <FaSync />
              Try Again
            </button>
            <button 
              onClick={() => navigate("/courses")}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
            >
              <FaBookOpen />
              Browse Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No Courses State
  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle
            title={"My Learning Dashboard"}
            subtitle={"Your personalized learning center"}
          />
          <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-200">
            <FaBookOpen className="text-8xl text-gray-300 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-gray-600 mb-4">
              No Courses Enrolled Yet
            </h3>
            <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
              Start your learning journey by enrolling in our quality courses. Gain knowledge and skills that matter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate("/courses")}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center gap-2"
              >
                <FaBookOpen />
                Browse All Courses
              </button>
              <button 
                onClick={() => navigate("/admission")}
                className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold flex items-center gap-2"
              >
                <FaUserGraduate />
                Get Admission
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Content
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <SectionTitle
            title={"My Learning Dashboard"}
            subtitle={"Track your progress and continue learning"}
          />
          
          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">{courses.length}</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
              <div className="text-2xl font-bold text-green-600">
                {courses.filter(c => c.progress === 100).length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
              <div className="text-2xl font-bold text-yellow-600">
                {courses.filter(c => c.progress > 0 && c.progress < 100).length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
              <div className="text-2xl font-bold text-gray-600">
                {courses.filter(c => c.progress === 0).length}
              </div>
              <div className="text-sm text-gray-600">Not Started</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {[
              { id: "all", label: "All Courses", count: courses.length },
              { id: "in-progress", label: "In Progress", count: courses.filter(c => c.progress > 0 && c.progress < 100).length },
              { id: "completed", label: "Completed", count: courses.filter(c => c.progress === 100).length },
              { id: "not-started", label: "Not Started", count: courses.filter(c => c.progress === 0).length },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6">
          {filteredCourses.map((course) => (
            <div key={course._id} className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="p-6">
                {/* Course Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <FaBookOpen className="text-white text-xl" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {course.courseTitle}
                        </h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-1">
                          <span className="flex items-center gap-1">
                            <FaUserGraduate className="text-green-600" />
                            ID: {course.studentID}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaClock className="text-blue-600" />
                            Enrolled: {new Date(course.enrollmentDate).toLocaleDateString('bn-BD')}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaDollarSign className="text-green-600" />
                            Fee: ৳{course.fee}/month
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        course.progress === 0 
                          ? "bg-gray-100 text-gray-600" 
                          : course.progress === 100
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}>
                        {getProgressText(course.progress)}
                      </div>
                      <div className="text-2xl font-bold text-gray-800 mt-1">
                        {course.progress}%
                      </div>
                    </div>
                    <button
                      onClick={() => toggleDetails(course._id)}
                      className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                    >
                      {showDetails[course._id] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </div>
                </div>

                {/* Progress Section */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-gray-700">Course Progress</span>
                    <span className="font-semibold">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(course.progress)}`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Course Details */}
                {showDetails[course._id] && (
                  <div className="mt-6 space-y-6 border-t pt-6">
                    {/* Course Information Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <FaChalkboardTeacher className="text-blue-600" />
                            Course Information
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Class Level</span>
                              <span className="font-medium">{course.class}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Subjects</span>
                              <span className="font-medium">{course.subjects}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Version</span>
                              <span className="font-medium">{course.version}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">School</span>
                              <span className="font-medium">{course.schoolName}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <FaChartLine className="text-green-600" />
                            Learning Status
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Progress</span>
                              <div className="flex items-center gap-2">
                                <div className="w-20 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${getProgressColor(course.progress)}`}
                                    style={{ width: `${course.progress}%` }}
                                  ></div>
                                </div>
                                <span className="font-semibold text-sm">{course.progress}%</span>
                              </div>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Lessons Completed</span>
                              <span className="font-medium">{course.completedLessons}/{course.totalLessons}</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-100">
                              <span className="text-gray-600">Payment Status</span>
                              <span className={`font-semibold ${
                                course.paymentStatus === 'paid' ? 'text-green-600' : 'text-orange-600'
                              }`}>
                                {course.paymentStatus?.charAt(0).toUpperCase() + course.paymentStatus?.slice(1) || 'Pending'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <FaPlayCircle className="text-blue-600" />
                        Course Actions
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        <button
                          onClick={() => handleStartLearning(course)}
                          className="btn btn-primary btn-sm flex items-center gap-2"
                        >
                          <FaPlayCircle />
                          Start Learning
                        </button>
                        
                        <button
                          onClick={() => handleMarkLessonComplete(course._id)}
                          disabled={course.progress === 100}
                          className="btn btn-success btn-sm flex items-center gap-2 disabled:opacity-50"
                        >
                          <FaCalendarCheck />
                          Mark Complete
                        </button>

                        <button
                          onClick={() => handleJoinWhatsappGroup(course)}
                          className="btn btn-info btn-sm flex items-center gap-2"
                        >
                          <FaWhatsapp />
                          WhatsApp
                        </button>

                        <button
                          onClick={() => handlePayment(course)}
                          className="btn btn-secondary btn-sm flex items-center gap-2"
                        >
                          <FaMoneyBillAlt />
                          {course.paymentStatus === 'paid' ? 'History' : 'Pay Now'}
                        </button>

                        <button
                          onClick={() => handleDownloadCertificate(course)}
                          className="btn btn-warning btn-sm flex items-center gap-2"
                        >
                          <FaCertificate />
                          Certificate
                        </button>

                        <button
                          onClick={() => handleProvideFeedback(course)}
                          className="btn btn-accent btn-sm flex items-center gap-2"
                        >
                          <FaComments />
                          Feedback
                        </button>
                      </div>
                    </div>

                    {/* Quick Resources */}
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                        <FaLink className="text-blue-600" />
                        Quick Resources
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <a href={course.videoLink || '#'} className="btn btn-outline btn-sm flex items-center gap-2">
                          <FaVideo />
                          Video Lectures
                        </a>
                        <a href={course.pdfLink || '#'} className="btn btn-outline btn-sm flex items-center gap-2">
                          <FaFilePdf />
                          Study Materials
                        </a>
                        <a href={course.nextCourseLink || '#'} className="btn btn-outline btn-sm flex items-center gap-2">
                          <FaArrowRight />
                          Next Course
                        </a>
                      </div>
                    </div>

                    {/* Motivation Section */}
                    {course.progress === 0 && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                        <div className="flex items-center gap-3">
                          <FaTrophy className="text-3xl text-yellow-600" />
                          <div>
                            <h5 className="font-semibold text-yellow-800">Ready to Start Your Journey?</h5>
                            <p className="text-yellow-700 text-sm">
                              Click "Start Learning" to begin your first lesson. Every expert was once a beginner!
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State for Filtered Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <FaStar className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">
              No Courses Found
            </h3>
            <p className="text-gray-500 mb-6">
              {activeTab === "completed" 
                ? "You haven't completed any courses yet. Keep learning!" 
                : activeTab === "in-progress"
                ? "You don't have any courses in progress. Start learning now!"
                : "No courses match your current filter."}
            </p>
            <button 
              onClick={() => setActiveTab("all")}
              className="btn btn-primary"
            >
              View All Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourse;