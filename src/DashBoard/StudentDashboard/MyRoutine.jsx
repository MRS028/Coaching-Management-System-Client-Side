import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import SectionTitle from '../../Pages/SectionTitle/SectionTitle';
import useStudents from '../../Hooks/StudentRelated/useStudents';
import useAxiosSecure from '../../Hooks/useaxiosSecure';
import useAuth from '../../Hooks/useAuth';

const MyRoutine = () => {
  const [students, loading] = useStudents();
  const axiosSecure = useAxiosSecure();
  const [routineData, setRoutineData] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const { user } = useAuth();

  console.log(studentInfo)

  useEffect(() => {
    if (students.length > 0 && user?.email) {
      const matchedStudent = students.find(stu => stu.email === user.email);
      setStudentInfo(matchedStudent || null);
    }
  }, [students, user]);

  useEffect(() => {
    if (!studentInfo) return;

    axiosSecure.get('/routines')
      .then(res => {
        const studentClass = studentInfo.class;
        const version = studentInfo.version.toLowerCase(); // Convert to lowercase

        const matchedRoutine = res.data.find(routine =>
          routine.class === studentClass
        );

        if (matchedRoutine) {
          const matchedVersion = matchedRoutine.subjects.find(subject =>
            subject.name.toLowerCase() === version // Convert to lowercase for comparison
          );

          if (matchedVersion) {
            const formattedRoutine = processRoutineData(matchedVersion.schedule);
            setRoutineData(formattedRoutine);
          } else {
            console.log(`No routine found for version ${version}`);
            setRoutineData([]);
          }
        } else {
          console.log(`No routine found for class ${studentClass}`);
          setRoutineData([]);
        }
      })
      .catch(error => console.error("Error fetching routine:", error));
  }, [axiosSecure, studentInfo]);
  // console.log(routineData)

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`${studentInfo.class} - ${studentInfo.version} Version Class Routine`, 14, 15);
    doc.setFontSize(10);
    doc.text("Oddhayon Coaching Center, Savar, Dhaka", 14, 22);

    doc.setFontSize(10);
    doc.text(`Student Name: ${studentInfo.name}`, 14, 30);
    doc.text(`Class: ${studentInfo.class}`, 14, 35);
    doc.text(`Student ID: ${studentInfo.studentID}`, 14, 40);

    const tableColumn = [
      "#", "Time", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"
    ];
    const tableRows = [];

    routineData.forEach((row, index) => {
      tableRows.push([
        index + 1,
        row.time,
        row.Saturday,
        row.Sunday,
        row.Monday,
        row.Tuesday,
        row.Wednesday,
        row.Thursday,
      ]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 55,
      styles: {
        fontSize: 9,
        cellPadding: 1.25,
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
      },
      headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
    });

    const tableBottom = doc.lastAutoTable.finalY;

    doc.setFontSize(9);
    doc.text("Director", doc.internal.pageSize.width - 40, tableBottom + 10);
    doc.text("Abdul Hakim", doc.internal.pageSize.width - 44, tableBottom + 15);

    doc.save(`${studentInfo.class}-${studentInfo.version}-Routine.pdf`);
  };

  if (loading) {
    return <p className="text-center text-xl font-semibold text-blue-500">Loading students...</p>;
  }

  return (
    <div className="py-8 bg-gradient-to-b from-green-200 to-teal-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={"My Weekly Routine"} subtitle={"Be Prepared For the Next Day"} />

        {studentInfo && (
          <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">👨‍🎓 Student Information</h3>
            <p className="text-gray-600 text-lg">📌 <span className='font-bold text-gray-800'>Student ID:</span> {studentInfo?.studentID}</p>
            <p className="text-gray-600 text-lg">📌 <span className='font-bold text-gray-800'>Name:</span> {studentInfo?.name}</p>
            <p className="text-gray-600 text-lg">📌 <span className='font-bold text-gray-800'>Class:</span> {studentInfo?.class}</p>
            <p className="text-gray-600 text-lg">📌 <span className='font-bold text-gray-800'>Version:</span> {studentInfo?.version}</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Saturday</th>
                <th className="py-3 px-6 text-left">Sunday</th>
                <th className="py-3 px-6 text-left">Monday</th>
                <th className="py-3 px-6 text-left">Tuesday</th>
                <th className="py-3 px-6 text-left">Wednesday</th>
                <th className="py-3 px-6 text-left">Thursday</th>
              </tr>
            </thead>
            <tbody>
              {routineData.length > 0 ? (
                routineData.map((row, index) => (
                  <tr key={index} className="border-b text-sm text-center hover:bg-blue-100 transition">
                    <td className="py-3 border px-1 font-semibold">{index + 1}</td>
                    <td className="py-3 border px-1">{row.time}</td>
                    <td className="py-3 border px-1">{row.Saturday}</td>
                    <td className="py-3 border px-1">{row.Sunday}</td>
                    <td className="py-3 border px-1">{row.Monday}</td>
                    <td className="py-3 border px-1">{row.Tuesday}</td>
                    <td className="py-3 border px-1">{row.Wednesday}</td>
                    <td className="py-3 border px-1">{row.Thursday}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-600">No routine data available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={downloadPDF}
            className="flex items-center bg-gradient-to-r from-green-500 to-amber-500 text-white py-2 px-6 font-semibold rounded-lg shadow-md hover:shadow-lg transition"
          >
            <FaDownload className="mr-2" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// 🧠 Routine Process Function
const processRoutineData = (schedule) => {
  return schedule.map(slot => ({
    time: slot.time,
    Saturday: slot.Saturday,
    Sunday: slot.Sunday,
    Monday: slot.Monday,
    Tuesday: slot.Tuesday,
    Wednesday: slot.Wednesday,
    Thursday: slot.Thursday
  }));
};

export default MyRoutine;
