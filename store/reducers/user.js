import { setToken, removeToken, getToken } from "../../utils/token";
import { LOGIN, LOGOUT } from '../actions/user';
const initialState = {
  isAuthenticated: false,
  loading: true,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN:
      //setToken(payload.token);
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };

    case LOGOUT:
      //removeToken();
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};
