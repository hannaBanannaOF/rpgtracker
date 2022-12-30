import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Tooltip, Typography, useTheme } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import React, { useState } from 'react';
import { GiOctopus, GiHarryPotterSkull, GiArchiveResearch } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { CharacterSheetBase } from '../components/models/CharacterSheet';
import { AccountService } from '../components/services/AccountService';
import { useSnackbar } from 'notistack';
import { useEffectOnce } from '../utils/UseEffectOnce';


export function MinhasFichas() {

    const [loading, setLoading] = useState(true);
    const [fichas, setFichas] = useState<CharacterSheetBase[] | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    const theme = useTheme();
    let navigate = useNavigate();

    useEffectOnce(() => {
        setLoading(true);
        AccountService.getCurrentUserFichas().then((res) => {
            setLoading(false);
            setFichas(res.data);
		}).catch(err => {
            enqueueSnackbar("Erro ao buscar fichas do usuário", {
                variant: 'error',
                key:'error_minhas_fichas_not_found'
            });
		});
    });

    const getContentTypeItem = (system: string) => {
        if(system === 'CALL_OF_CTHULHU') {
            return <GiOctopus />;
        }
        if(system === 'hp') {
            return <GiHarryPotterSkull />;
        }
    }

    const getContentTypeTooltip = (system: string) => {
        if(system === 'CALL_OF_CTHULHU') {
            return "Call of Cthulhu";
        }
        if(system === 'hp') {
            return "Harry Potter (Broomstix)";
        }
        return "";
    }

    const getSystemPath = (system: string) => {
        if(system === 'CALL_OF_CTHULHU') {
            return "coc";
        }
        if(system === 'hp') {
            return "hp";
        }
        return "";
    }

    return loading ? <Skeleton animation="wave" variant="rectangular"/> : (
        <React.Fragment>
            <Divider textAlign="left">
                <GiArchiveResearch size={20} color={theme.palette.primary.light}/><Typography variant='h6' component="div" display="inline" sx={{ marginLeft: '8px' }}>Minhas fichas</Typography>
            </Divider>
            <List>
                {fichas?.map((ficha) => {
                    return <ListItem
                        key={ficha.uuid}
                        secondaryAction={
                        <IconButton edge="end" aria-label="Ver ficha" onClick={() => {navigate(`/sheets/${getSystemPath(ficha.system)}/details?uuid=${ficha.uuid}`)}}>
                            <ReadMoreIcon />
                        </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Tooltip title={getContentTypeTooltip(ficha.system)}>
                                <Avatar>
                                    {getContentTypeItem(ficha.system)}
                                </Avatar>
                            </Tooltip>
                        </ListItemAvatar>
                        <ListItemText
                        primary={ficha.characterName}
                        secondary={ficha.sessionName}
                        />
                    </ListItem>
                })}
            </List>
        </React.Fragment>
    );
}