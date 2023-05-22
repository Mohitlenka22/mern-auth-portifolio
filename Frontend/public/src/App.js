import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import PasswordReset from "./Components/PasswordReset";
import ForgotPassword from "./Components/ForgotPassword";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/About" element={<About />} />
          <Route exact path="/Contact" element={<Contact />} />
          <Route exact path="/Signup" element={<Signup />} />
          <Route exact path="/Login" element={<Login />} />
          <Route exact path="/:userToken" element={<PasswordReset />} />
          <Route exact path="/ForgotPassword" element={<ForgotPassword />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
