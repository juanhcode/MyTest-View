import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [decodedToken, setDecodedToken] = useState(null);

  const saveTokenToLocalStorage = (token) => {
    // Guardar el token en el almacenamiento local
    localStorage.setItem("token", token);

    // Decodificar el token
    const decoded = jwtDecode(token);

    // Guardar el token decodificado en el estado del contexto
    setDecodedToken(decoded);

    localStorage.setItem("decodedToken", JSON.stringify(decoded));

    console.log(decoded)

  };

  return (
    <AuthContext.Provider value={{ decodedToken, saveTokenToLocalStorage }}>
      {children}
    </AuthContext.Provider>
  );
};
