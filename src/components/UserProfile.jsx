import React, { useRef, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import AuthDialog from './AuthDialog';

const UserProfile = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { mergeGuestCart } = useCart();
  const authDialogRef = useRef(null);
  
  const handleLoginSuccess = () => {
    if (isAuthenticated) {
      mergeGuestCart();
    }
  };
  
  useEffect(() => {
    if (isAuthenticated) {
      mergeGuestCart();
    }
  }, [isAuthenticated]);
  
  const handleLoginClick = () => {
    if (authDialogRef.current) {
      authDialogRef.current.openDialog();
    }
  };
  
  return (
    <div className="user-profile">
      {isAuthenticated ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#333' }}>
            Hi, {user.name?.firstname || user.username}
          </span>
          <button 
            onClick={logout}
            style={{
              backgroundColor: 'transparent',
              color: '#ff6b6b',
              border: '1px solid #ff6b6b',
              padding: '5px 10px',
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <>
          <button 
            onClick={handleLoginClick}
            style={{
              backgroundColor: '#646cff',
              color: 'white',
              border: 'none',
            }}
          >
            Sign In
          </button>
          <AuthDialog ref={authDialogRef} onLoginSuccess={handleLoginSuccess} />
        </>
      )}
    </div>
  );
};

export default UserProfile;