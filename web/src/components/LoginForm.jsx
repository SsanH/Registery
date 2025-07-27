import React from 'react';
import InputField from './InputField';
import SocialButton from './SocialButton';
import Divider from './Divider';

function LoginForm({ 
  formData, 
  setFormData, 
  showPassword, 
  setShowPassword, 
  loading, 
  error, 
  handleSubmit, 
  onRegisterClick 
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
           fontSize: '1.5rem', 
           color: '#666',
           textAlign: 'center',
           fontWeight: 'normal'
         }}>
           Log in
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
             type={showPassword ? "text" : "password"}
             placeholder="Password"
             value={formData.password}
             onChange={(e) => setFormData({...formData, password: e.target.value})}
             leftIcon="lock"
             rightIcon="eye"
             onRightIconClick={() => setShowPassword(!showPassword)}
           />
           
           <div style={{
             textAlign: 'right',
             marginBottom: '20px'
           }}>
             <button
               type="button"
               style={{
                 background: 'none',
                 border: 'none',
                 color: '#3949ab',
                 cursor: 'pointer',
                 fontSize: '14px',
                 textDecoration: 'underline'
               }}
             >
               Forgot password?
             </button>
           </div>
           
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
                backgroundColor: loading ? '#b39ddb' : '#3949ab',
                color: 'white',
                border: 'none',
                borderRadius: '25px',
                fontSize: '16px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                marginBottom: '20px',
                boxShadow: loading ? 'none' : '0 2px 8px rgba(57, 73, 171, 0.3)',
                transition: 'all 0.2s ease',
                ':hover': {
                  backgroundColor: loading ? '#b39ddb' : '#303f9f',
                  boxShadow: loading ? 'none' : '0 4px 12px rgba(57, 73, 171, 0.4)',
                  transform: loading ? 'none' : 'translateY(-1px)'
                }
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#303f9f';
                  e.target.style.boxShadow = '0 4px 12px rgba(57, 73, 171, 0.4)';
                  e.target.style.transform = 'translateY(-1px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.backgroundColor = '#3949ab';
                  e.target.style.boxShadow = '0 2px 8px rgba(57, 73, 171, 0.3)';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? 'Signing In...' : 'Log in'}
            </button>
        </form>
        
        <Divider />
        
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <SocialButton type="google" onClick={() => alert('Google login clicked')} />
          <SocialButton type="facebook" onClick={() => alert('Facebook login clicked')} />
        </div>
        
        <div style={{
          textAlign: 'center',
          marginTop: '20px'
        }}>
          <span style={{ color: '#666' }}>Have no account yet?</span>
        </div>
        <button
          onClick={onRegisterClick}
          style={{
            width: '100%',
            padding: '15px',
            backgroundColor: 'white',
            color: '#3949ab',
            border: '2px solid #3949ab',
            borderRadius: '25px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default LoginForm; 