import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from './components/AuthLayout';
import Logo from './components/Logo';
import WelcomeBox from './components/WelcomeBox';
import RegisterForm from './components/RegisterForm';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sendWelcomeEmail = async (email, username) => {
    try {
      await fetch('http://localhost:3001/send-welcome-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username }),
      });
    } catch (err) {
      console.error('Failed to send welcome email:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful!');
        await sendWelcomeEmail(formData.email, formData.username);
        navigate('/login');
      } else {
        setError(data.detail || 'Registration failed');
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
      <RegisterForm 
        formData={formData}
        setFormData={setFormData}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        loading={loading}
        error={error}
        handleSubmit={handleSubmit}
        onLoginClick={() => navigate('/login')}
      />
    </AuthLayout>
  );
}

export default Register; 