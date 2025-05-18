import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart, clearError } = useCart();
  
  const handleQuantityChange = (newQuantity) => {
    clearError();
    if (newQuantity === 0) {
      removeFromCart(item.id);
      return;
    }
    updateQuantity(item.id, newQuantity);
  };
  
  return (
    <div className="cart-item">
      <img 
        src={item.image} 
        alt={item.title} 
        className="cart-item-image"
      />
      
      <div className="cart-item-content">
        <h3 className="cart-item-title">
          <Link to={`/product/${item.id}`}>{item.title}</Link>
        </h3>
        
        <div className="cart-item-price">
          ${(item.price * item.quantity).toFixed(2)}
          {item.quantity > 1 && (
            <span style={{ fontSize: '0.8rem', color: '#666', marginLeft: '5px' }}>
              (${item.price.toFixed(2)} each)
            </span>
          )}
        </div>
        
        <div className="cart-item-actions">
          <div className="quantity-selector">
            <button onClick={() => handleQuantityChange(item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button 
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={item.quantity >= 10}
            >+</button>
          </div>
          
          <button 
            onClick={() => removeFromCart(item.id)}
            style={{
              backgroundColor: 'transparent',
              color: '#ff6b6b',
              border: '1px solid #ff6b6b',
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;