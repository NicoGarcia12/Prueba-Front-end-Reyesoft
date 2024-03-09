import { LOGIN_USER, GET_SYSTEMS } from "./actions";

const initialState = {
  user: "",
  systems: [],
  copySistems: [],
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
      const systemsWithImages = systems.map((system) => ({
        ...system,
        urlImage: `https://api.saldo.com.ar/img/sistemas2/${system.id}.big.webp`,
      }));
      return {
        ...state,
        systems: systemsWithImages,
        copySistems: systemsWithImages,
      };
    default:
      return { ...state };
  }
};

export default rootReducer;
