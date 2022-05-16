import React, { ReactNode } from "react";
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';

interface DefaultEmptyProps {
    itens: number,
    children: ReactNode
}

export function DefaultEmpty(props: DefaultEmptyProps) {
    return <React.Fragment>
        {props.itens === 0 && <SentimentSatisfiedAltIcon sx={{ fontSize: 50, ml: "auto" }}/>}
        {props.itens > 0 && props.children}
    </React.Fragment>
}