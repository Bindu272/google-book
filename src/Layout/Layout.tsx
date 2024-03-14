import React, { useState } from 'react';
import Header from '../Components/Header/Header.tsx';
import AllBook from '../Screens/AllBook/AllBook.tsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookDetail from '../Screens/BookDetail/BookDetail.tsx';
import './Layout.css';
import RecommendationsPage from '../Screens/RecommendationsPage/RecommendationsPage.tsx';

const Layout = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle search query change
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Router>
       {/* Header component with handleSearch prop */}
      <Header handleSearch={handleSearch} />
      <div className='layout'>
        <Routes>
          <Route
            path='/'
            element={<AllBook searchQuery={searchQuery} />}// Passing searchQuery state as prop
          />
          
          <Route path='/book/:bookId' element={<BookDetail />} />
          <Route path='/recommendation' element={<RecommendationsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Layout;
