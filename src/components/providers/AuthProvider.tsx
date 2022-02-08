import React from "react";
import { authenticate, logout } from "../services/AuthenticationService";

interface AuthContextType {
    valid: () => boolean;
    signin: (user: string, callback: VoidFunction, errorCallback: (message: any) => void) => void;
    signout: (callback: VoidFunction) => void;
  }
  
let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    let signin = (newUser: string, callback: VoidFunction, errorCallback: (message: any) => void) => {
      return authenticate(newUser, (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        callback();
      }, (message) => {
        errorCallback(message);
      });
    };
  
    let signout = (callback: VoidFunction) => {
      return logout(() => {
        localStorage.removeItem("tokens");
        callback();
      });
    };
  
    let valid = () => {
        let localStorageData = localStorage.getItem("tokens")
        return localStorageData !== null;
    }

    let value = { valid, signin, signout };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;

export function useAuth() {
    return React.useContext(AuthContext);
}