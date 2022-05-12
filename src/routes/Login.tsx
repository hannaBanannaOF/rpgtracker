import Bg from '../assets/img/bg.jpg';
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../components/providers/AuthProvider";
import { useState } from "react";
import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LockIcon from '@mui/icons-material/Lock';

export interface LoginProps {
}

export function Login(props: LoginProps) {
    let location = useLocation();
    let auth = useAuth();
  
    let from = (location.state as any)?.from?.pathname || "/";
  
    let [authent, setAuthent] = useState(false);

    function redirectOAuth(redirect: string) {
        setAuthent(true);
        window.location.replace(redirect);
    }
  
    if (auth.valid) {
        return <Navigate to={from} replace />;
    }

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
                                sx={{ backgroundColor: "purple" }}
                                onClick={() => redirectOAuth(process.env.REACT_APP_HBAUTH_OAUTH_REDIRECT!)}
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