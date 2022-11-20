import { createContext, useContext, useState, useEffect } from "react";

//create the context
const AlertContext = createContext({
  message: null,
  setMessage: () => {},
});

// Custom hook, returns array with state, setter
export const useAlertContext = () => useContext(AlertContext);

// Convenience hook so you don't have to destructure
// everywhere, returns read-only state
export const useAlertContextState = () => {
  const [state] = useContext(AlertContext);
  return state;
};

export function AlertContextProvider({ children }) {
  const [message, setMessage] = useState(null);

  const value = {
    message,
    setMessage,
  };

  return (
    <AlertContext.Provider value={value}>{children}</AlertContext.Provider>
  );
}
