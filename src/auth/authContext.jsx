import { createContext, useContext } from "react";
import { useProvideAuth } from ".";

const authContext = createContext({});
// Provider component that wraps your app and makes auth object ..
// ... available to any child component that calls useAuth().

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

// Hook for child components to get the auth object ...
// ... and re-render when it changes.

export const useAuth = () => {
  return useContext(authContext);
};
