import React from "react";
import "../style/Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar({ cartCount, user, onLogin, onLogout, searchValue, onSearchChange }) {
  return (
    <nav className="navbar-container">

      
      <div className="navbar-right">
        <Link to="/" className="navbar-logo">market</Link>
      </div>

      
      <div className="navbar-middle">
        <input
          className="navbar-search"
          type="text"
          placeholder="جستجو در محصولات..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      
      <div className="navbar-left">
        {user ? (
          <>
            <span className="navbar-user">سلام {user.name}</span>
            <button className="navbar-logout-btn" onClick={onLogout}>خروج</button>
          </>
        ) : (
          <Link to="/login" className="navbar-login-btn">ورود | ثبت‌نام</Link>
        )}
        <Link to="/cart" className="navbar-cart">
          🛒 <span>{cartCount}</span>
        </Link>
      </div>

    </nav>
  );
}
