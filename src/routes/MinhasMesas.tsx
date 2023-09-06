import { useEffect, useState } from "react";
import { GiTabletopPlayers } from "react-icons/gi";
import { useNavigate } from "react-router";
import { SessionBase } from "../models/Session";
import { AccountService } from "../services/AccountService";
import { Skeleton, Divider, Text, Stack, Tooltip, Paper, ThemeIcon, createStyles, Center, Avatar, Group } from "@mantine/core";
import { IconBookUpload } from "@tabler/icons-react";
import { getContentTypeItem, getContentTypeTooltip, getSystemPath } from "../utils/Utils";
import { notifications } from "@mantine/notifications";
import { useSubscription } from "react-stomp-hooks";
import { useAuth } from "../providers/AuthProvider";

const useStyles = createStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
        cursor: 'pointer'
    },

    div: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center'
    },

    avatarGroupWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
}));

export function MinhasMesas() {

    const {classes} = useStyles();
    const auth = useAuth();

    const [loading, setLoading] = useState(true);
    const [mesas, setMesas] = useState<SessionBase[]>([]);
    const [fichas, setFichas] = useState<any[]>([]);

    useSubscription(`/topic/${auth.currentUser?.uuid}/users`, (message) => {
        let data = JSON.parse(message.body);
        setFichas([...fichas, data]);
    });

    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        AccountService.getCurrentUserMesasMestradas().then(res => {
            setMesas(res.data);
            setLoading(false);
        }).catch(err => {
            notifications.show({
                message: "Erro ao buscar mesas do usuário",
                id: "error_minhas_mesas_not_found",
                color: 'red'
              });
		});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const buildAvatarGroup = (mesa: SessionBase) => {
        let fichasMesa = fichas.find((e) => e.session === mesa.uuid);
        let remain = 0;
        let users: any[] = [];
        if (fichasMesa) {
            if (fichasMesa.users.length > 3) {
                remain = fichasMesa.users.length - 3;
                users = fichasMesa.users.slice(0, 3);
            } else {
                users = fichasMesa.users;
            }
        }


        return <Avatar.Group spacing="sm">
            {users.map((u) => {
                return <Tooltip key={u.uuid} label={u.displayName}>
                    <Avatar radius="xl" color="teal">
                        {u.firstName && u.firstName.charAt(0).toUpperCase()}
                        {u.firstName && u.lastName && u.lastName.charAt(0).toUpperCase()}
                    </Avatar>
                </Tooltip>
            })}
            {remain > 0 && <Avatar radius="xl" color="teal">+{remain}</Avatar>}
        </Avatar.Group>
    }

    return (
        <>
            <Divider labelPosition="left" label={
                <Group position='left'>
                    <Text fz="lg">Minhas mesas</Text>
                    <GiTabletopPlayers size={40} />
                </Group>
            }/>
            <Skeleton visible={loading}>
                <Stack mt={25}>
                    {mesas?.map((mesa) => {
                        return <Paper
                            key={mesa.uuid}
                            className={classes.paper}
                            shadow="sm"
                            component="a"
                            p="xl"
                            onClick={() => navigate(`/sessions/${getSystemPath(mesa.system)}/details?uuid=${mesa.uuid}`)}
                        >
                            <div className={classes.div}>
                                <Center mr="xl">
                                    <Tooltip label={getContentTypeTooltip(mesa.system)}>
                                        <ThemeIcon color="teal" size="xl" radius="xl">
                                            {getContentTypeItem(mesa.system)}
                                        </ThemeIcon>
                                    </Tooltip>
                                </Center>
                                <div className={classes.avatarGroupWrapper}>
                                    <Text fz="lg">{mesa.sessionName}</Text>
                                    {buildAvatarGroup(mesa)}
                                </div>
                            </div>
                            <Center>
                                <IconBookUpload size={20} />
                            </Center>
                        </Paper>
                    })}
                </Stack>
        </Skeleton>
    </>
    )
}