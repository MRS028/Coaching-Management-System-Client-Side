import React, { useState } from 'react';
import { FaDownload, FaEdit } from 'react-icons/fa';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import SectionTitle from '../../../Pages/SectionTitle/SectionTitle';

const CentralRoutine = () => {
  const classes = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10'];
  const versions = ['Bangla', 'English'];
  const [selectedClass, setSelectedClass] = useState('Class 6');
  const [selectedVersion, setSelectedVersion] = useState('Bangla');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [editedIndex, setEditedIndex] = useState(null);

  const [routineData, setRoutineData] = useState({
    'Class 6': {
      Bangla: [
        { time: '4:00 PM - 4:40 PM', Saturday: 'X', Sunday: 'Bangla', Monday: 'Math', Tuesday: 'English', Wednesday: 'Science', Thursday: 'X' },
        { time: '4:40 PM - 5:20 PM', Saturday: 'X', Sunday: 'Math', Monday: 'English', Tuesday: 'ICT', Wednesday: 'History', Thursday: 'X' },
        { time: '5:20 PM - 6:00 PM', Saturday: 'X', Sunday: 'English', Monday: 'Science', Tuesday: 'Math', Wednesday: 'Bangla', Thursday: 'X' },
      ],
      English: [
        { time: '4:00 PM - 4:40 PM', Saturday: 'X', Sunday: 'English', Monday: 'Math', Tuesday: 'Science', Wednesday: 'Bangla', Thursday: 'X' },
        { time: '4:40 PM - 5:20 PM', Saturday: 'X', Sunday: 'Math', Monday: 'ICT', Tuesday: 'History', Wednesday: 'English', Thursday: 'X' },
        { time: '5:20 PM - 6:00 PM', Saturday: 'X', Sunday: 'Science', Monday: 'English', Tuesday: 'Math', Wednesday: 'ICT', Thursday: 'X' },
      ],
    },
    
        'Class 7': {
          Bangla: [
            { time: '4:00 PM - 4:40 PM', Saturday: 'X', Sunday: 'Math', Monday: 'Bangla', Tuesday: 'Science', Wednesday: 'English', Thursday: 'X' },
            { time: '4:40 PM - 5:20 PM', Saturday: 'X', Sunday: 'ICT', Monday: 'English', Tuesday: 'Math', Wednesday: 'History', Thursday: 'X' },
            { time: '5:20 PM - 6:00 PM', Saturday: 'X', Sunday: 'Bangla', Monday: 'Science', Tuesday: 'Math', Wednesday: 'ICT', Thursday: 'X' },
          ],
          English: [
            { time: '4:00 PM - 4:40 PM', Saturday: 'X', Sunday: 'Science', Monday: 'Math', Tuesday: 'English', Wednesday: 'ICT', Thursday: 'X' },
            { time: '4:40 PM - 5:20 PM', Saturday: 'X', Sunday: 'Math', Monday: 'ICT', Tuesday: 'History', Wednesday: 'Bangla', Thursday: 'X' },
            { time: '5:20 PM - 6:00 PM', Saturday: 'X', Sunday: 'English', Monday: 'Science', Tuesday: 'Math', Wednesday: 'History', Thursday: 'X' },
          ],
        },
        'Class 8': {
          Bangla: [
            { time: '4:00 PM - 4:40 PM', Saturday: 'X', Sunday: 'Physics', Monday: 'Math', Tuesday: 'Chemistry', Wednesday: 'Biology', Thursday: 'X' },
            { time: '4:40 PM - 5:20 PM', Saturday: 'X', Sunday: 'English', Monday: 'ICT', Tuesday: 'Physics', Wednesday: 'Math', Thursday: 'X' },
            { time: '5:20 PM - 6:00 PM', Saturday: 'X', Sunday: 'Math', Monday: 'Chemistry', Tuesday: 'Biology', Wednesday: 'Bangla', Thursday: 'X' },
          ],
          English: [
            { time: '4:00 PM - 4:40 PM', Saturday: 'X', Sunday: 'Math', Monday: 'Biology', Tuesday: 'Physics', Wednesday: 'English', Thursday: 'X' },
            { time: '4:40 PM - 5:20 PM', Saturday: 'X', Sunday: 'Chemistry', Monday: 'ICT', Tuesday: 'Math', Wednesday: 'Bangla', Thursday: 'X' },
            { time: '5:20 PM - 6:00 PM', Saturday: 'X', Sunday: 'English', Monday: 'Math', Tuesday: 'Science', Wednesday: 'ICT', Thursday: 'X' },
          ],
        },
        'Class 9': {
          Bangla: [
            { time: '4:00 PM - 4:40 PM', Saturday: 'X', Sunday: 'Math', Monday: 'Physics', Tuesday: 'Chemistry', Wednesday: 'Biology', Thursday: 'X' },
            { time: '4:40 PM - 5:20 PM', Saturday: 'X', Sunday: 'English', Monday: 'ICT', Tuesday: 'Math', Wednesday: 'History', Thursday: 'X' },
            { time: '5:20 PM - 6:00 PM', Saturday: 'X', Sunday: 'Bangla', Monday: 'Science', Tuesday: 'Math', Wednesday: 'ICT', Thursday: 'X' },
          ],
          English: [
            { time: '4:00 PM - 4:40 PM', Saturday: 'X', Sunday: 'Physics', Monday: 'Math', Tuesday: 'English', Wednesday: 'ICT', Thursday: 'X' },
            { time: '4:40 PM - 5:20 PM', Saturday: 'X', Sunday: 'Math', Monday: 'ICT', Tuesday: 'History', Wednesday: 'Bangla', Thursday: 'X' },
            { time: '5:20 PM - 6:00 PM', Saturday: 'X', Sunday: 'English', Monday: 'Science', Tuesday: 'Math', Wednesday: 'Chemistry', Thursday: 'X' },
          ],
        },
        'Class 10': {
          Bangla: [
            { time: '4:00 PM - 4:40 PM', Saturday: 'X', Sunday: 'Physics', Monday: 'Chemistry', Tuesday: 'Math', Wednesday: 'Biology', Thursday: 'X' },
            { time: '4:40 PM - 5:20 PM', Saturday: 'X', Sunday: 'English', Monday: 'ICT', Tuesday: 'Math', Wednesday: 'History', Thursday: 'X' },
            { time: '5:20 PM - 6:00 PM', Saturday: 'X', Sunday: 'Bangla', Monday: 'Science', Tuesday: 'Math', Wednesday: 'ICT', Thursday: 'X' },
          ],
          English: [
            { time: '4:00 PM - 4:40 PM', Saturday: 'X', Sunday: 'Math', Monday: 'Physics', Tuesday: 'English', Wednesday: 'Chemistry', Thursday: 'X' },
            { time: '4:40 PM - 5:20 PM', Saturday: 'X', Sunday: 'Biology', Monday: 'ICT', Tuesday: 'History', Wednesday: 'Bangla', Thursday: 'X' },
            { time: '5:20 PM - 6:00 PM', Saturday: 'X', Sunday: 'English', Monday: 'Science', Tuesday: 'Math', Wednesday: 'Physics', Thursday: 'X' },
          ],
        
      }
  });
//download routine
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${selectedClass} - ${selectedVersion} Version Routine`, 14, 15);
    doc.setFontSize(12);
    doc.text('Oddhayon Coaching Center, Savar, Dhaka', 14, 22);

    const tableColumn = ['#', 'Time', 'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const tableRows = [];

    routineData[selectedClass][selectedVersion].forEach((row, index) => {
      tableRows.push([index + 1, row.time, row.Saturday, row.Sunday, row.Monday, row.Tuesday, row.Wednesday, row.Thursday]);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 12, cellPadding: 3, lineWidth: 0.2, lineColor: [0, 0, 0] },
      headStyles: { fillColor: [0, 128, 0], textColor: [255, 255, 255] },
    });

    doc.save(`${selectedClass}-${selectedVersion}-Routine.pdf`);
  };

  const openModal = (data, index) => {
    setEditedData(data);
    setEditedIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedData(null);
    setEditedIndex(null);
  };

  const handleInputChange = (e, field) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value,
    });
  };

  const saveChanges = () => {
    const updatedRoutine = [...routineData[selectedClass][selectedVersion]];
    updatedRoutine[editedIndex] = editedData;

    setRoutineData({
      ...routineData,
      [selectedClass]: {
        ...routineData[selectedClass],
        [selectedVersion]: updatedRoutine,
      },
    });

    closeModal();
  };

  return (
    <div className="py-8 bg-gradient-to-b from-blue-200 to-indigo-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle title="Central Class Routine" subtitle="Admin Control Panel" />

        <div className="flex gap-4 mb-6">
          <select className="p-2 border rounded-lg shadow-md" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            {classes.map((cls) => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>

          <select className="p-2 border rounded-lg shadow-md" value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)}>
            {versions.map((ver) => (
              <option key={ver} value={ver}>{ver}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
          <table className="table-auto w-full">
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Time</th>
                <th className="py-3 px-6 text-left">Saturday</th>
                <th className="py-3 px-6 text-left">Sunday</th>
                <th className="py-3 px-6 text-left">Monday</th>
                <th className="py-3 px-6 text-left">Tuesday</th>
                <th className="py-3 px-6 text-left">Wednesday</th>
                <th className="py-3 px-6 text-left">Thursday</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {routineData[selectedClass][selectedVersion].map((row, index) => (
                <tr key={index} className="border-b hover:bg-blue-100 transition">
                  <td className="py-3 border px-6 text-center font-semibold">{index + 1}</td>
                  <td className="py-3 border px-6">{row.time}</td>
                  <td className="py-3 border px-6 text-center">{row.Saturday}</td>
                  <td className="py-3 border px-6">{row.Sunday}</td>
                  <td className="py-3 border px-6">{row.Monday}</td>
                  <td className="py-3 border px-6">{row.Tuesday}</td>
                  <td className="py-3 border px-6">{row.Wednesday}</td>
                  <td className="py-3 border px-6 text-center">{row.Thursday}</td>
                  <td className="py-3 border px-6 text-center">
                    <button onClick={() => openModal(row, index)} className="text-blue-500 hover:text-blue-700">
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center mt-6">
          <button onClick={downloadPDF} className="flex items-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-6 font-semibold rounded-lg shadow-md hover:shadow-lg transition">
            <FaDownload className="mr-2" /> Download PDF
          </button>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-lg sm:w-11/12 max-h-[90vh] overflow-y-auto md:w-2/3 lg:w-1/2 xl:w-1/3">
            <div className="p-4 sm:p-6">
              <h2 className="text-2xl mt-3 font-bold mb-4 text-center">Edit Routine</h2>
              <div className="space-y-4">
                {[
                  "time",
                  "Saturday",
                  "Sunday",
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                ].map((day) => (
                  <div key={day}>
                    <label className="block text-sm font-medium text-gray-700">{day}</label>
                    <input
                      type="text"
                      value={editedData[day] || ""}
                      onChange={(e) => handleInputChange(e, day)}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={closeModal}
                  className="w-full sm:w-auto bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={saveChanges}
                  className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default CentralRoutine;