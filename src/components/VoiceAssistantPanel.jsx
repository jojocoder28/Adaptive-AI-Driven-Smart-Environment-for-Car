import React from 'react';

function VoiceAssistantPanel() {
  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Voice Assistant</h2>
      <p>Interact with the AI-driven voice assistant for real-time commands and assistance.</p>
      <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 mt-2">
        Activate Voice Assistant
      </button>
    </div>
  );
}

export default VoiceAssistantPanel;
