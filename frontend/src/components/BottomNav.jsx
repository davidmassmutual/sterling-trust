import { Link } from 'react-router-dom';
import '../styles/BottomNav.css';

function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link to="/dashboard">Dashboard 🏠</Link>
      <Link to="/activity">Stats 📊</Link>
      <Link to="/cards">Cards 💳</Link>
      <Link to="/settings">Profile 👤</Link>
    </nav>
  );
}

export default BottomNav;