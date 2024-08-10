import { createContext, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { userService } from "../services/apiServices";
import { toast } from "sonner";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registerInfo, setRegisterInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  // console.log("registerInfo ==>", registerInfo);
  // console.log("loginInfo ==>", loginInfo);

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
      setIsLoading(true);
      setError(null);
      try {
        const res = await userService.register(registerInfo);
        setIsLoading(false);

        if (res.data.error || res.data.message) {
          setError(res.data.error || res.data.message);
          toast.error(res.data.error || res.data.message);
          return;
        }

        localStorage.setItem("User", JSON.stringify(res.data));
        setUser(res.data);
        toast.success("Registration successful!");
      } catch (error) {
        setIsLoading(false);
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred during registration";
        setError(errorMessage);
        toast.error(errorMessage);
      }
    },
    [registerInfo]
  );

  const loginUser = useCallback(
    async (e) => {
      e.preventDefault();
      setIsLoading(true);
      setError(null);
      try {
        const res = await userService.login(loginInfo);
        setIsLoading(false);

        if (res.data.error || res.data.message) {
          setError(res.data.error || res.data.message);
          toast.error(res.data.error || res.data.message);
          return;
        }

        localStorage.setItem("User", JSON.stringify(res.data));
        setUser(res.data);
        toast.success("Login successful!");
      } catch (error) {
        setIsLoading(false);
        const errorMessage =
          error.response?.data?.message || "An error occurred during login";
        setError(errorMessage);
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
        error,
        isLoading,
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
