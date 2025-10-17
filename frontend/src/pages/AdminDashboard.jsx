// frontend/src/pages/AdminDashboard.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!token || !isAdmin) {
      toast.error('Please log in as admin');
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <div className="admin-dashboard">
      <h2><i className="fas fa-tachometer-alt"></i> Admin Dashboard</h2>
      <div className="dashboard-card">
        <p>Welcome, Admin! Manage users, transactions, and settings here.</p>
        {/* Add admin features like user management, transaction overview, etc. */}
      </div>
    </div>
  );
}

export default AdminDashboard;