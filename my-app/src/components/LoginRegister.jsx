import React, { useState } from "react";
import "../style/LoginRegister.css";
import {useNavigate} from "react-router-dom";


const LoginRegister = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert("نام کاربری و رمز عبور را وارد کنید");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/auth/register-or-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.massage || "خطا در اعتبارسنجی");
                return;
            }

            if (data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("username", data.username);
                // اگر نقش هم در پاسخ باشد، ذخیره‌اش می‌کنیم (برای کنترل RBAC سمت فرانت)
                if (data.role) {
                    localStorage.setItem("role", data.role);
                }
            }

            alert(data.massage || "عملیات موفقیت‌آمیز");


            onLogin({ name: data.username });
            navigate("/")

        } catch (err) {
            console.error("خطای اتصال:", err);
            alert("خطا در اتصال به سرور");
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-box">
                <h3 className="login-title">ورود / ثبت‌نام</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="نام کاربری را وارد کنید"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="رمز عبور را وارد کنید"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="login-btn">
                        ورود / ثبت نام
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginRegister;
