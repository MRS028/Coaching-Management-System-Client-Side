import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    FaUserGraduate,
    FaSchool,
    FaPhone,
    FaMapMarkerAlt,
    FaEnvelope,
    FaVenusMars,
    FaHashtag,
    FaBookOpen,
    FaMoneyBillWave,
    FaChalkboardTeacher,
} from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import useCourses from '../../Hooks/useCourses';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import useAxiosSecure from '../../Hooks/useaxiosSecure';
import Swal from 'sweetalert2';
import useStudents from '../../Hooks/StudentRelated/useStudents';
import AlreadyEnrolled from './AlreadyEnrolled';

const EnrollmentForm = () => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [studentID, setStudentID] = useState('');
    const [studentInfo, setStudentInfo] = useState(null);
    const [students] = useStudents();
    const [courses] = useCourses();
    const location = useLocation();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate()

    const courseID = location.state?.id;
    const course = courses.find((c) => c._id === courseID);
     useEffect(() => {
        if (students.length > 0 && user?.email) {
          const matchedStudent = students.find(stu => stu.email === user.email);
          setStudentInfo(matchedStudent || null);
        }
      }, [students, user]);

    //   console.log(studentInfo.courseID)

    

    // console.log(user)
    // Auto-generate Student ID
    const generateStudentID = () => {
        const year = new Date().getFullYear();
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        return `STU${year}${randomNum}`;
    };

    // Generate ID once on mount
    useEffect(() => {
        const newID = generateStudentID();
        setStudentID(newID);
        setValue('studentID', newID);
        setValue('courseID', courseID);
        if (course) {
            setValue('courseTitle', course.title);
            setValue('fee', course.fee);
            setValue('subjects', course.subjects.join(', '));
        }
    }, [setValue, course, courseID]);

    const onSubmit = async (data) => {
        try {
            const response = await axiosSecure.post('/enrollments', data);
            console.log('Enrollment Response:', response.data);

            if (response.data?.error) {
                Swal.fire({
                    icon: "error",
                    title: "Enrollment Failed",
                    text: response.data.message || "Something went wrong",
                });
                return; // Stop further execution
            }

            const { insertedId } = response.data;
            if (insertedId) {
                Swal.fire({
                    title: "Enrollment Successful!",
                    icon: "success",
                });
                navigate("/dashboard/myCourses");
            }

            reset();
            const newID = generateStudentID();
            setStudentID(newID);
            setValue('studentID', newID);
        } catch (error) {
            console.error('Enrollment Error:', error);
            Swal.fire({
                icon: "error",
                title: "Something went wrong ❌",
                text: error.response?.data?.message || "Server error",
            });
        }
    };

    
    if (studentInfo?.courseID === courseID) {
        return <AlreadyEnrolled/>;
    }

      



    if (!course || !courseID) {
        return (
            <div className="text-center py-20 text-2xl font-semibold text-red-500">
                ❌ No Course Found
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Course Registration</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Student ID */}
                <div>
                    <label className="font-semibold flex items-center gap-2"><FaHashtag /> Student ID</label>
                    <input
                        type="text"
                        value={studentID}
                        readOnly
                        disabled
                        className="input input-bordered w-full mt-1 bg-gray-100 cursor-not-allowed text-gray-500"
                    />
                    <input type="hidden" {...register('studentID')} />
                </div>

                {/* Course Info (readonly) */}
                <div>
                    <label className="font-semibold flex items-center gap-2"><FaBookOpen /> Course Title</label>
                    <input
                        type="text"
                        value={course.title}
                        readOnly
                        disabled
                        className="input input-bordered w-full mt-1 bg-gray-100 cursor-not-allowed"
                    />
                    <input type="hidden" {...register('courseID')} />
                    <input type="hidden" {...register('courseTitle')} />
                </div>

                <div>
                    <label className="font-semibold flex items-center gap-2"><FaMoneyBillWave /> Course Fee</label>
                    <input
                        type="text"
                        value={`৳ ${course.fee}`}
                        readOnly
                        disabled
                        className="input input-bordered w-full mt-1 bg-gray-100 cursor-not-allowed"
                    />
                    <input type="hidden" {...register('fee')} />
                </div>

                <div>
                    <label className="font-semibold flex items-center gap-2"><FaChalkboardTeacher /> Subjects</label>
                    <textarea
                        value={course.subjects?.join(', ')}
                        readOnly
                        disabled
                        className="textarea textarea-bordered w-full mt-1 bg-gray-100 cursor-not-allowed"
                    />
                    <input type="hidden" {...register('subjects')} />
                </div>

                {/* Name */}
                <div>
                    <label className="font-semibold flex items-center gap-2"><FaUserGraduate /> Full Name</label>
                    <input {...register("name")} type="text" value={user.displayName} className="input input-bordered w-full mt-1" required />
                </div>

                {/* Age */}
                <div>
                    <label className="font-semibold">Age</label>
                    <input {...register("age")} type="number" placeholder="11" className="input input-bordered w-full mt-1" required />
                </div>

                {/* Class */}
                <div>
                    <label className="font-semibold flex items-center gap-2"><FaUserGraduate /> Class</label>
                    <select {...register("class")} className="select select-bordered w-full mt-1" required>
                        <option value="">Select Class</option>
                        <option value="Class 3">Class 3</option>
                        <option value="Class 4">Class 4</option>
                        <option value="Class 5">Class 5</option>
                        <option value="Class 6">Class 6</option>
                        <option value="Class 7">Class 7</option>
                        <option value="Class 8">Class 8</option>
                        <option value="Class 9">Class 9</option>
                        <option value="Class 10">Class 10</option>
                        <option value="Class 11">Class 11</option>
                        <option value="Class 12">Class 12</option>
                    </select>
                </div>

                {/* School Name */}
                <div>
                    <label className="font-semibold flex items-center gap-2"><FaSchool /> School Name</label>
                    <select {...register("schoolName")} className="select select-bordered w-full mt-1" required>
                        <option value="">Select School</option>

                        <option value="BPATC School & College">BPATC School & College</option>
                        <option value="Cant. Public School">Cant. Public School</option>
                        <option value="Morning Glory School">Morning Glory School</option>
                        <option value="Fair Anjuman School">Fair Anjuman School</option>
                        <option value="Savar Model School">Savar Model School</option>
                        <option value="Green View School">Green View School</option>
                        <option value="Scholars Home">Scholars Home</option>
                        <option value="ABC International School">ABC International School</option>
                        <option value="Sunrise Model School">Sunrise Model School</option>
                        <option value="Others" className="text-red-500 font-semibold">
                            Others
                        </option>

                    </select>
                </div>


                {/* Gender */}


                <div>
                    <label className="font-semibold flex items-center gap-2"><FaVenusMars /> Gender</label>
                    <select {...register("gender")} className="select select-bordered w-full mt-1" required>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </div>
                {/* Email */}
                <div>
                    <label className="font-semibold flex items-center gap-2"><FaEnvelope /> Email</label>
                    <input {...register("email")} type="email" value={user.email} className="input input-bordered w-full mt-1" required />
                </div>

                {/* Phone */}
                <div>
                    <label className="font-semibold flex items-center gap-2"><FaPhone /> Phone</label>
                    <input {...register("phone")} type="text" placeholder="01710000001" className="input input-bordered w-full mt-1" required />
                </div>

                {/* Address */}
                <div>
                    <label className="font-semibold flex items-center gap-2"><FaMapMarkerAlt /> Address</label>
                    <input {...register("address")} type="text" placeholder="Dhaka, Bangladesh" className="input input-bordered w-full mt-1" required />
                </div>

                {/* Version */}
                <div>
                    <label className="font-semibold">Version</label>
                    <select {...register("version")} className="select select-bordered w-full mt-1" required>
                        <option value="English">English</option>
                        <option value="Bangla">Bangla</option>
                    </select>
                </div>

                {/* Submit */}
                <div className="text-center pt-4">
                    <button type="submit" className="btn btn-primary w-full">Register Now</button>
                </div>
            </form>
        </div>
    );
};

export default EnrollmentForm;
