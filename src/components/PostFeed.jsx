import { useEffect, useState } from "react";
import axios from "axios";
import "./css/PostFeed.css";
import axiosInstance from "../api/axiosInstance";
import { Link } from "react-router-dom";

import { ClipLoader } from "react-spinners"; // 👈 Add this


function PostFeed() {
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [postImage, setPostImage] = useState(null);
  const [loading, setLoading] = useState(false); // 👈 Add loading state


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
    setLoading(true);

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
    }finally{
    setLoading(false);
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

       {loading && (
        <div className="overlay-loader">
          <ClipLoader size={60} color="#0a66c2" />
          <p>Uploading your post...</p>
        </div>
      )}

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

        {postImage && (
  <span className="uploaded-image-name">📁 {postImage.name}</span>
)}

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
