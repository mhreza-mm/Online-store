
const ProductCard=({product,onAddToCart})=>{
    return(
        <div className="product-card">
            <img className="product-image" src={product.image} alt={product.titel}/>
            <div className="product-title">{product.titel}</div>
            <div className="product-price">{product.price}$</div>
            <button className="add-to-cart-btn" onClick={()=>onAddToCart(product)}>افزودن به سبد خرید </button>
        </div>
    )
};
export default ProductCard;