import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import './css/form.css';
import { useAuth } from '../context/AuthContext';

function Login() {
  const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = useAuth();
  

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/users/login", formData);
      localStorage.setItem("accessToken", response.data.tokens.accessToken);
      localStorage.setItem("refreshToken", response.data.tokens.refreshToken);
      toast.success("User logged in successfully!");
      setIsLoggedIn(true);
      navigate('/'); 
    } catch (error) {
      const msg = error.response?.data?.message || error.message;
      toast.error(msg);
      console.error("❌ Login failed:", msg);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Sign in</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Sign in</button>
        </form>
        <p className="auth-footer">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
