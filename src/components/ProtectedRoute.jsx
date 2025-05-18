import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import AuthDialog from './AuthDialog';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authInitialized } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const authDialogRef = useRef(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  useEffect(() => {
    if (authInitialized && !isAuthenticated) {
      setShowAuthDialog(true);
      if (authDialogRef.current) {
        authDialogRef.current.openDialog();
      }
    }
  }, [isAuthenticated, authInitialized]);
  
  const handleLoginSuccess = () => {
    setShowAuthDialog(false);
  };
  
  const handleDialogClose = () => {
    navigate('/', { state: { from: location }, replace: true });
  };
  
  if (!authInitialized) {
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return (
      <>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          padding: '20px',
          maxWidth: '500px',
          margin: '20px auto',
          textAlign: 'center'
        }}>
          <h2>Authentication Required</h2>
          <p>You need to be signed in to access this page.</p>
          <button 
            onClick={() => {
              if (authDialogRef.current) {
                authDialogRef.current.openDialog();
              }
            }}
            style={{ marginTop: '15px' }}
          >
            Sign In
          </button>
        </div>
        
        <AuthDialog 
          ref={authDialogRef} 
          onLoginSuccess={handleLoginSuccess}
          onClose={handleDialogClose}
        />
      </>
    );
  }
  
  return children;
};

export default ProtectedRoute;