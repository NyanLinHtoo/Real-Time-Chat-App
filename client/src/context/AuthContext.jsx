import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { userService } from "../services/apiServices";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [registerError, setRegisterError] = useState(null);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = localStorage.getItem("User");

    setUser(JSON.parse(user));
  }, []);

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const updateLoginInfo = useCallback((info) => {
    setLoginInfo(info);
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

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoginLoading(true);
      setLoginError(null);
      try {
        const res = await userService.login(loginInfo);
        setIsLoginLoading(false);

        if (res.data.error || res.data.message) {
          setLoginError(res.data.error || res.data.message);
          toast.error(res.data.error || res.data.message);
          return;
        }

        localStorage.setItem("User", JSON.stringify(res.data));
        setUser(res.data);
        toast.success("Login successful!");
      } catch (error) {
        setIsLoginLoading(false);
        const errorMessage =
          error.response?.data?.message || "An error occurred during login";
        setLoginError(errorMessage);
        toast.error(errorMessage);
      }
    },
    [loginInfo]
  );

  const logoutUser = useCallback(() => {
    localStorage.removeItem("User");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        isRegisterLoading,
        isLoginLoading,
        loginError,
        logoutUser,
        updateLoginInfo,
        loginUser,
        loginInfo,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
