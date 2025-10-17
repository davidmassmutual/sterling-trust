import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import CustomerReviews from '../components/CustomerReviews';
import Footer from '../components/Footer';
import '../styles/Home.css';
import { toast } from 'react-toastify';

function Home({ setIsAuthenticated }) {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
      const res = await axios.post(`${import.meta.env.VITE_API_URL}${endpoint}`, form);
      localStorage.setItem('token', res.data.token);
      setIsAuthenticated(true);
      navigate('/dashboard');
      toast.success(isSignup ? 'Signup successful!' : 'Login successful!');
    } catch (err) {
      toast.error(err.response.data.msg || 'Error occurred');
    }
  };

  return (
    <div className="home">
      <HeroBanner />
      <div className="auth-form">
        <h2>{isSignup ? <><i className="fas fa-user-plus"></i> Sign Up</> : <><i className="fas fa-sign-in-alt"></i> Log In</>}</h2>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          )}
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit"><i className="fas fa-arrow-right"></i> {isSignup ? 'Sign Up' : 'Log In'}</button>
        </form>
        <p onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Already have an account? Log In' : 'Need an account? Sign Up'}
        </p>
      </div>
      <CustomerReviews />
      <Footer />
    </div>
  );
}

export default Home;