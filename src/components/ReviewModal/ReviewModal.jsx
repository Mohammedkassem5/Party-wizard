import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { toast } from "react-toastify";
import "./ReviewModal.css";

const ReviewModal = ({ open, onClose, product }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!open) {
      setRating(0);
      setHover(0);
      setText("");
    }
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!rating) {
      toast.info("Please add a rating first.");
      return;
    }
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    reviews.push({
      productId: product?.id,
      productName: product?.name,
      rating,
      text,
      date: new Date().toISOString(),
    });
    localStorage.setItem("reviews", JSON.stringify(reviews));
    toast.success("Thanks! Your review was submitted.");
    onClose?.();
  };

  return (
    <div className="review-overlay" onClick={onClose}>
      <div
        className="review-card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="review-close" onClick={onClose} aria-label="close">
          ✕
        </button>

        <h3 className="review-title">Product Review</h3>

        {/* product row */}
        <div className="review-product">
          <img
            src={product?.image}
            alt={product?.name}
            className="review-thumb"
          />
          <div className="review-prod-info">
            <p className="review-prod-name">{product?.name}</p>
          </div>
        </div>

        <hr className="review-sep" />

        {/* rating */}
        <div className="review-rating-row">
          <span className="review-label">Overall rating</span>
          <div className="review-stars">
            {[1, 2, 3, 4, 5].map((idx) => (
              <button
                key={idx}
                className="star-btn"
                onMouseEnter={() => setHover(idx)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(idx)}
                aria-label={`rate ${idx}`}
              >
                <FaStar
                  className={
                    idx <= (hover || rating) ? "star filled" : "star empty"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* textarea */}
        <label className="review-label" htmlFor="review-text">
          Write a review
        </label>
        <textarea
          id="review-text"
          className="review-textarea"
          placeholder="Share your experience…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
        />

        {/* submit */}
        <button className="review-submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
