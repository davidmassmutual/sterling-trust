import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/DepositOptions.css';

function DepositOptions() {
  const [showDetails, setShowDetails] = useState(false);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [proofFile, setProofFile] = useState(null);
  const navigate = useNavigate();

  const depositDetails = {
    bankName: 'Sterling Trust Bank',
    accountNumber: '0123456789',
    routingNumber: '987654321',
    swiftCode: 'STBKUS33',
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !proofFile) {
      toast.error('Please enter amount and upload proof of payment');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('method', paymentMethod);
      formData.append('proof', proofFile);
      formData.append('status', 'Pending');
      formData.append('timestamp', new Date().toISOString());

      const token = localStorage.getItem('token');
      await axios.post(`${import.meta.env.VITE_API_URL}/api/transactions`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Deposit submitted successfully!');
      navigate('/transactions');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit deposit');
    }
  };

  return (
    <div className="deposit-options">
      <h3 onClick={() => setShowDetails(!showDetails)} className="deposit-toggle">
        Deposit Options <i className={`fas ${showDetails ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </h3>
      {showDetails && (
        <div className="deposit-details">
          <h4>Bank Transfer Details</h4>
          <p>
            Bank Name: {depositDetails.bankName}{' '}
            <button onClick={() => copyToClipboard(depositDetails.bankName)} className="copy-btn">
              <i className="fas fa-copy"></i>
            </button>
          </p>
          <p>
            Account Number: {depositDetails.accountNumber}{' '}
            <button onClick={() => copyToClipboard(depositDetails.accountNumber)} className="copy-btn">
              <i className="fas fa-copy"></i>
            </button>
          </p>
          <p>
            Routing Number: {depositDetails.routingNumber}{' '}
            <button onClick={() => copyToClipboard(depositDetails.routingNumber)} className="copy-btn">
              <i className="fas fa-copy"></i>
            </button>
          </p>
          <p>
            SWIFT Code: {depositDetails.swiftCode}{' '}
            <button onClick={() => copyToClipboard(depositDetails.swiftCode)} className="copy-btn">
              <i className="fas fa-copy"></i>
            </button>
          </p>
          <form onSubmit={handleSubmit} className="deposit-form">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Wire Transfer">Wire Transfer</option>
              <option value="Mobile Payment">Mobile Payment</option>
            </select>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setProofFile(e.target.files[0])}
              required
            />
            <button type="submit" className="proceed-btn">
              Proceed to Payment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default DepositOptions;