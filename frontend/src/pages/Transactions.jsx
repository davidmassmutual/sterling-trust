import '../styles/Transactions.css';

function Transactions({ transactions }) {
  return (
    <div className="transactions">
      <h2>Recent Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn, index) => (
            <tr key={index}>
              <td>{new Date(txn.date).toLocaleDateString()}</td>
              <td>{txn.description}</td>
              <td>{txn.type === 'credit' ? '+' : '-'}${Math.abs(txn.amount).toFixed(2)}</td>
              <td>{txn.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;