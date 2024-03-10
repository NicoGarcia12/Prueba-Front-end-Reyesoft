import React from "react";
import "./App.css";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./views/Login/Login";
import Systems from "./views/Systems/Systems";
import SystemDetail from "./views/SystemDetail/SystemDetail";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/login" && (
        <>
          <NavBar />
        </>
      )}{" "}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/systems/:id" element={<SystemDetail />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
