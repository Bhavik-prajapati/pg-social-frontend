import { Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import ProfilePage from './pages/ProfilePage';
import Hello from './pages/Hello';

function App() {
  return (
    <div>
     <Toaster
  position="top-center"
  reverseOrder={false}
/>

      <Header/>
      <Routes>
        <Route path="/hello" element={<Hello />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
      </Routes>
    </div>
  );
}

export default App;
