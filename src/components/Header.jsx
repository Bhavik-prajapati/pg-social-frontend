import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';


function Header() {
  // const [islogged, setIsLogged] = useState(true); 
    const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

    useEffect(()=>{
      if(isLoggedIn==false){
        navigate("/login");
      }

    },[isLoggedIn]);


  return (
    <nav className="header">
      <div className="header-left">
        <h1 className="logo">
        <Link to="/">
        pgSocial
        </Link> 
        </h1>
      </div>

      <ul className="header-links">
        {isLoggedIn ? (
          <li className="dropdown">
            <span className="dropdown-toggle">User</span>
            <ul className="dropdown-menu">
              <li><Link to="/profile">Profile</Link></li>
              <li><button onClick={() => {
                localStorage.removeItem("token");
                setIsLoggedIn(false);
              }}>Logout</button></li>
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
