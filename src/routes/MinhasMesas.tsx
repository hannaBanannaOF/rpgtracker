import { Avatar, AvatarGroup, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GiHarryPotterSkull, GiOctopus } from "react-icons/gi";
import { useNavigate } from "react-router";
import { MesaBase } from "../models/Mesa";
import { AccountService } from "../services/AccountService";
import ReadMoreIcon from '@mui/icons-material/ReadMore';

export function MinhasMesas() {

    const [loading, setLoading] = useState(true);
    const [mesas, setMesas] = useState<MesaBase[] | null>(null);

    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        AccountService.getCurrentUserMesasMestradas().then(res => {
            setMesas(res.data);
            setLoading(false);
        });
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

    return loading? <Skeleton animation="wave" variant="rectangular"/> : (
        <React.Fragment>
            <Divider textAlign="left">Minhas mesas</Divider>
            <List>
                {mesas?.map((mesa) => {
                    return <ListItem
                        key={mesa.id}
                        secondaryAction={
                        <IconButton edge="end" aria-label="Ver mesa" onClick={() => {navigate(`mesas/${mesa.get_content_type}/details?pk=${mesa.id}`)}}>
                            <ReadMoreIcon />
                        </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Tooltip title={getContentTypeTooltip(mesa.get_content_type)}>
                                <Avatar>
                                    {getContentTypeItem(mesa.get_content_type)}
                                </Avatar>
                            </Tooltip>
                        </ListItemAvatar>
                        <ListItemText
                        primary={mesa.name}
                        secondary={
                            <AvatarGroup sx={{ flexDirection: "row" }}>
                            {mesa.fichas_mesa.map((ficha) => {
                                return <Tooltip title={ficha.jogador.first_name ?? "Anon"}>
                                        <Avatar src={ficha.jogador.photo}/>
                                    </Tooltip> 
                            })}
                            </AvatarGroup>
                        }
                        />
                    </ListItem>
                })}
            </List>
        </React.Fragment>
    );
}