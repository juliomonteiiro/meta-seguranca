import React from "react";
import './Header.css';
import Logo from "../../../assets/images/metaseguranca.png";
import { Search } from "../Search/Search";
import { User } from "../../../components/user/user";
import { Category } from "../Category/Category";

export function Header({ setSelectedCategory, setSearchTerm }) {
    return (
        <div className="Header-Container">
            <img src={Logo} alt="Logo" />
            <Search setSearchTerm={setSearchTerm} />
            <Category setSelectedCategory={setSelectedCategory} />
            <User />
        </div>
    );
}