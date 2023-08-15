import React from "react";
import Signup from "./Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;