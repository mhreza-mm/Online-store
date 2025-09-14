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

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    return token && role === "ADMIN" ? children : <Navigate to="/login" />;
};

export default function App() {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [searchValue, setSearchValue] = useState("");
    const [selectedType, setSelectedType] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const pageSize = 10;

    useEffect(() => {
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");
        if (username) setUser({ name: username, role });
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
                setFilteredProducts(data);
            } catch (err) {
                console.error("خطا در دریافت محصولات", err);
            }
        })();
    }, []);

    useEffect(() => {
        let data = [...products];
        if (searchValue.trim()) {
            data = data.filter((p) =>
                p.title.toLowerCase().includes(searchValue.toLowerCase())
            );
        }
        if (selectedType) {
            data = data.filter((p) => p.type === selectedType);
        }
        if (selectedBrand) {
            data = data.filter((p) => p.brand === selectedBrand);
        }
        setFilteredProducts(data);
        setPage(1);
    }, [products, searchValue, selectedType, selectedBrand]);

    const handleAddToCart = (product) => {
        if (!user) {
            alert("برای افزودن به سبد خرید وارد شوید.");
            window.location.href = "/login";
            return;
        }
        setCart((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                return prev.map((i) =>
                    i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const startIdx = (page - 1) * pageSize;
    const showProducts = filteredProducts.slice(startIdx, startIdx + pageSize);
    const totalPages = Math.ceil(filteredProducts.length / pageSize);

    return (
        <div className="app-container">
            <Navbar
                cartCount={totalItems}
                user={user}
                onLogin={setUser}
                onLogout={() => {
                    setUser(null);
                    setCart([]);
                    localStorage.clear();
                }}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                products={products}
                onFilter={(type, brand) => {
                    setSelectedType(type);
                    setSelectedBrand(brand);
                }}
            />

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
                                    onIncrease={(id) =>
                                        setCart((prev) =>
                                            prev.map((i) =>
                                                i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                                            )
                                        )
                                    }
                                    onDecrease={(id) =>
                                        setCart((prev) =>
                                            prev
                                                .map((i) =>
                                                    i.id === id
                                                        ? { ...i, quantity: Math.max(i.quantity - 1, 0) }
                                                        : i
                                                )
                                                .filter((i) => i.quantity > 0)
                                        )
                                    }
                                />
                                <Pagination
                                    page={page}
                                    totalPages={totalPages}
                                    onPageChange={setPage}
                                />
                            </>
                        }
                    />
                    <Route path="/login" element={<LoginRegister onLogin={setUser} />} />
                    <Route
                        path="/user"
                        element={
                            <ProtectedRoute>
                                <UserPanel user={user} onLogout={() => setUser(null)} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <AdminRoute>
                                <div style={{ padding: "20px" }}>پنل مدیریت</div>
                            </AdminRoute>
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <ProtectedRoute>
                                <CartPage
                                    cart={cart}
                                    onIncrease={(id) =>
                                        setCart((prev) =>
                                            prev.map((i) =>
                                                i.id === id ? { ...i, quantity: i.quantity + 1 } : i
                                            )
                                        )
                                    }
                                    onDecrease={(id) =>
                                        setCart((prev) =>
                                            prev
                                                .map((i) =>
                                                    i.id === id
                                                        ? { ...i, quantity: Math.max(i.quantity - 1, 0) }
                                                        : i
                                                )
                                                .filter((i) => i.quantity > 0)
                                        )
                                    }
                                />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}
