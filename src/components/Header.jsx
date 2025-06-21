import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

function Header() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [search,setSearch]=useState("");


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

    useEffect(() => {
       const delayDebounce = setTimeout(() => {
      if (search.trim() !== '') {
        fetchSearchResults(search);
      } else {
        setResults([]); 
      }
    }, 200); 
    return () => clearTimeout(delayDebounce);
      }, [search]);


    const fetchSearchResults = async (query) => {
       try {
      const response=await axiosInstance.post(`/users/search?emailid=${query}`);
      console.log(response.data)
      setResults(response.data); 
    } catch (error) {
      console.error("Search error:", error);
    }

    }

  return (
    <nav className="header">
      <div className="header-left">
        <h1 className="logo">
          <Link to="/">Linkedin</Link>
        </h1>

        <input type="text" id="search" placeholder="Search..." value={search} 
          onChange={(e) => setSearch(e.target.value)}
        />

        
        {search.trim() !== '' && results.length > 0 && (
  <div className="search-area">
    {results.map((user) => (
      <div key={user.id} className="search-item">
        <img src={user?.profile_image || "/assets/dp.jpg"} alt="Profile" />
        <Link 
          to={`/profile/${user.id}`} 
          onClick={()=>setSearch('')}
        >
          {user.name}
        </Link>
      </div>
    ))}
  </div>
)}



        
      </div>

      <ul className="header-links">
        {isLoggedIn ? (
          <li className="dropdown">
            <span className="dropdown-toggle">User</span>
            <ul className="dropdown-menu">
              <li><Link to="/profile">Profile</Link></li>
              <li>
                <button onClick={() => {
                  localStorage.removeItem("token");
                  setIsLoggedIn(false);
                }}>
                  Logout
                </button>
              </li>
            </ul>
          </li>
        ) : (
          <>
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/register">Join now</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
