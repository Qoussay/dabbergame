import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddListingPage from "./pages/AddListingPage";
import LoginModal from "./components/LoginModal";
import { useState } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);

  const handleOpen = () => {
    setOpenModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setOpenModal(false);
    document.body.style.overflow = "auto";
  };
  return (
    <div id="App">
      <Navbar loginClick={() => handleOpen()} />
      <LoginModal open={openModal} closeButtonClick={() => handleClose()} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sell" element={<AddListingPage />} />
      </Routes>
    </div>
  );
}

export default App;

// TO-DO:
//   - responsive design: make the padding 80 when on mac screen but 96 when on 1920 monitor
