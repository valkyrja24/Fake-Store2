import React from 'react';
import { formatVotes } from '../utils/formatVotes';

const Rating = ({ rate, count }) => {
  const roundedRating = Math.round(rate * 2) / 2;
  
  const stars = [];
  
  for (let i = 1; i <= Math.floor(roundedRating); i++) {
    stars.push(<span key={`star-${i}`}>★</span>);
  }
  
  if (roundedRating % 1 !== 0) {
    stars.push(<span key="half-star">½</span>);
  }
  
  for (let i = Math.ceil(roundedRating); i < 5; i++) {
    stars.push(<span key={`empty-star-${i}`}>☆</span>);
  }
  
  return (
    <div className="rating">
      {stars}
      <span className="rating-text">({formatVotes(count)})</span>
    </div>
  );
};

export default Rating;