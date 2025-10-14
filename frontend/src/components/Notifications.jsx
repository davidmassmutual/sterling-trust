import '../styles/Notifications.css';

function Notifications({ notifications }) {
  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <ul>
        {notifications.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default Notifications;