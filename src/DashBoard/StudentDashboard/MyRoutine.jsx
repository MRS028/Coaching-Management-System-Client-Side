import React from 'react';
import { FaDownload } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import SectionTitle from '../../Pages/SectionTitle/SectionTitle';

const MyRoutine = () => {
  // **ফেক স্টুডেন্ট ডাটা**
  const studentInfo = {
    name: "Farhan Labib",
    class: "Class 10",
    studentId: "STU-20251234"
  };

  // **ফেক রুটিন ডাটা**
  const routineData = [
    {
      time: '4:00 PM - 4:40 PM',
      Sunday: 'Math [Rifat Sir]',
      Monday: 'Physics [Bashir Sir]',
      Tuesday: 'English [Nain Sir]',
      Wednesday: 'Chemistry [Rakib Sir]',
    },
    {
      time: '4:50 PM - 5:30 PM',
      Sunday: 'Physics [Moin Sir]',
      Monday: 'English [Nashit Sir]',
      Tuesday: 'Math [Rifat Sir]',
      Wednesday: 'Biology [Sabrina Ma\'am]',
    },
    {
      time: '5:40 PM - 6:20 PM',
      Sunday: 'Chemistry [Rakib Sir]',
      Monday: 'Biology [Fahim Sir]',
      Tuesday: 'ICT [Shahina Ma\'am]',
      Wednesday: 'Physics [Bashir Sir]',
    },
  ];

  // **PDF ডাউনলোড ফাংশন**
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Weekly Routine', 14, 15);
    doc.setFontSize(12);
    doc.text('Oddhayon Coaching Center, Savar, Dhaka', 14, 22);
    doc.text(`Student: ${studentInfo.name}`, 14, 30);
    doc.text(`Class: ${studentInfo.class}`, 14, 36);
    doc.text(`Student ID: ${studentInfo.studentId}`, 14, 42);

    const tableColumn = ['#', 'Time', 'Sunday', 'Monday', 'Tuesday', 'Wednesday'];
    const tableRows = [];

    routineData.forEach((row, index) => {
      tableRows.push([index + 1, row.time, row.Sunday, row.Monday, row.Tuesday, row.Wednesday]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 48, 
      styles: { fontSize: 12, cellPadding: 3, lineWidth: 0.2, lineColor: [0, 0, 0] },
      headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
      tableLineWidth: 0.2,
      tableLineColor: [0, 0, 0],
    });

    doc.save('routine.pdf');
  };

  return (
    <div className="py-8 bg-gradient-to-b from-green-200 to-teal-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title={"My Weekly Routine"} subtitle={"Be Prepare For the Next Day"} />

        {/* **স্টুডেন্ট ইনফো** */}
        <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">👨‍🎓 Student Information</h3>
          <p className="text-gray-600 text-lg">📌 <span className='font-bold text-gray-800'>Name:</span> {studentInfo.name}</p>
          <p className="text-gray-600 text-lg">📌 <span className='font-bold text-gray-800'>Class:</span> {studentInfo.class}</p>
          <p className="text-gray-600 text-lg">📌 <span className='font-bold text-gray-800'>Student ID:</span> {studentInfo.studentId}</p>
        </div>

        {/* **রুটিন টেবিল** */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-white shadow-md rounded-lg">
            <thead className="bg-amber-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Sunday</th>
                <th className="py-3 px-6 text-left">Monday</th>
                <th className="py-3 px-6 text-left">Tuesday</th>
                <th className="py-3 px-6 text-left">Wednesday</th>
              </tr>
            </thead>
            <tbody>
              {routineData.map((row, index) => (
                <tr key={index} className="border-b hover:bg-blue-100 transition">
                  <td className="py-3 border px-6 font-semibold text-center">{index + 1}</td>
                  <td className="py-3 border px-6">{row.time}</td>
                  <td className="py-3 border px-6">{row.Sunday}</td>
                  <td className="py-3 border px-6">{row.Monday}</td>
                  <td className="py-3 border px-6">{row.Tuesday}</td>
                  <td className="py-3 border px-6">{row.Wednesday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* **ডাউনলোড বাটন** */}
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

export default MyRoutine;
