import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    onSearch(query); // Trigger search on every input change
  };

  return (
    <nav>
      <div className="nav-links">
        <Link to="/movies-in-theatre">Movies in Theatre</Link>
        <Link to="/coming-soon">Coming Soon</Link>
        <Link to="/top-rated-indian">Top Rated Indian</Link>
        <Link to="/top-rated-movies">Top Rated Movies</Link>
        <Link to="/favourites">Favourites</Link>
      </div>
      <div className="nav-search">
        <input
          type="text"
          placeholder="Search..."
          value={searchInput}
          onChange={handleSearchInputChange}
        />
      </div>
    </nav>
  );
};

export default Navbar;
