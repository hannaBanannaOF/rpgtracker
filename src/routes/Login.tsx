import Bg from '../assets/img/bg.jpg';
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../components/providers/AuthProvider";
import { useState } from "react";
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockIcon from '@mui/icons-material/Lock';
import { useSnackbar } from 'notistack';
import { useEffectOnce } from '../utils/UseEffectOnce';

export interface LoginProps {
}

export function Login(props: LoginProps) {
    let location = useLocation();
    let auth = useAuth();
    let navigate = useNavigate();

    let from = (location.state as any)?.from?.pathname || "/";
    const { enqueueSnackbar } = useSnackbar();
    let [authent, setAuthent] = useState(false);

    function redirectOAuth(redirect: string) {
        setAuthent(true);
        window.location.replace(redirect);
    }
  
    useEffectOnce(() => {
        if (auth.valid) {
            navigate(from, {replace: true});
        } else if (auth.errorMessage) {
            enqueueSnackbar(auth.errorMessage.message, {
                variant: auth.errorMessage.variant,
                key: auth.errorMessage.key
            });
            auth.clearError();
        }
    });

    return(
        <div style={{ backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0)), url(${Bg})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%", height: "100%"}}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    justifyContent="flex-start"
                    alignItems="center"
                    px={5}
                >
                    <Grid item md={8} xs={12}>
                        <Stack mt={25}>
                            <Divider textAlign="left">
                                <Typography variant="h4" gutterBottom component={"div"}>Login</Typography>
                            </Divider>
                            <LoadingButton
                                onClick={() => redirectOAuth(process.env.REACT_APP_KEYCLOAK_OAUTH_REDIRECT!)}
                                loading={authent}
                                loadingPosition="start"
                                startIcon={<LockIcon />}
                                variant="contained"
                            >
                            Login com HBAuth
                            </LoadingButton>
                        </Stack>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}