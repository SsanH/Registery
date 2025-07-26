import React from 'react';
import welcome from '../assets/welcome.png';

function WelcomeBox() {
  return (
    <div style={{
      flex: 1,
      backgroundColor: '#3949ab',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      color: 'white'
    }}>
      <div style={{
        width: '300px',
        height: '300px',
        backgroundColor: '#5769d4',
        borderRadius: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '30px'
      }}>
        <img 
          src={welcome} 
          alt="Welcome" 
          style={{
            width: '200px',
            height: '200px'
          }}
        />
      </div>
      <h1 style={{ margin: '0 0 10px 0', fontSize: '2.5rem' }}>
        Welcome Back!
      </h1>
      <p style={{ 
        margin: '0', 
        fontSize: '1.1rem', 
        textAlign: 'center',
        opacity: 0.9
      }}>
        We're so excited to see you again!
      </p>
    </div>
  );
}

export default WelcomeBox; 