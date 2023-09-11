import { Divider, Group, Title } from "@mantine/core"

export interface TitleDividerWithIconProps {
    icon?: React.ReactNode,
    label: string
}

export function TitleDividerWithIcon(props: TitleDividerWithIconProps) {
    return <Divider labelPosition='left' mb={"xs"} label={
        <Group position='left'>
            {props.icon}
            <Title order={6}>{props.label}</Title>
        </Group>
    }/>
}