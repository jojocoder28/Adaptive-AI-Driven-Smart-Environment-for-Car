import React, { useState, useEffect } from 'react';

function HealthMonitoringPanel() {
  const [heartRate, setHeartRate] = useState(70); // Initial heart rate in beats per minute (bpm)
  const [fatigue, setFatigue] = useState(20); // Initial fatigue level (scale from 0 to 100)
  const [alert, setAlert] = useState('');
  const [recommendations, setRecommendations] = useState('');

  // Simulate heart rate and fatigue changes over time
  useEffect(() => {
    const healthSimulationInterval = setInterval(() => {
      // Simulate heart rate fluctuation (between 60-100 bpm)
      setHeartRate(prevHeartRate => Math.floor(Math.random() * (100 - 60 + 1)) + 60);
      
      // Simulate fatigue levels (between 0-100)
      setFatigue(prevFatigue => Math.floor(Math.random() * 100));

    }, 3000); // Update every 3 seconds to simulate real-time monitoring

    return () => clearInterval(healthSimulationInterval); // Clear interval on component unmount
  }, []);

  // Check heart rate and fatigue levels to provide alerts
  useEffect(() => {
    if (heartRate > 100) {
      setAlert('Warning: High heart rate detected! Please take a break.');
    } else if (heartRate < 60) {
      setAlert('Alert: Low heart rate detected. Please check your health.');
    } else {
      setAlert('');
    }

    if (fatigue > 80) {
      setRecommendations('Recommendation: You are highly fatigued. Please take a break immediately!');
    } else if (fatigue > 50) {
      setRecommendations('Recommendation: Consider taking a break to avoid fatigue.');
    } else {
      setRecommendations('');
    }
  }, [heartRate, fatigue]);

  return (
    <div className="health-monitoring-panel p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Health Monitoring</h2>

      <div className="mb-4">
        <h3 className="text-lg">Heart Rate: {heartRate} bpm</h3>
        {alert && <p className="text-red-500">{alert}</p>}
      </div>

      <div className="mb-4">
        <h3 className="text-lg">Fatigue Level: {fatigue}%</h3>
        {recommendations && <p className="text-yellow-500">{recommendations}</p>}
      </div>

      <div className="mt-4">
        <h3 className="font-bold">Safety Tips:</h3>
        <ul className="list-disc pl-5">
          <li>Take regular breaks to avoid fatigue.</li>
          <li>Ensure proper hydration and rest for optimal driving performance.</li>
          <li>If you experience fatigue or dizziness, pull over safely and rest.</li>
        </ul>
      </div>
    </div>
  );
}

export default HealthMonitoringPanel;
