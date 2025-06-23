import { useEffect, useState } from 'react';
import './css/UserSidebar.css';
import axiosInstance from '../api/axiosInstance';

function UserSidebar() {
const [userData, setUserData] = useState(null);
 const fetchUser = async () => {
      try {
        const response = await axiosInstance.get('/users/profile', {
        });
        setUserData(response.data[0]);
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };

 useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="sidebar">
      <img src={userData && userData.profile_image}  className="sidebar-dp" />
      <h3>{userData && userData.name}</h3>
      <p>{userData && userData.email}</p>
      <p className="bio">{userData && userData.bio || `No Bio Added`} </p>
    </div>
  );
}

export default UserSidebar;
