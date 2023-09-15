import { ActionIcon } from "@mantine/core";
import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router";

interface GoBackProps {
    onBack?: () => void
}

export function GoBack(props: GoBackProps) {
    let navigate = useNavigate();
    return <ActionIcon onClick={() => {
        if (props.onBack) {
            props.onBack();
        } else {
            navigate(-1)
        }
    }}>
        <IconArrowNarrowLeft />
    </ActionIcon>
}