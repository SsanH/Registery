import React from 'react';

function AuthLayout({ children }) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: 'rgb(87, 105, 212)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        display: 'flex',
        width: '90%',
        maxWidth: '1000px',
        minHeight: '600px',
        backgroundColor: 'white',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}>
        {children}
      </div>
    </div>
  );
}

export default AuthLayout; 