import React from "react";
import "../style/Navbar.css";
const Navbar =(user,cartCount)=>{
    return(
        <nav className="navbar-container">
            <span className="navbar-user">
                {user ?`ُسلام ${user.name}` :" ورود/ثبت نام"}
            </span>
            <span className="navbar-title">Navbar</span>
            <span className="navbar-cart">
                سبد خرید {cartCount}
            </span>
        </nav>
    )

};
export default Navbar;