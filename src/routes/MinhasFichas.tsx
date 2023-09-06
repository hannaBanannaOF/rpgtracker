import { useState } from 'react';
import { GiArchiveResearch } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { CharacterSheetBase } from '../models/CharacterSheet';
import { AccountService } from '../services/AccountService';
import { useEffectOnce } from '../utils/UseEffectOnce';
import { Center, Divider, Group, Paper, Skeleton, Stack, Text, ThemeIcon, Tooltip, createStyles } from '@mantine/core';
import { IconBookUpload } from '@tabler/icons-react';
import { getContentTypeItem, getContentTypeTooltip, getSystemPath } from '../utils/Utils';
import { notifications } from '@mantine/notifications';

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

export function MinhasFichas() {

    const {classes} = useStyles();

    const [loading, setLoading] = useState(true);
    const [fichas, setFichas] = useState<CharacterSheetBase[] | null>(null);
    let navigate = useNavigate();

    useEffectOnce(() => {
        setLoading(true);
        AccountService.getCurrentUserFichas().then((res) => {
            setLoading(false);
            setFichas(res.data);
		}).catch(err => {
            notifications.show({
                message: "Erro ao buscar fichas do usuário",
                id: "error_minhas_fichas_not_found",
                color: 'red'
              });
		});
    });

    return (
        <>
            <Divider labelPosition="left" label={
                <Group position='left'>
                    <Text fz="lg">Minhas fichas</Text>
                    <GiArchiveResearch size={40} />
                </Group>
            }/>
            <Skeleton visible={loading}>
                <Stack mt={25}>
                    {fichas?.map((ficha) => {
                        return <Paper
                            key={ficha.uuid}
                            className={classes.paper}
                            shadow="sm"
                            component="a"
                            p="xl"
                            onClick={() => navigate(`/sheets/${getSystemPath(ficha.system)}/details?uuid=${ficha.uuid}`)}
                        >
                            <div className={classes.div}>
                                <Center mr="xl">
                                    <Tooltip label={getContentTypeTooltip(ficha.system)}>
                                        <ThemeIcon color="teal" size="xl" radius="xl">
                                            {getContentTypeItem(ficha.system)}
                                        </ThemeIcon>
                                    </Tooltip>
                                </Center>
                                <div className={classes.avatarGroupWrapper}>
                                    <Text fz="lg">{ficha.characterName}</Text>
                                    {ficha.session && <Text fz="sm" fw={500}>Mesa: {ficha.session.sessionName}</Text>}
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