import React, { useContext, useState } from 'react'
import { createContext } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({children}) => {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    // cek token apakah tersedia atau tidak   
  const setToken = (token) => {
      _setToken(token);
      if (token) {
          //untuk menyimpan token di localStorage jika nilai token yang diberikan tidak kosong
          localStorage.setItem("ACCESS_TOKEN", token);
      } else {
          localStorage.removeItem("ACCESS_TOKEN");
      }
  };

  return (
      <StateContext.Provider
          value={{
              user,
              setUser,
              token,
              setToken,
          }}
      >
          {children}
      </StateContext.Provider>
  );
}


// hook untuk mengakses nilai-nilai dari StateContext.
export const useStateContext = () => useContext(StateContext);