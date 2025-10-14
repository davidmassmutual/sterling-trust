import '../styles/AccountSummary.css';

function AccountSummary({ accounts }) {
  return (
    <div className="account-summary">
      <h2>Account Summary</h2>
      <div className="account-cards">
        <div className="account-card">
          <h3>Checking Account</h3>
          <p>Balance: ${accounts?.checking?.balance.toFixed(2) || 0}</p>
        </div>
        <div className="account-card">
          <h3>Savings Account</h3>
          <p>Balance: ${accounts?.savings?.balance.toFixed(2) || 0}</p>
        </div>
      </div>
    </div>
  );
}

export default AccountSummary;