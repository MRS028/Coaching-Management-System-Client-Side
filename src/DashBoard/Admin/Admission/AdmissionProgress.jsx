// components/AdmissionProgress.jsx
const AdmissionProgress = ({ currentStep }) => {
  const steps = [
    { number: 1, label: "ব্যক্তিগত তথ্য", path: "/admission" },
    { number: 2, label: "তথ্য চেক করুন", path: "/admission/confirm" },
    { number: 3, label: "পেমেন্ট", path: "/admission/payment" },
    { number: 4, label: "সম্পন্ন", path: "/admission/success" },
  ];

  return (
    <div className="w-full px-4 md:px-0 mb-8">
      {/* Steps Circles */}
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => (
          <div key={step.number} className="flex-1 flex items-center">
            <div className="flex flex-col items-center w-full">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg transition-colors duration-300
                  ${currentStep >= step.number ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}
                `}
              >
                {step.number}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-1 flex-1 mt-2 rounded-full transition-colors duration-300
                    ${currentStep > step.number ? "bg-blue-600" : "bg-gray-300"}
                  `}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Step Labels */}
      <div className="flex justify-between mt-4 text-xs md:text-sm text-gray-700 font-medium px-1 md:px-0">
        {steps.map((step) => (
          <span
            key={step.number}
            className={`text-center w-full transition-colors duration-300
              ${currentStep >= step.number ? "text-blue-600" : "text-gray-500"}
            `}
          >
            {step.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AdmissionProgress;
