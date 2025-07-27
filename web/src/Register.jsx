import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthLayout from './components/AuthLayout';
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

  const fetchRandomText = async () => {
    try {
      // Try to connect to the Node.js server using computer's IP address
      const response = await fetch('http://192.168.56.1:3001/random-text');
      const data = await response.json();
      return data.message;
    } catch (error) {
      console.error('Error fetching random text:', error);
      // Fallback message if server is not accessible
      return '🎉 Welcome to our platform! We\'re excited to have you here! ✨';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://tohar-register-dbb2b2a6hea5gqe0.israelcentral-01.azurewebsites.net/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Get random text from Node.js server and show toast
        const randomText = await fetchRandomText();
        
        toast.success(randomText, {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Navigate back to login after showing toast
        setTimeout(() => {
          navigate('/login');
        }, 4000);
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
      <ToastContainer />
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