import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('username');
    navigate('/');
  };

  return (
    <button onClick={handleLogout} style={logoutButtonStyle}>
      Logout
    </button>
  );
}

const logoutButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '10px 20px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Logout;
