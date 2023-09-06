import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { Title, useMantineTheme  } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconKey } from "@tabler/icons-react";
import axios from "axios";
import { useEffectOnce } from "../../utils/UseEffectOnce";

export function OAuthCallback() {

    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let [searchParams] = useSearchParams();
    let from = (location.state as any)?.from?.pathname || "/";

    let code = searchParams.get('code');

    const theme = useMantineTheme();

    useEffectOnce(() => {
        if (auth.valid || !code) {
            navigate(from, {replace: true});
            return;
        }
        

        const data = new URLSearchParams();
        data.append('redirect_uri', process.env.REACT_APP_THIS_REDIRECT_URI!);
        data.append('grant_type', 'authorization_code');
        data.append('client_id', 'rpgtracker');
        data.append('code', code!);
        data.append('scope', 'openid')

        axios.post(process.env.REACT_APP_KEYCLOAK_TOKEN_ENDPOINT!, data).then(res => { 
            auth.setTokens(res.data).then(() => {
                navigate(from, {replace: true});
            });
        }).catch(err => {
            notifications.show({
                message: "Não foi possível conectar com o HBAuth",
                id: "error_connect_hbauth",
                color: 'red'
              });
            navigate(from, {replace: true});
        });
    });

    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: theme.primaryColor, display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
            <IconKey />
            <Title order={4}>Authenticating</Title>
        </div>
    );

}