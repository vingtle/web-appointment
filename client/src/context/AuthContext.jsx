import React, {
    createContext,
    useState,
    useContext,
    useMemo,
    useEffect,
  } from "react";
  import { toast } from "react-toastify";
  import PropTypes from "prop-types";
  
  const AuthContext = createContext();
  
  const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const getAuth = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/user/refresh`,
            { credentials: "include" }
          );
          if (response.ok) {
            const token = response.headers.get("Authorization");
            const user = await response.json();
            setAuth({ user, token });
          } else {
            setAuth(null);
          }
        } catch (error) {
          console.error("Authentication error:", error);
          setAuth(null);
        } finally {
          setIsLoading(false);
        }
      };
      getAuth();
    }, []);
  
    const logout = async () => {
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/user/logout`, {
          method: "POST",
          credentials: "include",
        });
        setAuth(null);
        toast.success("Logged out successfully.");
      } catch (error) {
        console.error("Logout error:", error);
        toast.error("Failed to log out. Please try again.");
      }
    };
  
    const isAdmin = auth?.user?.role === "admin";
    const isUser = auth?.user?.role === "user";
  
    const value = useMemo(
      () => ({
        auth,
        setAuth,
        logout,
        isAdmin,
        isUser,
        isLoading,
      }),
      [auth, isLoading]
    );
  
    return (
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
  };
  
  AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };
  
  const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  };
  
  export { AuthProvider, useAuth };
  