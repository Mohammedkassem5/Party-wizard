import { HashRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/login/login";
import Signup from "./pages/singup/Singup";
import ResetPassword from "./pages/resetpassword/ResetPassword";
import CheckMail from "./pages/checkmail/CheckMail";
import Home from "./pages/home/Home.jsx";
import Wishlist from "./pages/Wishlist/Wishlist";
import History from "./pages/History/History";
import Payment from "./pages/Payment/Payment";
import Promotion from "./pages/Promotion/Promotion";
import Profile from "./pages/Profile/Profile";
import Settings from "./pages/Settings/Settings";
import Report from "./pages/Report/Report";
import Cart from "./pages/Cart/Cart.jsx";
import Notifications from "./pages/Notifications/Notifications.jsx";
import ProductDetails from "./pages/ProductDetails/ProductDetails.jsx";
import BillingInfo from "./pages/Billing/BillingInfo.jsx";
import CheckoutPayment from "./pages/CheckoutPayment/CheckoutPayment.jsx";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset" element={<ResetPassword />} />
        <Route path="/check" element={<CheckMail />} />

        <Route path="/home" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/history" element={<History />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/promotion" element={<Promotion />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/report" element={<Report />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/billing" element={<BillingInfo />} />
          <Route path="/checkout-payment" element={<CheckoutPayment />} />

      </Routes>
    </Router>
  );
}

export default App;
