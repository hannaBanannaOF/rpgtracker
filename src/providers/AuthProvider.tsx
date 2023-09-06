import React, { useEffect, useState } from "react";
import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient";
import { notifications } from "@mantine/notifications";
import { User } from "../models/User";

export interface CurrentUser {
  
}

export interface AuthContextType {
    currentUser: User | undefined;
    valid: boolean;
    signout: () => Promise<void>;
    setTokens: (tokens: string) => Promise<void>;
    loading: boolean;
  }
  
export let AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
    const [valid, setValid] = useState(false);
    const [loading, setLoading] = useState(true);

    let loadPermissions = async (valid: boolean) => {
      if (valid) {
        return Rpgtrackerwebclient.get("core/api/v1/user-config").then((res) => {
          return res.data.dm ?? false;
        });
      }
    }

    let updateStates = () => {
      const storagedToken = localStorage.getItem('tokens');
      if (storagedToken) {
        let user = decodeToken(storagedToken);
        let isUser = (user?.resource_access?.rpgtracker?.roles?.find((e: string) => e === 'user') ?? false);
        if (!isUser) {
          notifications.show({
            message: `Você não tem permissão para acessar esse recurso!!`,
            color: "red",
            id: "error_no_permission"
          });
          setCurrentUser(undefined);
          setValid(false);
          setLoading(false);
        } else {
          setValid(true);
          loadPermissions(true).then(res => {
            setCurrentUser({
              isUser: isUser, 
              name: user?.given_name ?? user?.preferred_username ?? "Anon", 
              //TODO verificar se é isso mesmo
              uuid: user?.sub ?? "", 
              permissions: {
                dm: res,
              }
            } as User);
            setLoading(false);
          });
        }
      } else {
        setCurrentUser(undefined);
        setValid(false);
        setLoading(false);
      }
    }

    useEffect(() => {
      updateStates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let decodeToken = (token: string) => {
      let output = JSON.parse(token).access_token;
      var base64Url = output.split('.')[1];
      var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    }

    let signout = async () => {
      const storagedToken = localStorage.getItem('tokens');
      localStorage.removeItem("tokens");
      localStorage.removeItem("permissions");
      window.location.replace(process.env.REACT_APP_KEYCLOAK_SIGNOUT_URL!+'&id_token_hint='+JSON.parse(storagedToken!).id_token)
    };

    let setTokens = async (tokens: string) => {
      localStorage.setItem("tokens", JSON.stringify(tokens));
      updateStates();
    }

    let value = { valid, signout, currentUser, setTokens, loading };
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    return React.useContext(AuthContext);
}