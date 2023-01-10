import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HomePage } from "./Components/HomePage";
import SignInSide from "./Components/SignInSide";
import SignUp from "./Components/SignUp";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/Signin" exact element={<SignInSide />} />
          <Route path="/Home" exact element={<HomePage />} />
          <Route path="/Signup" exact element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
