import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const usuarioCookie = Cookies.get("usuario");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("usuario");
    navigate("/login");
  };

  return (
    <div className={styles["navbar-container"]}>
      <NavLink to="/systems" className={styles.navLink}>
        <button className={styles["systems-button"]}>Home</button>
      </NavLink>
      <span className={styles.username}>Bienvenido {usuarioCookie}</span>
      <button className={styles["logout-button"]} onClick={handleLogout}>
        Cerrar sesión
      </button>
    </div>
  );
}
