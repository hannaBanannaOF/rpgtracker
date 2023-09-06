import { Checkbox, Divider, Grid, Group, Stack, Text, Title, createStyles } from "@mantine/core";

export interface CoCStatsProps {
    value: string | number,
    stat: string,
    fullRounded?: boolean,
    noShowFifth?: boolean,
    improvcheck?: boolean,
    improvedCheck?: boolean,
    span?: Viewports
}

interface Viewports {
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
}

const useStyles = createStyles((theme) => ({
    wrapper: {
        padding: theme.spacing.xs
    },

    semiBordered: {
        padding: "0",
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[4]}`,
        borderStartEndRadius: theme.radius.lg,
    },

    bordered: {
        padding: "0",
        border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.gray[8] : theme.colors.gray[4]}`,
        borderRadius: theme.radius.lg
    }
}));

export function CoCStats(props: CoCStatsProps){

    const { classes } = useStyles();

    return (
        <Grid.Col xs={props.span?.xs ?? 12} sm={props.span?.sm ?? 12} md={props.span?.md ?? 12} lg={props.span?.lg ?? 12} xl={props.span?.xl ?? 12}>
            {/* <UnstyledButton> */}
                <Group position="center">
                    {props.improvcheck && <Checkbox label={props.stat} defaultChecked={props.improvedCheck}/>}
                    {!props.improvcheck && <Title order={5}>{props.stat}</Title>}
                    <Group spacing={0} position="center" className={props.fullRounded ? classes.bordered : classes.semiBordered}>
                        <Text className={classes.wrapper}>{props.value}</Text>
                        {!props.noShowFifth && <>
                            <Divider orientation="vertical"/>
                            <Stack spacing={0}>
                                <Text className={classes.wrapper} fz="xs">{Math.floor(+props.value/2)}</Text>
                                <Divider />
                                <Text className={classes.wrapper} fz="xs">{Math.floor(+props.value/5)}</Text>
                            </Stack>
                        </>}
                    </Group>
                </Group>
            {/* </UnstyledButton> */}
        </Grid.Col>       
    );
}