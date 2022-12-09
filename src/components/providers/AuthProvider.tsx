import React, { useState } from "react";
import { useEffectOnce } from "../../utils/UseEffectOnce";

export interface AuthContextType {
    currentUser: any;
    valid: boolean;
    signout: () => Promise<void>;
    setTokens: (tokens: string) => Promise<void>;
    errorMessage: any;
    clearError: () => Promise<void>;
  }
  
export let AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [currentUser, setCurrentUser] = useState<any>(undefined);
    const [valid, setValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState<any>(undefined);

    let updateStates = () => {
      const storagedToken = localStorage.getItem('tokens');
      if (storagedToken) {
        let user = decodeToken(storagedToken);
        if (!(user?.resource_access?.rpgtracker?.roles?.find((e: string) => e === 'user') ?? false)) {
          setErrorMessage({
            message: `Você não tem permissão para acessar esse recurso!`,
            variant: "error",
            key: "error_no_permission"
          });
          setCurrentUser(undefined);
          setValid(false);
        } else {
          setErrorMessage(undefined)
          setCurrentUser(user);
          setValid(true);
        }
      } else {
        setCurrentUser(undefined);
        setErrorMessage(undefined);
        setValid(false);
      }
    }

    useEffectOnce(() => {
      updateStates();
    });

    let decodeToken = (token: string) => {
      let output = JSON.parse(token).access_token;
      var base64Url = output.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload)
    }

    let signout = async () => {
      const storagedToken = localStorage.getItem('tokens');
      localStorage.removeItem("tokens");
      window.location.replace(process.env.REACT_APP_KEYCLOAK_SIGNOUT_URL!+'&id_token_hint='+JSON.parse(storagedToken!).id_token)
    };

    let clearError = async () => {
      setErrorMessage(undefined);
    }

    let setTokens = async (tokens: string) => {
      localStorage.setItem("tokens", JSON.stringify(tokens));
      updateStates();
    }

    let value = { valid, signout, currentUser, setTokens, errorMessage, clearError };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}