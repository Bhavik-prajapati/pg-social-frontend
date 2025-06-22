import { useEffect, useState } from "react";
import axios from "axios";
import "./PostFeed.css";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

function PostFeed() {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [postImage, setPostImage] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get("/posts/");
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
      const formData = new FormData();
      formData.append("content", postContent);

      if (postImage) {
        formData.append("image", postImage);
      }
      await axiosInstance.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPostContent("");
      setPostImage(null);

      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const likePost = async (postId) => {
  try {
    const res = await axiosInstance.post(`/likes/${postId}/like`);

    console.log( res,"res...")
    fetchPosts();
  } catch (error) {
    console.error("Like error:", error.response?.data || error.message);
  }
};



  

  return (
    <div className="post-feed">
      <form onSubmit={handlePost} className="create-post-form">
        <textarea
          placeholder="Start a post..."
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          required
        />

        <label className="upload-btn">
          <i className="fa-solid fa-camera"></i> Upload Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPostImage(e.target.files[0])}
            style={{ display: "none" }}
          />
        </label>

        <button type="submit" className="post-submit-btn">
          Post
        </button>
      </form>

      {posts.slice(0, 4).map((post) => (
        <div key={post.id} className="post-card">
          <div className="postownerinfo">
            <Link to={`/profile/${post.user_id}`} className="feed-user-info">
              <img src={post.profile_image} alt="Post" className="feed-dp" />
              <h5>{post.name || "User"}</h5>
            </Link>
          </div>
          <p>{post.content}</p>
          {post.image_url && (
            <img src={post.image_url} alt="Post" className="img-fluid" />
          )}
          <div className="post-actions">
            <button onClick={() => likePost(post.id)}>

              {post.likedByUser==true ? <>
                    <i className="fa-solid fa-thumbs-up"></i>

              <span>{post.likeCount || 0}</span>
                </>:<>
                <i class="fa-regular fa-thumbs-up"></i>
              <span>{post.likeCount || 0}</span>
                </>}

              
            </button>
            <button>
              <i class="fa-solid fa-comment"></i>
              <span>3</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostFeed;
