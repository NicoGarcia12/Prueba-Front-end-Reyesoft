import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { getSystems } from "../../redux/actions";
import { NavLink, useNavigate } from "react-router-dom";
import "./Systems.css";
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
      <NavBar />
      <h1>Sistemas de cambio activos</h1>
      <h3>Elija el sistema con el que quiera enviar</h3>
      <div className="systems">
        <div className="systems-container">
          {systems.map((system) => (
            <div key={system.id} className="system">
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
