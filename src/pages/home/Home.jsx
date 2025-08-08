import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import ProductCard from "../../components/ProductCard/ProductCard";
import WishlistItem from "../../components/WishlistItem/WishlistItem";
import { FaGift, FaBirthdayCake, FaWind } from "react-icons/fa";
import flashTextImage from "../../assets/Flash Sale Shop Now.png";
import "./Home.css";

const Home = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // === تحميل السلة من LocalStorage عند فتح الصفحة ===
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  // === تحديث LocalStorage كلما تغيرت السلة ===
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // === إضافة المنتجات إلى السلة ===
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // === حساب عدد العناصر في السلة ===
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const products = [
    { id: 1, name: "Consequat lobortis est", price: 150.5, image: "/images/product1.png" },
    { id: 2, name: "Tincidunt adipiscing", price: 150.5, image: "/images/product2.png" },
    { id: 3, name: "Velit porta efficitur", price: 150.5, image: "/images/product3.png" },
    { id: 4, name: "Enim suspendisse", price: 150.5, image: "/images/product4.png" },
    { id: 5, name: "Porta nisl", price: 150.5, image: "/images/product5.png" },
    { id: 6, name: "Porttitor nunc", price: 150.5, image: "/images/product6.png" },
  ];

  const wishlist = [
    { id: 1, name: "Lacus tristique urna", price: 150.5, image: "/images/wishlist1.png" },
    { id: 2, name: "Lectus metus", price: 150.5, image: "/images/wishlist2.png" },
    { id: 3, name: "Tellus neque posuere", price: 150.5, image: "/images/wishlist3.png" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="dashboard">
      {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}

      <Sidebar
        onLogout={handleLogout}
        isOpen={menuOpen}
        closeMenu={() => setMenuOpen(false)}
        className={menuOpen ? "sidebar open" : "sidebar"}
      />

      <main className="main" onClick={() => menuOpen && setMenuOpen(false)}>
        <Topbar toggleMenu={() => setMenuOpen(!menuOpen)} user={user} cartCount={cartCount} />

        <div className="banner-categories">
          <div className="banner">
            <div className="banner-text">
              <h2>Get Up To 75%</h2>
              <p>
                Fusce nec massa accumsan, elementum turpis sed, commodo massa.
                Pellentesque et nulla tellus.
              </p>
            </div>
            <div className="banner-image-right">
              <img src={flashTextImage} alt="Flash Sale Shop Now" />
            </div>
          </div>

          <div className="top-categories">
            <h3>Top Categories</h3>
            <div className="cat-list">
              <div className="cat"><FaGift /> Party Supplies</div>
              <div className="cat"><FaBirthdayCake /> Birthday</div>
              <div className="cat"><FaWind /> Balloons</div>
            </div>
          </div>
        </div>

        <div className="grid-layout">
          <div className="left-content">
            <section className="trends">
              <h3>Trends this week</h3>
              <div className="products">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} />
                ))}
              </div>
            </section>
          </div>

          <div className="right-content">
            <section className="wishlist-section">
              <h3>Your Wishlist</h3>
              {wishlist.map((item) => <WishlistItem key={item.id} item={item} />)}
              <button className="see-all-btn">See All Wishlist</button>
            </section>

            <section className="download-section">
              <div className="download-card">
                <h4>Download Mobile app</h4>
                <p>Shopping anywhere any time</p>
                <button>Download</button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
