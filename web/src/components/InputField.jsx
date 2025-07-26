import React from 'react';
import emailIcon from '../assets/email.png';
import lockIcon from '../assets/lock.png';
import eyeIcon from '../assets/eye.png';

function InputField({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  leftIcon, 
  rightIcon, 
  onRightIconClick,
  style = {}
}) {
  const getLeftIcon = () => {
    if (leftIcon === 'email') return emailIcon;
    if (leftIcon === 'lock') return lockIcon;
    return null;
  };

  const getRightIcon = () => {
    if (rightIcon === 'eye') return eyeIcon;
    return null;
  };

  return (
    <div style={{
      position: 'relative',
      marginBottom: '20px',
      ...style
    }}>
      {getLeftIcon() && (
        <img 
          src={getLeftIcon()} 
          alt="icon" 
          style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            zIndex: 2
          }}
        />
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '15px 15px 15px 45px',
          border: '1px solid #ddd',
          borderRadius: '10px',
          fontSize: '16px',
          outline: 'none',
          boxSizing: 'border-box',
          backgroundColor: 'white'
        }}
      />
      {getRightIcon() && (
        <img 
          src={getRightIcon()} 
          alt="icon" 
          style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            zIndex: 2
          }}
          onClick={onRightIconClick}
        />
      )}
    </div>
  );
}

export default InputField; 