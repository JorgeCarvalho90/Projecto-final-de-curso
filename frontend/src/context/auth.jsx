import { createContext, useContext, useState } from "react";
import jwt from "jsonwebtoken";

const AuthContext = createContext({
  user: null,
  isLogged: false,
  handleLogin: () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = (token) => {
    const payload = jwt.decode(token);
    console.log(payload);
  };
  return (
    <AuthContext.Provider value={{ user, isLogged, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAtuhContext = () => useContext(AuthContext);
