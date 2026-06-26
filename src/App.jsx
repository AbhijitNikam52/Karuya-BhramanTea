import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Magazine from "./pages/Magazine";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import TourDetails from "./pages/TourDetails";
import Packages from "./pages/Packages";
import NationalTourism from "./pages/NationalTourism";
import InternationalTourism from "./pages/InternationalTourism";
import StateTourism from "./pages/StateTourism";
import Hinduism from "./pages/Hinduism";
import Shop from "./pages/Shop";
import BlogDetails from "./pages/BlogDetails";

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/magazine" element={<Magazine />} />
          <Route path="/magazine/:id" element={<BlogDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/tours/ladakh-adventure" element={<TourDetails />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/national-tourism" element={<NationalTourism />} />
          <Route path="/international-tourism" element={<InternationalTourism />} />
          <Route path="/state-tourism" element={<StateTourism />} />
          <Route path="/hinduism" element={<Hinduism />} />
          <Route path="/shop" element={<Shop />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
