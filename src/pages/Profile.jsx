import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css';
import axiosInstance from '../api/axiosInstance';


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', bio: '',profile_image:'' });

  useEffect(() => {
    const fetchUser = async () => {''
      try {
        const response = await axiosInstance.get('http://localhost:3000/api/users/userprofile', {
        });
        setUserData(response.data);
        setFormData({
          name: response.data.name,
          email: response.data.email,
          bio: response.data.bio || '',
          profile_image: response.data.profile_image || '',
        });
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

    fetchUser();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profile_image: reader.result,
        }));
      };
      reader.readAsDataURL(file); // convert to base64
    }
  };


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      await axiosInstance.put('/users/updateprofile', formData, {
      });
      setUserData(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (!userData) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>My Profile</h2>

      <div className="profile-card">
              <img
          src={formData.profile_image || '/default-avatar.png'}
          alt="Profile"
          className="profile-pic"
        />

        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Bio"
              />
               <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <button onClick={handleUpdate}>Save</button>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
            </>
          ) : (
            <>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Bio:</strong> {userData.bio || 'No bio added.'}</p>
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
