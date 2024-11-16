import React, { useState } from 'react';
import './CommunityEngagementPanel.css'; // Custom CSS for styling

function CommunityEngagementPanel() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'John D.',
      carModel: 'Toyota Prius 2022',
      imageUrl: 'https://eu.ui-avatars.com/api/?name=John+Doe&size=250', // Placeholder image
      content: 'Just hit a new record of 50 MPG on my last trip! Feeling great about my eco-driving progress.',
      pointsEarned: 15,
    },
    {
      id: 2,
      user: 'Anna S.',
      carModel: 'Tesla Model 3',
      imageUrl: 'https://eu.ui-avatars.com/api/?name=Anna+S&size=250', // Placeholder image
      content: 'Completed a daily health check before my drive. Staying healthy and safe on the road! #DriverHealth',
      pointsEarned: 10,
    },
    {
      id: 3,
      user: 'Mark R.',
      carModel: 'Ford Explorer 2021',
      imageUrl: 'https://eu.ui-avatars.com/api/?name=Mark+R&size=250', // Placeholder image
      content: 'Monitored my car for fuel efficiency today. Improved my driving pattern and saved 20% more fuel! #FuelSaving',
      pointsEarned: 20,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const handleAddPost = () => {
    if (newPost.trim()) {
      setPosts([
        ...posts,
        {
          id: posts.length + 1,
          user: 'You',
          carModel: 'Volkswagen Tiguan',
          imageUrl: 'https://eu.ui-avatars.com/api/?name=Swarnadeep+Das&size=250', // Placeholder image
          content: newPost,
          pointsEarned: Math.floor(Math.random() * 21),
        },
      ]);
      setNewPost('');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Community Engagement Panel</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Share your driving experience..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        />
        <button
          onClick={handleAddPost}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-4 bg-white rounded shadow flex items-start">
            <img
              src={post.imageUrl}
              alt={post.user}
              className="w-12 h-12 rounded-full mr-4 border"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{post.user} ({post.carModel})</h2>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">Points: {post.pointsEarned}</span>
              </div>
              <p className="mt-2">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityEngagementPanel;
