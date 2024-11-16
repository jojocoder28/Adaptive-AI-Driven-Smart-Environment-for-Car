import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

function VoiceAssistantPanel() {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const assistantName = 'Nova';  // The assistant's name

  // This effect will run once when the component is mounted to start listening for the assistant's name
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true; // Keep listening continuously
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const result = event.results[event.resultIndex][0].transcript;

        // Check if the user's speech includes the assistant's name (e.g., "Sage")
        if (result.toLowerCase().includes(assistantName.toLowerCase())) {
          setTranscript(result); // Show the transcript when "Sage" is called
          sendTextToServer(result); // Proceed with the voice command
        }
      };

      recognition.onerror = (event) => {
        console.error('Error during speech recognition:', event.error);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start(); // Start continuous listening when the component is mounted
    } else {
      alert('Your browser does not support the Web Speech API. Please try Chrome or an updated browser.');
    }
  }, []);

  // Handle manual button recording
  const handleRecord = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false; // Stop listening after a single command
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        setTranscript(result);  // Show the transcript for manual recordings
        sendTextToServer(result); // Process the command
      };

      recognition.onerror = (event) => {
        console.error('Error during speech recognition:', event.error);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();  // Start manual recognition when the button is pressed
    } else {
      alert('Your browser does not support the Web Speech API.');
    }
  };

  const sendTextToServer = async (inputText) => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/voice-command/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ input_text: inputText }),
      });
      const data = await response.json();
      setResponse(data.response);
      setIsLoading(false);

      // Clean the response to make it suitable for text-to-speech
      const cleanTextResponse = cleanMarkdown(data.response);

      // Pass the cleaned text to the Text-to-Speech function
      playTextToSpeech(cleanTextResponse);
    } catch (error) {
      console.error('Error sending text to the server:', error);
      setIsLoading(false);
    }
  };

  // Function to remove Markdown syntax and special characters
  const cleanMarkdown = (text) => {
    return text
      .replace(/([#\*\-_`>])/g, '')   // Remove symbols like *, _, #, `, etc.
      .replace(/\n+/g, ' ')           // Remove newlines and replace them with a space
      .replace(/\s+/g, ' ')           // Remove multiple spaces
      .trim();                        // Trim any leading/trailing spaces
  };

  const playTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn('Text-to-speech not supported in this browser.');
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow mb-4">
      <h2 className="text-xl font-semibold mb-2">Voice Assistant</h2>
      <p>Interact with the AI-driven voice assistant for real-time commands and assistance. Call me Sage</p>

      {/* Button for manual activation */}
      <button
        onClick={handleRecord}
        disabled={isRecording}
        className={`w-full py-2 rounded ${isRecording ? 'bg-gray-500' : 'bg-green-500 text-white'} hover:bg-green-600 mt-2`}
      >
        {isRecording ? 'Recording...' : 'Activate Voice Assistant'}
      </button>

      {/* Show loading state */}
      {isLoading && <p className="mt-2 text-blue-500">Processing... Please wait.</p>}

      {/* Display the transcript only if "Sage" is called */}
      {transcript && (
        <p className="mt-2">Transcript: {transcript}</p>
      )}

      {/* Display response from the assistant */}
      {response && (
        <div className="mt-4 p-3 bg-gray-50 rounded shadow">
          <h3 className="font-semibold">Response:</h3>
          <ReactMarkdown>{response}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default VoiceAssistantPanel;
