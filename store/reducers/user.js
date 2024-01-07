import { setToken, removeToken, getToken } from "../../utils/token";
import { LOGIN, LOGOUT, UPDATE } from '../actions/user';
const initialState = {
  user: null,
  isAuthenticated: false
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      //setToken(payload.token);
      return {
        ...state,
        user: payload,
        isAuthenticated: true
      };

    case LOGOUT:
      //removeToken();
      return {
        ...state,
        user: null,
        isAuthenticated: false
      };

    case UPDATE:
      //setToken(payload.token);
      return {
        ...state,
        user: payload
      };
    default:
      return state;
  }
};
