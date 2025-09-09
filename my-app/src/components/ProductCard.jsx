import React from "react";
import "../style/ProguctCard.css";

export default function ProductCard({image, title, price, inCartQuantity, onAddToCart, onIncrease, onDecrease}) {
    if (!image) return null;

    return (
        <div className="product-card">
            <img src={image} alt={title} />
            <h3 className="product-title">{title}</h3>
            <p className="product-price">${price}</p>

            {inCartQuantity > 0 ? (
                <div className="quantity-controls">
                    <button onClick={onDecrease}>-</button>
                    <span>{inCartQuantity}</span>
                    <button onClick={onIncrease}>+</button>
                </div>
            ) : (
                <button className="product-card-add-btn" onClick={onAddToCart}>
                    افزودن به سبد خرید
                </button>
            )}
        </div>
    );
}
