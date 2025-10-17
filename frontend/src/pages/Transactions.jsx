// src/pages/Transactions.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Transactions.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err.response || err);
        setError(err.message || 'Failed to fetch transactions');
        setLoading(false);
        toast.error(err.message || 'Failed to fetch transactions');
      }
    };
    fetchTransactions();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="transactions">
      <h2>Transaction History</h2>
      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction.id} className="transaction-card">
              <p>Type: {transaction.type}</p>
              <p>Amount: ${transaction.amount?.toFixed(2)}</p>
              <p>Date: {new Date(transaction.date).toLocaleString()}</p>
              <p>Status: <span className={transaction.status.toLowerCase()}>{transaction.status}</span></p>
              {transaction.receipt && (
                <Link to={transaction.receipt} target="_blank">View Receipt</Link>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Transactions;