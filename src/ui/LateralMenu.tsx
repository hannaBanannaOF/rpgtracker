import { IconHome, IconLogout, IconUser } from "@tabler/icons-react";
import { ReactNode, useEffect, useState } from "react";
import { GiArchiveResearch, GiOctopus, GiTabletopPlayers } from "react-icons/gi";
import { useAuth } from "../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router";
import { Burger, Drawer, Flex, Group, Menu, Navbar, Skeleton, Text, Title, Tooltip, Transition, UnstyledButton, createStyles, rem } from "@mantine/core";
import { useDisclosure, useElementSize } from "@mantine/hooks";

export interface LateralMenuProps {
    small?: boolean
}

interface NavbarLink {
    icon?: React.FC<any>;
    label: string;
    link?: string;
    links?: NavbarLink[];
    key: string;
}

const cocAmmoLink: NavbarLink = { label: 'Munição', key: 'menu-coc-register-sub-ammo', link: 'listing/coc/ammo' };
const cocOcupationsLink: NavbarLink = { label: 'Ocupações', key: 'menu-coc-register-sub-ocupation', link: 'listing/coc/occupations' };
const cocPulpTalentsLink: NavbarLink = { label: 'Talentos (PCoC)', key: 'menu-coc-register-sub-pulp-talents', link: 'listing/coc/pulp-talents' };
const cocSkillsLink: NavbarLink = { label: 'Skills', key: 'menu-coc-register-sub-skills', link: 'listing/coc/skills' }
const cocWeaponsLink:NavbarLink = { label: 'Armas', key: 'menu-coc-register-sub-weapons', link: 'listing/coc/weapons' }

const homeLink: NavbarLink = { icon: IconHome, label: 'Home', link: '/', key: 'menu-opt-home' };
const characterSheetsLink: NavbarLink = { icon: GiArchiveResearch, label: 'Minhas fichas', link: '/me/sheets', key: 'menu-opt-my-sheets' };
const sessionsLink: NavbarLink = { icon: GiTabletopPlayers, label: 'Minhas mesas', link: '/me/sessions', key: 'menu-opt-my-sessions' };
const cocMainLinks: NavbarLink = { icon: GiOctopus, label: "Call of Cthulhu - Cadastros", key: 'menu-opt-coc-registers', links: [
    cocAmmoLink,
    cocOcupationsLink,
    cocPulpTalentsLink,
    cocSkillsLink,
    cocWeaponsLink
]};

const profileLink: NavbarLink = { icon: IconUser, label: 'Perfil', key: 'menu-opt-profile' };
const logoutLink: NavbarLink = { icon: IconLogout, label: 'Sair', key: 'menu-opt-logout' };

const useStyles = createStyles((theme) => ({
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

    sublinkButtonActive: {

    }
}));

interface DropdownButtonProps {
    dropdownItens: ReactNode[];
    active?: boolean;
    button: ReactNode;
}

function DropdownButton(props: DropdownButtonProps) {

    const { classes, cx } = useStyles();
    const [opened, { toggle }] = useDisclosure(false);

    return <>
        <UnstyledButton 
            className={cx(classes.mainButton, { [classes.mainButtonActive]: props.active })}
            onClick={() => {
                toggle();
            }}
            mb={opened ? "sm" : 0}
        >
            {props.button}
        </UnstyledButton>
        <Transition mounted={opened} transition={"scale-y"}>
            {(styles) => (<div style={{...styles, marginLeft: '36px'}}>
                {props.dropdownItens}    
            </div>)}
        </Transition>
    </>
}

export function LateralMenu(props: LateralMenuProps) {
    const [ active, setActive] = useState(homeLink);
    const [ activeLink, setActiveLink] = useState(homeLink.key);
    const [ mainLinks, setMainLinks] = useState<NavbarLink[]>([]); 
    const [ endLinks, setEndLinks ] = useState<NavbarLink[]>([]);

    const auth = useAuth();
    const navigate = useNavigate();
    let location = useLocation();
    const [opened, { open, close }] = useDisclosure(false);
    const { ref, height } = useElementSize();

    const { classes, cx } = useStyles();

    useEffect(() => {
        if (auth.loading) return;

        setEndLinks([
            profileLink,
            logoutLink
        ]);

        let mainLinksMockdata: NavbarLink[] = [
            homeLink,
            characterSheetsLink
        ];
  
        if (auth.currentUser?.permissions.isCocDm ?? false) {
            mainLinksMockdata.push(sessionsLink)
        }
  
        if (auth.currentUser?.permissions.hasCocSheet || auth.currentUser?.permissions.isCocDm) {
          mainLinksMockdata.push(cocMainLinks)
        }
  
        setMainLinks(mainLinksMockdata);
  
        if (location.pathname === '/me/sheets' || location.pathname === '/sheets/coc/details') {
          setActive(characterSheetsLink);
        } else if(location.pathname === '/me/sessions' || location.pathname === '/sessions/coc/details') {
          setActive(sessionsLink);
        } else if(location.pathname.includes('/listing/coc/')) {
          setActive(cocMainLinks);
          if (location.pathname.endsWith('ammo')) {
            setActiveLink(cocAmmoLink.key);
          } else if (location.pathname.endsWith('occupations')) {
            setActiveLink(cocOcupationsLink.key);
          } else if (location.pathname.endsWith('pulp-talents')) {
            setActiveLink(cocPulpTalentsLink.key);
          } else if (location.pathname.endsWith('skills')) {
            setActiveLink(cocSkillsLink.key);
          } else if (location.pathname.endsWith('weapons')) {
            setActiveLink(cocWeaponsLink.key);
          }
        } else {
          setActive(homeLink);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [location.pathname, auth.loading, auth]);

    return props.small ? <Navbar width={{ sm: 65 }}>
        <Skeleton visible={auth.loading} height={50} sx={{ display: "flex", flex: 1, flexDirection: "column", marginTop: auth.loading ? "1rem" : 0 }}>
            <Navbar.Section grow mt={"lg"} ml={"xs"}>
                {mainLinks.map((link) => (<>
                    {!link.links && <Tooltip
                        label={link.label}
                        position="right"
                        withArrow
                        transitionProps={{ duration: 0 }}
                        key={link.label}
                    >
                    <UnstyledButton
                        onClick={() => {
                            navigate(link.link!)
                            setActive(link)
                            setActiveLink("");
                        }}
                        className={cx(classes.mainLink, { [classes.mainLinkActive]: link.key === active.key })}
                    >
                        {link.icon && <link.icon size="1.4rem" stroke={'1.5'} />}
                    </UnstyledButton>
                    </Tooltip>}
                    {link.links && <Menu key={link.key} trigger="hover" position="right-start" withArrow>
                        <Menu.Target>
                            <UnstyledButton className={cx(classes.mainLink, { [classes.mainLinkActive]: link.key === active.key })}>
                                {link.icon && <link.icon size="1.4rem" stroke={'1.5'} />}
                            </UnstyledButton>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Label>{link.label}</Menu.Label>
                            {(link.links ?? []).map((subLink) => {
                                return <Menu.Item key={subLink.key} icon={subLink.icon} color={activeLink === subLink.key ? "teal" : undefined} onClick={() => {
                                    setActive(link);
                                    setActiveLink(subLink.key);
                                    if (subLink.link) {
                                        navigate(subLink.link);
                                    }
                                }}>{subLink.label}</Menu.Item>
                            })}
                        </Menu.Dropdown>
                    </Menu>}
                </>))}
            </Navbar.Section>
            <Navbar.Section ml={"xs"} mb={"lg"}>
                {endLinks.map((link) => {
                    return <Tooltip
                        label={link.label}
                        position="right"
                        withArrow
                        transitionProps={{ duration: 0 }}
                        key={link.label}
                    >
                        <UnstyledButton className={classes.mainLink} onClick={() => {
                            if (link.key === logoutLink.key) {
                                auth.signout();
                            }
                        }}>
                            {link.icon && <link.icon size="1.4rem" stroke={'1.5'} />}
                        </UnstyledButton>
                    </Tooltip>
                })}
            </Navbar.Section>
        </Skeleton>
    </Navbar> : <>
        <Burger opened={opened} onClick={open} />
        <Drawer.Root opened={opened} onClose={close} position="right">
            <Drawer.Overlay />
            <Drawer.Content>
                <Drawer.Header ref={ref}>
                    <Title order={3}>Menu</Title>
                    <Drawer.CloseButton></Drawer.CloseButton>
                </Drawer.Header>
                <Drawer.Body sx={{ height: `calc(94% - ${height}px)` }} py={"lg"}>
                    <Flex sx={{ height: "100%" }} justify={"space-between"} direction={"column"}>
                        <div>
                            {mainLinks.map((link) => {
                                return !link.links ? <UnstyledButton
                                    key={link.key}
                                    onClick={() => {
                                        navigate(link.link!);
                                        setActive(link);
                                        setActiveLink("");
                                        close();
                                    }}
                                    className={cx(classes.mainButton, { [classes.mainButtonActive]: link.key === active.key })}
                                >
                                    <Group position="apart">
                                        {link.icon && <link.icon size="1.4rem" stroke={'1.5'} />}
                                        <Text>{link.label}</Text>
                                    </Group>
                                </UnstyledButton> : <DropdownButton
                                    button={
                                        <Group position="apart">
                                            {link.icon && <link.icon size="1.4rem" stroke={'1.5'} />}
                                            <Text>{link.label}</Text>
                                        </Group>
                                    }
                                    active={link.key === active.key}
                                    dropdownItens={(link.links ?? []).map(sublink => {
                                        return <UnstyledButton className={classes.mainButton}
                                            onClick={() => {
                                                setActive(link);
                                                setActiveLink(sublink.key);
                                                if (sublink.link) {
                                                    navigate(sublink.link);
                                                }
                                                close();
                                            }}
                                        >
                                            <Text color={activeLink === sublink.key ? "teal" : undefined}>
                                                {sublink.label}
                                            </Text>
                                        </UnstyledButton>      
                                    })}
                                />
                            })}
                        </div>
                        <div>
                            {endLinks.map((link) => {
                                return <UnstyledButton
                                    key={link.key}
                                    onClick={() => {
                                        navigate(link.link!);
                                        setActive(link);
                                        setActiveLink("");
                                        close();
                                    }}
                                    className={cx(classes.mainButton, { [classes.mainButtonActive]: link.key === active.key })}
                                >
                                    <Group position="apart">
                                        {link.icon && <link.icon size="1.4rem" stroke={'1.5'} />}
                                        <Text>{link.label}</Text>
                                    </Group>
                                </UnstyledButton>
                            })}
                        </div>
                    </Flex>
                </Drawer.Body>
            </Drawer.Content>
                {/* {mainLinks.map((link) => (
                    <UnstyledButton
                    key={link.key}
                    onClick={() => {
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
                <UnstyledButton key={"perfil"} className={classes.mainButton}>
                    <Group position="apart">
                    <IconUser />
                    <Text>Perfil</Text>
                    </Group>
                </UnstyledButton>
                <UnstyledButton key={"sair"} className={classes.mainButton}>
                    <Group position="apart">
                    <IconLogout />
                    <Text>Sair</Text>
                    </Group>
                </UnstyledButton> */}
        </Drawer.Root>
    </>
}