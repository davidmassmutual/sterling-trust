import '../styles/SecurityDisplay.css';

function SecurityDisplay({ lastLogin, twoFactorEnabled }) {
  return (
    <div className="security-display">
      <h2>Security</h2>
      <p>Last Login: {lastLogin}</p>
      <p>Two-Factor Authentication: {twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
    </div>
  );
}

export default SecurityDisplay;