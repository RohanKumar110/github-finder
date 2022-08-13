import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import GithubContext from "../../context/github/GithubContext";
import { searchUsers } from "../../context/github/GithubActions";
import { GET_USERS, SET_LOADING, CLEAR_USERS } from "../../context/types";

function UserSearch() {
  const [text, setText] = useState("");
  const { setAlert } = useContext(AlertContext);
  const { users, dispatch } = useContext(GithubContext);

  const handleTextChange = (e) => setText(e.target.value);

  const handleClearClick = () => dispatch({ type: CLEAR_USERS });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter text!", "error");
      return;
    }
    dispatch({ type: SET_LOADING });
    const items = await searchUsers(text);
    dispatch({ type: GET_USERS, payload: items });
    setText("");
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                name="text"
                value={text}
                placeholder="Search..."
                onChange={handleTextChange}
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn bg-neutral text-white btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={handleClearClick} className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
