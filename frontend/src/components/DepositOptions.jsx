import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/DepositOptions.css';

function DepositOptions() {
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const depositOptions = [
    {
      method: 'Bank Transfer',
      accountNumber: '1234567890',
      bankName: 'Sterling Trust Bank',
      routingNumber: '0987654321',
    },
    {
      method: 'Wire Transfer',
      accountNumber: '9876543210',
      bankName: 'Sterling Trust Bank',
      routingNumber: '1234567890',
    },
  ];

  const handleProceed = () => {
    if (!selectedOption || !amount) {
      toast.error('Please select an option and enter an amount');
      return;
    }
    const option = depositOptions.find((opt) => opt.method === selectedOption);
    navigate('/deposit-details', { state: { option, amount } });
  };

  return (
    <div className="deposit-options">
      <h3>Deposit Funds</h3>
      <select
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
        placeholder="Select Deposit Method"
      >
        <option value="" disabled>
          Select Deposit Method
        </option>
        {depositOptions.map((option) => (
          <option key={option.method} value={option.method}>
            {option.method}
          </option>
        ))}
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter Amount"
      />
      <button onClick={handleProceed}>Proceed</button>
    </div>
  );
}

export default DepositOptions;