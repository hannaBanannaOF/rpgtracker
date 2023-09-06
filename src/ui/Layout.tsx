import { useEffect, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from "../assets/img/menuIcon.png";
import { Navbar, createStyles, rem, UnstyledButton, Tooltip, Title, AppShell, Header, Skeleton, Group, ActionIcon, Drawer, Text } from '@mantine/core';
import { IconHome, IconLogout, IconMenu, IconUser } from '@tabler/icons-react';
import { GiTabletopPlayers, GiArchiveResearch } from "react-icons/gi";
import { useAuth } from "../providers/AuthProvider";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
    aside: {
      flex: `0 0 ${rem(60)}`,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRight: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
      paddingTop: rem(10)
    },
  
    main: {
      flex: 1,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  
    mainLink: {
      width: rem(44),
      height: rem(44),
      borderRadius: theme.radius.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      },
    },
  
    mainLinkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  
    title: {
      boxSizing: 'border-box',
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      marginBottom: theme.spacing.xl,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      padding: theme.spacing.md,
      paddingTop: rem(18),
      height: rem(60),
      borderBottom: `${rem(1)} solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
      }`,
    },
  
    link: {
      boxSizing: 'border-box',
      display: 'block',
      textDecoration: 'none',
      borderTopRightRadius: theme.radius.md,
      borderBottomRightRadius: theme.radius.md,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
      padding: `0 ${theme.spacing.md}`,
      fontSize: theme.fontSizes.sm,
      marginRight: theme.spacing.md,
      fontWeight: 500,
      height: rem(44),
      lineHeight: rem(44),
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  
    linkActive: {
      '&, &:hover': {
        borderLeftColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
        backgroundColor: theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background,
        color: theme.white,
      },
    },

    mainButton: {
      width: '100%',
      padding: '16px',
      height: rem(44),
      borderRadius: theme.radius.md,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'start',
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
  
      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
      },
    },
  
    mainButtonActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  }));

  interface NavbarLink {
    icon?: React.FC<any>,
    label: string,
    link?: string,
    links?: NavbarLink[]
    key: string
  }

  export function Layout(props: any) {  
    const { classes, cx } = useStyles();
    const auth = useAuth();
    const navigate = useNavigate();
    let location = useLocation();
    const matches = useMediaQuery('(min-width: 768px)');

    const homeLink: NavbarLink = { icon: IconHome, label: 'Home', link: '/', key: 'menu-opt-home' };
    const characterSheetsLink: NavbarLink = { icon: GiArchiveResearch, label: 'Minhas fichas', link: '/me/sheets/', key: 'menu-opt-my-sheets' };
    const sessionsLink: NavbarLink = { icon: GiTabletopPlayers, label: 'Minhas mesas', link: '/me/sessions/', key: 'menu-opt-my-sessions' };
    const [active, setActive] = useState(homeLink);
    const [activeLink, setActiveLink] = useState(homeLink.key);
    const [openMenu, setOpenMenu] = useState(false);
    const [linksMockdata, setLinksMockdata] = useState<NavbarLink[]>([]);
    const [mainLinks, setMainLinks] = useState<NavbarLink[]>([]); 
    const [opened, { open, close }] = useDisclosure(false);

    let basic = location.pathname === '/login' || location.pathname === '/login/oauth/callback' 

    useEffect(() => {
      if (auth.loading) return;
      let mainLinksMockdata: NavbarLink[] = [
          homeLink,
          characterSheetsLink,
      ];

      if (auth.currentUser?.permissions.dm ?? false) {
          mainLinksMockdata.push(sessionsLink)
      }
      setMainLinks(mainLinksMockdata);

      if (location.pathname === '/me/sheets/' || location.pathname === '/sheets/coc/details') {
        setActive(characterSheetsLink);
        setActiveLink(characterSheetsLink.key)
      } else if(location.pathname === '/me/sessions/' || location.pathname === '/sessions/coc/details') {
        setActive(sessionsLink);
        setActiveLink(sessionsLink.key);
      } else {
        setActive(homeLink);
        setActiveLink(homeLink.key);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname, auth.loading, auth]);

    return (
        basic ? props.children : 
        <AppShell
            navbar={matches ? 
                <Navbar width={{ sm: openMenu ? 300 : 65 }}>
                  <Skeleton visible={auth.loading} height={50} sx={{ display: "flex", flex: 1, flexDirection: "column", marginTop: auth.loading ? "1rem" : 0 }}>
                    <Navbar.Section grow mt={"lg"} ml={"xs"}>
                          {mainLinks.map((link) => (
                            <Tooltip
                              label={link.label}
                              position="right"
                              withArrow
                              transitionProps={{ duration: 0 }}
                              key={link.label}
                            >
                              <UnstyledButton
                                onClick={() => {
                                    if (link.links != null) {
                                        setLinksMockdata(link.links);
                                        setOpenMenu(true)
                                    } else {
                                        setOpenMenu(false)
                                        navigate(link.link!)
                                    }
                                    setActive(link)
                                }}
                                className={cx(classes.mainLink, { [classes.mainLinkActive]: link.key === active.key })}
                              >
                                {link.icon && <link.icon size="1.4rem" stroke={'1.5'} />}
                              </UnstyledButton>
                            </Tooltip>
                          ))}
                        {openMenu && <div className={classes.main}>
                          <Title order={4} className={classes.title}>
                              {active.label}
                          </Title>
                          {linksMockdata.map((link) => (
                              <a
                                  className={cx(classes.link, { [classes.linkActive]: activeLink === link.key })}
                                  href={link.link ?? "#"}
                                  onClick={(event) => {
                                      event.preventDefault();
                                      setActiveLink(link.key);
                                      setOpenMenu(false)
                                  }}
                                  key={link.key}
                                  >
                                  {link.label}
                              </a>
                          ))}
                        </div>}
                    </Navbar.Section>
                    <Navbar.Section ml={"xs"} mb={"lg"}>
                      <Tooltip
                        label={"Perfil"}
                        position="right"
                        withArrow
                        transitionProps={{ duration: 0 }}
                        key={'perfil'}
                      >
                        <UnstyledButton className={classes.mainLink}>
                          <IconUser />
                        </UnstyledButton>
                      </Tooltip>
                      <Tooltip
                        label={"Sair"}
                        position="right"
                        withArrow
                        transitionProps={{ duration: 0 }}
                        key={"sair"}
                      >
                        <UnstyledButton className={classes.mainLink}>
                          <IconLogout />
                        </UnstyledButton>
                      </Tooltip>
                    </Navbar.Section>
                  </Skeleton>
                </Navbar> : <></>
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
                {!matches && <>
                  <ActionIcon variant="outline" onClick={open}>
                    <IconMenu />
                  </ActionIcon>
                  <Drawer opened={opened} onClose={close} title="Menu" position="right">
                  <div style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent:"space-between" }}>
                        <div>
                          {mainLinks.map((link) => (
                            <UnstyledButton
                            key={link.key}
                            onClick={() => {
                                if (link.links != null) {
                                    setLinksMockdata(link.links);
                                    setOpenMenu(true)
                                } else {
                                    setOpenMenu(false)
                                    navigate(link.link!)
                                }
                                setActive(link);
                                close();
                            }}
                            className={cx(classes.mainButton, { [classes.mainButtonActive]: link.key === active.key })}
                          >
                            <Group position="apart">
                              {link.icon && <link.icon size="1.4rem" stroke={'1.5'} />}
                              <Text>{link.label}</Text>
                            </Group>
                          </UnstyledButton>
                          ))}
                        </div>
                        <div>
                          <UnstyledButton className={classes.mainButton}>
                            <Group position="apart">
                              <IconUser />
                              <Text>Perfil</Text>
                            </Group>
                          </UnstyledButton>
                          <UnstyledButton className={classes.mainButton}>
                            <Group position="apart">
                              <IconLogout />
                              <Text>Sair</Text>
                            </Group>
                          </UnstyledButton>
                        </div>
                      </div>
                  </Drawer>
                </>}
                </Group>
            </Header>}
        >
            <Skeleton visible={auth.loading && !basic}>
              {props.children}
            </Skeleton>
        </AppShell>
    );
}