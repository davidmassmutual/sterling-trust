import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import AccountSummary from '../components/AccountSummary';
import Transactions from '../components/Transactions';
import TransferPayment from '../components/TransferPayment';
import DepositOptions from '../components/DepositOptions';
import Notifications from '../components/Notifications';
import SecurityDisplay from '../components/SecurityDisplay';
import CurrencyConverter from '../components/CurrencyConverter';
import LoanBanner from '../components/LoanBanner';
import Footer from '../components/Footer';
import '../styles/Dashboard.css';

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    'Deposit Pending',
    'Transfer Successful',
    'Low Balance Warning',
  ];

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="welcome-message">
        <h2><i className="fas fa-user"></i> Welcome, {userData?.name || 'User'}</h2>
      </div>
      <AccountSummary accounts={userData?.accounts} />
      <LoanBanner />
      <DepositOptions />
      <TransferPayment />
      <Transactions transactions={userData?.transactions || [
        { date: '2025-10-10', description: 'Payroll Acme Inc.', amount: 2250, type: 'credit', status: 'Posted' },
        { date: '2025-09-10', description: 'Payroll Acme Inc.', amount: 2250, type: 'credit', status: 'Posted' },
        { date: '2025-08-10', description: 'Payroll Acme Inc.', amount: 2250, type: 'credit', status: 'Posted' },
        { date: '2025-07-10', description: 'Payroll Acme Inc.', amount: 2250, type: 'credit', status: 'Posted' },
        { date: '2025-06-10', description: 'Payroll Acme Inc.', amount: 2250, type: 'credit', status: 'Posted' },
      ]} />
      <CurrencyConverter />
      <SecurityDisplay
        lastLogin={userData?.lastLogin ? new Date(userData.lastLogin).toLocaleString() : 'N/A'}
        twoFactorEnabled={userData?.twoFactorEnabled || false}
      />
      <Footer />
    </div>
  );
}

export default Dashboard;