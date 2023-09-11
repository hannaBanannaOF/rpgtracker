import { useLocation } from 'react-router-dom';
import Logo from "../assets/img/menuIcon.png";
import { Title, AppShell, Header, Skeleton, Group } from '@mantine/core';
import { useAuth } from "../providers/AuthProvider";
import { useMediaQuery } from "@mantine/hooks";
import { LateralMenu } from "./LateralMenu";
import { useEffect } from 'react';

export function Layout(props: any) {  
  const auth = useAuth();
  let location = useLocation();
  const matches = useMediaQuery('(min-width: 768px)');

  let basic = location.pathname === '/login' || location.pathname === '/login/oauth/callback' 

  useEffect(() => {
    if (auth.loading) return;
  }, [auth])

  return (
      basic ? props.children : 
      <AppShell
          navbar={matches ? <LateralMenu small/> : <></>
          }
          header={<Header height={70} px={"xs"}>
              <Group position="apart">
              <Group position="left">
                  <img src={`${Logo}`} alt="RPGTracker logo" width={50} />
                  <Title order={4} sx={{ marginBlockStart: '1.33em', 
                      marginBlockEnd: '1.33em',
                      marginInlineStart: '0px',
                      marginInlineEnd: '0px' }}>RPGTracker</Title>
              </Group>
              {!matches && <LateralMenu />}
              </Group>
          </Header>}
      >
          <Skeleton visible={auth.loading && !basic}>
            {props.children}
          </Skeleton>
      </AppShell>
  );
}