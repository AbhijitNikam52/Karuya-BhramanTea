import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import CartDrawer from "./components/CartDrawer";
import AdminSidebar from "./components/AdminSidebar";

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
import AdminShop from "./pages/AdminShop";
import AdminBlogs from "./pages/AdminBlogs";
import Profile from "./pages/Profile";
import AdminPackages from "./pages/AdminPackages";
import AdminGallery from "./pages/AdminGallery";
import AdminDocuments from "./pages/AdminDocuments";
import ClientDocuments from "./pages/ClientDocuments";
import GalleryDetails from "./pages/GalleryDetails";
import FAQ from "./pages/FAQ";
import AdminFAQ from "./pages/AdminFAQ";
import AdminTestimonials from "./pages/AdminTestimonials";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import AdminBanners from "./pages/AdminBanners";

function App() {
  const { pathname } = useLocation();
  const isAdminPath = pathname.startsWith("/admin");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FAF8F5]">
      {!isAdminPath && <Header />}
      <AdminSidebar />

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/documents" element={<ClientDocuments />} />
          <Route path="/gallery/:id" element={<GalleryDetails />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/admin/shop" element={<AdminShop />} />
          <Route path="/admin/blogs" element={<AdminBlogs />} />
          <Route path="/admin/packages" element={<AdminPackages />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/documents" element={<AdminDocuments />} />
          <Route path="/admin/faq" element={<AdminFAQ />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/banners" element={<AdminBanners />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
        </Routes>
      </main>

      {!isAdminPath && <Footer />}
      {!isAdminPath && <ChatWidget />}
      {!isAdminPath && <CartDrawer />}
    </div>
  );
}

export default App;
