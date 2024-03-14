import React, { useState } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
// Function to handle changes in the search input
  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  return (
    <div className='header'>
      <Link to='/'><span className='Logo'>Google Book</span></Link>
      <input
        placeholder='Search Book'
        value={searchTerm}
        onChange={handleChange}
      />
     
      <Link to='/recommendation'>User Recommendations</Link>
    </div>
  );
};

export default Header;
