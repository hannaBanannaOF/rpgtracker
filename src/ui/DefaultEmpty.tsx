import React, { ReactNode } from "react";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Box, Typography } from "@mui/material";

interface DefaultEmptyProps {
    itens: number,
    children: ReactNode,
    emptyIcon?: ReactNode,
    emptyText?: string
}

export function DefaultEmpty(props: DefaultEmptyProps) {
    return <React.Fragment>{
        props.itens === 0 && <Box sx={{ 
            width: "100%", 
            display: "flex", 
            flexDirection: "column", 
            textAlign: "center", 
            alignItems: "center",
            py: 2
        }}>
            {props.emptyIcon !== null && props.emptyIcon} 
            {!props.emptyIcon && <SentimentSatisfiedAltIcon sx={{ fontSize: 50 }}/>}
            <Typography variant='caption' display='block'>{props.emptyText ?? "Nada encontrado"}</Typography>
        </Box>}
        {props.itens > 0 && props.children}
    </React.Fragment>
}