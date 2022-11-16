import { createContext, useContext, useState, useEffect } from "react";

//create the context
const UserContext = createContext({
  loggedUser: null,
  setLoggedUser: () => {},
});

// Custom hook, returns array with state, setter
export const useUserContext = () => useContext(UserContext);

// Convenience hook so you don't have to destructure
// everywhere, returns read-only state
export const useUserContextState = () => {
  const [state] = useContext(UserContext);
  return state;
};

export function UserContextProvider({ children }) {
  const [loggedUser, setLoggedUser] = useState(null);

  useEffect(() => {
    setLoggedUser(localStorage.getItem("user"));
    // console.log(loggedUser);
  }, [loggedUser]);

  const value = {
    loggedUser,
    setLoggedUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
