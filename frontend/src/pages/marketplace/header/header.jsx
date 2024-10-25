import React from "react";
import './header.css';
import Logo from "../../../assets/images/metaseguranca.png";
import { Search } from "../search/search";
import { User } from "../../../components/user/user";
import { Category } from "../category/category";

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