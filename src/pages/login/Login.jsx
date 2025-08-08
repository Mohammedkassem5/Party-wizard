import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./login.css";
import logo from "../../assets/login1.png";
import { FaFacebookF, FaGoogle, FaTwitter, FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // بعد تسجيل الدخول الناجح ينتقل للصفحة الرئيسية
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <img src={logo} alt="logo" className="logo" />
        <h2 className="title desktop-only">party wizard</h2>

        <form className="login-form" onSubmit={handleLogin}>
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

          <Link to="/reset" className="forgot">Forgot password?</Link>

          <button type="submit" className="login-btn">Login</button>

          <p className="or">or login with...</p>
          <div className="social-icons">
            <div className="social-btn fb"><FaFacebookF /></div>
            <div className="social-btn google"><FaGoogle /></div>
            <div className="social-btn twitter"><FaTwitter /></div>
          </div>

          <p className="register">
            Are you new user? <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
