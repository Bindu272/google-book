import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import StarRating from '../../Components/StarRating/StarRating.tsx'; // Assuming you have a component for star rating

interface BookDetails {
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    categories?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    description?: string;
  };
}

interface Review {
  rating: number;
  comment: string;
}
// Function to strip HTML tags from a string
const stripHtmlTags = (html: string) => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = html;
  return tempElement.textContent || tempElement.innerText || '';
};

const BookDetailsPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [bookDetails, setBookDetails] = useState<BookDetails | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [reviews, setReviews] = useState<Review[]>([]);

  // Effect hook to fetch book details
  useEffect(() => {
    axios
      .get<BookDetails>(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      .then((res) => {
        console.log(res.data);
        setBookDetails(res.data);
      })
      .catch((error) => {
        console.log(error, 'Error Fetching Book Details');
      });
  }, [bookId]);

// Function to handle rating change
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

   // Function to handle comment change
  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newReview: Review = {
      rating,
      comment,
    };
    setReviews([...reviews, newReview]);// Adding new review to reviews array
    // Clear the rating and comment fields after submission
    setRating(0);
    setComment('');
  };
// Function to calculate average rating
  const calculateAverageRating = (): number => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, curr) => acc + curr.rating, 0);
    return sum / reviews.length;
  };

  return (
    <div>
      {bookDetails ? (
        <div>
          <div style={{ display: 'flex' }} className="p-5">
            <span>
              <img
                src={bookDetails.volumeInfo.imageLinks?.thumbnail}
                alt="Book Cover"
                style={{ height: '20rem', width: '15rem' }}
              />
            </span>
            <span className="pt-5">
              <h3>{bookDetails.volumeInfo.title}</h3>
              <p>
                <strong>Authors:</strong>{' '}
                {bookDetails.volumeInfo.authors
                  ? bookDetails.volumeInfo.authors.join(', ')
                  : 'Unknown'}
              </p>
              <p>
                <strong>Publication Date:</strong>{' '}
                {bookDetails.volumeInfo.publishedDate || 'Unknown'}
              </p>
              <p>
                {' '}
                <strong>Genre:</strong>{' '}
                {bookDetails.volumeInfo.categories
                  ? bookDetails.volumeInfo.categories.join(', ')
                  : 'Unknown'}
              </p>
              <p><strong>Average Rating:</strong> {calculateAverageRating().toFixed(1)}</p>
            </span>
          </div>
          <p>
            <strong>Description:</strong>
          </p>
          <p>
            {bookDetails.volumeInfo.description
              ? stripHtmlTags(bookDetails.volumeInfo.description)
              : 'No description available'}
          </p>
          <div>
            <h5>Rate this book</h5>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-around'}}>
              <span>
            <StarRating
              value={rating}
              onChange={handleRatingChange}
              size={30}
              color="#ffd700"
            />
            <form onSubmit={handleSubmit}>
              <div>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder='Leave Comment'
                />
              </div>
              <button className='btn-primary btn' type="submit">Submit</button>
            </form>
            </span>
          
          <div>
            <h6>User Reviews</h6>
            {reviews.map((review, index) => (
              <div key={index}>
                <h6>Rating: {review.rating}</h6>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
          </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetailsPage;
