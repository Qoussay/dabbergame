import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AddListingPage from "./pages/AddListingPage";
import { useState } from "react";

import ReactModal from "react-modal";

function App() {
  return (
    <div id="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sell" element={<AddListingPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;

// TO-DO:
//   - responsive design: make the padding 80 when on mac screen but 96 when on 1920 monitor
