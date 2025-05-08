import React, { Suspense, lazy, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Reviews from "./Screens/Reviews";

// Lazy load pages
const Home = lazy(() => import("./Screens/Home"));
const Category = lazy(() => import("./Screens/Category"));
const Aboutus = lazy(() => import("./Screens/Aboutus"));
const Contactus = lazy(() => import("./Screens/Contactus"));

const SyntheticPage = lazy(() => import("./Categories/SyntheticPage"));
const ZariPage = lazy(() => import("./Categories/ZariPage"));
const CottonPage = lazy(() => import("./Categories/CottonPage"));
const ShaluPage = lazy(() => import("./Categories/ShaluPage"));
const FancyPage = lazy(() => import("./Categories/FancyPage"));
const AdminUploadPage = lazy(() => import('./pages/AdminUploadPage'));

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  // Scroll to top when the route changes
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* Scroll to top on route change */}
      <Navbar />
      <div className="pt-[80px]">
        <Routes>
          <Route path="/" element={
            <Suspense fallback={<div>Loading...</div>}>
              <section id="home">
                <Home />
              </section>
              <section id="category">
                <Category />
              </section>
              <section id="aboutus">
                <Aboutus />
              </section>
              <section id="reviews">
                <Reviews />
              </section>
              <section id="contactus">
                <Contactus />
              </section>
            </Suspense>
          } />
          <Route path="/synthetic" element={<Suspense fallback={<div>Loading...</div>}><SyntheticPage /></Suspense>} />
          <Route path="/zari" element={<Suspense fallback={<div>Loading...</div>}><ZariPage /></Suspense>} />
          <Route path="/cotton" element={<Suspense fallback={<div>Loading...</div>}><CottonPage /></Suspense>} />
          <Route path="/shalu" element={<Suspense fallback={<div>Loading...</div>}><ShaluPage /></Suspense>} />
          <Route path="/fancy" element={<Suspense fallback={<div>Loading...</div>}><FancyPage /></Suspense>} />
          <Route path="/admin/upload" element={<Suspense fallback={<div>Loading...</div>}><AdminUploadPage /></Suspense>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
