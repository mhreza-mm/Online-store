import React from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";
import FilterBar from "./FilterBar";

export default function Navbar({
                                   cartCount,
                                   user,
                                   onLogout,
                                   searchValue,
                                   onSearchChange,
                                   products,
                                   onFilter
                               }) {
    return (
        <nav className="navbar-container">

            <div className="navbar-right">
                <Link to="/" className="navbar-logo">market</Link>
            </div>


            <div className="navbar-middle">
                <div className="navbar-search-container">
                    <input
                        className="navbar-search"
                        type="text"
                        placeholder="جستجو در محصولات..."
                        value={searchValue}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                    <FilterBar products={products} onFilter={onFilter} />
                </div>
            </div>


            <div className="navbar-left">
                <Link to="/cart" className="navbar-cart">
                    <span>{cartCount}</span>
                    🛒
                </Link>

                {user ? (
                    <>
                        <span className="navbar-user">سلام {user.name}</span>
                        <button className="navbar-btn logout" onClick={onLogout}>
                            خروج
                        </button>
                    </>
                ) : (
                    <Link to="/login" className="navbar-btn login">
                        ورود | ثبت‌نام
                    </Link>
                )}
            </div>
        </nav>
    );
}
