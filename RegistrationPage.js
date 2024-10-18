import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from './userSlice'; // Import the action
import { useNavigate } from 'react-router-dom';

function RegistrationPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.user.users);

  const handleRegister = (e) => {
    e.preventDefault();
    const userExists = users.find((user) => user.username === username);
    if (userExists) {
      alert('Username already taken');
      return;
    }

    dispatch(registerUser({ username, password }));
    setSuccessMessage('Registration successful! You can now log in.');
    setUsername('');
    setPassword('');
    setTimeout(() => {
      navigate('/');
    }, 2000); // Redirect after 2 seconds
  };

  return (
    <div>
      <h2>Register</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleRegister}>
        <div>
          <label>Username: </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
