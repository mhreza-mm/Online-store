import React from "react";
import "../style/CartPage.css";

export default function CartPage({ cart, onIncrease, onDecrease }) {
  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>سبد خرید</h2>
        <p>سبد خرید خالی است.</p>
      </div>
    );
  }

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>سبد خرید</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div className="cart-item" key={item.id}>
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-info">
              <h3>{item.title}</h3>

              <div className="cart-quantity">
                <button onClick={() => onDecrease(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onIncrease(item.id)}>+</button>
              </div>

              <p>قیمت واحد: {item.price} $</p>
              <p>قیمت کل: {(item.price * item.quantity).toFixed(2)} $</p>
            </div>
          </div>
        ))}
      </div>

      
      <div className="cart-summary">
        <h3>جمع کل خرید</h3>
        <span>{totalPrice.toFixed(2)} $</span>
      </div>
    </div>
  );
}
