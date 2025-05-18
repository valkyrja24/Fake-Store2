import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import useAuth from '../hooks/useAuth';

const AuthDialog = forwardRef(({ onLoginSuccess }, ref) => {
  const dialogRef = useRef(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { login, error, isLoading } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!username || !password) {
      setErrorMessage('Please enter both username and password');
      return;
    }
    
    const success = await login(username, password);
    if (success) {
      dialogRef.current.close();
      setUsername('');
      setPassword('');
      if (onLoginSuccess) onLoginSuccess();
    }
  };

  const openDialog = () => {
    setErrorMessage('');
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setUsername('');
    setPassword('');
    setErrorMessage('');
  };

  useImperativeHandle(ref, () => ({
    openDialog
  }));

  return (
    <dialog 
      ref={dialogRef} 
      className="auth-dialog"
      style={{
        border: 'none',
        borderRadius: '8px',
        padding: '30px',
        maxWidth: '400px',
        width: '100%',
        backgroundColor: 'white',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) closeDialog();
      }}
    >
      <div style={{ width: '100%' }}>
        <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
          </div>
          
          {(errorMessage || error) && (
            <div style={{ color: '#ff6b6b', marginBottom: '15px' }}>
              {errorMessage || error}
            </div>
          )}
          
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              type="button"
              onClick={closeDialog}
              style={{
                backgroundColor: 'transparent',
                color: '#333',
                border: '1px solid #ccc',
              }}
            >
              Cancel
            </button>
            
            <button
              type="submit"
              disabled={isLoading}
              style={{
                backgroundColor: '#646cff',
                color: 'white',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer',
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>
        
        <div style={{ marginTop: '20px', fontSize: '0.9rem', textAlign: 'center', color: '#666' }}>
          <p>Demo credentials:</p>
          <p>Username: johnd | Password: m38rmF$</p>
        </div>
      </div>
    </dialog>
  );
});

export default AuthDialog;