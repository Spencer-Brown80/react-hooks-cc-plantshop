import React, { useState } from "react";

function Search({ updateSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  //updates the search term 
  function handleChange(e) {
    const { value } = e.target;
    setSearchTerm(value);
    updateSearch(value);
  }

  return (
    <form className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={handleChange}
      />
    </form>
  );
}

export default Search;
