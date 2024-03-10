import { useEffect, useState } from "react";
import validation from "../../utils/validationForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/actions";
import Cookies from "js-cookie"; // Importar js-cookie

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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          id="inputEmail"
          value={user.email}
          onChange={handleInputChange}
        />
        {errors.email && <span>{errors.email}</span>}
        <br />
        <input
          type="password"
          name="password"
          id="inputPassword"
          value={user.password}
          onChange={handleInputChange}
        />
        {errors.password && <span>{errors.password}</span>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
