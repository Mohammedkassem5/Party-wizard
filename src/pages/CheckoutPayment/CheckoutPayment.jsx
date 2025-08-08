import React, { useEffect, useState } from "react";
import { FaCreditCard, FaPaypal, FaUniversity, FaApplePay, FaGooglePay } from "react-icons/fa";
import { SiStripe } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import "./CheckoutPayment.css";

export default function CheckoutPayment() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);

  useEffect(()=>{ const s=localStorage.getItem("cart"); if(s) setCart(JSON.parse(s)); },[]);
  const subtotal = cart.reduce((s,i)=>s+(i.price||0)*(i.quantity||1),0);
  const saving = 14;
  const total = subtotal - saving;

  return (
    <div className="dashboard">
      {menuOpen && <div className="overlay" onClick={()=>setMenuOpen(false)} />}
      <Sidebar isOpen={menuOpen} closeMenu={()=>setMenuOpen(false)} />

      <main className="main" onClick={()=>menuOpen && setMenuOpen(false)}>
        <Topbar toggleMenu={()=>setMenuOpen(!menuOpen)} />
        <button className="back-btn" onClick={()=>navigate(-1)}>← Back</button>

        <div className="checkout-page">
          <div className="checkout-left">
            {/* Tabs */}
            <div className="checkout-tabs">
              <NavLink to="/billing" className={({isActive})=>`tab ${isActive?'active':''}`}>
                <span className="dot" /> Billing Info
              </NavLink>
              <NavLink to="/checkout-payment" className={({isActive})=>`tab ${isActive?'active':''}`}>
                <span className="dot orange" /> Payment
              </NavLink>
            </div>

            <div className="panel">
              <div className="pay-methods">
               <button className="method active">
      <FaCreditCard size={20} /> Credit Card
    </button>
    <button className="method">
      <FaPaypal size={20} /> Paypal
    </button>
    <button className="method">
      <FaUniversity size={20} /> Bank account
    </button>
    <button className="method">
      <SiStripe size={20} /> Stripe
    </button>
    <button className="method">
      <FaApplePay size={28} /> Apple Pay
    </button>
    <button className="method">
      <FaGooglePay size={28} /> Google Pay
    </button>
              </div>

              <div className="form-grid">
                <div className="form-row">
                  <label>Credit Card</label>
                  <input type="text" placeholder="Card number" />
                </div>
                <div className="form-row">
                  <label>Name on Card</label>
                  <input type="text" placeholder="Full name" />
                </div>

                <div className="two-cols">
                  <div className="form-row">
                    <label>Expiration (MM / YY)</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="form-row">
                    <label>Security code</label>
                    <input type="password" placeholder="CVV" />
                  </div>
                </div>

                <div className="row-actions">
                  <button className="muted" onClick={()=>navigate("/billing")}>
                    Back to payment methods
                  </button>
                  <button className="primary" onClick={()=>navigate("/home")}>
                    Complete Payment
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <aside className="checkout-summary">
            <div className="summary-card">
              <h4>Order Summary</h4>
              <ul className="summary-list">
                {cart.map(it=>(
                  <li key={it.id}>
                    <img src={it.image} alt={it.name}/>
                    <div>
                      <p className="title">{it.name}</p>
                      <p className="muted">Qty: {it.quantity||1}</p>
                    </div>
                    <span className="price">{(it.price||0).toFixed(2)} USD</span>
                  </li>
                ))}
              </ul>

              <div className="summary-totals">
                <div><span>Items subtotal</span><span>{subtotal.toFixed(2)} USD</span></div>
                <div className="saving"><span>You are saving</span><span>-{saving.toFixed(2)} USD</span></div>
                <div className="grand"><span>Total</span><span>{total.toFixed(2)} USD</span></div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
