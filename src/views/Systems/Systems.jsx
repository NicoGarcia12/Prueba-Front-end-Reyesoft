import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSystems } from "../../redux/actions";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Systems.module.css";
import Cookies from "js-cookie";

export default function Systems() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const systems = useSelector((state) => state.systems);

  useEffect(() => {
    const usuarioCookie = Cookies.get("usuario");
    if (!usuarioCookie || usuarioCookie !== "John Doe") {
      navigate("/login");
    } else {
      dispatch(getSystems());
    }
  }, [dispatch, navigate]);

  return systems.length > 0 ? (
    <div>
      <h1>Sistemas de cambio activos</h1>
      <h2>Elija el sistema con el que quiera enviar dinero</h2>
      <div className={styles["systems"]}>
        <div className={styles["systems-container"]}>
          {systems.map((system) => (
            <div key={system.id} className={styles["system"]}>
              <NavLink to={`/systems/${system.id}`}>
                <img src={system.urlImage} alt={system.attributes.name} />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : null;
}
