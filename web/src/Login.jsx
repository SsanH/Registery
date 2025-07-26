import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import Logo from './components/Logo';
import WelcomeBox from './components/WelcomeBox';
import LoginForm from './components/LoginForm';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login successful!');
        navigate('/register');
      } else {
        setError(data.detail || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <Logo />
      <WelcomeBox />
      <LoginForm 
        formData={formData}
        setFormData={setFormData}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
        onRegisterClick={() => navigate('/register')}
      />
    </AuthLayout>
  );
}

export default Login; 