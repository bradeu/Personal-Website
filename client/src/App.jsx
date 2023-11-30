import React from "react";
import {Routes, Route} from "react-router-dom";
import About from "./components/About"
import Contact from "./components/Contact"
import Resume from "./components/Resume"
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { useState, useCallback } from "react";
import "./App.css"



export default function App() {

  const [page, setPage] = useState("about");

  const handleSetActivePage = useCallback((pageName) => {
    setPage(pageName);
  }, [setPage]);

  return (
    <>
    <NavigationBar page={page} handleSetActivePage={handleSetActivePage} />
    <Routes >
      <Route path="/" element ={<About  />} />
      <Route path="/resume" element ={<Resume  />} />
      <Route path="/contact" element ={<Contact  />} />
    </Routes> 
    <Footer />
    </>
  )
}
