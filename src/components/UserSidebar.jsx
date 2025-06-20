import './UserSidebar.css';

function UserSidebar() {
  const user = {
    name: 'Jatin Birbal',
    bio: 'Full Stack Developer | Node.js & React',
    image: 'https://via.placeholder.com/80',
  };

  return (
    <div className="sidebar">
      <img src={user.image} alt="User DP" className="sidebar-dp" />
      <h3>{user.name}</h3>
      <p className="bio">{user.bio}</p>
    </div>
  );
}

export default UserSidebar;
