import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ handleLogout, userName }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Sterling Trust Bank</h1>
        <p>Strength. Security. Stability.</p>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/dashboard" onClick={toggleMenu}>Accounts</Link></li>
        <li><Link to="/activity" onClick={toggleMenu}>Transfers</Link></li>
        <li><Link to="/cards" onClick={toggleMenu}>Cards</Link></li>
        <li><Link to="/loans" onClick={toggleMenu}>Loans</Link></li>
        <li><Link to="/support" onClick={toggleMenu}>Support</Link></li>
        <li><Link to="/settings" onClick={toggleMenu}>Settings</Link></li>
        <li><button onClick={() => { handleLogout(); toggleMenu(); }}>Logout</button></li>
      </ul>
      <div className="navbar-user">
        <p>Welcome, {userName || 'User'}</p>
      </div>
    </nav>
  );
}

export default Navbar;