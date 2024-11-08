import React from 'react';

function NavigationPanel() {
  const handleNavigationClick = () => {
    alert('Navigation activated!');
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Navigation</h2>
      <button
        onClick={handleNavigationClick}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Start Navigation
      </button>
    </div>
  );
}

export default NavigationPanel;
