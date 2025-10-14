import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ handleLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Sterling Trust Bank</h1>
        <p>Strength. Security. Stability.</p>
      </div>
      <ul className="navbar-menu">
        <li><Link to="/dashboard">Accounts</Link></li>
        <li><Link to="/activity">Transfers</Link></li>
        <li><Link to="/cards">Cards</Link></li>
        <li><Link to="/loans">Loans</Link></li>
        <li><Link to="/support">Support</Link></li>
        <li><Link to="/settings">Settings</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
      <div className="navbar-user">
        <p>Welcome, Joyce A. Peck</p>
      </div>
    </nav>
  );
}

export default Navbar;