import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const wouldExceedLimit = (productId, quantityToAdd) => {
    const existingItem = cart.find(item => item.id === productId);
    const currentQuantity = existingItem ? existingItem.quantity : 0;
    return (currentQuantity + quantityToAdd) > 10;
  };

  const totalProductCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const addToCart = (product, quantity = 1) => {
    setError('');

    if (quantity <= 0 || quantity > 10) {
      setError('Quantity must be between 1 and 10');
      alert('Quantity must be between 1 and 10');
      return false;
    }

    if (wouldExceedLimit(product.id, quantity)) {
      const errorMsg = `You cannot add more than 10 of the same product`;
      setError(errorMsg);
      alert(errorMsg);
      return false;
    }

    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity
        };
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
    
    return true;
  };

  const updateQuantity = (productId, newQuantity) => {
    setError('');

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return true;
    }

    if (newQuantity > 10) {
      setError(`You cannot have more than 10 of the same product`);
      return false;
    }

    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: newQuantity } 
          : item
      )
    );
    
    return true;
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const clearError = () => {
    setError('');
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        updateQuantity, 
        removeFromCart, 
        clearCart,
        error,
        clearError,
        totalProductCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};