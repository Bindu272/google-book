import React, { useState } from 'react';
import './Recommendation.css';
import Modal from '../../Components/Modal/Modal.tsx';
import RecommendedBooks from '../../Components/UserRecommendation/UserRecommendation.tsx';
interface Recommendation {
  title: string;
  author: string;
  recommendation: string;
}

const RecommendationsPage = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  // Function to handle title input change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Function to handle author input change
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  // Function to handle recommendation input change
  const handleRecommendationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRecommendation(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Creating a new recommendation object
    const newRecommendation: Recommendation = {
      title: title,
      author: author,
      recommendation: recommendation
    };
    console.log('New Recommendation:', newRecommendation);
    // Clearing form fields
    setTitle('');
    setAuthor('');
    setRecommendation('');
    // Adding the new recommendation to the list of recommendations
    setRecommendations([...recommendations, newRecommendation]);
    setShowModal(true);
    // Hiding modal after 3 seconds
    setTimeout(() => {
      setShowModal(false);
    }, 3000);
  };

  return (
    <div>
      <h4>Submit Your Book Recommendation</h4>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <div>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" value={title} onChange={handleTitleChange} required />
          </div>
          <div>
            <label htmlFor="author">Author:</label>
            <input type="text" id="author" value={author} onChange={handleAuthorChange} required />
          </div>
          <div>
            <label htmlFor="recommendation">Recommendation:</label>
            <textarea id="recommendation" value={recommendation} onChange={handleRecommendationChange} required></textarea>
          </div>
          <button type="submit">Submit Recommendation</button>
        </div>
      </form>
      <RecommendedBooks recommendations={recommendations} />
      <Modal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default RecommendationsPage;
