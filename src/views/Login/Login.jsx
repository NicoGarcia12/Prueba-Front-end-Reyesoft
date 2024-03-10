import React, { useEffect, useState } from "react";
import validation from "../../utils/validationForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions";
import Cookies from "js-cookie";
import styles from "./Login.module.css";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const usuarioCookie = Cookies.get("usuario");
    if (usuarioCookie === "John Doe") {
      navigate("/systems");
    }
  }, [navigate]);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });

    setErrors(
      validation({
        ...user,
        [name]: value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errores = Object.values(errors);
    if (errores && errores.length > 0) {
      alert("Debe llenar todos los campos de manera correcta");
    } else {
      dispatch(loginUser(user))
        .then((response) => {
          const expirationMinutes = 30;
          const expirationDate = new Date();
          expirationDate.setTime(
            expirationDate.getTime() + expirationMinutes * 60 * 1000
          );
          Cookies.set("usuario", response, { expires: expirationDate });
          navigate(`/systems`);
        })
        .catch((error) => {
          alert(
            "Hubo un error al intentar loguearse el usuario, vuelva a intentar"
          );
        });
    }
  };

  return (
    <div className={styles["login-container"]}>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Email</label>
        <input
          type="email"
          name="email"
          id="inputEmail"
          value={user.email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        {errors.email && <span className={styles["error-message"]}>{errors.email}</span>}
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          id="inputPassword"
          value={user.password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        {errors.password && <span className={styles["error-message"]}>{errors.password}</span>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
