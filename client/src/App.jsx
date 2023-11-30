import React from "react";
import {Routes, Route} from "react-router-dom";
import About from "./components/About"
import Contact from "./components/Contact"
import Resume from "./components/Resume"
import { useState } from "react";
import "./App.css"



export default function App() {
  return (
    <Routes >
      <Route path="/" element ={<About  />} />
      <Route path="/resume" element ={<Resume  />} />
      <Route path="/contact" element ={<Contact  />} />
    </Routes> 
  )
}
