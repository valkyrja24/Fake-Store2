import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    
    // Mark auth as initialized after checking localStorage
    setAuthInitialized(true);
  }, []);

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }
      
      const userResponse = await fetch('https://fakestoreapi.com/users');
      const users = await userResponse.json();
      const currentUser = users.find(user => user.username === username);
      
      if (!currentUser) {
        throw new Error('User information not found');
      }
      
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(currentUser));
      
      setToken(data.token);
      setUser(currentUser);
      setIsLoading(false);
      
      return true;
    } catch (err) {
      setError(err.message || 'Failed to login. Please check your credentials.');
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        error,
        isAuthenticated,
        authInitialized
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};