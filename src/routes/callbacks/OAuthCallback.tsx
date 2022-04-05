import { notification, Typography } from "antd";
import React, { useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../components/providers/AuthProvider";
import { Rpgtrackerwebclient } from "../../components/webclient/Rpgtrackerwebclient";
import DiscordCallbackScreen from "./DiscordCallbackScreen";

export interface OAuthCallbackProps {
    provider: string,
    hbauth: boolean
}

export function OAuthCallback(props: OAuthCallbackProps) {

    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
    let [searchParams] = useSearchParams();

    let from = (location.state as any)?.from?.pathname || "/";

    function capitalize(str: string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        if (auth.valid() || !searchParams.get('code')) {
            navigate(from, {replace: true});
            return;
        }
        let code = searchParams.get('code');
        if (!props.hbauth) {
            Rpgtrackerwebclient.post(`/v1/token/social-auth/social/jwt-pair/${props.provider}/`, {code: code}).then(res => {
                localStorage.setItem("tokens", JSON.stringify(res.data));
                auth.setCurrUser();
                navigate(from, {replace: true});
            }).catch(err => {
                notification.error({message: `Não foi possível conectar com o ${capitalize(props.provider)}`, description: err.response.data});
                navigate(from, {replace: true});
            });
        } else {
            Rpgtrackerwebclient.post(`/v1/token/social-auth/social/jwt-pair/hannabananna/`, {code: code}).then(res => {
                localStorage.setItem("tokens", JSON.stringify(res.data));
                auth.setCurrUser();
                navigate(from, {replace: true});
            }).catch(err => {
                notification.error({message: `Não foi possível conectar com o HBAuth`, description: err.response.data});
                navigate(from, {replace: true});
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            {!props.hbauth && props.provider === "discord" && <DiscordCallbackScreen />}
            {props.hbauth && <div style={{ width: "100%", height: "100%", backgroundColor: "purple", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                <FaLock color="azure" size={150} />
                <Typography.Title style={{ color: "azure" }}>Authenticating</Typography.Title>
            </div>}
        </React.Fragment>
    );

}