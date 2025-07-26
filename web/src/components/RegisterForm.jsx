import React from 'react';
import InputField from './InputField';
import SocialButton from './SocialButton';
import Divider from './Divider';

function RegisterForm({ 
  formData, 
  setFormData, 
  showPassword, 
  setShowPassword, 
  showConfirmPassword, 
  setShowConfirmPassword, 
  loading, 
  error, 
  handleSubmit, 
  onLoginClick 
}) {
  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '40px',
      backgroundColor: 'white'
    }}>
      <div style={{ maxWidth: '400px', width: '100%', margin: '0 auto' }}>
        <h1 style={{ 
          margin: '0 0 30px 0', 
          fontSize: '2rem', 
          color: '#333',
          textAlign: 'center'
        }}>
          Create Account
        </h1>
        
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            leftIcon="email"
          />
          
          <InputField
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            leftIcon="email"
          />
          
          <InputField
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            leftIcon="lock"
            rightIcon="eye"
            onRightIconClick={() => setShowPassword(!showPassword)}
          />
          
          <InputField
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            leftIcon="lock"
            rightIcon="eye"
            onRightIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          
          {error && (
            <div style={{
              color: 'red',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              backgroundColor: '#3949ab',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              marginBottom: '20px'
            }}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <Divider />
        
        <SocialButton type="google" onClick={() => alert('Google login clicked')} />
        <SocialButton type="facebook" onClick={() => alert('Facebook login clicked')} />
        
        <div style={{
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <span style={{ color: '#666' }}>Already have an account? </span>
          <button
            onClick={onLoginClick}
            style={{
              background: 'none',
              border: 'none',
              color: '#3949ab',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'underline'
            }}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm; 