import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/NavBar/NavBar";
import { getSystems } from "../../redux/actions";
import { NavLink } from "react-router-dom";
import "./Systems.css";

export default function Systems() {
  const dispatch = useDispatch();
  const systems = useSelector((state) => state.systems);

  useEffect(() => {
    dispatch(getSystems());
  }, [dispatch]);

  return (
    <div>
      <NavBar />
      <h1>Systems</h1>
      <h3>Elija el activo que desea vender</h3>
      <div className="systems">
        <div className="systems-container">
          {systems.map((system) => (
            <div key={system.id} className="system">
              <NavLink to={`/systems/${system.id}`}>
                <img src={system.urlImage} alt="" />
              </NavLink>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
