import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query) {
      onSearch(query);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
      />
      <button onClick={handleSearch} style={{ marginLeft: '10px', padding: '10px 20px' }}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
