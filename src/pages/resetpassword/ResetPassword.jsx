import React from "react";
import "./ResetPassword.css";
import logo from "../../assets/login1.png";
import { useNavigate } from "react-router-dom";


const ResetPassword = () => {
   const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/check");
  };

   return (
    <div className="reset-page">
      <div className="reset-card">
        <img src={logo} alt="logo" className="logo" />
        <h2 className="reset-title">let's reset your password</h2>
        <p className="reset-text">
          Enter the email associated with your account and we’ll send an email with instructions to reset your password.
        </p>

        <form className="reset-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f66320">
                <path d="M12 13.065L0 6.19V18c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2V6.19l-12 6.875zM12 10.935L24 4H0l12 6.935z"></path>
              </svg>
            </span>
            <input type="email" placeholder="E-mail" required />
          </div>

          <button type="submit" className="reset-btn">
            Send Instructions
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
