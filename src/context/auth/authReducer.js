import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return{
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false
      }
    
    
    case REGISTER_SUCCESS:
      // localStorage.setItem("token", null);
      return {
        ...state,
        ...action.payload,
        isAuthenticated:false,
        loading: false,
        message: action.payload.data.message
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        message: action.payload.data.message,
        user: action.payload.data
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
      
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }
    default:
      return state;
  }
};
