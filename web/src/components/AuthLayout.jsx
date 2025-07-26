import React from 'react';

function AuthLayout({ children }) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      {children}
    </div>
  );
}

export default AuthLayout; 