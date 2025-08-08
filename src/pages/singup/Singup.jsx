import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Singup.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import logo from "../../assets/login1.png";
import { FaFacebookF, FaGoogle, FaTwitter, FaEye, FaEyeSlash } from "react-icons/fa";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

const handleSignup = async (e) => {
  e.preventDefault();
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName: fullName });  // ← إضافة الاسم
    navigate("/home");
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="signup-page">
      <div className="signup-card">
        <img src={logo} alt="logo" className="logo" />
        <h2 className="title desktop-only">party wizard</h2>

        <form className="signup-form" onSubmit={handleSignup}>
          {/* Full Name */}
          <div className="input-group">
            <span className="icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f66320">
                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zM12 14.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"></path>
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
            />
          </div>

          {/* Email */}
          <div className="input-group">
            <span className="icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f66320">
                <path d="M12 13.065L0 6.19V18c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2V6.19l-12 6.875zM12 10.935L24 4H0l12 6.935z"></path>
              </svg>
            </span>
            <input 
              type="email" 
              placeholder="E-mail" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <span className="icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f66320">
                <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-7h-1V7a5 5 0 0 0-10 0v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM9 7a3 3 0 0 1 6 0v3H9V7z"></path>
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <span className="icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="#f66320">
                <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-7h-1V7a5 5 0 0 0-10 0v3H6a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2zM9 7a3 3 0 0 1 6 0v3H9V7z"></path>
              </svg>
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>

          <p className="or">or sign up with...</p>
          <div className="social-icons">
            <div className="social-btn fb"><FaFacebookF /></div>
            <div className="social-btn google"><FaGoogle /></div>
            <div className="social-btn twitter"><FaTwitter /></div>
          </div>

          <p className="login-redirect">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
