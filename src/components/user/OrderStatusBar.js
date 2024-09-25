import React from 'react';
import { FaCheck } from 'react-icons/fa';

const OrderStatusBar = ({ currentStep }) => {
  const steps = [
    { id: 1, label: 'Order received' },
    { id: 2, label: 'Confirmed' },
    { id: 3, label: 'Packed' },
    { id: 4, label: 'On the way' },
    { id: 5, label: 'Delivered' },
  ];

  return (
    <div className="flex items-center justify-between w-full">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center w-full">
          <div className="relative flex flex-col items-center flex-grow">
            {index < steps.length - 1 && (
              <div
                className={`absolute top-5 left-1/2 w-full h-1 -translate-y-1/2 ${
                  currentStep > step.id ? 'bg-green-600' : 'bg-gray-300'
                }`}
              ></div>
            )}

            <div
              className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full ${
                currentStep >= step.id ? 'bg-green-600' : 'bg-gray-300'
              }`}
            >
              {currentStep > step.id || (step.id === 5 && currentStep === step.id) ? (
                <FaCheck className="text-white" />
              ) : (
                <span
                  className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-white' : 'text-gray-600'
                  }`}
                >
                  {`0${step.id}`}
                </span>
              )}
            </div>

            <span
              className={`mt-2 text-xs text-center ${
                currentStep >= step.id
                  ? 'text-green-600 font-semibold'
                  : 'text-gray-400'
              }`}
            >
              {step.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderStatusBar;
