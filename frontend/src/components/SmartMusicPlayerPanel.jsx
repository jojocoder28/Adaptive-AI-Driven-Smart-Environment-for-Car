import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function SmartMusicPlayerPanel({ userPreferences }) {
  const [musicPreferences, setMusicPreferences] = useState({ genre: userPreferences.entertainment, mood: 'Happy', timeOfDay: 'Morning' });
  const [generatedPlaylist, setGeneratedPlaylist] = useState('');
  const [loading, setLoading] = useState(false);

  const cleanMarkdown = (text) => {
    return text
      .replace(/([#\*\-_`>])/g, '')   // Remove symbols like *, _, #, `, etc.
      .replace(/\n+/g, ' ')           // Remove newlines and replace them with a space
      .replace(/\s+/g, ' ')           // Remove multiple spaces
      .trim();                        // Trim any leading/trailing spaces
  };

  const handleGenerateMusic = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/generate-playlist/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          input_text: `Generate a personalized playlist based on the following preferences: genre ${musicPreferences.genre}, mood ${musicPreferences.mood}, and time of day ${musicPreferences.timeOfDay}.`
        })
      });
      const data = await response.json();
      setGeneratedPlaylist(data.response);
    } catch (error) {
      console.error('Error generating music:', error);
      alert('Failed to generate music. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="smart-music-player-panel p-4 bg-gray-100">
      <h2 className="text-xl font-bold mb-4">Smart Music Player</h2>

      <div className="mb-4">
        <label className="block mb-2">Genre: {musicPreferences.genre}</label>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Select Mood:</label>
        <select
          value={musicPreferences.mood}
          onChange={(e) => setMusicPreferences({ ...musicPreferences, mood: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="Happy">Happy</option>
          <option value="Relaxed">Relaxed</option>
          <option value="Energetic">Energetic</option>
          <option value="Motivational">Motivational</option>
          <option value="Sad">Sad</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Select Time of Day:</label>
        <select
          value={musicPreferences.timeOfDay}
          onChange={(e) => setMusicPreferences({ ...musicPreferences, timeOfDay: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
          <option value="Night">Night</option>
        </select>
      </div>

      <button
        onClick={handleGenerateMusic}
        className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Generating Playlist...' : 'Generate Playlist'}
      </button>

      {generatedPlaylist && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Generated Playlist:</h3>
          <p className="p-2 bg-white border mt-2">
            <ReactMarkdown>{generatedPlaylist}</ReactMarkdown>
          </p>
        </div>
      )}
    </div>
  );
}

export default SmartMusicPlayerPanel;
