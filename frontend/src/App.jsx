import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import VirtualCards from './pages/VirtualCards';
import Loans from './pages/Loans';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
        } catch (err) {
          console.error(err);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate('/');
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="app">
      {isAuthenticated && <Navbar handleLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/activity" element={isAuthenticated ? <Activity /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/cards" element={isAuthenticated ? <VirtualCards /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/loans" element={isAuthenticated ? <Loans /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/support" element={isAuthenticated ? <Support /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
      </Routes>
      {isAuthenticated && <BottomNav />}
      <ToastContainer />
    </div>
  );
}

export default App;