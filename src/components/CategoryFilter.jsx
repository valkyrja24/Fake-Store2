import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const CategoryFilter = () => {
  const { categoryName } = useParams();
  const { data: categories, loading, error } = useFetch('https://fakestoreapi.com/products/categories');
  
  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error loading categories: {error}</div>;
  if (!categories) return null;
  
  return (
    <div className="categories">
      <Link 
        to="/" 
        className={`category-link ${!categoryName ? 'active' : ''}`}
      >
        All Products
      </Link>
      
      {categories.map(category => (
        <Link
          key={category}
          to={`/category/${category}`}
          className={`category-link ${categoryName === category ? 'active' : ''}`}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
      ))}
    </div>
  );
};

export default CategoryFilter;