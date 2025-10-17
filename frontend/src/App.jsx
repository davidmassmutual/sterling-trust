import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import VirtualCards from './pages/VirtualCards';
import Loans from './pages/Loans';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.css';
import AccountSummary from './pages/AccountSummary';
import TransferPayment from './pages/TransferPayment';
import Transactions from './pages/Transactions';
import NotificationsPage from './pages/NotificationsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
          setUserName(res.data.name);
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
    setUserName('');
    navigate('/');
  };

  return (
    <div className="app">
      {isAuthenticated && <Navbar handleLogout={handleLogout} />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/account-summary" element={isAuthenticated ? <AccountSummary/> : <Home setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/transfer" element={isAuthenticated ? <TransferPayment/> : <Home setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/cards" element={isAuthenticated ? <VirtualCards /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/transactions" element={isAuthenticated ? <Transactions/> : <Home setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/loans" element={isAuthenticated ? <Loans /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/support" element={isAuthenticated ? <Support /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/settings" element={isAuthenticated ? <Settings /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
             <Route path="/notifications" element={isAuthenticated ? <NotificationsPage/> : <Home setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;