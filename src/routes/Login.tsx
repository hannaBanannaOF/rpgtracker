import Bg from '../assets/img/bg.jpg';
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../providers/AuthProvider";
import { useState } from "react";
import { IconKey } from "@tabler/icons-react";
import { Button, Title, Box, createStyles, rem } from '@mantine/core';
import { useEffectOnce } from '../hooks/UseEffectOnce';
import { useTranslation } from 'react-i18next';

export interface LoginProps {
}

const useStyles = createStyles((theme) => ({
    wrapper: {
      minHeight: '100%',
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0)), url(${Bg})`,
      paddingTop: rem(100),
    },
  
    form: {
      minHeight: '100%',
      height: '100%',
      maxWidth: rem(450),
  
      [theme.fn.smallerThan('sm')]: {
        maxWidth: '100%',
      },
    },
  
    title: {
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  }));

export function Login(props: LoginProps) {
    const { classes } = useStyles();
    let location = useLocation();
    let auth = useAuth();
    let navigate = useNavigate();

    let from = (location.state as any)?.from?.pathname || "/";
    let [authent, setAuthent] = useState(false);

    const { t } = useTranslation('login');

    function redirectOAuth(redirect: string) {
        setAuthent(true);
        window.location.replace(redirect);
    }
  
    useEffectOnce(() => {
        if (auth.valid) {
            navigate(from, {replace: true});
        }
    });

    return(
        <div className={classes.wrapper}>
            <Box className={classes.form} p={30}>
                <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
                    {t('welcome')}
                </Title>

                <Button fullWidth 
                    leftIcon={<IconKey size="1rem" />} 
                    loading={authent}
                    onClick={() => redirectOAuth(process.env.REACT_APP_KEYCLOAK_OAUTH_REDIRECT!)}>
                Login
                </Button>
            </Box>
        </div>
    );
}