import React, { useState } from "react";
import { FaBars, FaShoppingCart, FaBell } from "react-icons/fa";
import "./Topbar.css";
import { useNavigate } from "react-router-dom";

const Topbar = ({ toggleMenu, user, cartCount = 0, notificationsCount = 0 }) => {
  const navigate = useNavigate();
  const [cartHighlight, setCartHighlight] = useState(false);
  const [notifHighlight, setNotifHighlight] = useState(false);

  const handleCartClick = () => {
    setCartHighlight(true);
    setTimeout(() => setCartHighlight(false), 300);
    navigate("/cart");
  };

  const handleNotificationsClick = () => {
    setNotifHighlight(true);
    setTimeout(() => setNotifHighlight(false), 300);
    navigate("/notifications");
  };

  return (
    <header className="topbar">
      <button className="menu-btn" onClick={toggleMenu}>
        <FaBars />
      </button>
      <input type="text" placeholder="Search" className="search" />

      <div className="topbar-icons">
        {/* Cart Button */}
        <button
          className={`icon-box ${cartHighlight ? "highlight" : ""}`}
          onClick={handleCartClick}
        >
          <FaShoppingCart className="icon" />
          {cartCount > 0 && <span className="count">{cartCount}</span>}
        </button>

        {/* Notifications Button */}
        <button
          className={`icon-box ${notifHighlight ? "highlight" : ""}`}
          onClick={handleNotificationsClick}
        >
          <FaBell className="icon" />
          {notificationsCount > 0 && <span className="count">{notificationsCount}</span>}
        </button>

        <div className="user-info">{user?.email}</div>
      </div>
    </header>
  );
};

export default Topbar;
