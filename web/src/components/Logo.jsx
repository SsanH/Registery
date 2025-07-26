import React from 'react';
import logo from '../assets/logo.png';

function Logo() {
  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '20px',
      zIndex: 10
    }}>
      <img 
        src={logo} 
        alt="Logo" 
        style={{
          width: '50px',
          height: '50px'
        }}
      />
    </div>
  );
}

export default Logo; 