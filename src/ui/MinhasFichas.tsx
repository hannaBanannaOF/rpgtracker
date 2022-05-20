import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Tooltip } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import React, { useEffect, useState } from 'react';
import { GiOctopus, GiHarryPotterSkull } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { FichaBase as Ficha } from '../components/models/Ficha';
import { AccountService } from '../components/services/AccountService';
import { useSnackbar } from 'notistack';


export function MinhasFichas() {

    const [loading, setLoading] = useState(true);
    const [fichas, setFichas] = useState<Ficha[] | null>(null);
    const { enqueueSnackbar } = useSnackbar();
    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        AccountService.getCurrentUserFichas().then((res) => {
            setLoading(false);
            setFichas(res.data);
		}).catch(err => {
            //err.response?.data?.detail ?? ""
            enqueueSnackbar("Erro ao buscar fichas do usuário", {
                variant: 'error',
                key:'error_minhas_fichas_not_found'
            });
		});
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getContentTypeItem = (content_type: string) => {
        if(content_type === 'coc') {
            return <GiOctopus />;
        }
        if(content_type === 'hp') {
            return <GiHarryPotterSkull />;
        }
    }

    const getContentTypeTooltip = (content_type: string) => {
        if(content_type === 'coc') {
            return "Call of Cthulhu";
        }
        if(content_type === 'hp') {
            return "Harry Potter (Broomstix)";
        }
        return "";
    }

    return loading ? <Skeleton animation="wave" variant="rectangular"/> : (
        <React.Fragment>
            <Divider textAlign="left">Minhas fichas</Divider>
            <List>
                {fichas?.map((ficha) => {
                    return <ListItem
                        key={ficha.id}
                        secondaryAction={
                        <IconButton edge="end" aria-label="Ver ficha" onClick={() => {navigate(`fichas/${ficha.get_content_type}/details?pk=${ficha.id}`)}}>
                            <ReadMoreIcon />
                        </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Tooltip title={getContentTypeTooltip(ficha.get_content_type)}>
                                <Avatar>
                                    {getContentTypeItem(ficha.get_content_type)}
                                </Avatar>
                            </Tooltip>
                        </ListItemAvatar>
                        <ListItemText
                        primary={ficha.nome_personagem}
                        secondary={ficha.mesa?.name}
                        />
                    </ListItem>
                })}
            </List>
        </React.Fragment>
    );
}