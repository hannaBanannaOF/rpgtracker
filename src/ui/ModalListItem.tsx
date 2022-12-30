import React, { useState } from "react"
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

interface ModalListItemProps {
    listItemText: string,
    dialogTitle: string,
    children: any
}

export function ModalListItem(props: ModalListItemProps) {

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(!showModal);
    };

    return <React.Fragment>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={props.listItemText}/><InfoOutlined />
            </ListItemButton>
            <Dialog open={showModal} onClose={handleClick} fullWidth={true}>
                <DialogTitle>{props.dialogTitle}</DialogTitle>
                <DialogContent>
                    {props.children}
                </DialogContent>
            </Dialog>
        </React.Fragment>;

}