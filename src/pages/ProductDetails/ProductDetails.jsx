import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ReviewModal from "../../components/ReviewModal/ReviewModal";
import "./ProductDetails.css";

const ProductDetails = () => {
  const location = useLocation();
  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);
  const [openReview, setOpenReview] = useState(false);

  if (!product) return <h2 style={{ padding: "20px" }}>Product not found</h2>;

  const total = (product.price * quantity).toFixed(2);

  const handleAddToCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];
    const exist = currentCart.find((item) => item.id === product.id);
    let updatedCart;

    if (exist) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [...currentCart, { ...product, quantity }];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <div className="product-details-page">
      <div className="left-content">
        <div className="image-section">
          <div className="thumbnails">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={product.image}
                alt={`thumb-${i}`}
                className="thumbnail"
              />
            ))}
          </div>
          <div className="main-image">
            <img src={product.image} alt={product.name} />
          </div>
        </div>

        <div className="info-section">
          <h2>{product.name}</h2>
          <div className="rating">
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star" />
            <FaStar className="star gray" />
            <span>(4.9)</span>
          </div>
          <ul className="details-list">
            <li><strong>Color:</strong> Multi</li>
            <li><strong>Material:</strong> Plastic</li>
            <li><strong>Brand:</strong> Party Wizard</li>
            <li><strong>Item Dimensions:</strong> 25×6×5cm</li>
            <li><strong>Item Weight:</strong> 0.45kg</li>
          </ul>
        </div>

        {/* About */}
        <div className="about-section">
          <h3>About this item</h3>
          <p>
            Easy to use. It provides endless hours of fun and entertainment.
            Perfect for developing kid’s imagination and manual dexterity.
          </p>
        </div>

        {/* Price Card (Mobile) */}
        <div className="price-card mobile-only">
          <p><strong>Price:</strong> USD {product.price}</p>
          <label>
            Quantity:
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </label>
          <h3>Total: USD {total}</h3>
          <p className="delivery">Free Delivery by Thu, 29 Dec</p>
          <button className="wishlist-btn">Add to wishlist</button>
          <button className="add-cart-btn" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>

        {/* Reviews */}
        <div className="review-section">
          <button className="write-review" onClick={() => setOpenReview(true)}>
            Write a review
          </button>
          <div className="review">
            <strong>Shady Ragab</strong>
            <p>
              A good review includes enough detail to give others a feel for what
              happened. Explain which factors contributed to your positive experience.
            </p>
          </div>
        </div>

        {/* Similar Products */}
        <div className="similar-products">
          <h3>Similar products</h3>
          <div className="similar-grid">
            {[1, 2, 3, 4].map((i) => (
              <div className="similar-card" key={i}>
                <img src={product.image} alt={`similar-${i}`} />
                <p>{product.name}</p>
                <span>${product.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Price Card (Desktop) */}
      <div className="price-card desktop-only">
        <p><strong>Price:</strong> USD {product.price}</p>
        <label>
          Quantity:
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </label>
        <h3>Total: USD {total}</h3>
        <p className="delivery">Free Delivery by Thu, 29 Dec</p>
        <button className="wishlist-btn">Add to wishlist</button>
        <button className="add-cart-btn" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>

      {/* Review Modal */}
      <ReviewModal
        open={openReview}
        onClose={() => setOpenReview(false)}
        product={product}
      />

      {/* Toasts */}
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
