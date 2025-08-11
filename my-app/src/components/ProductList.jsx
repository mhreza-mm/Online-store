import React from "react";
import ProductCard from "./ProductCard";
import "../style/ProductList.css";

export default function ProductList({ products, onAddToCart }) {
  if (!products || products.length === 0) {
    return <div className="product-list-empty">محصولی پیدا نشد.</div>;
  }
  return (
    <div className="product-list">
      {products
        .filter(product => product && product.image) // فقط محصولاتی که تصویر دارند
        .map(product => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
            onAddToCart={() => onAddToCart(product)}
          />
      ))}
    </div>
  );
}
