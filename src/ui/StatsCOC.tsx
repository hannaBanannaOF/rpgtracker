import { Grid, Typography, FormControlLabel, Checkbox, Paper, Box } from '@mui/material';

export interface CoCStatsProps {
    value: string | number,
    stat: string,
    fullRounded?: boolean,
    improvcheck?: boolean,
    improvedCheck?: boolean,
    fullWidth?: boolean
    span?: Viewports
}

interface Viewports {
    xs?: number,
    sm?: number,
    md?: number,
    lg?: number,
    xl?: number,
}

export function CoCStats(props: CoCStatsProps){

    return (
            <Grid container item xs={props.span?.xs ?? 12} sm={props.span?.sm ?? 12} md={props.span?.md ?? 12} lg={props.span?.lg ?? 12} xl={props.span?.xl ?? 12}>
                {!props.fullRounded && <Grid item container justifyContent={"space-around"} alignItems={"center"} xs={12}>
                    {props.improvcheck ? <FormControlLabel control={<Checkbox checked={props.improvedCheck} />} label={props.stat} /> : <Typography display="inline">{props.stat}</Typography>}
                    <Paper sx={{
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        border: (theme) => 
                        theme.palette.mode === 'dark' ? '1px solid #fff' : '1px solid #1A2027',
                        borderRadius: "0 10px 0 0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}>
                        <Typography sx={{ 
                            p: 2,
                            borderRight: (theme) => 
                            theme.palette.mode === 'dark' ? '1px solid #fff' : '1px solid #1A2027',
                        }}>{props.value}</Typography>
                        <Box>
                            <Typography display="block" variant="caption" sx={{ 
                                px: 2, 
                                borderBottom: (theme) => 
                                theme.palette.mode === 'dark' ? '1px solid #fff' : '1px solid #1A2027',
                            }}>{Math.floor(+props.value/2)}</Typography>
                            <Typography display="block" variant="caption" sx={{
                                px: 2
                            }}>{Math.floor(+props.value/5)}</Typography>
                        </Box>
                    </Paper>
                </Grid>}
                {props.fullRounded && !props.improvcheck && <Grid item container justifyContent={"space-around"} alignItems={"center"} xs={12}>
                    <Typography display="inline">{props.stat}</Typography>
                    <Paper sx={{
                        p: 2,
                        backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                        border: (theme) => 
                        theme.palette.mode === 'dark' ? '1px solid #fff' : '1px solid #1A2027',
                        borderRadius: "10px"
                    }}>
                        <Typography>{props.value}</Typography>
                    </Paper>
                </Grid>}
            </Grid>
    );
}