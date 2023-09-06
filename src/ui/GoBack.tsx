import { ActionIcon } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router";

export function GoBack() {
    let navigate = useNavigate();
    return <ActionIcon onClick={() => navigate(-1)}>
        <IconArrowNarrowLeft />
    </ActionIcon>
}