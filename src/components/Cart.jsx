import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import CartItem from './CartItem';

const Cart = () => {
  const { cart, error, clearCart } = useCart();
  
  const totalPrice = cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  if (cart.length === 0) {
    return (
      <div className="cart-wrapper">
        <div className="cart-header">
          <h1>Your Cart</h1>
        </div>
        <div className="cart-empty">
          <p>Your cart is empty.</p>
          <Link to="/">
            <button style={{ marginTop: '15px' }}>Continue Shopping</button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="cart-wrapper">
      <div className="cart-header">
        <h1>Your Cart</h1>
        <button 
          onClick={clearCart}
          style={{
            backgroundColor: 'transparent',
            color: '#ff6b6b',
            border: '1px solid #ff6b6b',
          }}
        >
          Clear Cart
        </button>
      </div>
      
      {error && <div className="error-message">{error}</div>}
      
      {cart.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      
      <div className="cart-summary">
        <div className="cart-total">
          Total: ${totalPrice.toFixed(2)}
        </div>
        
        <button style={{ marginTop: '15px' }}>
          Proceed to Checkout
        </button>
        
        <Link to="/">
          <button 
            style={{ 
              marginTop: '10px',
              backgroundColor: 'transparent',
              color: '#333',
              border: '1px solid #ccc',
            }}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;