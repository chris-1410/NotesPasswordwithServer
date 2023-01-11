import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./Components/HomePage";
import SignInSide from "./Components/SignInSide";
import SignUp from "./Components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
     <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" exact element={<SignInSide />} />
          <Route path="/Home" exact element={<HomePage />} />
          <Route path="/Signup" exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
