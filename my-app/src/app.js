import React, { useState, useEffect } from "react";
import "./style/App.css";
import Navbar from "./components/Navbar";
import LoginRegister from "./components/LoginRegister";
import UserPanel from "./components/UserPanel";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import CartPage from "./components/CartPage"; 
import { Routes, Route } from "react-router-dom";
import { fetchProducts } from "./api/Products";

const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 9;

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    fetchData();
  }, []);

  
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleLogin = (userobj) => {
    setUser(userobj);
  };

  const handleLogout = () => {
    setUser(null);
    setCart([]);
  };
  const handleIncrease=(id)=>{
    setCart(prev=>
      prev
      .map(item=>
        item.id===id
        ?{...item,quantity:item.quantity+1}
        :item

      )
    )
  }

  const handleDecrease=(id)=>{
    setCart(prev=>
      prev
      .map(item=>
        item.id===id
        ?{...item,quantity:Math.max(item.quantity-1,0)}
        :item
      )
      .filter(item=>item.quantity>0)

    )
  }
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  
  const startIdx = (page - 1) * pageSize;
  const showProducts = products.slice(startIdx, startIdx + pageSize);
  const totalPages = Math.ceil(products.length / pageSize);

  return (
    <div className="app-container">
      <Navbar
        cartCount={totalItems} 
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <div className="main-body">
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ProductList products={showProducts} onAddToCart={handleAddToCart} />
                  <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                </>
              }
            />
            <Route path="/login" element={<LoginRegister onLogin={handleLogin} />} />
            <Route path="/user" element={<UserPanel user={user} onLogout={handleLogout} />} />
            <Route path="/cart" element={<CartPage onIncrease={handleIncrease} onDecrease={handleDecrease} cart={cart} />} /> {/* ⭐ افزوده شده */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default App;
