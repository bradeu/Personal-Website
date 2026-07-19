import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import AboutSection from "./components/AboutSection";
import WorkSection from "./components/WorkSection";
import PlaygroundSection from "./components/PlaygroundSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import NeonBlobs from "./components/NeonBlobs";
import CustomCursor from "./components/CustomCursor";
import DotPortal from "./components/fx/DotPortal";
import "./App.css"

function MainPage() {
  const location = useLocation();

  /* arriving from another page with a target section (e.g. nav click
     on /playground) — jump there once mounted */
  useEffect(() => {
    const target = location.state?.scrollTo;
    if (target) {
      requestAnimationFrame(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [location.state]);

  return (
    <main className="main-content">
      <DotPortal>
        <HomePage />
      </DotPortal>
      <AboutSection />
      <WorkSection />
      <ContactSection />
    </main>
  );
}

export default function App() {
  return (
    <div className="app-container" style={{ isolation: 'isolate', position: 'relative', background: 'transparent' }}>
      <CustomCursor />
      <NeonBlobs />
      <div className="grain" aria-hidden="true" />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/playground" element={<PlaygroundSection />} />
        </Routes>
        <Footer />
      </div>
    </div>
  )
}
