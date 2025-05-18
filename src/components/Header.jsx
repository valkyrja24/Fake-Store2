import React from 'react';
import { Link } from 'react-router-dom';
import CartIcon from './CartIcon';
import UserProfile from './UserProfile';

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#fff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: '1rem',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <Link to="/" style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#333',
          textDecoration: 'none',
        }}>
          Fake Store
        </Link>
        
        <nav>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '1.5rem',
            alignItems: 'center',
          }}>
            <li>
              <Link to="/" style={{ color: '#333', textDecoration: 'none' }}>
                Home
              </Link>
            </li>
            <li>
              <UserProfile />
            </li>
            <li>
              <CartIcon />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;