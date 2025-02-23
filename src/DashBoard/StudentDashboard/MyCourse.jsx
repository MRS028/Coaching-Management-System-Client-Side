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
} from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionTitle from "../../Pages/SectionTitle/SectionTitle";
import useScrolltoTop from "../../Hooks/useScrolltoTop";

const MyCourse = () => {
  const [paymentStatus, setPaymentStatus] = useState({
    month: "February",
    amount: "4000",
    paid: false,
  });

  const [showDetails, setShowDetails] = useState({});
  const navigate = useNavigate();
  useScrolltoTop();

  const courses = [
    {
      id: 1,
      title: "SSC Revision Course",
      instructors: [
        { name: "Abdul Hakim", whatsappLink: "https://wa.me/1111111111" },
        { name: "Rakib Ahsan", whatsappLink: "https://wa.me/1111111111" },
        { name: "Abir Ahmed", whatsappLink: "https://wa.me/2222222222" },
        { name: "Nain Mahmud", whatsappLink: "https://wa.me/2222222222" },
      ],
      progress: 70,
      duration: "12 months",
      fee: "4000",
      pdfLink: "https://link-to-pdf.com",
      messengerLink: "https://m.me/group",
      videoLink: "https://youtube.com/link",
      resourcesLink: "https://github.com/react-basics",
      certificateLink: "https://certificate-link.com",
      nextCourseLink: "https://next-course.com",
      feedbackLink: "https://feedback-form.com",
      paymentStatus: "Pending",
    },
    {
      id: 2,
      title: "Advanced Mathematics",
      instructors: [
        { name: "Samiul Islam", whatsappLink: "https://wa.me/3333333333" },
        { name: "Nabila Khan", whatsappLink: "https://wa.me/4444444444" },
      ],
      progress: 50,
      duration: "6 months",
      fee: "5000",
      pdfLink: "https://maths-pdf.com",
      messengerLink: "https://m.me/mathgroup",
      videoLink: "https://youtube.com/mathvideos",
      resourcesLink: "https://github.com/math-resources",
      certificateLink: "https://certificate-math.com",
      nextCourseLink: "https://next-math-course.com",
      feedbackLink: "https://math-feedback-form.com",
      paymentStatus: "Pending",
    },
    {
      id: 3,
      title: "SSC Science",
      instructors: [
        { name: "Rakib Ahsan", whatsappLink: "https://wa.me/5555555555" },
        { name: "Abdul Hakim", whatsappLink: "https://wa.me/6666666666" },
        { name: "Abir Ahmed", whatsappLink: "https://wa.me/6666666666" },
      ],
      progress: 80,
      duration: "9 months",
      fee: "4000",
      pdfLink: "https://webdev-pdf.com",
      messengerLink: "https://m.me/webgroup",
      videoLink: "https://youtube.com/webdevvideos",
      resourcesLink: "https://github.com/web-resources",
      certificateLink: "https://certificate-web.com",
      nextCourseLink: "https://next-web-course.com",
      feedbackLink: "https://web-feedback-form.com",
      paymentStatus: "Pending",
    },
  ];

  const toggleDetails = (id) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handlePayment = () => {
    if (!paymentStatus.paid) {
      navigate("/payment");
    } else {
      alert("You have already paid for this course.");
    }
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <h2>
        <SectionTitle
          title={"My Course"}
          subtitle={"Try TO Do Something Better"}
        />
      </h2>
      {/* <h2 className="text-3xl font-bold text-primary text-center flex items-center gap-2 mb-6">
      <FaBookOpen />   My Courses
      </h2> */}
      {courses.map((course) => (
        <div key={course.id} className="card bg-white shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <FaChalkboardTeacher className="text-secondary" /> {course.title}
            </h3>
            <button
              onClick={() => toggleDetails(course.id)}
              className="text-secondary"
            >
              {showDetails[course.id] ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          {showDetails[course.id] && (
            <div className="mt-4 space-y-2">
              <p>Instructors:</p>
              <div className="flex gap-2 flex-wrap">
                {course.instructors.map((instructor, index) => (
                  <a
                    key={index}
                    href={instructor.whatsappLink}
                    className="btn btn-success btn-sm"
                  >
                    {instructor.name}
                  </a>
                ))}
              </div>
              <p>
                Duration:{" "}
                <span className="font-semibold">{course.duration}</span>
              </p>
              <p>
                Fee: <span className="font-semibold">{course.fee} /month</span>{" "}
              </p>
              <progress
                className="progress progress-primary w-full"
                value={course.progress}
                max="100"
              ></progress>
              <div className="mt-3 flex flex-wrap gap-3">
                <a
                  href={course.pdfLink}
                  className="btn btn-primary btn-sm flex items-center gap-2"
                >
                  <FaDownload /> Download PDF
                </a>
                <a
                  href={course.messengerLink}
                  className="btn btn-info btn-sm flex items-center gap-2"
                >
                  <FaFacebookMessenger /> Messenger Group
                </a>
                <a
                  href={course.videoLink}
                  className="btn btn-warning btn-sm flex items-center gap-2"
                >
                  <FaLink /> Course Videos
                </a>
                <a
                  href={course.resourcesLink}
                  className="btn btn-accent btn-sm flex items-center gap-2"
                >
                  <FaLink /> Resources
                </a>
              </div>
              <div className="mt-3">
                <p>
                  Payment Status:{" "}
                  <span
                    className={
                      paymentStatus.paid ? "text-green-600" : "text-red-600"
                    }
                  >
                    {paymentStatus.paid ? "Paid" : "Pending"}
                  </span>
                </p>
                <p>
                  Last Payment: {paymentStatus.month} - {paymentStatus.amount}
                </p>
                <button
                  onClick={handlePayment}
                  className="btn btn-secondary mt-2"
                >
                  {paymentStatus.paid ? "View Payment History" : "Pay Now"}
                </button>
              </div>
              <div className="mt-3">
                <a
                  href={course.certificateLink}
                  className="btn btn-outline btn-success btn-sm"
                >
                  Download Certificate
                </a>
              </div>
              <div className="mt-3 flex gap-4">
                <a
                  href={course.feedbackLink}
                  className="btn btn-outline btn-warning btn-sm"
                >
                  Provide Feedback
                </a>
                <a
                  href={course.nextCourseLink}
                  className="btn btn-outline btn-primary btn-sm"
                >
                  Next Course
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyCourse;
