import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ProductCard from './ProductCard';
import CategoryFilter from './CategoryFilter';

const ProductList = () => {
  const { categoryName } = useParams();
  
  const url = categoryName 
    ? `https://fakestoreapi.com/products/category/${categoryName}`
    : 'https://fakestoreapi.com/products';
  
  const { data: products, loading, error } = useFetch(url);
  
  return (
    <div>
      <h1>{categoryName 
        ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
        : 'All Products'
      }</h1>
      
      <CategoryFilter />
      
      {loading && <div>Loading products...</div>}
      
      {error && <div>Error: {error}</div>}
      
      {!loading && !error && products && products.length === 0 && (
        <div>No products found in this category.</div>
      )}
      
      {!loading && !error && products && products.length > 0 && (
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;