import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [dark, setDark] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDark = () => {
    document.body.classList.toggle("dark-mode");
    setDark(!dark);
  };

  return (
    <header className="header">
      <Link to="/" className="logo">📝 Blog Panel</Link>
      <nav>
        <Link to="/">Home</Link>
        {localStorage.getItem("token") ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <button id="darkToggle" onClick={toggleDark}>
          {dark ? "☀️" : "🌙"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
