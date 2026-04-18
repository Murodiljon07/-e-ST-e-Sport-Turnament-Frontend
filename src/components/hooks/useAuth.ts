// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { decodeJWT } from "@/lib/jwt";
import { getCookie } from "cookies-next";

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      
      if (!token) {
        setIsLoggedIn(false);
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }

      // TOKENDAN ROLE VA USER MA'LUMOTLARINI O'QISH
      const decoded = decodeJWT(token);
      
      if (decoded) {
        const userRole = decoded.role || decoded.Role || "user";
        const userData = {
          id: decoded.id || decoded.sub,
          email: decoded.email,
          name: decoded.name || decoded.username || decoded.email?.split('@')[0],
          role: userRole
        };
        
        setIsLoggedIn(true);
        setUser(userData);
        setRole(userRole);
      } else {
        // Token invalid yoki expired
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        setUser(null);
        setRole(null);
      }
      
      setLoading(false);
    };

    checkAuth();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setUser(null);
    setRole(null);
    window.location.href = "/auth/login";
  };

  return { isLoggedIn, user, role, loading, logout };
}