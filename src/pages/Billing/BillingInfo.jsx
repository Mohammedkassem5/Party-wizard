import React, { useEffect, useState } from "react";
import { FaFileInvoice, FaCreditCard } from "react-icons/fa";
import { useNavigate, NavLink } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import "./BillingInfo.css";

const safeNum = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

export default function BillingInfo() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const [order, setOrder] = useState({
    items: [],
    subtotal: 0,
    discountPct: 0,
    saving: 0,
    total: 0,
  });

  const [form, setForm] = useState({
    country: "",
    address: "",
    city: "",
    landmark: "",
    saveInfo: false,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("orderSummary");
      if (!raw) {
        navigate("/cart", { replace: true });
        return;
      }
      const parsed = JSON.parse(raw);
      setOrder({
        items: Array.isArray(parsed.items) ? parsed.items : [],
        subtotal: safeNum(parsed.subtotal),
        discountPct: safeNum(parsed.discountPct),
        saving: safeNum(parsed.saving),
        total: safeNum(parsed.total),
      });
    } catch (e) {
      console.error("Failed to parse orderSummary:", e);
      navigate("/cart", { replace: true });
    }
  }, [navigate]);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const proceedToPayment = () => {
    localStorage.setItem("billingInfo", JSON.stringify(form));
    navigate("/checkout-payment");
  };

  const cartCount = order.items.reduce((a, it) => a + (it.quantity || 1), 0);

  return (
    <div className="dashboard">
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)} />}
      <Sidebar isOpen={menuOpen} closeMenu={() => setMenuOpen(false)} />

      <main className="main" onClick={() => menuOpen && setMenuOpen(false)}>
        <Topbar toggleMenu={() => setMenuOpen(!menuOpen)} cartCount={cartCount} />
        <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>

        <div className="billing-page">
          <div className="billing-form">
            <h3>Checkout</h3>

            <div className="tabs">
                <NavLink
    to="/billing"
    className={({ isActive }) =>
      `tab ${isActive ? "active" : ""}`
    }
  >
    <FaFileInvoice className="tab-icon" /> Billing Info
  </NavLink>
  <NavLink
    to="/checkout-payment"
    className={({ isActive }) =>
      `tab ${isActive ? "active" : ""}`
    }
  >
    <FaCreditCard className="tab-icon" /> Payment
  </NavLink>
            </div>

            <label className="field">
              <span>Country</span>
              <select name="country" value={form.country} onChange={onChange}>
                <option value="">Country</option>
                <option value="Egypt">Egypt</option>
                <option value="KSA">KSA</option>
                <option value="UAE">UAE</option>
              </select>
            </label>

            <label className="field">
              <span>Shipping address</span>
              <input
                name="address"
                value={form.address}
                onChange={onChange}
                placeholder="Address"
              />
            </label>

            <label className="field">
              <span>City</span>
              <input
                name="city"
                value={form.city}
                onChange={onChange}
                placeholder="City"
              />
            </label>

            <label className="field">
              <span>Nearest Landmark</span>
              <input
                name="landmark"
                value={form.landmark}
                onChange={onChange}
                placeholder="Landmark"
              />
            </label>

            <label className="checkbox">
              <input
                type="checkbox"
                name="saveInfo"
                checked={form.saveInfo}
                onChange={onChange}
              />
              <span>Save this information</span>
            </label>

            <div className="form-actions">
              <button className="primary" onClick={proceedToPayment}>
                Proceed to Payment
              </button>
            </div>
          </div>

          {/* العمود الأيمن: الملخص */}
          <aside className="order-summary">
            <h4>Order Summary</h4>

            <div className="items">
              {order.items.map((it) => (
                <div className="summary-item" key={it.id}>
                  <img src={it.image} alt={it.name} />
                  <div className="meta">
                    <div className="name">{it.name}</div>
                    <div className="qty">Qt: {it.quantity || 1}</div>
                  </div>
                  <div className="price">
                    ${(safeNum(it.price) * (it.quantity || 1)).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="totals">
              <div className="row">
                <span>Items subtotal</span>
                <span>${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="row saving">
                <span>You are saving</span>
                <span>- ${order.saving.toFixed(2)}</span>
              </div>
              <div className="row total">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
