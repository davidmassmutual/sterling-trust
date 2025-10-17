import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar({ handleLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: 'fas fa-home' },
    { path: '/account-summary', label: 'Account Summary', icon: 'fas fa-wallet' },
    { path: '/transfer', label: 'Transfer', icon: 'fas fa-exchange-alt' },
    { path: '/cards', label: 'Cards', icon: 'fas fa-credit-card' },
    { path: '/transactions', label: 'Transactions', icon: 'fas fa-history' },
    { path: '/notifications', label: 'Notifications', icon: 'fas fa-bell' },
    { path: '/loans', label: 'Loan', icon: 'fas fa-hand-holding-usd' },
    { path: '/support', label: 'Support', icon: 'fas fa-headset' },
    { path: '/settings', label: 'Settings', icon: 'fas fa-cog' },
  ];

  return (
    <>
      <button className="hamburger" onClick={toggleMenu}>
        <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
      <nav className={`navbar ${isMenuOpen ? 'active' : ''}`}>
        <div className="navbar-brand">
          <h1>Sterling Trust Bank</h1>
          <p>Strength. Security. Stability.</p>
          <button className="close-menu" onClick={toggleMenu}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                <i className={item.icon}></i> {item.label}
              </Link>
            </li>
          ))}
          <li>
            <button onClick={() => { handleLogout(); setIsMenuOpen(false); }}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;