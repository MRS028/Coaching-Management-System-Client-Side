import React, { useState, useEffect } from 'react';
import { FaDownload } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import SectionTitle from '../../Pages/SectionTitle/SectionTitle';
import useStudents from '../../Hooks/StudentRelated/useStudents';
import useAxiosSecure from '../../Hooks/useaxiosSecure';

const MyRoutine = () => {
  const [students, loading] = useStudents();
  const axiosSecure = useAxiosSecure();
  const [routineData, setRoutineData] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);

  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [selectedVersion, setSelectedVersion] = useState("English");

  // **Fetch Routine Data from API**
  useEffect(() => {
    axiosSecure.get('/routines')
      .then(res => {
        if (studentInfo) {
          const studentClass = selectedClass;  // Selected Class
          const version = selectedVersion;     // Selected Version

          // Matching the class
          const matchedRoutine = res.data.find(routine => 
            routine.class === studentClass
          );

          if (matchedRoutine) {
            // Matching the version
            const matchedVersion = matchedRoutine.subjects.find(subject =>
              subject.name === version
            );

            if (matchedVersion) {
              // Process the routine data
              const formattedRoutine = processRoutineData(matchedVersion.schedule);
              setRoutineData(formattedRoutine);
            } else {
              setRoutineData([]);
            }
          }
        }
      })
      .catch(error => console.error("Error fetching routine:", error));
  }, [axiosSecure, studentInfo, selectedClass, selectedVersion]);

  // **Select First Student for Demo**
  useEffect(() => {
    if (students.length > 0) {
      setStudentInfo(students[0]); // Show first student's data
    }
  }, [students]);

  // **Loading State**
  if (loading) {
    return <p className="text-center text-xl font-semibold text-blue-500">Loading students...</p>;
  }

  // **Handle PDF Download**
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16); // Font size for header
    doc.text(`${selectedClass} - ${selectedVersion} Version Class Routine`, 14, 15);
    doc.setFontSize(10); // Font size for sub-header
    doc.text("Oddhayon Coaching Center, Savar, Dhaka", 14, 22);

    // Add student information
    doc.setFontSize(10);
    doc.text(`Student Name: ${studentInfo.name}`, 14, 30);
    doc.text(`Class: ${studentInfo.class}`, 14, 35);
    doc.text(`Student ID: ${studentInfo.studentID}`, 14, 40);

    const tableColumn = [
      "#",
      "Time",
      "Saturday",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
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
      startY: 55, // Adjusted to position the table below the student info
      styles: {
        fontSize: 9,
        cellPadding: 1.25,
        lineWidth: 0.2,
        lineColor: [0, 0, 0],
      },
      headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
    });

    // Calculate the position for the footer, below the table
    const pageHeight = doc.internal.pageSize.height; // Get the height of the page
    const tableBottom = doc.lastAutoTable.finalY; // The Y position of the last row of the table

    // Footer text
    const footerText1 = "Director";
    const footerText2 = "Abdul Hakim";

    // Calculate text width for proper alignment
    const textWidth1 =
      (doc.getStringUnitWidth(footerText1) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const textWidth2 =
      (doc.getStringUnitWidth(footerText2) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;

    // Position the footer below the table
    const footerY = tableBottom + 10; // Add some space below the table

    // Position the text at the bottom-right corner
    doc.setFontSize(9); // Smaller font for footer
    doc.text(
      footerText1,
      doc.internal.pageSize.width - textWidth1 - 18,
      footerY
    );
    doc.text(
      footerText2,
      doc.internal.pageSize.width - textWidth2 - 14,
      footerY + 5
    );

    doc.save(`${selectedClass}-${selectedVersion}-Routine.pdf`);
};


  return (
    <div className="py-8 bg-gradient-to-b from-green-200 to-teal-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={"My Weekly Routine"} subtitle={"Be Prepared For the Next Day"} />

        {/* **Select Class and Version** */}
        <div className="mb-6">
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            <option value="Class 10">Class 10</option>
            <option value="Class 11">Class 11</option>
            <option value="Class 12">Class 12</option>
          </select>

          <select
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className="mb-4 p-2 border rounded"
          >
            <option value="English">English</option>
            <option value="Bangla">Bangla</option>
          </select>
        </div>

        {/* **Student Information** */}
        {studentInfo && (
          <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">👨‍🎓 Student Information</h3>
            <p className="text-gray-600 text-lg">📌 <span className='font-bold text-gray-800'>Name:</span> {studentInfo.name}</p>
            <p className="text-gray-600 text-lg">📌 <span className='font-bold text-gray-800'>Class:</span> {studentInfo.class}</p>
            <p className="text-gray-600 text-lg">📌 <span className='font-bold text-gray-800'>Student ID:</span> {studentInfo.studentID}</p>
          </div>
        )}

        {/* **Routine Table** */}
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
                    <td className="py-3 border px-1 font-semibold ">{index + 1}</td>
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

        {/* **Download Button** */}
        <div className="flex justify-center mt-6">
          <button
            onClick={downloadPDF}
            className="flex items-center bg-gradient-to-r from-green-500 hover:cursor-pointer to-amber-500 text-white py-2 px-6 font-semibold rounded-lg shadow-md hover:shadow-lg transition"
          >
            <FaDownload className="mr-2" /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

// **Routine Data Processing Function**
const processRoutineData = (schedule) => {
  const formattedRoutine = [];

  schedule.forEach((slot, index) => {
    formattedRoutine.push({
      time: slot.time,
      Saturday: slot.Saturday,
      Sunday: slot.Sunday,
      Monday: slot.Monday,
      Tuesday: slot.Tuesday,
      Wednesday: slot.Wednesday,
      Thursday: slot.Thursday
    });
  });

  return formattedRoutine;
};

export default MyRoutine;
