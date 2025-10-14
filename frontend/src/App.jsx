// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <div>
      {isAuthenticated && <Navbar handleLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Home setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
        <Route path="/activity" element={isAuthenticated ? <Activity /> : <Navigate to="/" />} />
        <Route path="/cards" element={isAuthenticated ? <VirtualCards /> : <Navigate to="/" />} />
        <Route path="/loans" element={isAuthenticated ? <Loans /> : <Navigate to="/" />} />
        <Route path="/settings" element={isAuthenticated ? <Settings /> : <Navigate to="/" />} />
        <Route path="/support" element={isAuthenticated ? <Support /> : <Navigate to="/" />} />
      </Routes>
      {isAuthenticated && <BottomNav />}
      <ToastContainer />
    </div>
  );
}

export default App;