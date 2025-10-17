// src/pages/Admin.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/Admin.css';

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No authentication token found');
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err.response || err);
        if (err.response?.status === 403) {
          toast.error('Access denied. Admin only.');
          navigate('/dashboard');
        } else {
          setError(err.message || 'Failed to fetch users');
          setLoading(false);
          toast.error(err.message || 'Failed to fetch users');
        }
      }
    };
    fetchUsers();
  }, [navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <div className="user-list">
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Admin;