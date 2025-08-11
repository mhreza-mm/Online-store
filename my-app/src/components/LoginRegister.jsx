import React, { useState } from "react";
import "../style/LoginRegister.css";

const LoginRegister = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("نام کاربری و رمز عبور را وارد کنید");
      return;
    }
    onLogin({ name: username });
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
          <button type="submit" className="login-btn">ورود</button>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
