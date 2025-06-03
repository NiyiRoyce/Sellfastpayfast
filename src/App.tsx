import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages";
import Rate from "./pages/rate";
import Support from "./pages/support";
import AboutUs from "./pages/about";
import Login from "./pages/login";
import Signup from "./components/signUp/signUp";
import Error from "./components/error/404";
import Users from "./components/users/users"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rates" element={<Rate />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<Users />} />
        {/* 404 route must be last */}
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
