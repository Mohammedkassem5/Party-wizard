import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationCircle, FaTimesCircle, FaTimes } from "react-icons/fa";
import "./Notifications.css";

const Notifications = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      type: "success",
      title: "Order Placed",
      message: "Your order is placed successfully."
    },
    {
      id: 2,
      type: "warning",
      title: "Uh Oh, Something Went Wrong!",
      message: "Sorry! There was a problem with your request."
    },
    {
      id: 3,
      type: "error",
      title: "Error!",
      message: "Invalid username or password."
    }
  ];

  const handleRemove = (id) => {
    // هنا ممكن تضيف API أو state
    console.log(`Remove notification ${id}`);
  };

  return (
    <div className="dashboard">
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      <Sidebar isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />
      
      <main className="main" onClick={() => setMenuOpen(false)}>
        <Topbar toggleMenu={() => setMenuOpen(!menuOpen)} />
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <div className="notifications-page">
          {notifications.map((n) => (
            <div key={n.id} className={`notification-card ${n.type}`}>
              <div className="icon">
                {n.type === "success" && <FaCheckCircle />}
                {n.type === "warning" && <FaExclamationCircle />}
                {n.type === "error" && <FaTimesCircle />}
              </div>
              <div className="text">
                <h4>{n.title}</h4>
                <p>{n.message}</p>
              </div>
              <button className="close-btn" onClick={() => handleRemove(n.id)}>
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Notifications;
