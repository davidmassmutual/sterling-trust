import { useState } from 'react';
import Footer from '../components/Footer';
import '../styles/Settings.css';

function Settings() {
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="settings">
      <h2>Settings</h2>
      <label>
        <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
        Enable Two-Factor Authentication
      </label>
      <Footer />
    </div>
  );
}

export default Settings;