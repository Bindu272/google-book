# Book Recommendation App
**Introduction**
This is a simple web application for submitting and viewing book recommendations. Users can submit recommendations by providing the title, author, and their recommendation for the book. Submitted recommendations are displayed on the Recommendations page.

**Technologies Used**
React: Frontend library for building user interfaces.
React Router: Library for routing in React applications.
Axios: Promise-based HTTP client for making API requests.
Google Books API: Used to fetch book details and search for books.
CSS: Used for styling the components.

# Usage
### Home Page: 
The home page displays a list of books. Users can search for books by typing in the search bar provided in the header. The list of books updates dynamically as the user types in the search query.

### Book Details Page:
Clicking on a book title or image on the home page navigates the user to the book details page. Here, users can view detailed information about the selected book, including its title, author, publication date, genre, description, and average rating. Users can also rate the book and leave a comment.

### Recommendations Page:
The recommendations page allows users to submit their book recommendations. Users can provide the title, author, and their recommendation for the book. Submitted recommendations are displayed on this page.

# Design Choices
### Component-Based Architecture:
The application is built using a component-based architecture to promote reusability and maintainability. Each component represents a specific piece of UI functionality, making the codebase modular and easy to understand.

### React Router: 
React Router is used for client-side routing, enabling navigation between different pages without full page reloads. This provides a seamless user experience and improves performance.

### Google Books API: 
The application fetches book details and performs book searches using the Google Books API. This API provides a vast collection of books and comprehensive book data, enhancing the user experience by providing accurate and relevant information.

### Styling: 
CSS is used for styling the components. The application follows a clean and minimalist design to ensure readability and usability. Responsive design principles are applied to make the application accessible across different devices and screen sizes.

# Additional Notes
### State Management:
State is managed using React hooks such as useState and useEffect. This approach simplifies state management and reduces boilerplate code.

### Form Handling: 
Form handling is implemented using controlled components. This ensures that form data is synced with component state, enabling easy access and manipulation of form values.

### Error Handling: 
Error handling is implemented for API requests to provide a smooth user experience. Error messages are logged to the console for debugging purposes.

### Modal Component: 
A modal component is used to display a confirmation message when a recommendation is submitted successfully. This provides feedback to the user and enhances the user experience.
