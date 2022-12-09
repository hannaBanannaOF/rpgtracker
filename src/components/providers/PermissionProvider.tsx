import React, { useState, useEffect } from "react";
import { Rpgtrackerwebclient } from "../webclient/Rpgtrackerwebclient";
import { AuthContext, AuthContextType } from "./AuthProvider";

interface PermissionContextType {
    loadPermissions: () => Promise<void>;
    userIsDM: boolean;
  }
  
let PermissionContext = React.createContext<PermissionContextType>({} as PermissionContextType);

export function PermissonProviderInner({ children, auth }: { children: React.ReactNode, auth: AuthContextType }) {
    const [userIsDM, setUserIsDM] = useState(false);

    let loadPermissions = async () => {
        if (auth.valid) {
            Rpgtrackerwebclient.get("/user-config").then((res: any) => {
                setUserIsDM(res.data.dm)
            });
        }
    }

    useEffect(() => {loadPermissions()}, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth, auth.valid])

    let value = { loadPermissions, userIsDM };
  
    return <PermissionContext.Provider value={value}>{children}</PermissionContext.Provider>;
}

export function PermissionProvider({ children }: { children: React.ReactNode}) {
    return <AuthContext.Consumer> 
        {auth => (<PermissonProviderInner auth={auth}>{children}</PermissonProviderInner>)}
    </AuthContext.Consumer>
}

export function usePermission() {
    return React.useContext(PermissionContext);
}