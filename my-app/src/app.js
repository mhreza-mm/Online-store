import React, { useState, useEffect } from "react";
import "./style/App.css";
import Navbar from "./components/Navbar";
import LoginRegister from "./components/LoginRegister";
import UserPanel from "./components/UserPanel";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import CartPage from "./components/CartPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { fetchProducts } from "./api/Products";

// کامپوننت مسیر محافظت‌شده
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

// کامپوننت مسیر ادمین
const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token && role === "ADMIN" ? children : <Navigate to="/login" />;
};

const App = () => {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const pageSize = 10;

    // خواندن اطلاعات کاربر و نقش از localStorage بعد از reload
    useEffect(() => {
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");
        if (username) {
            setUser({ name: username, role });
        }
    }, []);

    // گرفتن محصولات از API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
            } catch (err) {
                console.error("خطا در دریافت محصولات", err);
            }
        };
        fetchData();
    }, []);

    const handleAddToCart = (product) => {
        if (!user) {
            alert("برای افزودن به سبد خرید، ابتدا وارد حساب کاربری خود شوید.");
            window.location.href = "/login";
            return;
        }
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
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
    };

    const handleIncrease = (id) => {
        setCart(prev =>
            prev.map(item =>
                item.id === id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };

    const handleDecrease = (id) => {
        setCart(prev =>
            prev
                .map(item =>
                    item.id === id
                        ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                        : item
                )
                .filter(item => item.quantity > 0)
        );
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const filteredProducts = products.filter(item =>
        item.title.toLowerCase().includes(searchValue.toLowerCase())
    );

    const startIdx = (page - 1) * pageSize;
    const showProducts = filteredProducts.slice(startIdx, startIdx + pageSize);
    const totalPages = Math.ceil(filteredProducts.length / pageSize);

    return (
        <div className="app-container">
            <Navbar
                cartCount={totalItems}
                user={user}
                onLogin={handleLogin}
                onLogout={handleLogout}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
            />

            <div className="main-body">
                <main className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <ProductList
                                        products={showProducts}
                                        cart={cart}
                                        onAddToCart={handleAddToCart}
                                        onIncrease={handleIncrease}
                                        onDecrease={handleDecrease}
                                    />
                                    <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
                                </>
                            }
                        />

                        <Route path="/login" element={<LoginRegister onLogin={handleLogin} />} />

                        {/* مسیر محافظت‌شده برای کاربر عادی */}
                        <Route
                            path="/user"
                            element={
                                <ProtectedRoute>
                                    <UserPanel user={user} onLogout={handleLogout} />
                                </ProtectedRoute>
                            }
                        />

                        {/* مسیر نمونه برای ادمین */}
                        <Route
                            path="/admin"
                            element={
                                <AdminRoute>
                                    <div style={{ padding: "20px" }}>
                                        <h2>پنل مدیریت</h2>
                                        <p>فقط ادمین می‌تواند این صفحه را ببیند.</p>
                                    </div>
                                </AdminRoute>
                            }
                        />

                        <Route
                            path="/cart"
                            element={
                                <ProtectedRoute>
                                    <CartPage
                                        onIncrease={handleIncrease}
                                        onDecrease={handleDecrease}
                                        cart={cart}
                                    />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                </main>
            </div>
        </div>
    );
};

export default App;
