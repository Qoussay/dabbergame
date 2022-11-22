import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddListingPage from "./pages/AddListingPage";
import LoginModal from "./components/LoginModal";
import ListingPage from "./pages/ListingPage";
import ProfilePage from "./pages/ProfilePage";
import UpdateListingPage from "./pages/UpdateListingPage";
import { useState, useContext, createContext, useEffect } from "react";
import ErrorPage from "./components/ErrorPage";
import ListingsPage from "./pages/ListingsPage";

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState(true);

  const [alert, setAlert] = useState(false);

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
    <div id="App" className="flex flex-col h-screen ">
      <Navbar loginClick={() => handleOpen()} />
      <LoginModal
        open={openModal}
        closeButtonClick={() => handleClose()}
        type={modalType}
        switchButtonClick={handleModalSwitch}
      />
      <div className="desktop:px-80 laptop:px-60 pt-24 flex-1 h-full ">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sell" element={<AddListingPage />} />
          <Route path="/listing/:listingId" element={<ListingPage />} />
          <Route
            path="/listing/:listingId/update"
            element={<UpdateListingPage />}
          />
          <Route path="/user/:username" element={<ProfilePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// TO-DO:
//   - responsive design: make the padding 80 when on mac screen but 96 when on 1920 monitor
