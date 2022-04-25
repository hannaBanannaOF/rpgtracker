import React, { useEffect, useState } from "react";
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
    
    const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(undefined);

    useEffect(() => {
      if (currentUser === undefined && valid()) {
        let userData = localStorage.getItem("user-data");
        if(userData) {
          setCurrentUser(JSON.parse(userData));
        } else {
          setCurrUser();
        }
      }
    }, [])

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
        setCurrentUser(res.data);
      });
    }

    let signout = (callback: VoidFunction) => {
      return logout(() => {
        localStorage.removeItem("tokens");
        callback();
      });
    };

    let getCurrUser = () => {
      return currentUser;
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