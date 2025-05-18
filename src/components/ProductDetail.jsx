import React, { useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Rating from './Rating';
import useCart from '../hooks/useCart';
import useAuth from '../hooks/useAuth';
import AuthDialog from './AuthDialog';

const ProductDetail = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useFetch(`https://fakestoreapi.com/products/${id}`);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, error: cartError, clearError } = useCart();
  const { isAuthenticated } = useAuth();
  const authDialogRef = useRef(null);
  
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      if (authDialogRef.current) {
        authDialogRef.current.openDialog();
      }
      return;
    }
    
    if (product) {
      const success = addToCart(product, quantity);
      if (success) {
        setQuantity(1);
      }
    }
  };
  
  const handleAuthSuccess = () => {
    if (product) {
      addToCart(product, quantity);
      setQuantity(1);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < 10) {
      setQuantity(q => q + 1);
      clearError();
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
      clearError();
    }
  };
  
  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error loading product: {error}</div>;
  if (!product) return <div>Product not found.</div>;
  
  return (
    <div className="product-detail">
      <img 
        src={product.image} 
        alt={product.title} 
        className="product-detail-image" 
      />
      
      <div className="product-detail-info">
        <h1 className="product-detail-title">{product.title}</h1>
        
        <div className="product-detail-price">${product.price.toFixed(2)}</div>
        
        <Rating 
          rate={product.rating.rate} 
          count={product.rating.count} 
        />
        
        <p className="product-detail-description">{product.description}</p>
        
        <div className="product-detail-category">
          <strong>Category:</strong>{" "}
          <Link to={`/category/${product.category}`}>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Link>
        </div>
        
        <div className="quantity-selector">
          <button onClick={decrementQuantity} disabled={quantity === 1}>-</button>
          <span>{quantity}</span>
          <button onClick={incrementQuantity} disabled={quantity === 10}>+</button>
        </div>
        
        {cartError && <div className="error-message">{cartError}</div>}
        
        <button onClick={handleAddToCart} style={{ maxWidth: '200px', marginTop: '15px' }}>
          Add to Cart
        </button>
      </div>
      
      <AuthDialog ref={authDialogRef} onLoginSuccess={handleAuthSuccess} />
    </div>
  );
};

export default ProductDetail;