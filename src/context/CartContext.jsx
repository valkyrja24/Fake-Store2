import React, { createContext, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState('');
  const { user, isAuthenticated } = useAuth();
  
  const getUserId = () => {
    return isAuthenticated && user ? user.id : 'guest';
  };
  
  const getCartStorageKey = () => {
    return `cart_${getUserId()}`;
  };

  useEffect(() => {
    const loadCart = () => {
      const storageKey = getCartStorageKey();
      const savedCart = localStorage.getItem(storageKey);
      
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (error) {
          console.error(`Failed to parse cart from localStorage for ${storageKey}:`, error);
          setCart([]);
        }
      } else {
        setCart([]);
      }
    };
    
    if (user !== undefined) {
      loadCart();
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    if (user !== undefined) {
      const storageKey = getCartStorageKey();
      localStorage.setItem(storageKey, JSON.stringify(cart));
    }
  }, [cart, user, isAuthenticated]);

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
      return false;
    }

    if (wouldExceedLimit(product.id, quantity)) {
      const errorMsg = `You cannot add more than 10 of the same product`;
      setError(errorMsg);
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

  const mergeGuestCart = () => {
    const guestCartKey = 'cart_guest';
    const guestCartData = localStorage.getItem(guestCartKey);
    
    if (guestCartData) {
      try {
        const guestCart = JSON.parse(guestCartData);
        
        if (guestCart.length > 0) {
          const updatedCart = [...cart];
          
          guestCart.forEach(guestItem => {
            const existingItemIndex = updatedCart.findIndex(item => item.id === guestItem.id);
            
            if (existingItemIndex !== -1) {
              const newQuantity = Math.min(updatedCart[existingItemIndex].quantity + guestItem.quantity, 10);
              updatedCart[existingItemIndex].quantity = newQuantity;
            } else {
              updatedCart.push(guestItem);
            }
          });
          
          setCart(updatedCart);
        }
        
        localStorage.removeItem(guestCartKey);
      } catch (error) {
        console.error('Failed to merge guest cart:', error);
      }
    }
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
        totalProductCount,
        mergeGuestCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};