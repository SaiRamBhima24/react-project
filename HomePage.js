import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import SearchBar from './SearchBar';
import FileUpload from './FileUpload';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [username, setUsername] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFileUpload, setShowFileUpload] = useState(false); // State to toggle file upload
  const itemsPerPage = 2;

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    fetch('https://fakestoreapi.com/products?limit=5')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);  // Initially, show all products
      });
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle product search
  const handleSearch = (query) => {
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);  // Reset to first page on search
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Display the username before the product list */}
      {username && <h1>Welcome, {username}!</h1>}

      {/* Display the search bar in the top middle of the page */}
      <SearchBar onSearch={handleSearch} />

      <h2>Product List</h2>
      <ul>
        {currentItems.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={{ fontWeight: currentPage === index + 1 ? 'bold' : 'normal' }}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Add the Logout button and the File Upload button in the top-right corner */}
      <div style={{ position: 'absolute', top: 20, right: 20 }}>
        <Logout />
        <button
          onClick={() => setShowFileUpload(!showFileUpload)}
          style={{ marginRight: '100px', marginTop: '10px', padding: '10px 20px' }}
        >
          {showFileUpload ? 'Hide Upload' : 'Upload File'}
        </button>
      </div>

      {/* Conditionally display the FileUpload component */}
      {showFileUpload && <FileUpload />}
    </div>
  );
}

export default HomePage;
