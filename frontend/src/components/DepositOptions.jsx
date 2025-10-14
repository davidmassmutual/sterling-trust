import { useState } from 'react';
import '../styles/DepositOptions.css';

function DepositOptions() {
  const [method, setMethod] = useState('paypal');
  const [checkImage, setCheckImage] = useState(null);

  const handleFileChange = (e) => {
    setCheckImage(e.target.files[0]);
  };

  return (
    <div className="deposit-options">
      <h2>Deposit Options</h2>
      <select onChange={(e) => setMethod(e.target.value)}>
        <option value="paypal">PayPal</option>
        <option value="bitcoin">Bitcoin</option>
        <option value="cashapp">CashApp</option>
        <option value="venmo">Venmo</option>
        <option value="check">Mobile Check Deposit</option>
        <option value="branch">Bank Branch</option>
        <option value="wire">Wire/ACH</option>
      </select>
      {method === 'bitcoin' && (
        <div>
          <p>BTC Address: bc1qexampleaddress</p>
        </div>
      )}
      {method === 'check' && (
        <div>
          <input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      )}
      {['paypal', 'cashapp', 'venmo'].includes(method) && (
        <div>
          <input type="text" placeholder="Enter amount" />
          <button>Proceed to Payment</button>
        </div>
      )}
    </div>
  );
}

export default DepositOptions;