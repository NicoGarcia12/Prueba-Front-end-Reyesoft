import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Login from "./views/Login/Login";
import Systems from "./views/Systems/Systems";
import SystemDetail from "./views/SystemDetail/SystemDetail";
import Cookies from "js-cookie";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const validRoutes = ["/login", "/systems", "/systems/:id_system"];
    if (!validRoutes.includes(location.pathname)) {
      navigate("/login");
    } else {
      const usuarioCookie = Cookies.get("usuario");
      if (location.pathname.includes("/login")) {
        if (usuarioCookie && usuarioCookie === "John Doe") {
          navigate("/systems");
        }
      } else {
        if (!usuarioCookie || usuarioCookie !== "John Doe") {
          navigate("/login");
        }
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/systems" element={<Systems />} />
        <Route path="/systems/:id_system" element={<SystemDetail />} />
      </Routes>
    </div>
  );
}

export default App;
