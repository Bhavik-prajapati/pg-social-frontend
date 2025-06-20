import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './form.css';
import { toast } from 'react-hot-toast';


function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
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
      const response = await axios.post("http://localhost:3000/api/users/register", formData);
      console.log("✅ Registered:", response.data);
      toast.success("User Registered in successfully!");
      navigate('/login');
      
    } catch (error) {
      toast.error("❌ Registration failed");
      console.error(":", error.response?.data || error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Create your account</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Agree & Join</button>
        </form>
        <p className="auth-footer">
          Already a member? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
