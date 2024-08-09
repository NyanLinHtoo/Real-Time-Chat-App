import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { userService } from "../services/apiServices";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  console.log("User ==>", user);

  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const registerUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsRegisterLoading(true);
      setRegisterError(null);
      try {
        const res = await userService.register(registerInfo);
        setIsRegisterLoading(false);

        if (res.data.error || res.data.message) {
          setRegisterError(res.data.error || res.data.message);
          toast.error(res.data.error || res.data.message);
          return;
        }

        localStorage.setItem("User", JSON.stringify(res.data));
        setUser(res.data);
        toast.success("Registration successful!");
      } catch (error) {
        setIsRegisterLoading(false);
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during registration";
        setRegisterError(errorMessage);
        toast.error(errorMessage);
      }
    },
    [registerInfo]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
