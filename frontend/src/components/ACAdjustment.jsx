import React, { useState } from 'react';

function ACAdjustment({ currentTemperature, environmentalTemperature, mood }) {
  const [adjustedTemperature, setAdjustedTemperature] = useState(null);

  // Function to adjust AC temperature based on mood and environmental temperature
  const adjustTemperature = () => {
    let adjustedTemp = currentTemperature + (environmentalTemperature - currentTemperature) * 0.5;
    if (mood === 'Relaxed') {
      adjustedTemp -= 2; // Decrease the temperature if mood is relaxed
    } else if (mood === 'Energetic') {
      adjustedTemp += 2; // Increase the temperature if mood is energetic
    }
    setAdjustedTemperature(adjustedTemp);
  };

  // Call adjustTemperature when component mounts or when dependencies change
  React.useEffect(() => {
    adjustTemperature();
  }, [currentTemperature, environmentalTemperature, mood]);

  return (
    <div className="absolute top-4 left-10 p-2 bg-gradient-to-r from-pink-300 to-indigo-400 text-white rounded-lg shadow-md flex items-center space-x-4 w-auto">
      <div className="text-sm font-semibold">Current Temp: {currentTemperature}°C</div>
      <div className="text-sm font-semibold">Env. Temp: {environmentalTemperature}°C</div>
      <div className="text-sm font-semibold">Mood: {mood}</div>
      <div className="text-sm font-semibold">AC Temp: {adjustedTemperature ? adjustedTemperature.toFixed(1) : 'Calculating...'}°C</div>
    </div>
  );
}

export default ACAdjustment;
