import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddListingPage from "./pages/AddListingPage";
import LoginModal from "./components/LoginModal";
import { useState } from "react";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(true);

  const handleOpen = () => {
    setOpenModal(true);
    setModalType(true);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setOpenModal(false);
    setModalType(true);
    document.body.style.overflow = "auto";
  };

  const handleModalSwitch = () => {
    setModalType(!modalType);
  };
  return (
    <div id="App">
      <Navbar loginClick={() => handleOpen()} />
      <LoginModal
        open={openModal}
        closeButtonClick={() => handleClose()}
        type={modalType}
        switchButtonClick={handleModalSwitch}
      />
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
