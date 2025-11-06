import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // React Router for navigation

// Core layout components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Page components
import Home from "./components/Home/Home";
import About from "./components/About/About";
import Team from "./components/Team/Team";
import Trips from "./components/Trips/Trips";
import Contact from "./components/Contact/Contact";
import NotFound from "./components/NotFound";
import Calendar from "./components/Calendar/Calendar";

// Auth components
import AuthModule from "./components/Auth/Auth";
import AuthRegister from "./components/Auth/AuthRegister";
import AuthLogin from "./components/Auth/AuthLogin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import "./App.css";

export default function App() {
  return (
    <div className="appLayout">
      <BrowserRouter>
        <Navbar />
        <main className="appContent">
          <Routes>
            <Route path="/" element={<Home />} /> {/* Home */}
            <Route path="/about" element={<About />} /> {/* About */}
            <Route path="/team" element={<Team />} /> {/* Team */}
            <Route path="/trips" element={<Trips />} /> {/* Trips */}
            <Route path="/contact" element={<Contact />} /> {/* Contact */}
            <Route
              path="/calendar"
              element={<ProtectedRoute element={Calendar} />}
            />
            {/* Auth routes */}
            <Route path="/auth" element={<AuthModule />} />
            <Route path="/auth/register" element={<AuthRegister />} />
            <Route path="/auth/login" element={<AuthLogin />} />
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
