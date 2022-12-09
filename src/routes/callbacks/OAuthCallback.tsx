import LockIcon from '@mui/icons-material/Lock';
import { useLocation, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../../components/providers/AuthProvider";
import { Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import axios from "axios";
import { useEffectOnce } from "../../utils/UseEffectOnce";

export function OAuthCallback() {

    let navigate = useNavigate();
    let location = useLocation();
    let auth = useAuth();

    let [searchParams] = useSearchParams();
    const { enqueueSnackbar } = useSnackbar();
    let from = (location.state as any)?.from?.pathname || "/";

    let code = searchParams.get('code');

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
            //description: err.response.data
            enqueueSnackbar(`Não foi possível conectar com o HBAuth`, {
                variant: "error",
                key: "error_connect_hbauth"
            });
            navigate(from, {replace: true});
        });
    });

    return (
        <div style={{ width: "100%", height: "100%", backgroundColor: "purple", display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
            <LockIcon color="action" sx={{ fontSize: 100 }} />
            <Typography variant="h4" component="div">Authenticating</Typography>
        </div>
    );

}