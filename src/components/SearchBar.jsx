import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = ({ changeQuery }) => {
   const handleChange = (e) => {
      const { value } = e.target;
      changeQuery(value);
   };

   return (
      <div className="form">
         <input
            type="search"
            onChange={(e) => handleChange(e)}
            placeholder="search for anime"
         />
         <button>
            <BsSearch className="search-icon" />
         </button>
      </div>
   );
};

export default SearchBar;
