import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Transactions.css';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    <div className="transactions main-content">
      <h2>Transaction History</h2>
      <div className="transaction-list">
        {transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          transactions.map((transaction) => (
            <div key={transaction._id} className="transaction-card">
              <p>Amount: ${transaction.amount}</p>
              <p>Method: {transaction.method}</p>
              <p>Status: <span className={transaction.status.toLowerCase()}>{transaction.status}</span></p>
              <p>Date: {new Date(transaction.timestamp).toLocaleString()}</p>
              {transaction.proof && (
                <p>Proof: <a href={transaction.proof} target="_blank" rel="noopener noreferrer">View</a></p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Transactions;