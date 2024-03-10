import { LOGIN_USER, GET_SYSTEMS, GET_SYSTEM_BY_ID } from "./actions";

const initialState = {
  user: "",
  systems: [],
  currencies: [],
  systemDetails: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_SYSTEMS:
      const systems = action.payload.data;
      const currencies = action.payload.included.filter(
        (item) => item.type === "currencies"
      );
      const systemsWithImages = systems.map((system) => ({
        ...system,
        urlImage: `https://api.saldo.com.ar/img/sistemas2/${system.id}.big.webp`,
      }));
      return {
        ...state,
        systems: systemsWithImages,
        currencies: currencies
      };
    case GET_SYSTEM_BY_ID:
      const rates = action.payload.included.filter(
        (item) => item.type === "rates"
      );
      const system_information = action.payload.included.filter(
        (item) => item.type === "system_information"
      );
      return {
        ...state,
        systemDetails: {
          data: {
            ...action.payload.data,
            urlImage: `https://api.saldo.com.ar/img/sistemas2/${action.payload.data.id}.big.webp`,
          },
          system_information: system_information,
          rates: rates,
        },
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
