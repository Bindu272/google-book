import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
  };
}

const AllBook: React.FC<{ searchQuery: string}> = ({ searchQuery }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [recommendedBooks,setRecommendedBooks]=useState<string[]>([])
  // Effect hook to fetch books based on search query
  useEffect(() => {
    let timer: NodeJS.Timeout;

    // Function to fetch books from API
    const fetchBooks = async (query: string) => {
      try {
        setLoading(true);

        if (!query) {
          setBooks([]); // Clearing books array if search query is empty
          setLoading(false);
          return;
        }
        // Fetching books data from Google Books API
        const searchResponse = await axios.get(
         
          `https://www.googleapis.com/books/v1/volumes?q=${query}`
          
        );
        console.log('response',searchResponse.data.items)
        const searchedBooks = searchResponse.data.items || [];

        setBooks(searchedBooks);
        setLoading(false);
      } catch (error) {
        console.log(error, 'Error Fetching Data');
        setLoading(false);
      }
    };
   // Function to debounce search calls
    const debounceSearch = (input: string) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fetchBooks(input);
      }, 1000);
    };

    if (searchQuery) {
      debounceSearch(searchQuery);// Calling debounceSearch if searchQuery is provided
    } else {
      fetchBooks('Javascript');// Default search query if no searchQuery is provided
    }
    // Cleanup function to clear timeout
    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);
const handleRecommend=(bookId:string)=>{
setRecommendedBooks(prevRecommended=>[...prevRecommended,bookId])
alert(`Book id: ${bookId} added to recommended list` )
}

  return (
    <div>
      <h1 className='pb-3'>Choose Your Reading</h1>
      {/* <select>
        <option>Select Genre</option>
      </select> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='container'>
          <div className='row'>
            {books.map((book) => (
              <div className='col-md-3 mb-4' key={book.id}>
                <div className='card' style={{ width: '15rem', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)' }}>
                  <img
                    src={
                      book.volumeInfo.imageLinks?.thumbnail || '' // Using optional chaining to access thumbnail
                    }
                    className='card-img-top'
                    style={{ height: '12rem' }}
                    alt={book.volumeInfo.title}
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>
                      {book.volumeInfo.title}
                    </h5>
                    <p className='card-text'>
                      {book.volumeInfo.authors
                        ? book.volumeInfo.authors.join(', ')
                        : 'Unknown'}
                    </p>
                  
                    <Link
                      to={`/book/${book.id}`}
                      className='btn btn-primary'
                    >
                      View Detail
                    </Link>
                  <button onClick={()=>handleRecommend(book.id)} className='btn btn-danger'>{recommendedBooks.includes(book.id)?'Recommended':'Recommend'}</button>
                    </div>
                    
                  </div>
                  
                </div>
        
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllBook;
