import React, { useState } from 'react';
import axios from 'axios';
import './AdminLogin.css';
import { useNavigate, Link } from 'react-router-dom'; // ✅ Added Link

const AdminLogin = ({ onSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await axios.post('http://44.252.74.18/api/admin/login', {
        email,
        password,
      });

      const userData = response.data;
      if (userData.role !== 'admin') {
        setErrorMsg('Invalid email or password');
        setLoading(false);
        return;
      }

      localStorage.setItem('vinsysAdmin', JSON.stringify(userData));
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMsg('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <button className="switch-button" onClick={onSwitch}>
        Client Login
      </button>

      <div className="login-left">
        <img
          src="https://niitfoundation.org/wp-content/uploads/2021/06/Conducting-Deeply-Engaging-Online-Sessions.png"
          alt="Training Illustration"
          className="login-illustration"
        />
      </div>

      <div className="login-right">
        <div className="login-card">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="VINSYS"
            className="login-logo"
          />
          <h2>VINSYS Enquiry Manager</h2>
          <p>Please login to manage training enquiries.</p>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {errorMsg && <p style={{ color: 'red', marginTop: '10px' }}>{errorMsg}</p>}

          <div className="login-links">
            <a href="#">Forgot password?</a>
          </div>

          {/* ✅ Register link */}
          <div className="register-link">
            <p>
              Don’t have an account? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
