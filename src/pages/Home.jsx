import './css/home.css';
import UserSidebar from '../components/UserSidebar';
import PostFeed from '../components/PostFeed';
import NewsWidget from '../components/NewsWidget';

function Home() {
  return (
    <div className="home-layout">
      <UserSidebar />
      <PostFeed />
      <NewsWidget />
    </div>
  );
}

export default Home;
