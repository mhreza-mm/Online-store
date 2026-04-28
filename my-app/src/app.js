import React, { useState, useEffect } from "react";
import "./style/App.css";
import Navbar from "./components/Navbar";
import LoginRegister from "./components/LoginRegister";
import UserPanel from "./components/UserPanel";
import ProductList from "./components/ProductList";
import Pagination from "./components/Pagination";
import CartPage from "./components/CartPage";
import ProductDetails from "./components/ProductDetails";
import { Routes, Route, Navigate,useNavigate } from "react-router-dom";
import { fetchProducts } from "./api/Products";
import bannerImg from "./assets/baner.png"

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
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState([]);
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedType, setSelectedType] = useState("");
    const [selectedBrand, setSelectedBrand] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const pageSize = 10;

    useEffect(() => {
        const username = localStorage.getItem("username");
        const role = localStorage.getItem("role");
        if (username) setUser({ name: username, role });
    }, []);

    const loadProducts = async () => {
        try {
            const data = await fetchProducts({
                page,
                size: pageSize,
                type: selectedType,
                brand: selectedBrand,
                search: searchValue
            });
            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (err) {
            console.error("خطا در دریافت محصولات", err);
        }
    };

    useEffect(() => {
        loadProducts();
    }, [page, selectedType, selectedBrand, searchValue]);

    const handleAddToCart = (product) => {
        if (!user) {
            alert("برای افزودن به سبد خرید وارد شوید.");
            navigate("/login");
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

    return (
        <div className="app-container">
            <Navbar
                cartCount={totalItems}
                user={user}
                onLogin={setUser}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                onLogout={() => {
                    setUser(null);
                    setCart([]);
                    localStorage.clear();
                }}
                products={products}
                onFilter={(type, brand) => {
                    setSelectedType(type);
                    setSelectedBrand(brand);
                    setPage(0);
                }}
            />

            <main className="main-content">
                <Routes>

                    <Route
                        path="/"
                        element={
                            <>

                                <div className="homepage-banner">
                                    <img src={bannerImg} alt={"banner"}/>
                                </div>
                                <ProductList
                                    products={products}
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
                                    page={page + 1}
                                    totalPages={totalPages}
                                    onPageChange={(p) => setPage(p - 1)}
                                />
                            </>
                        }
                    />

                    <Route
                        path="/product/:id"
                        element={
                            <ProductDetails
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
