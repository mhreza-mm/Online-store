import React from "react";

export default function ProductCard({ image, title, price, onAddToCart }) {
  if (!image) return null;
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{price} $</p>
      <button className="product-card-add-btn" onClick={onAddToCart}>افزودن به سبد خرید</button>
    </div>
  );
}
