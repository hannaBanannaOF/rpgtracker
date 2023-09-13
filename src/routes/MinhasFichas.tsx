import { GiArchiveResearch } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { AccountService } from '../services/AccountService';
import { Divider, Group, Text, ThemeIcon, Tooltip } from '@mantine/core';
import { getContentTypeItem, getContentTypeTooltip, getSystemPath } from '../utils/Utils';
import { notifications } from '@mantine/notifications';
import { ClickablePaper } from '../ui/ClickablePaper';
import { Listing } from '../ui/Listing';
import { useTranslation } from "react-i18next";
import { NotificationKeys } from "../Constants";

export function MinhasFichas() {

    let navigate = useNavigate();
    const { t } = useTranslation(['characterSheet', 'notifications']);

    return <Listing 
        dataFetch={AccountService.getCurrentUserFichas}
        dataFetchError={err => {
            notifications.show({
                message: t('characterSheet.fetchError', { ns: "notifications" }),
                ...NotificationKeys.ErrorMinhasFichas
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
                subtitle={ficha.session && t('characterSheetSession', { sessionName: ficha.session.sessionName })}
            />
        }}
        title={<Divider labelPosition="left" label={
            <Group position='left'>
                <Text fz="lg">{t('myCharacterSheets')}</Text>
                <GiArchiveResearch size={40} />
            </Group>
        }/>} 
    />
}