import React from 'react';

interface StarRatingProps {
  value: number; 
  onChange: (newValue: number) => void; 
  size?: number; 
  color?: string; 
}

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  size = 24,
  color = '#ffd700',
}) => {
  // Generating an array of 5 stars
  const stars = Array.from({ length: 5 }, (_, index) => index + 1);
// Function to handle click on a star
  const handleClick = (newValue: number) => {
    onChange(newValue);
  };

  return (
    <div>
      {stars.map((star) => (
        <span
          key={star}
          style={{
            cursor: 'pointer',
            fontSize: size,
            color: star <= value ? color : '#ccc',
          }}
          onClick={() => handleClick(star)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default StarRating;
