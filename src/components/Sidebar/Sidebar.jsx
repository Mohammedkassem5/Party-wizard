import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaHeart, FaHistory, FaCreditCard, FaTags, FaUser, FaCog, FaFileAlt } from "react-icons/fa";
import logo from "../../assets/login1.png";
import "./Sidebar.css";

const Sidebar = ({ onLogout, isOpen, closeMenu }) => {
  return (
    <aside 
      className={`sidebar ${isOpen ? "open" : ""}`} 
      onClick={(e) => e.stopPropagation()}
    >
      <div className="logo-section">
        <img src={logo} alt="logo" className="logo" />
        <span className="brand">party wizard</span>
      </div>
      <nav className="menu">
        <Link to="/home" onClick={closeMenu}><FaHome /> Home</Link>
        <Link to="/wishlist" onClick={closeMenu}><FaHeart /> Wishlist</Link>
        <Link to="/history" onClick={closeMenu}><FaHistory /> History</Link>
        <Link to="/payment" onClick={closeMenu}><FaCreditCard /> Payment method</Link>
        <Link to="/promotion" onClick={closeMenu}><FaTags /> Promotion</Link>
        <Link to="/profile" onClick={closeMenu}><FaUser /> Profile</Link>
        <Link to="/settings" onClick={closeMenu}><FaCog /> Settings</Link>
        <Link to="/report" onClick={closeMenu}><FaFileAlt /> Report</Link>
      </nav>
      <button className="logout" onClick={() => { closeMenu(); onLogout(); }}>Log Out</button>
    </aside>
  );
};

export default Sidebar;
