import { useReducer } from "react";
import { SET_ALERT, REMOVE_ALERT } from "../types";
import githubReducer from "./alertReducer";
import AlertContext from "./AlertContext";

const AlertState = (props) => {
  const initialState = null;

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setAlert = (msg, type) => {
    dispatch({ type: SET_ALERT, payload: { msg, type } });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT });
    }, 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
