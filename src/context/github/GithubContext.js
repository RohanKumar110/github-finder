import githubReducer from "./GithubReducer";
import { useReducer, createContext } from "react";
import { GET_USER, GET_USERS, CLEAR_USERS, SET_LOADING } from "../types";

const GithubContext = createContext();
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    user: {},
    users: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      method: "GET",
      // headers: {
      //   Authorization: `token ${GITHUB_TOKEN}`,
      // },
    });
    const { items } = await response.json();
    dispatch({ type: GET_USERS, payload: items });
  };

  const getUser = async (login) => {
    setLoading();
    console.log("");
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      // headers: {
      //   Authorization: `token ${GITHUB_TOKEN}`,
      // },
    });

    if (response.state === 404) {
      window.location = "/notfound";
      return;
    }

    const data = await response.json();
    dispatch({ type: GET_USER, payload: data });
  };

  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  return (
    <GithubContext.Provider
      value={{
        user: state.user,
        users: state.users,
        isLoading: state.isLoading,
        getUser,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
