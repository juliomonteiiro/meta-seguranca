import React from "react";
import "./search.css";
import Searchimg from "../../../assets/images/pesquisa.png";

export function Search({ setSearchTerm }) {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="Search-container">
      <div className="Search-bar">
        <input
          className="Search-input"
          placeholder="Buscar produtos..."
          onChange={handleInputChange}
        />
        <img src={Searchimg} alt="Search Icon" />
      </div>
    </div>
  );
}
