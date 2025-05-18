import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  const { id, title, price, image, rating } = product;
  
  return (
    <div className="product-card">
      <Link to={`/product/${id}`}>
        <img src={image} alt={title} />
      </Link>
      <div className="product-card-content">
        <Link to={`/product/${id}`}>
          <h3 className="product-card-title">{title}</h3>
        </Link>
        <Rating rate={rating.rate} count={rating.count} />
        <div className="product-card-price">${price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard;