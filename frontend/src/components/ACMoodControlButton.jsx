import React from 'react';
import { FaTemperatureHigh, FaGrin } from 'react-icons/fa';

function ACMoodControlButton({ adjustACTemperatureAndMood }) {
  return (
    <div
      className="flex flex-col items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
      onClick={adjustACTemperatureAndMood} // Trigger the passed function
    >
      <div className="flex items-center justify-center mb-2">
        <FaTemperatureHigh size={40} className="text-teal-500 mr-2" />
        <FaGrin size={40} className="text-yellow-500" />
      </div>
      <span className="text-sm">Adjust AC</span>
    </div>
  );
}

export default ACMoodControlButton;
