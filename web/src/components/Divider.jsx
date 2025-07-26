import React from 'react';

function Divider() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      margin: '20px 0'
    }}>
      <div style={{
        flex: 1,
        height: '1px',
        backgroundColor: '#ddd'
      }} />
      <span style={{
        padding: '0 15px',
        color: '#666',
        fontSize: '14px'
      }}>
        Or
      </span>
      <div style={{
        flex: 1,
        height: '1px',
        backgroundColor: '#ddd'
      }} />
    </div>
  );
}

export default Divider; 