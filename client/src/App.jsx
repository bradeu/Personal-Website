import React from "react";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./components/HomePage";
import AboutSection from "./components/AboutSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import NeonBlobs from "./components/NeonBlobs";
import RainbowGradient from "./components/RainbowGradient";
import "./App.css"

export default function App() {
  return (
    <div className="app-container" style={{ isolation: 'isolate', position: 'relative', background: 'transparent' }}>
      <NeonBlobs />
      <RainbowGradient />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <NavigationBar />
        <main className="main-content">
          <HomePage />
          <AboutSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  )
}
