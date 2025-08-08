import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // ✅ إضافة مهمة
import "./ProductCard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const [highlight, setHighlight] = useState(false);
  const navigate = useNavigate();  // ✅ تعريف navigation

  const handleAdd = () => {
    onAddToCart(product);
    setHighlight(true);
    setTimeout(() => setHighlight(false), 300); // يرجع للوضع الطبيعي بعد 0.3 ثانية
  };

  const handleBuyNow = () => {
    navigate("/ProductDetails", { state: { product } });  // ✅ التنقل بالبيانات
  };

  return (
    <div className="product-card">
      <div
        className="image"
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>

      <h4>{product.name}</h4>
      <p>${product.price}</p>

      <div className="product-actions">
        <button
          className={`cart-btn ${highlight ? "highlight" : ""}`}
          onClick={handleAdd}
        >
          <FaShoppingCart />
        </button>

        <button onClick={handleBuyNow}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
