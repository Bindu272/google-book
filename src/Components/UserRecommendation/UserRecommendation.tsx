import React from 'react';
import './UserRecommendation.css' 

const RecommendedBooks = ({ recommendations }) => {
  return (
    <div className='pt-5'>
      <h4>Submitted Recommendations:</h4>
      <ul  className='recommended-books '>
        {recommendations.map((rec, index) => (
          <li key={index} className='rec-book-list'>
            <strong>Title:</strong> {rec.title}<br />
            <strong>Author:</strong> {rec.author}<br />
            <strong>Recommendation:</strong> {rec.recommendation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedBooks;
