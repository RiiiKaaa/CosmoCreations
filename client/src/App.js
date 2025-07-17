import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hardware from "./pages/hardware.js";
import Owner from "./pages/owner.js";
import Contact from "./pages/contact.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hardware />} />
        <Route path="/owner" element={<Owner />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;