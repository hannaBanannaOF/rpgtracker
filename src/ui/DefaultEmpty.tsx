import { ReactNode } from "react";
import { Box, Title } from '@mantine/core';
import { IconMoodSmile } from "@tabler/icons-react";

interface DefaultEmptyProps {
    visible: boolean,
    children: ReactNode,
    emptyIcon?: ReactNode,
    emptyText?: string
}

export function DefaultEmpty(props: DefaultEmptyProps) {
    return <>{
        props.visible && <Box sx={{ 
            width: "100%", 
            display: "flex", 
            flexDirection: "column", 
            textAlign: "center", 
            alignItems: "center",
            py: 2
        }}><>
            {props.emptyIcon !== null && props.emptyIcon} 
            {!props.emptyIcon && <IconMoodSmile />}
            <Title order={4}>{props.emptyText ?? "Nada encontrado"}</Title>
        </>
        </Box>}
        {!props.visible && props.children}
    </>
}