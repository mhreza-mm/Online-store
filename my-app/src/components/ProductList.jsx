import React from "react";
import ProductCard from "./ProductCard";
import "../style/ProductList.css";

export default function ProductList({products, cart, onAddToCart, onIncrease, onDecrease}) {
    if (!products || products.length === 0) {
        return <div className="product-list-empty">محصولی پیدا نشد.</div>;
    }

    return (
        <div className="product-list">
            {products
                .filter(product => product && product.image)
                .map(product => {
                    const cartItem = cart?.find(item => item.id === product.id);
                    const qty = cartItem ? cartItem.quantity : 0;

                    return (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            inCartQuantity={qty}
                            onAddToCart={() => onAddToCart(product)}
                            onIncrease={() => onIncrease(product.id)}
                            onDecrease={() => onDecrease(product.id)}
                        />
                    );
                })}
        </div>
    );
}
