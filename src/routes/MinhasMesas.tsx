import { Avatar, AvatarGroup, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GiHarryPotterSkull, GiOctopus, GiTabletopPlayers } from "react-icons/gi";
import { useNavigate } from "react-router";
import { SessionBase } from "../components/models/Session";
import { AccountService } from "../components/services/AccountService";
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import styled from "@emotion/styled";

const AvatarContainer = styled.div`
  display: flex;
  margin-bottom: 14px;
  & > * {
    margin: 4px;
  }
`;

export function MinhasMesas() {

    const [loading, setLoading] = useState(true);
    const [mesas, setMesas] = useState<SessionBase[] | null>(null);

    const theme = useTheme();

    let navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        AccountService.getCurrentUserMesasMestradas().then(res => {
            setMesas(res.data);
            setLoading(false);
        });
    }, []);

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

    return loading? <Skeleton animation="wave" variant="rectangular"/> : (
        <React.Fragment>
            <Divider textAlign="left">
                <GiTabletopPlayers size={20} color={theme.palette.primary.light}/><Typography variant='h6' component="div" display="inline" sx={{ marginLeft: '8px' }}>Minhas mesas</Typography>
            </Divider>
            <List>
                {mesas?.map((mesa) => {
                    return <ListItem
                        key={mesa.uuid}
                        secondaryAction={
                        <IconButton edge="end" aria-label="Ver mesa" onClick={() => {navigate(`/sessions/${getSystemPath(mesa.system)}/details?uuid=${mesa.uuid}`)}}>
                            <ReadMoreIcon />
                        </IconButton>
                        }
                    >
                        <ListItemAvatar>
                            <Tooltip title={getContentTypeTooltip(mesa.system)}>
                                <Avatar>
                                    {getContentTypeItem(mesa.system)}
                                </Avatar>
                            </Tooltip>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={mesa.sessionName}
                            secondary={
                                <AvatarContainer>
                                    <AvatarGroup sx={{ flexDirection: "row-reverse" }} max={4}>
                                        {mesa.players.map((playerName: string) => {
                                            return <Tooltip title={playerName}>
                                                    <Avatar alt={playerName}/>
                                                </Tooltip> 
                                        })}
                                    </AvatarGroup>
                                </AvatarContainer>
                            }
                        />
                    </ListItem>
                })}
            </List>
        </React.Fragment>
    );
}