import { Center, Paper, Text, createStyles } from "@mantine/core";
import { IconBookUpload, IconTrash } from "@tabler/icons-react";
import { ReactNode } from "react";

const useStyles = createStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.white,
        cursor: 'pointer'
    },

    div: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.xl,
    },

    divNoRightPadding: {
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
        padding: theme.spacing.xl,
        paddingRight: theme.spacing.xs,
    },

    titleSubtitleWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'   
    }
}));

export interface ClickablePaperProps {
    onClick: () => void;
    icon?: ReactNode;
    title?: string | ReactNode;
    subtitle?: string | ReactNode;
    trailingIcon?: React.FC<any>;
    onDelete?: () => void;
}

export function ClickablePaper(props: ClickablePaperProps) {

    const { cx, classes } = useStyles();

    return <Paper
        className={classes.paper}
        shadow="sm"
    >
        <div className={cx(classes.div, { [classes.divNoRightPadding]: props.onDelete})} onClick={props.onClick} style={{}}>
            <div style={{ display: 'flex' }}>
                {props.icon && <Center mr="xl">
                    {props.icon}
                </Center>}
                <div className={classes.titleSubtitleWrapper}>
                    {(typeof props.title === 'string') && <Text fz="lg">{props.title}</Text>}
                    {(typeof props.title !== 'string') && props.title}
                    {(typeof props.subtitle === 'string') && <Text fz="sm" fw={500}>{props.subtitle}</Text>}
                    {(typeof props.subtitle !== 'string') && props.subtitle}
                </div>
            </div>
            <Center>
                {props.trailingIcon ? <props.trailingIcon size={20}/> : <IconBookUpload size={20} />}
            </Center>
        </div>
        {props.onDelete && <Center pr={"xl"} onClick={() => {
            props.onDelete!();
        }}>
            <IconTrash />    
        </Center>}
    </Paper>
}