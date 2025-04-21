import React, { useState } from "react";
import { FaDownload, FaEdit } from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import SectionTitle from "../../../Pages/SectionTitle/SectionTitle";
import useRoutine from "../../../Hooks/useRoutine";

const CentralRoutine = () => {
  const classes = [
    "Class 5",
    "Class 6",
    "Class 7",
    "Class 8",
    "Class 9",
    "Class 10",
    "Class 11",
    "Class 12",
  ];
  const versions = ["English", "Bangla"];
  const [selectedClass, setSelectedClass] = useState("Class 10");
  const [selectedVersion, setSelectedVersion] = useState("English");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedData, setEditedData] = useState(null);
  const [editedIndex, setEditedIndex] = useState(null);

  // Use the useRoutine hook
  const { routines, loading, refetch, updateRoutine, isUpdating } =
    useRoutine();

  // Get the schedule for the selected class and version
  const routineData =
    routines
      .find((r) => r.class === selectedClass)
      ?.subjects.find((s) => s.name === selectedVersion)?.schedule || [];

  // Download PDF
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`${selectedClass} - ${selectedVersion} Version Class Routine`, 14, 15);
    doc.setFontSize(12);
    doc.text("Oddhayon Coaching Center, Savar, Dhaka", 14, 22);

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
      startY: 30,
      styles: {
        fontSize: 11,
        cellPadding: 3,
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
    doc.setFontSize(12);
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

  // Open modal for editing
  const openModal = (data, index) => {
    setEditedData(data);
    setEditedIndex(index);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditedData(null);
    setEditedIndex(null);
    refetch();
  };

  // Handle input changes in the modal
  const handleInputChange = (e, field) => {
    setEditedData({
      ...editedData,
      [field]: e.target.value,
    });
    refetch();
  };

  // Save changes and update the routine
  const saveChanges = () => {
    const updatedSchedule = [...routineData];
    updatedSchedule[editedIndex] = editedData;

    // Call the updateRoutine function from useRoutine
    updateRoutine(selectedClass, selectedVersion, updatedSchedule);

    // Close the modal
    closeModal();

    refetch();
  };

  if (loading) {
    return <div className="text-center py-8">Loading routines...</div>;
  }

  return (
    <div className="py-8 bg-gradient-to-b from-blue-200 to-indigo-200 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Central Class Routine"
          subtitle="Admin Control Panel"
        />

        {/* Class and Version Selection */}
        <div className="flex gap-4 mb-6">
          <select
            className="p-2 border rounded-lg shadow-md"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>

          <select
            className="p-2 border rounded-lg shadow-md"
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
          >
            {versions.map((ver) => (
              <option key={ver} value={ver}>
                {ver}
              </option>
            ))}
          </select>
        </div>

        {/* Routine Table */}
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
              {routineData.map((row, index) => (
                <tr
                  key={index}
                  className="border-b text-sm text-center  hover:bg-blue-100 transition"
                >
                  <td className="py-3 border px-6 text-center font-semibold">
                    {index + 1}
                  </td>
                  <td className="py-3 border px-1 ">{row.time}</td>
                  <td className="py-3 border px-1 ">{row.Saturday}</td>
                  <td className="py-3 border px-1">{row.Sunday}</td>
                  <td className="py-3 border px-1">{row.Monday}</td>
                  <td className="py-3 border px-1">{row.Tuesday}</td>
                  <td className="py-3 border px-1">{row.Wednesday}</td>
                  <td className="py-3 border px-1 ">{row.Thursday}</td>
                  <td className="py-3 border  px-1">
                    <button
                      onClick={() => openModal(row, index)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Download PDF Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={downloadPDF}
            className="flex items-center bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-6 font-semibold rounded-lg shadow-md hover:shadow-lg transition"
          >
            <FaDownload className="mr-2" /> Download PDF
          </button>
        </div>

        {/* Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-lg sm:w-11/12 max-h-[90vh] overflow-y-auto md:w-2/3 lg:w-1/2 xl:w-1/3">
              <div className="p-4 sm:p-6">
                <h2 className="text-4xl mt-6 font-extrabold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600 drop-shadow-md">
                  Edit Routine
                  <span className="block text-xl font-semibold text-red-400 mt-2">
                    ({selectedClass} - {selectedVersion})
                  </span>
                </h2>

                <div className="space-y-4 ">
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
                      <label className="block text-red-500 font-semibold text-md">
                        {day}
                      </label>
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
                    className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-green-500"
                  >
                    {isUpdating ? "Saving..." : "Save"}
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
