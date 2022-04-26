import React from "react";
import { CurrentUser } from "../models/CurrentUser";
import { AccountService } from "../services/AccountService";
import { authenticate, logout } from "../services/AuthenticationService";

interface AuthContextType {
    getCurrUser: () => CurrentUser | undefined;
    setCurrUser: () => void;
    valid: () => boolean;
    signin: (user: string, callback: VoidFunction, errorCallback: (message: any) => void) => void;
    signout: (callback: VoidFunction) => void;
  }
  
let AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    let signin = (newUser: string, callback: VoidFunction, errorCallback: (message: any) => void) => {
      return authenticate(newUser, (data) => {
        localStorage.setItem("tokens", JSON.stringify(data));
        setCurrUser();
        callback();
      }, (message) => {
        errorCallback(message);
      });
    };
  
    let setCurrUser = () => {
      AccountService.getCurrentUserObj().then((res) => {
        localStorage.setItem("user-data", JSON.stringify(res.data));
      });
    }

    let signout = (callback: VoidFunction) => {
      return logout(() => {
        localStorage.removeItem("tokens");
        localStorage.removeItem("user-data");
        callback();
      });
    };

    let getCurrUser = () => {
      let data = localStorage.getItem("user-data");
      if(data) {
        return JSON.parse(data);
      } else {
        return undefined;
      }
    }
  
    let valid = () => {
        let localStorageData = localStorage.getItem("tokens")
        return localStorageData !== null;
    }

    let value = { valid, signin, signout, getCurrUser, setCurrUser };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}