import React, { ReactNode, useState } from "react"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItemIcon } from "@mui/material";

interface ExpandableListItemProps {
    icon?: ReactNode,
    listItemText: string,
    children: ReactNode
}

export function ExpandableListItem(props: ExpandableListItemProps) {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (<React.Fragment>
        <ListItemButton onClick={handleClick}>
            {props.icon && <ListItemIcon>
                {props.icon}
            </ListItemIcon>}
            <ListItemText primary={props.listItemText}/>
                {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
            {props.children}
        </Collapse>
    </React.Fragment>);

}