import React, { useState } from "react";
import "../style/LoginRegister.css";

const LoginRegister = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("نام کاربری و رمز عبور را وارد کنید");
      return;
    }
    try {
        const res =await fetch("http://localhost:9090/api/auth/register-or-login",{
            method:"POST",
            headers:{"Content-Type": "application/json"},
            body:JSON.stringify({username , password })
            }
        );
        const text= await res.text()
        alert(text)

        if (res.ok){
            onLogin({name :username})
        }
    }
    catch (err){
        console.error("خطای اتصال ",err);
        alert("خطا در اتصال به سرو ر");
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
          <button type="submit" className="login-btn">ورود / ثبت نام </button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
