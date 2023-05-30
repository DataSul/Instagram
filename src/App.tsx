import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./Pages/LoginPage/LoginPage";
import SignupPage from "./Pages/SignupPage/SignupPage";
import HomePage from "./Pages/HomePage/HomePage";

interface Props {
  onClose: () => void; // Function to handle close action
  onUpload: () => void; // Function to handle upload action
  username: string;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <HomePage onClose={() => {}} onUpload={() => {}} username="" />
            }
          />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
