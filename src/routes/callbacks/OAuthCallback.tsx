import { notification } from "antd";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../components/providers/AuthProvider";
import { Rpgtrackerwebclient } from "../../components/webclient/Rpgtrackerwebclient";
import DiscordCallbackScreen from "./DiscordCallbackScreen";

export interface OAuthCallbackProps {
    provider: string
}

export function OAuthCallback(props: OAuthCallbackProps) {

    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
    let [searchParams] = useSearchParams();

    let from = location.state?.from?.pathname || "/";

    function capitalize(str: string){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        if (auth.valid() || !searchParams.get('code')) {
            navigate(from, {replace: true});
            return;
        }
        let code = searchParams.get('code');
        Rpgtrackerwebclient.post(`/v1/token/social-auth/social/jwt-pair/${props.provider}/`, {code: code}).then(res => {
            localStorage.setItem("tokens", JSON.stringify(res.data));
            navigate(from, {replace: true});
        }).catch(err => {
            notification.error({message: `Não foi possível conectar com o ${capitalize(props.provider)}`, description: err.response.data});
            navigate(from, {replace: true});
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <React.Fragment>
            {props.provider === "discord" && <DiscordCallbackScreen />}
        </React.Fragment>
    );

}