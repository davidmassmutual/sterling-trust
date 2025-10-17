import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AccountSummary from './pages/AccountSummary';
import Transactions from './pages/Transactions';
import Loans from './pages/Loans';
import Support from './pages/Support';
import Settings from './pages/Settings';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TransferPayment from './pages/TransferPayment';
import VirtualCards from './pages/VirtualCards';
import NotificationsPage from './pages/NotificationsPage';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import DepositDetails from './pages/DepositDetails';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
        } catch (err) {
          console.error('Token validation failed:', err);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    validateToken();
  }, []);

  return (
    <Router>
      <ErrorBoundary>
        <div className="app">
          <Navbar handleLogout={handleLogout} isAuthenticated={isAuthenticated} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home setIsAuthenticated={setIsAuthenticated} />} />
              <Route
                path="/dashboard"
                element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
              />
              <Route
                path="/account-summary"
                element={isAuthenticated ? <AccountSummary /> : <Navigate to="/" />}
              />
              <Route
                path="/transfer"
                element={isAuthenticated ? <TransferPayment /> : <Navigate to="/" />}
              />
              <Route
                path="/cards"
                element={isAuthenticated ? <VirtualCards /> : <Navigate to="/" />}
              />
              <Route
                path="/transactions"
                element={isAuthenticated ? <Transactions /> : <Navigate to="/" />}
              />
              <Route
                path="/notifications"
                element={isAuthenticated ? <NotificationsPage /> : <Navigate to="/" />}
              />
              <Route
                path="/loans"
                element={isAuthenticated ? <Loans /> : <Navigate to="/" />}
              />
              <Route
                path="/support"
                element={isAuthenticated ? <Support /> : <Navigate to="/" />}
              />
              <Route
                path="/settings"
                element={isAuthenticated ? <Settings /> : <Navigate to="/" />}
              />
              <Route
                path="/deposit-details"
                element={isAuthenticated ? <DepositDetails /> : <Navigate to="/" />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        <Footer/>
          </div>
          <ToastContainer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;