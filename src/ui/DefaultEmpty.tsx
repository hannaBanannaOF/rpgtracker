import { ReactNode } from "react";
import { Box, Button, Center, Stack, Title } from '@mantine/core';
import { IconMoodSmile } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";

interface DefaultEmptyProps {
    visible: boolean,
    children?: ReactNode | ReactNode[],
    emptyIcon?: ReactNode,
    emptyText?: string,
    add?: () => void
}

export function DefaultEmpty(props: DefaultEmptyProps) {

    const { t } = useTranslation('general');

    return <>{
        props.visible && <Box sx={{ 
            width: "100%", 
            display: "flex", 
            flexDirection: "column", 
            textAlign: "center", 
            alignItems: "center",
            py: 2
        }}><Stack spacing={"xs"}>
            <Center>
                {props.emptyIcon !== null && props.emptyIcon} 
                {!props.emptyIcon && <IconMoodSmile />}
            </Center>
            <Title order={4}>{props.emptyText ?? t('defaultEmpty.message')}</Title>
            {props.add && <Button onClick={() => {
                props.add!();
            }}>{t('buttons.add')}</Button>}
        </Stack>
        </Box>}
        {!props.visible && props.children}
    </>
}