import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import "./Cart.css";

const Cart = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const updateQuantity = (id, delta) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, (item.quantity || 1) + delta) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    const pct = code === "MOH20" ? 0.2 : 0;
    setDiscount(pct);

    localStorage.setItem("promo", JSON.stringify({ code, pct }));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  const saving = subtotal * discount;
  const total = subtotal - saving;

  const cartCount = cart.reduce((acc, it) => acc + (it.quantity || 1), 0);

  const proceedToCheckout = () => {
    if (!cart.length) return;

    localStorage.setItem(
      "orderSummary",
      JSON.stringify({
        items: cart,
        subtotal,
        discountPct: discount,
        saving,
        total,
      })
    );

    navigate("/billing");
  };

  return (
    <div className="dashboard">
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
      <Sidebar isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />

      <main className="main" onClick={() => menuOpen && setMenuOpen(false)}>
        <Topbar toggleMenu={() => setMenuOpen(!menuOpen)} cartCount={cartCount} />
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <div className="cart-page">
          <div className="cart-content">
            <div className="cart-header">
              <h2>Your cart</h2>
              {cart.length > 0 && (
                <button className="remove-all" onClick={clearCart}>
                  Remove all items
                </button>
              )}
            </div>

            {cart.length === 0 ? (
              <p className="empty">Cart is empty</p>
            ) : (
              <div className="cart-items">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <h4>{item.name}</h4>
                      <p>{item.price} USD</p>
                    </div>
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, -1)}>
                        <FaMinus />
                      </button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>
                        <FaPlus />
                      </button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item.id)}>
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="cart-summary">
            <div className="promo">
              <input
                type="text"
                placeholder="Promocode"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="apply-btn" onClick={handleApplyPromo}>Apply</button>
            </div>
            <p>Items subtotal: {subtotal.toFixed(2)} USD</p>
            <p className="saving">You are saving: -{saving.toFixed(2)} USD</p>
            <h3>Total: {total.toFixed(2)} USD</h3>

            <button
              className="checkout-btn"
              disabled={!cart.length}
              onClick={proceedToCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
