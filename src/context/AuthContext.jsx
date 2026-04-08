import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const verifyToken = async () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        );

        setIsLoggedIn(true);
        setUser(response.data.user);
        setIsDemo(response.data.isDemo || false);
        setIsLoading(false);
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsLoggedIn(false);
        setUser(null);
        setIsDemo(false);
        setIsLoading(false);
        localStorage.removeItem("authToken");
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setIsDemo(false);
    setUser(null);
  };

  const login = async (token) => {
    localStorage.setItem("authToken", token);
    await verifyToken();
  };

  const demoLogin = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/demo-login`
      );

      const { authToken } = response.data;
      localStorage.setItem("authToken", authToken);
      await verifyToken();
      return { success: true };
    } catch (error) {
      console.error("Demo login failed:", error);
      return {
        success: false,
        error:
          error.response?.data?.errorMessage ||
          "Failed to start demo. Please try again.",
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isDemo,
        user,
        isLoading,
        login,
        demoLogin,
        logout,
        verifyToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };