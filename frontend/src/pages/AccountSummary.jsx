// src/pages/AccountSummary.jsx
import { useEffect } from 'react';
import '../styles/AccountSummary.css';

function AccountSummary({ accounts }) {
  useEffect(() => {
    window.scrollTo(0, 0); // Temporary, will move to App.jsx
  }, []);

  const accountData = [
    { type: 'Checking Account', balance: accounts?.checking?.balance || 0, icon: 'fas fa-wallet' },
    { type: 'Savings Account', balance: accounts?.savings?.balance || 0, icon: 'fas fa-piggy-bank' },
  ];

  return (
    <div className="account-summary">
      <h2>Your Accounts</h2>
      <div className="account-grid">
        {accountData.map((account, index) => (
          <div key={index} className="account-card">
            <div className="account-icon">
              <i className={account.icon}></i>
            </div>
            <h3>{account.type}</h3>
            <p>Balance: ${account.balance.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountSummary;