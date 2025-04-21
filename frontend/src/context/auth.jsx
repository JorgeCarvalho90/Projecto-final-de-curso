import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  isLogged: false,
  handleLogin: () => {},
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = (token) => {
    const payload = jwtDecode(token);
    if (Date.now() <= payload.exp * 1000) {
      localStorage.setItem("acessToken", token);
      setUser({ _id: payload._id, email: payload.email });
      setIsLogged(true);
    } else {
      setUser(null);
      setIsLogged(false);
    }
  };

  useEffect(() => {
    const acessToken = localStorage.getItem("acessToken");
    if (acessToken) {
      handleLogin(acessToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLogged, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
