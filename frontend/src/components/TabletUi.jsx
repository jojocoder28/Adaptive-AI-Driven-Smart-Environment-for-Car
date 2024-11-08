import React from 'react';
import { FaRoute, FaMicrophone, FaHeartbeat, FaUsers } from 'react-icons/fa';

function TabletUi({ setActivePanel }) {
  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-4">Tablet Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <div
          className="flex flex-col items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
          onClick={() => setActivePanel('navigation')}
        >
          <FaRoute size={40} className="text-blue-500 mb-2" />
          <span className="text-sm">Navigation</span>
        </div>
        <div
          className="flex flex-col items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
          onClick={() => setActivePanel('voiceAssistant')}
        >
          <FaMicrophone size={40} className="text-green-500 mb-2" />
          <span className="text-sm">Voice Assistant</span>
        </div>
        <div
          className="flex flex-col items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
          onClick={() => setActivePanel('healthMonitoring')}
        >
          <FaHeartbeat size={40} className="text-red-500 mb-2" />
          <span className="text-sm">Health</span>
        </div>
        <div
          className="flex flex-col items-center p-4 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
          onClick={() => setActivePanel('communityEngagement')}
        >
          <FaUsers size={40} className="text-purple-500 mb-2" />
          <span className="text-sm">Community</span>
        </div>
      </div>
    </div>
  );
}

export default TabletUi;
