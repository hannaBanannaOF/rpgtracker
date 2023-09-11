import { GiArchiveResearch } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { AccountService } from '../services/AccountService';
import { Divider, Group, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { getContentTypeItem, getContentTypeTooltip, getSystemPath } from '../utils/Utils';
import { notifications } from '@mantine/notifications';
import { ClickablePaper } from '../ui/ClickablePaper';
import { Listing } from '../ui/Listing';

export function MinhasFichas() {

    let navigate = useNavigate();

    return <Listing 
        dataFetch={AccountService.getCurrentUserFichas}
        dataFetchError={err => {
            notifications.show({
                message: "Erro ao buscar fichas do usuário",
                id: "error_minhas_fichas_not_found",
                color: 'red'
              });
		}}
        dataMap={(ficha) => {
            return <ClickablePaper 
                key={ficha.uuid}
                onClick={() => navigate(`/sheets/${getSystemPath(ficha.system)}/details?uuid=${ficha.uuid}`)}
                icon={<Tooltip label={getContentTypeTooltip(ficha.system)}>
                    <ThemeIcon color="teal" size="xl" radius="xl">
                        {getContentTypeItem(ficha.system)}
                    </ThemeIcon>
                </Tooltip>}
                title={ficha.characterName}
                subtitle={ficha.session && `Mesa: ${ficha.session.sessionName}`}
            />
        }}
        title={<Divider labelPosition="left" label={
            <Group position='left'>
                <Text fz="lg">Minhas fichas</Text>
                <GiArchiveResearch size={40} />
            </Group>
        }/>} 
    />
}