import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Rate from "./pages/rate";
import Support from "./pages/support";
import AboutUs from "./pages/about";
import Login from "./pages/login";
import Signup from "./components/signUp/signUp";
import Error from "./components/error/404";
import Users from "./components/users/users";
import Resources from "./components/resources/resources";
import Settings from "./components/settings/settings";
import Otp from "./components/signup2/otpPage";

// Import new pages
import Market from "./components/market/market";
import Exchange from "./components/exchange/exchange";

function App() {
  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rates" element={<Rate />} />
          <Route path="/otp-verify" element={<Otp />} />
          <Route path="/market" element={<Market />} />
          <Route path="/exchange" element={<Exchange />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />   {/* Added settings route */}
          <Route path="/resources" element={<Resources />} /> {/* Added resources route */}
          {/* 404 route must be last */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
