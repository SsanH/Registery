import React from 'react';
import googleIcon from '../assets/google.png';
import facebookIcon from '../assets/facebook.png';

function SocialButton({ type, onClick }) {
  const getIcon = () => {
    if (type === 'google') return googleIcon;
    if (type === 'facebook') return facebookIcon;
    return null;
  };

  const getText = () => {
    if (type === 'google') return 'Google';
    if (type === 'facebook') return 'Facebook';
    return '';
  };

  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px',
        border: '1px solid #ddd',
        borderRadius: '10px',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
        cursor: 'pointer',
        fontSize: '14px',
        marginBottom: '10px'
      }}
    >
      <img 
        src={getIcon()} 
        alt={type} 
        style={{
          width: '20px',
          height: '20px'
        }}
      />
      {getText()}
    </button>
  );
}

export default SocialButton; 