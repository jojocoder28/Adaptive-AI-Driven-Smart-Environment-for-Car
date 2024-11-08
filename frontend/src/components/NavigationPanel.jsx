import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion'; // For smooth animations
import { LocationMarkerIcon, MapIcon } from '@heroicons/react/outline'; // Importing Heroicons

function NavigationPanel() {
  const [startPoint, setStartPoint] = useState('');
  const [destination, setDestination] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleGenerateNavigation = async () => {
    try {
      const response = await fetch('http://localhost:8000/generate-navigation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ start_point: startPoint, destination, include_pois: true }),
      });
      const data = await response.json();
      setInstructions(data.instructions);
    } catch (error) {
      console.error('Error generating navigation:', error);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-lg mb-4 tablet:max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Your Adventure Awaits!</h2>
      <div className="space-y-4">
        {/* Start Point Input */}
        <div className="flex items-center space-x-3">
          <LocationMarkerIcon className="w-6 h-6 text-blue-500" />
          <input
            type="text"
            placeholder="Start Point"
            value={startPoint}
            onChange={(e) => setStartPoint(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Destination Input */}
        <div className="flex items-center space-x-3">
          <MapIcon className="w-6 h-6 text-blue-500" />
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Generate Navigation Button */}
        <button
          onClick={handleGenerateNavigation}
          className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 flex items-center justify-center space-x-2"
        >
          <MapIcon className="w-5 h-5" />
          <span>Generate Navigation</span>
        </button>
      </div>

      {instructions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="mt-6 p-6 bg-gray-50 rounded shadow-md overflow-y-auto max-h-96"
        >
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Your Journey Begins...</h3>
          <ReactMarkdown
            children={instructions}
            remarkPlugins={[remarkGfm]}
            className="prose prose-sm max-w-none text-gray-800"
          />
        </motion.div>
      )}
    </div>
  );
}

export default NavigationPanel;
