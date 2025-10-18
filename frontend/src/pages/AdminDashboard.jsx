// frontend/src/pages/AdminDashboard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [passwordForm, setPasswordForm] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!token || !isAdmin) {
          toast.error('Please log in as admin');
          navigate('/admin');
          return;
        }

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch users error:', err.response?.status, err.response?.data);
        if (err.response?.status === 401 || err.response?.status === 403) {
          toast.error('Access denied, please log in as admin');
          localStorage.removeItem('token');
          localStorage.removeItem('isAdmin');
          navigate('/admin');
        } else {
          toast.error(err.response?.data?.message || 'Failed to load users');
        }
        setLoading(false);
      }
    };
    fetchUsers();
  }, [navigate]);

  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setPasswordLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/user/password`,
        { password: passwordForm.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Password updated successfully');
      setPasswordForm({ newPassword: '', confirmPassword: '' });
    } catch (err) {
      console.error('Password update error:', err.response?.status, err.response?.data);
      toast.error(err.response?.data?.message || 'Failed to update password');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2><i className="fas fa-tachometer-alt"></i> Admin Dashboard</h2>
      <div className="dashboard-card">
        <h3>Change Password</h3>
        <form className="password-form" onSubmit={handlePasswordSubmit}>
          <label>
            New Password
            <input
              type="password"
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handlePasswordChange}
              required
              minLength={6}
            />
          </label>
          <label>
            Confirm Password
            <input
              type="password"
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordChange}
              required
              minLength={6}
            />
          </label>
          <button type="submit" disabled={passwordLoading}>
            <i className="fas fa-lock"></i> {passwordLoading ? 'Updating...' : 'Change Password'}
          </button>
        </form>

        <h3>Registered Users</h3>
        {loading ? (
          <div className="loading">Loading users...</div>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="users-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Address</th>
                  <th>Admin</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone || 'N/A'}</td>
                    <td>{user.address || 'N/A'}</td>
                    <td>{user.isAdmin ? 'Yes' : 'No'}</td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;