import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hardware from "./pages/hardware.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hardware />} />
      </Routes>
    </Router>
  );
}

export default App;