import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import '../styles/Home.css';

function Home({ setIsAuthenticated }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isSignUp
        ? `${import.meta.env.VITE_API_URL}/api/auth/register`
        : `${import.meta.env.VITE_API_URL}/api/auth/login`;
      const res = await axios.post(url, formData);
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        setIsAuthenticated(true);
        navigate('/dashboard');
        toast.success(isSignUp ? 'Registration successful!' : 'Login successful!');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'An error occurred');
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <div className="home">
      <section className="hero">
        <h1>Secure Banking, Simplified</h1>
        <p>Experience seamless banking with Sterling Trust Bank.</p>
        <div className="hero-buttons">
          <button onClick={() => setIsSignUp(true)} className="auth-button signup">
            <i className="fas fa-user-plus"></i> Sign Up
          </button>
          <button onClick={() => setIsSignUp(false)} className="auth-button login">
            <i className="fas fa-sign-in-alt"></i> Login
          </button>
        </div>
      </section>
      <section className="auth-section">
        <h2>{isSignUp ? 'Join Us Today' : 'Welcome Back'}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button type="submit">
            <i className={`fas ${isSignUp ? 'fa-user-plus' : 'fa-sign-in-alt'}`}></i>
            {isSignUp ? 'Sign Up' : 'Login'}
          </button>
          <p onClick={toggleAuthMode}>
            {isSignUp ? 'Already have an account? Log In' : "Don't have an account? Sign Up"}
          </p>
        </form>
      </section>
      <section className="reviews-section">
        <h2>Customer Reviews</h2>
        <div className="reviews">
          <div className="review-card">
            <p>"Sterling Trust is reliable and user-friendly!"</p>
            <span>– Jane Doe</span>
          </div>
          <div className="review-card">
            <p>"Best banking app I've used. Highly secure."</p>
            <span>– John Smith</span>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;