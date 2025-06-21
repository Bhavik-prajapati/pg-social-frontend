import { useEffect, useState } from 'react';
import axios from 'axios';
import './PostFeed.css';
import axiosInstance from '../api/axiosInstance';

function PostFeed() {
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get('/posts/');
      console.log("res")
      console.log(res,"Ress");  
      setPosts(res.data);
    } catch (error) {
      console.error("Error fetching posts:", error);  
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('http://localhost:3000/api/posts', { content: postContent }, {
      });
      setPostContent('');
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

 
  const follow = async (userid) => {
  await axiosInstance.post(
    '/follow/follow',
    { followingId: userid },
  );
};
 

  const unfollow=async(userid)=>{
    await axiosInstance.post(
    '/follow/unfollow',
    { followingId: userid },
  );
  }

  return (
    <div className="post-feed">
      <form onSubmit={handlePost} className="create-post-form">
        <textarea
          placeholder="Start a post..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>

      {posts.map((post) => (
        <div key={post.id} className="post-card">
        <div className='postownerinfo'>
        <h5>{post.name|| 'User'}</h5>
        {!post.isFollowing ? <button className='follow-btn' onClick={()=>follow(post.user_id)}>follow</button> : <button className='follow-btn' onClick={()=>unfollow(post.user_id)}>unfollow</button> }
        </div>
          <p>{post.content}</p>
          <div className="post-actions">
            <button>👍 Like</button>
            <button>💬 Comment</button>
          </div>
        </div>
      ))} 
    </div>
  );
}

export default PostFeed;
