import React from "react";
import "./search.css";
import Searchimg from "../../assets/images/pesquisa.png";

export function Search() {
  return (
    <div className="Search-container">
      <div className="Search-bar">
        <input className="Search-input" placeholder="Buscar produtos..."></input>
        <img src={Searchimg} alt="Search Icon" />
      </div>
    </div>
  );
}
