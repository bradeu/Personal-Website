import React from "react";
import {Routes, Route} from "react-router-dom";
import About from "./components/About"
import Contact from "./components/Contact"
import Resume from "./components/Resume"
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import { PageProvider } from './PageContext';
import "./App.css"

export default function App() {

  return (
    <>
    <PageProvider>
    <NavigationBar />
    <Routes >
      <Route path="/" element ={<About  />} />
      <Route path="/resume" element ={<Resume  />} />
      <Route path="/contact" element ={<Contact  />} />
    </Routes> 
    <Footer />
    </PageProvider>
    </>
  )
}
