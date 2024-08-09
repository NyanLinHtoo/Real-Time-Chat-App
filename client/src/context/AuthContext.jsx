import { createContext, useCallback, useState } from "react";
import PropTypes from "prop-types";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log("Register Info ==>", registerInfo);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  return (
    <AuthContext.Provider value={{ user, registerInfo, updateRegisterInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
