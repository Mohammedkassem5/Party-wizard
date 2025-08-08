import React from "react";
import "./WishlistItem.css";

const WishlistItem = ({ item }) => {
  return (
    <div className="wishlist-item">
      <div className="thumb" style={{ backgroundImage: `url(${item.image})` }}></div>
      <div className="info">
        <h5>{item.name}</h5>
        <p>${item.price}</p>
        <button>Add to Cart</button>
      </div>
    </div>
  );
};

export default WishlistItem;
