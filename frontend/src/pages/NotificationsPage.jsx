import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import '../styles/Notifications.css';

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Simulate fetching notifications; replace with actual API call
        const sampleNotifications = [
          { id: 1, message: 'Deposit Pending', timestamp: '2025-10-17 10:00 AM', status: 'Unread' },
          { id: 2, message: 'Transfer Successful', timestamp: '2025-10-16 3:45 PM', status: 'Read' },
          { id: 3, message: 'Low Balance Warning', timestamp: '2025-10-15 9:20 AM', status: 'Unread' },
          { id: 4, message: 'Loan Application Approved', timestamp: '2025-10-14 1:30 PM', status: 'Read' },
        ];
        setNotifications(sampleNotifications);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch notifications');
        setLoading(false);
        toast.error(err.message || 'Failed to fetch notifications');
      }
    };
    fetchNotifications();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="notifications-page">
      <h2><i className="fas fa-bell"></i> Notifications</h2>
      <div className="notifications-list">
        {notifications.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Message</th>
                <th>Timestamp</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map((notification) => (
                <tr key={notification.id}>
                  <td>{notification.message}</td>
                  <td>{notification.timestamp}</td>
                  <td className={notification.status.toLowerCase()}>
                    {notification.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No notifications available.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default NotificationsPage;