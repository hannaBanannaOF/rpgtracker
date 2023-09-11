import { useState } from "react";
import { GiTabletopPlayers } from "react-icons/gi";
import { useNavigate } from "react-router";
import { SessionBase } from "../models/Session";
import { AccountService } from "../services/AccountService";
import { Divider, Text, Tooltip, ThemeIcon, Avatar, Group } from "@mantine/core";
import { getContentTypeItem, getContentTypeTooltip, getSystemPath } from "../utils/Utils";
import { notifications } from "@mantine/notifications";
import { useSubscription } from "react-stomp-hooks";
import { useAuth } from "../providers/AuthProvider";
import { ClickablePaper } from "../ui/ClickablePaper";
import { Listing } from "../ui/Listing";

export function MinhasMesas() {

    let navigate = useNavigate()
    const auth = useAuth();
    const [fichas, setFichas] = useState<any[]>([]);

    useSubscription(`/topic/${auth.currentUser?.uuid}/users`, (message) => {
        let data = JSON.parse(message.body);
        setFichas([...fichas, data]);
    });

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

    return <Listing 
        dataFetch={AccountService.getCurrentUserMesasMestradas}
        dataFetchError={err => {
            notifications.show({
                message: "Erro ao buscar mesas do usuário",
                id: "error_minhas_mesas_not_found",
                color: 'red'
              });
		}}
        dataMap={(mesa) => {
            return <ClickablePaper
                key={mesa.uuid}
                onClick={() => navigate(`/sessions/${getSystemPath(mesa.system)}/details?uuid=${mesa.uuid}`)}
                icon={<Tooltip label={getContentTypeTooltip(mesa.system)}>
                    <ThemeIcon color="teal" size="xl" radius="xl">
                        {getContentTypeItem(mesa.system)}
                    </ThemeIcon>
                </Tooltip>}
                title={mesa.sessionName}
                subtitle={buildAvatarGroup(mesa)}
            />
        }}
        title={
            <Divider labelPosition="left" label={
                <Group position='left'>
                    <Text fz="lg">Minhas mesas</Text>
                    <GiTabletopPlayers size={40} />
                </Group>
            }/>
        } 
    />
}