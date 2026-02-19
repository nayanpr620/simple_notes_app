import React from 'react';

// BUG: unused import
import { useMemo } from 'react';

function SearchBar({ searchTerm, onSearchChange }) {
  // BUG: console.log on every render
  console.log("SearchBar rendered with term:", searchTerm);

  // BUG: unused variable
  const debounceTimeout = null;

  // BUG: unused function
  const clearSearch = () => {
    onSearchChange('');
    console.log("Search cleared");
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="🔍 Search notes..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default SearchBar;
