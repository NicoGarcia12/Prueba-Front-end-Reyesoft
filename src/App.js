import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login/Login";
import Systems from "./views/Systems/Systems";
import SystemDetail from "./views/SystemDetail/SystemDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/systems/:id" element={<SystemDetail />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
