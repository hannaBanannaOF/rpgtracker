import React, { useEffect, useState } from "react";
import { CurrentUser } from "../models/CurrentUser";
import { AccountService } from "../services/AccountService";
import { logout } from "../services/AuthenticationService";

interface AuthContextType {
    currentUser: CurrentUser | undefined;
    setCurrUser: () => Promise<void>;
    valid: boolean;
    signout: () => Promise<void>;
  }
  
let AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(undefined);
    const [valid, setValid] = useState(false);

    let updateStates = () => {
      const storagedUser = localStorage.getItem('user-data');
      const storagedToken = localStorage.getItem('tokens');
  
      if (storagedToken && storagedUser) {
        setCurrentUser(JSON.parse(storagedUser));
        setValid(true);
      } else {
        setCurrentUser(undefined);
        setValid(false);
      }
    }

    useEffect(() => {
      updateStates();
    }, []);

    let setCurrUser = async () => {
      let res = await AccountService.getCurrentUserObj();
      localStorage.setItem("user-data", JSON.stringify(res.data));
      updateStates();
    }

    let signout = async () => {
      return await logout(() => {
        localStorage.removeItem("tokens");
        localStorage.removeItem("user-data");
        updateStates();
      });
    };

    let value = { valid, signout, currentUser, setCurrUser };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}