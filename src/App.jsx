import React, { useState } from 'react';
import './App.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import CarModel from './components/CarModel';
import NavigationPanel from './components/NavigationPanel';
import VoiceAssistantPanel from './components/VoiceAssistantPanel';
import HealthMonitoringPanel from './components/HealthMonitoringPanel';
import CommunityEngagementPanel from './components/CommunityEngagementPanel';

function App() {
  const [activePanel, setActivePanel] = useState('navigation');

  const renderActivePanel = () => {
    switch (activePanel) {
      case 'voiceAssistant':
        return <VoiceAssistantPanel />;
      case 'healthMonitoring':
        return <HealthMonitoringPanel />;
      case 'communityEngagement':
        return <CommunityEngagementPanel />;
      default:
        return <NavigationPanel />;
    }
  };

  return (
    <div className="flex flex-row h-screen">
      {/* Left Side - Interactive Panels */}
      <div className="w-1/2 bg-gray-100 p-4 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Interactive Car Dashboard</h1>
        {/* Pass the setActivePanel function as a prop to change the active panel */}
        <NavigationPanel setActivePanel={setActivePanel} />
        {renderActivePanel()}
      </div>

      {/* Right Side - 3D Car Rendering */}
      <div className="w-1/2 bg-gray-800">
        <Canvas camera={{ position: [0, 200, 500], fov: 100 }}>
          <ambientLight intensity={3} />
          <pointLight position={[0, 100, 100]} intensity={1.5} />
          <CarModel />
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
}

export default App;
