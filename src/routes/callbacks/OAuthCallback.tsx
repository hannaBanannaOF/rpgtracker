import { notification } from "antd";
import { useEffect } from "react";
import LockIcon from '@mui/icons-material/Lock';
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../components/providers/AuthProvider";
import { Rpgtrackerwebclient } from "../../components/webclient/Rpgtrackerwebclient";
import { Typography } from "@mui/material";

export function OAuthCallback() {

    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();
    let [searchParams] = useSearchParams();

    let from = (location.state as any)?.from?.pathname || "/";

    useEffect(() => {
        if (auth.valid || !searchParams.get('code')) {
            navigate(from, {replace: true});
            return;
        }
        let code = searchParams.get('code');
        Rpgtrackerwebclient.post(`/v1/token/social-auth/social/jwt-pair/hannabananna/`, {code: code}).then(res => {
            localStorage.setItem("tokens", JSON.stringify(res.data));
            auth.setCurrUser().then(() => {
                navigate(from, {replace: true});
            });
        }).catch(err => {
            notification.error({message: `Não foi possível conectar com o HBAuth`, description: err.response.data});
            navigate(from, {replace: true});
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "purple", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
            <LockIcon color="action" sx={{ fontSize: 100 }} />
            <Typography variant="h4" component="div">Authenticating</Typography>
        </div>
    );

}