import { useState } from 'react';
import Footer from '../components/Footer';
import '../styles/Settings.css';

function Settings() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="settings">
      <h2><i className="fas fa-cog"></i> Settings</h2>
      <label>
        <i className="fas fa-user-shield"></i>
        <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
        Enable Two-Factor Authentication
      </label>
    </div>
  );
}

export default Settings;