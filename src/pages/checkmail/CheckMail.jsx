import React from "react";
import "./CheckMail.css";
import ghost from "../../assets/login1.png";   // صورة الشبح اللي عندنا
import checkBg from "../../assets/Check.png";  // صورة الخلفية

const CheckMail = () => {
  return (
    <div className="check-page">
      <div className="check-card">
        <div className="image-wrapper">
          <img src={checkBg} alt="mailbox" className="check-bg" />
          <img src={ghost} alt="ghost" className="ghost" />
        </div>
        <h2 className="check-title">Check your mail</h2>
        <p className="check-text">
          We have sent a password recover instructions to your email.
        </p>

        <button className="open-mail-btn">Open Mail App</button>

        <p className="skip">
          <a href="#">Skip, I'll confirm later</a>
        </p>
        <p className="note">
          Did not receive the email? Check your spam filter.<br />
          or <a href="#">Try another email address</a>
        </p>
      </div>
    </div>
  );
};

export default CheckMail;
