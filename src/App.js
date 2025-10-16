import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // React Router for navigation

// Import all page components
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Team from "./components/Team/Team";
import Contact from "./components/Contact/Contact";
import Trips from "./components/Trips/Trips";
import NotFound from "./components/NotFound"; // 404 page for invalid routes

export default function App() {
  return (
    <BrowserRouter> {/* Enables client-side routing */}
      <Navbar /> {/* Navigation bar appears on all pages */}
      <Routes> {/* Container for all route definitions */}
        <Route path="/" element={<Home />} /> {/* Home page route */}
        <Route path="/about" element={<About />} /> {/* About page route */}
        <Route path="/team" element={<Team />} /> {/* Team page route */}
        <Route path="/trips" element={<Trips />} />
        <Route path="/contact" element={<Contact />} /> {/* Contact page route */}
        <Route path="*" element={<NotFound />} /> {/* Catch-all for 404 errors */}
      </Routes>
    </BrowserRouter>
  );
}