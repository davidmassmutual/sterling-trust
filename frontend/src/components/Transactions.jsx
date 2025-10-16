import '../styles/Transactions.css';

function Transactions({ transactions }) {
  return (
    <div className="transactions">
      <h2><i className="fas fa-history"></i> Recent Transactions</h2>
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
              <td><i className="fas fa-calendar-alt"></i> {new Date(txn.date).toLocaleDateString()}</td>
              <td>{txn.description}</td>
              <td>
                <i className={txn.type === 'credit' ? 'fas fa-arrow-up text-success' : 'fas fa-arrow-down text-error'}></i>
                {txn.type === 'credit' ? '+' : '-'}${Math.abs(txn.amount).toFixed(2)}
              </td>
              <td>{txn.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;