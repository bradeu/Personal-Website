import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
];

/**
 * From-scratch corner HUD navigation — no component library.
 * Fixed monogram top-left, links top-right. Section links scroll on the
 * main page and navigate home first from other pages; Play routes to
 * the /playground page. Hidden during the dot intro via
 * html[data-intro="1"].
 */
export default React.memo(function NavigationBar() {
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const onPlayground = location.pathname === "/playground";

  useEffect(() => {
    if (onPlayground) return;
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      for (const { id } of SECTIONS) {
        const element = document.getElementById(id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onPlayground]);

  const goToSection = (sectionId) => {
    if (onPlayground) {
      navigate("/", { state: { scrollTo: sectionId } });
      return;
    }
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="site-nav">
      {/* top-left monogram */}
      <button
        className="nav-monogram"
        onClick={() => goToSection("home")}
        aria-label="Back to top"
      >
        BS<span className="nav-monogram-dot">.</span>
      </button>

      {/* top-right links + theme toggle */}
      <nav className="nav-links" aria-label="Site">
        {SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            className={`nav-item${!onPlayground && activeSection === id ? " nav-item--active" : ""}`}
            onClick={() => goToSection(id)}
          >
            {label}
          </button>
        ))}
        <button
          className={`nav-item${onPlayground ? " nav-item--active" : ""}`}
          onClick={() => navigate("/playground")}
        >
          Play
        </button>
        <ThemeToggle />
      </nav>
    </header>
  );
});
