import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import './ProfilePage.css';

function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/users/userprofile/${id}`);
        setUser(res.data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <div>Loading profile...</div>;
  if (!user) return <div>User not found.</div>;

  return (
    <>
    <div className="profile-container">
      <img
        src={user[0].profile_image || "/assets/dp.jpg"}
        alt="Profile"
        className="profile-avatar"
      />
      <h2>{user[0].name}</h2>
      <p>{user[0].email}</p>
      <p>{user[0].bio || 'No bio available'}</p>

      </div>
      

<div className="profile-posts">
  {user[0].user_id != null ? (
    user.map((post) => (
      <div key={post.id} className="post-card">
        <div className="postownerinfo">
          <h5>{post.name || 'User'}</h5>
        </div>

        {post.image_url && (
          <img src={post.image_url} alt="Post" className="img-fluid" />
        )}

        <p>{post.content}</p>
        <div className="post-actions">
          <button>👍 Like</button>
          <button>💬 Comment</button>
        </div>
      </div>
    ))
  ) : (
    <div className='text-center'>No posts to show.</div>
  )}
</div>
    </>
  );
}

export default ProfilePage;
