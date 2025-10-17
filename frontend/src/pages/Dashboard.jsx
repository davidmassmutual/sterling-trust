import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import AccountSummary from '../pages/AccountSummary';
import DepositOptions from '../components/DepositOptions';
import TransferPayment from '../pages/TransferPayment';
import CurrencyConverter from '../components/CurrencyConverter';
import LoanBanner from '../components/LoanBanner';
import SecurityDisplay from '../components/SecurityDisplay';
import Footer from '../components/Footer';
import '../styles/Dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch user data');
        setLoading(false);
        toast.error(err.message || 'Failed to fetch user data');
      }
    };
    fetchData();
  }, []);

  const sampleNotifications = [
    { id: 1, message: 'Deposit Pending', timestamp: '2025-10-17 10:00 AM' },
    { id: 2, message: 'Transfer Successful', timestamp: '2025-10-16 3:45 PM' },
    { id: 3, message: 'Low Balance Warning', timestamp: '2025-10-15 9:20 AM' },
  ];

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="notifications-bell">
        <button onClick={toggleNotifications} className="bell-icon">
          <i className="fas fa-bell"></i>
          {sampleNotifications.length > 0 && (
            <span className="badge">{sampleNotifications.length}</span>
          )}
        </button>
        {showNotifications && (
          <div className="notifications-overlay">
            <h3>Notifications</h3>
            {sampleNotifications.slice(0, 3).map((notification) => (
              <div key={notification.id} className="notification-item">
                <p>{notification.message}</p>
                <span>{notification.timestamp}</span>
              </div>
            ))}
            <Link to="/notifications" onClick={() => setShowNotifications(false)} className="view-all">
              View Full Notifications
            </Link>
          </div>
        )}
      </div>
      <div className="welcome-section">
        <h1>Welcome, {userData?.name || 'Lillian'}</h1>
      </div>
      <AccountSummary accounts={userData?.accounts} />
      <div className="quick-actions">
        <div className="action-card">
          <DepositOptions />
        </div>
        <div className="action-card">
          <TransferPayment />
        </div>
      </div>
      <div className="secondary-features">
        <CurrencyConverter />
        <LoanBanner />
        <SecurityDisplay
          lastLogin={userData?.lastLogin ? new Date(userData.lastLogin).toLocaleString() : 'N/A'}
          twoFactorEnabled={userData?.twoFactorEnabled || false}
        />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;