import { Link } from 'react-router-dom';
import '../styles/BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/dashboard"><i className="fas fa-home"></i> Dashboard</Link>
      <Link to="/activity"><i className="fas fa-chart-line"></i> Stats</Link>
      <Link to="/cards"><i className="fas fa-credit-card"></i> Cards</Link>
      <Link to="/settings"><i className="fas fa-user"></i> Profile</Link>
    </nav>
  );
}

export default BottomNav;