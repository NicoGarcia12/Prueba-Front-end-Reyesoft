import axios from "axios";
export const LOGIN_USER = "LOGIN_USER";
export const GET_SYSTEMS = "GET_SYSTEMS";
export const url = "https://api.saldo.com.ar";
axios.defaults.baseURL = url;

export const loginUser = (user) => {
  const endpoint = "/bridge/login";
  return async (dispatch) => {
    try {
      const response = await axios.post(endpoint, user);
      dispatch({
        type: LOGIN_USER,
        payload: response.data.name,
      });
      return response.data.name;
    } catch (error) {
      throw error;
    }
  };
};

export const getSystems = () => {
  const endpoint = "/v3/systems";
  return (dispatch) => {
    axios(endpoint).then(({ data }) => {
      return dispatch({
        type: GET_SYSTEMS,
        payload: data,
      });
    });
  };
};

