import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";

import "./App.scss";
import HomePage from "./pages/HomePage/HomePage";
import PeerPage from "./pages/PeerPage/PeerPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/peerSupport" element={<PeerPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
