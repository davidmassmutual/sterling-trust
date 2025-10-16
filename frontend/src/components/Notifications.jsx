import '../styles/Notifications.css';

function Notifications({ notifications }) {
  return (
    <div className="notifications">
      <h2><i className="fas fa-bell"></i> Notifications</h2>
      <ul>
        {notifications.map((note, index) => (
          <li key={index}><i className="fas fa-info-circle"></i> {note}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;