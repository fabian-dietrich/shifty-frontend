import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
const AuthContext = createContext();

// This component will wrap our entire app and provide auth state to all components
function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to verify the token when app loads or refreshes
  const verifyToken = async () => {
    // Get the token from localStorage
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      try {
        // Verify the token with the backend
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/verify`,
          {
            headers: { Authorization: `Bearer ${storedToken}` }
          }
        );

        // Token is valid! Set user data
        setIsLoggedIn(true);
        setUser(response.data.user);
        setIsLoading(false);
      } catch (error) {
        // Token is invalid or expired
        console.error("Token verification failed:", error);
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
        localStorage.removeItem("authToken"); // Clean up invalid token
      }
    } else {
      // No token found
      setIsLoading(false);
    }
  };

  // Run verifyToken when the component mounts (app loads)
  useEffect(() => {
    verifyToken();
  }, []);

  // Function to log out
  const logout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  // Function to log in (called after successful login)
  const login = async (token) => {
    localStorage.setItem("authToken", token);
    await verifyToken(); // Wait for verification to complete
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        isLoading,
        login,
        logout,
        verifyToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };