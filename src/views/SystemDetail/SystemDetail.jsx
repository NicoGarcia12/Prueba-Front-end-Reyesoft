import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { getSystemById } from "../../redux/actions";
import validationChange from "../../utils/validationChange";
import styles from "./SystemDetail.module.css";

export default function SystemDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const systems = useSelector((state) => state.systems);
  const systemDetails = useSelector((state) => state.systemDetails);
  const currencies = useSelector((state) => state.currencies);
  const [loading, setLoading] = useState(true);
  const [systemChange, setSystemChange] = useState([]);
  const [numberChange, setNumberChange] = useState(1);
  const [errors, setErrors] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    const usuarioCookie = Cookies.get("usuario");
    if (!usuarioCookie || usuarioCookie !== "John Doe") {
      navigate("/login");
    }
    const systemFound = systems.find((system) => system.id === id);
    if (systemFound) {
      dispatch(getSystemById(id));
    } else {
      alert("No hay un id o hay uno incorrecto");
      navigate("/login");
    }
  }, [dispatch, navigate, systems, id]);

  useEffect(() => {
    if (systemDetails.data && systemDetails.data.id === id && currencies) {
      setLoading(false);
    }
  }, [systemDetails, id, currencies]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(getSystemById(id));
    }, 30000);

    return () => clearInterval(intervalId);
  }, [dispatch, id]);

  useEffect(() => {
    if (!systemDetails.rates || !currencies || !systems) return;

    let systemCurrency = systems.filter(
      (system) => system.attributes.currency === selectedCurrency
    );
    let systemChangeIds = systemCurrency.map((system) => system.id);
    let systemChangeDetails = systemCurrency.map((system) => {
      return {
        id: system.id,
        name: system.attributes.name,
        urlImage: system.urlImage,
      };
    });
    let filteredRates = systemDetails.rates.filter((rate) =>
      systemChangeIds.includes(rate.attributes.system_id)
    );
    const prices = filteredRates.reduce((acc, rate) => {
      acc[rate.attributes.system_id] = rate.attributes.price;
      return acc;
    }, {});
    const updatedSystemChange = systemChangeDetails
      .map((system) => ({
        ...system,
        price: prices[system.id] !== undefined ? prices[system.id] : null,
      }))
      .filter((system) => system.price !== null);
    setSystemChange(updatedSystemChange);
  }, [systemDetails, currencies, systems, selectedCurrency]);

  const getRates = (event) => {
    const { value } = event.target;
    setSelectedCurrency(value);
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setNumberChange(value);
    setErrors(
      validationChange({
        ...setNumberChange,
        change: value,
      })
    );
  };

  return (
    <div className="container">
      <h1>
        {systemDetails.data &&
          systemDetails.data.attributes &&
          systemDetails.data.attributes.name}
      </h1>
      <div className={styles["system-detail-container"]}>
        {!loading ? (
          <>
            <div className={styles["container-information"]}>
              <img
                src={systemDetails.data.urlImage}
                alt={systemDetails.data.id}
              />
              {systemDetails.system_information[0] && (
                <div>
                  <h3>Breve descripción</h3>
                  <p>
                    {systemDetails.system_information[0].attributes.description}
                  </p>
                </div>
              )}
              <h3>
                Cantidad de {systemDetails.data.attributes.currency} a enviar
              </h3>
              <input
                type="number"
                name="numberChange"
                value={numberChange}
                onChange={handleInputChange}
              />
              {errors.change && (
                <span className={styles["error-message"]}>{errors.change}</span>
              )}
              <h3>¿Qué moneda querés recibir?</h3>
              {currencies.map((currency) => (
                <div className={styles["currency-radio"]} key={currency.id}>
                  <label>{currency.id}</label>
                  <input
                    type="radio"
                    name="currencyChange"
                    value={currency.id}
                    checked={selectedCurrency === currency.id}
                    onChange={getRates}
                  />
                </div>
              ))}
            </div>
            <div className={styles["container-change"]}>
              {systemChange.length > 0 ? (
                <>
                  <h3>Tasas de cambio:</h3>
                  {systemChange.map((system) => {
                    const calculatedPrice = (
                      numberChange / system.price
                    ).toFixed(2);
                    return (
                      <div className={styles["systemChange"]}>
                        <img src={system.urlImage} alt={system.name} />
                        <span>
                          {isNaN(numberChange) || numberChange <= 0
                            ? "No puede calcularse, ponga un número válido"
                            : calculatedPrice >= 0.01
                            ? `Recibirás aproximadamente ${calculatedPrice}
                            ${selectedCurrency}`
                            : `Menos de 0.01 ${selectedCurrency}`}
                        </span>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className={styles["systemChange"]}>
                  <h3>No hay tasas de cambio disponibles con esta moneda</h3>
                </div>
              )}
            </div>
          </>
        ) : (
          <div>
            <span>Cargando...</span>
          </div>
        )}
      </div>
    </div>
  );
}
