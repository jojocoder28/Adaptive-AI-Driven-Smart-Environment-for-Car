import React, { useState, useEffect } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { FaTemperatureHigh, FaMusic, FaCarSide } from 'react-icons/fa';  // Import icons
import CarModel from './components/CarModel';
import NavigationPanel from './components/NavigationPanel';
import VoiceAssistantPanel from './components/VoiceAssistantPanel';
import HealthMonitoringPanel from './components/HealthMonitoringPanel';
import CommunityEngagementPanel from './components/CommunityEngagementPanel';
import TabletUi from './components/TabletUi';
import SmartMusicPlayerPanel from './components/SmartMusicPlayerPanel';
import ACAdjustment from './components/ACAdjustment';  // Import ACAdjustment component

function App() {
  // State to manage active panel
  const [activePanel, setActivePanel] = useState('navigation');

  // State to manage user preferences
  const [userPreferences, setUserPreferences] = useState(() => {
    const savedPreferences = localStorage.getItem('userPreferences');
    return savedPreferences ? JSON.parse(savedPreferences) : {
      climate: 'cool',
      entertainment: 'rock',
      drivingMode: 'eco',
    };
  });

  // State for AC temperature and mood
  const [acTemperature, setACTemperature] = useState(22); // Default temperature (Celsius)
  const [mood, setMood] = useState('Happy'); // Default mood

  // Update local storage whenever userPreferences changes
  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  // Function to update user preferences
  const updateUserPreferences = (newPreferences) => {
    setUserPreferences((prev) => ({ ...prev, ...newPreferences }));
  };

  // Function to adjust AC temperature and mood
  const adjustACTemperatureAndMood = () => {
    const currentHour = new Date().getHours();
    let newACTemperature = 22; // Default temperature

    if (currentHour >= 6 && currentHour < 12) {
      newACTemperature = 22; // Morning: 22°C
    } else if (currentHour >= 12 && currentHour < 18) {
      newACTemperature = 24; // Afternoon: 24°C
    } else {
      newACTemperature = 20; // Night: 20°C
    }

    const randomMood = ['Happy', 'Sad', 'Energetic', 'Relaxed', 'Motivated'];
    const newMood = randomMood[Math.floor(Math.random() * randomMood.length)];

    setACTemperature(newACTemperature);
    setMood(newMood);
  };
  const togglePreference = (type, options) => {
    const currentIndex = options.indexOf(userPreferences[type]);
    const nextIndex = (currentIndex + 1) % options.length;
    updateUserPreferences({ [type]: options[nextIndex] });
  };
  const renderActivePanel = () => {
    switch (activePanel) {
      case 'voiceAssistant':
        return <VoiceAssistantPanel />;
      case 'healthMonitoring':
        return <HealthMonitoringPanel />;
      case 'communityEngagement':
        return <CommunityEngagementPanel />;
      case 'smartMusicPlayer':
        return <SmartMusicPlayerPanel userPreferences={userPreferences} />;
      default:
        return <NavigationPanel />;
    };
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Left Side - Interactive Panels */}
      <div className="w-1/2 bg-gray-100 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Interactive Car Dashboard</h1>
        <TabletUi setActivePanel={setActivePanel} updateUserPreferences={updateUserPreferences} adjustACTemperature={adjustACTemperatureAndMood} />
        {renderActivePanel()}
      </div>

      {/* Right Side - 3D Car Rendering and Buttons for Preferences */}
      <div className="w-1/2 bg-gray-800 relative">
        <Canvas camera={{ position: [0, 200, 500], fov: 100 }}>
          <ambientLight intensity={3} />
          <pointLight position={[0, 100, 100]} intensity={1.5} />
          <CarModel />
          <OrbitControls enablePan={false} />
        </Canvas>

        {/* Buttons for changing personalized settings with icons */}
        <div className="absolute bottom-4 left-4 right-4 bg-gray-900 p-4 rounded shadow flex justify-between">
          {/* Climate Button with icon and options */}
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center" 
            onClick={() => togglePreference('climate', ['cool', 'warm', 'neutral'])}
          >
            <FaTemperatureHigh className="mr-2" /> 
            Climate: {userPreferences.climate}
          </button>

          {/* Entertainment Button with icon and options */}
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center" 
            onClick={() => togglePreference('entertainment', ['rock', 'jazz', 'classical', 'pop', 'bollywood'])}
          >
            <FaMusic className="mr-2" />
            Entertainment: {userPreferences.entertainment}
          </button>

          {/* Driving Mode Button with icon and options */}
          <button 
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center" 
            onClick={() => togglePreference('drivingMode', ['eco', 'sport', 'comfort', 'offroad'])}
          >
            <FaCarSide className="mr-2" />
            Driving Mode: {userPreferences.drivingMode}
          </button>
        </div>

        {/* Pass AC temperature and mood to ACAdjustment component */}
        <ACAdjustment 
          currentTemperature={acTemperature} 
          environmentalTemperature={25}  // Example environmental temperature
          mood={mood} 
        />
      </div>
    </div>
  );
}

export default App;
