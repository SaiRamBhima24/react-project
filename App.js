import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import ProductPage from './ProductPage';
import RegistrationPage from './RegistrationPage';
import FileUpload from './FileUpload';
import SearchComponent from './SearchBar';
import Pagination from './Pagination';
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/fileupload" element={<FileUpload />} />
          <Route path="/search" element={<SearchComponent />} />
          <Route path="/pagination" element={<Pagination />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
