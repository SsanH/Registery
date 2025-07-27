import React from 'react';
import welcome from '../assets/welcome.png';
import Logo from './Logo';

function WelcomeBox() {
  return (
    <div style={{
      flex: 1.5,
      backgroundColor: '#3949ab',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px',
      color: 'white',
      position: 'relative'
    }}>
      <Logo />
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
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>
      <h1 style={{ margin: '0 0 10px 0', fontSize: '2rem' }}>
        Welcome aboard my friend
      </h1>
      <p style={{ 
        margin: '0', 
        fontSize: '1.1rem', 
        textAlign: 'center',
        opacity: 0.9
      }}>
        just a couple of clicks and we start
      </p>
    </div>
  );
}

export default WelcomeBox; 