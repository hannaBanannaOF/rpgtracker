import { Skeleton, Grid, Paper, Typography, Divider, Avatar, Slider, Chip, Box, FormControlLabel, Checkbox, List } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ArmasEmFicha, FichaCOC, Talentos } from '../models/Ficha';
import { CoCService } from '../services/CoCService';
import { DefaultEmpty } from '../ui/DefaultEmpty';
import { ExpandableListItem } from '../ui/ExpandableListItem';
import { CoCStats } from '../ui/StatsCOC';
import { useSnackbar } from 'notistack';

interface DetalhesFichaCoCProps {
    pk?: number
}

export function DetalhesFichaCoC(props: DetalhesFichaCoCProps) {

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(true);
    const [ficha, setFicha] = useState<FichaCOC | null>(null);


    useEffect(() => {
        setLoading(true);
        if (!props.pk) {
            enqueueSnackbar("Não foi possível buscar detalhes da ficha!", {
                variant: "error",
                key: "error_ficha_not_found"
            });
        } else {
            CoCService.getFicha(props.pk!).then(res => {
                setFicha(res.data);
                setLoading(false);
            }).catch(err => {
                    //description: err.response?.data?.detail ?? ""
                enqueueSnackbar("Não foi possível buscar detalhes da ficha!", {
                    variant: "error",
                    key: "error_ficha_not_found"
                });
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.pk])

    return loading ? <Skeleton variant='rectangular' animation='wave'/> : (
        <Grid container columns={24} spacing={2} sx={{ mb: 2 }}>
            <Grid item order={{lg: 1, md: 1, sm: 2, xs: 2}} xs={17} md={15} lg={6}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='left'>
                        <Typography variant='h6' component="div">{(ficha?.pulp_cthulhu ?? false) ? "Herói (PCoC)" : "Investigador"}</Typography>
                    </Divider>
                    <Typography><Typography sx={{textDecoration: 'underline'}} display="inline">Nome:</Typography> {ficha?.nome_personagem ?? ""}</Typography>
                    <Typography><Typography sx={{textDecoration: 'underline'}} display="inline">Jogador:</Typography> {ficha?.jogador.first_name ?? "Anon"}</Typography>
                    <Typography><Typography sx={{textDecoration: 'underline'}} display="inline">Ocupação:</Typography> {ficha?.ocupation.name}</Typography>
                    <Typography><Typography sx={{textDecoration: 'underline'}} display="inline">Idade:</Typography> {ficha?.age ?? 0}</Typography>
                    <Typography><Typography sx={{textDecoration: 'underline'}} display="inline">Residência:</Typography> {ficha?.residence ?? ""}</Typography>
                    <Typography><Typography sx={{textDecoration: 'underline'}} display="inline">Naturalidade:</Typography> {ficha?.birthplace ?? ""}</Typography>
                    {(ficha?.pulp_cthulhu ?? false) &&<Typography><Typography sx={{textDecoration: 'underline'}} display="inline">Arquétipo:</Typography> {ficha?.pulp_archetype ?? ""}</Typography>}
                </Paper>
            </Grid>
            <Grid item order={{lg: 2, md: 3, sm: 3, xs: 3}} lg={13} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='center'>
                        <Typography variant='h6' component="div">Características</Typography>
                    </Divider>
                    <Grid container item spacing={2} columns={12}>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={ficha?.strength ?? "0"} stat="STR"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={ficha?.dexterity ?? "0"} stat="DEX"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={ficha?.power ?? "0"} stat="POW"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={ficha?.constitution ?? "0"} stat="CON"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={ficha?.appearence ?? "0"} stat="APP"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={ficha?.education ?? "0"} stat="EDU"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={ficha?.size ?? "0"} stat="SIZ"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={ficha?.inteligence ?? "0"} stat="INT"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} fullRounded value={ficha?.move_rate ?? "0"} stat="Move Rate"/>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item order={{lg: 3, md: 2, sm: 1, xs: 1}} lg={5} md={9} xs={7}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Avatar />
                </Box>           
            </Grid>
            <Grid item order={4} lg={8} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='left'>
                        <Typography variant='h6' component="div">HP: {ficha?.hp ?? 0}</Typography>
                    </Divider>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Typography variant="button" component="div">Max HP: {ficha?.max_hp ?? "0"}</Typography>
                        {(ficha?.hp ?? 0) === 0 && ficha?.major_wound && <Chip label="Morrendo" sx={{ ml: "auto" }} color="error"/>}
                        {(ficha?.hp ?? 0) === 0 && !ficha?.major_wound && <Chip label="Inconsciente" sx={{ ml: "auto" }}/>}
                    </Box>
                    <Slider
                        value={ficha?.hp ?? 0}
                        min={0}
                        max={ficha?.max_hp ?? 0}
                    />
                </Paper>
            </Grid>
            <Grid item order={5} lg={16} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='left'>
                        <Typography variant='h6' component="div">Sanidade: {ficha?.san ?? 0}</Typography>
                    </Divider>
                    
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Typography variant="button" component="div">MAX SAN: {ficha?.max_san ?? "0"}</Typography>
                        {(ficha?.san ?? 0) === 0 && <Chip label="Insano" sx={{ ml: "auto" }}/>}
                    </Box>
                    <Typography variant="button" component="div">START SAN: {ficha?.start_san ?? "0"}</Typography>
                    <FormControlLabel control={<Checkbox checked={ficha?.temporary_insanity} />} label="Insanidade temporária" />
                    <FormControlLabel control={<Checkbox checked={ficha?.indefinity_insanity} />} label="Insanidade indeterminada" />
                    <Slider
                        max={ficha?.max_san ?? 0} value={ficha?.san ?? 0} min={0}
                    />
                </Paper>
            </Grid>
            <Grid item order={6} lg={16} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='left'>
                        <Typography variant='h6' component="div">Sorte: {ficha?.luck ?? 0}</Typography>
                    </Divider>
                    {(ficha?.luck ?? 0) === 0 && <Chip label="Sem sorte"/>}
                    <Slider
                        max={99} value={ficha?.luck ?? 0} min={0}
                    />
                </Paper>
            </Grid>
            <Grid item order={7} lg={8} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='left'>
                        <Typography variant='h6' component="div">MP: {ficha?.mp ?? 0}</Typography>
                    </Divider>
                    <Typography variant="button" component="div">Max MP: {ficha?.max_mp ?? "0"}</Typography>
                    <Slider
                        max={ficha?.max_mp ?? 0} value={ficha?.mp ?? 0} min={0}
                    />
                </Paper>
            </Grid>
            <Grid item order={8} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='center'>
                        <Typography variant='h6' component="div">Perícias</Typography>
                    </Divider>
                    <Grid container spacing={2} columns={12}>
                        {(ficha?.skill_list ?? []).map((skill: any) => {
                            return <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={skill.value} stat={skill.name} improvcheck improvedCheck={skill.improv}/>
                        })}
                    </Grid>
                </Paper>
            </Grid>
            <Grid item order={9} xs={24} lg={18}>
            <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='center'>
                        <Typography variant='h6' component="div">Armas</Typography>
                    </Divider>
                    <DefaultEmpty itens={ficha?.weapons.length ?? 0}>
                    <List sx={{ width: '100%'}}>
                            {ficha!.weapons.map((item: ArmasEmFicha) => {
                                return <ExpandableListItem listItemText={item.nickname ?? item.weapon.name}>
                                    <Box px={2}>
                                        <Divider textAlign='left'>
                                            <Typography variant='button'>Propriedades básicas</Typography>
                                        </Divider>
                                        <Typography>Dano: {item.weapon.damage}</Typography>
                                        <Typography>Ataques: {item.weapon.attacks > 1 ? `1(${item.weapon.attacks})` : 1}</Typography>
                                        <Divider textAlign='left'>
                                            <Typography variant='button'>Propriedades avançadas</Typography>
                                        </Divider>
                                        {item.weapon.is_melee && <React.Fragment>
                                           <Typography>Arma mano-a-mano</Typography>
                                           <Typography>Acerto normal: {item.normal_success_value}</Typography>
                                           <Typography>Acerto bom: {Math.floor(item.normal_success_value/2)}</Typography>
                                           <Typography>Acerto extremo: {Math.floor(item.normal_success_value/5)}</Typography>
                                       </React.Fragment>}
                                       {!item.weapon.is_melee && <React.Fragment>
                                           <Typography>Acerto normal: {item.normal_success_value}</Typography>
                                           <Typography>Acerto bom: {Math.floor(item.normal_success_value/2)}</Typography>
                                           <Typography>Acerto extremo: {Math.floor(item.normal_success_value/5)}</Typography>
                                           <Typography>Tiros restantes: {item.rounds_left}</Typography>
                                           <Typography>Munição disponível: {`${item.ammo_left} (${item.total_ammo_left})`}</Typography>
                                       </React.Fragment>}
                                    </Box>
                                </ExpandableListItem>
                            })}
                        </List>
                    </DefaultEmpty>
                </Paper>
            </Grid>
            <Grid item order={10} xs={24} lg={6}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='center'>
                        <Typography variant='h6' component="div">Combate</Typography>
                    </Divider>
                    <Grid container item spacing={2} columns={12}>
                        <CoCStats fullRounded value={ficha?.bonus_dmg ?? "0"} stat="Bonus Damage"/>
                        <CoCStats fullRounded value={ficha?.build ?? "0"} stat="Build"/>
                        <CoCStats value={ficha?.dodge ?? "0"} stat="Dodge"/>
                    </Grid>
                </Paper>
            </Grid>
            {ficha?.pulp_cthulhu && <Grid item order={11} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='center'>
                        <Typography variant='h6' component="div">Talentos (PCoC)</Typography>
                    </Divider>
                    <DefaultEmpty itens={ficha.pulp_talents.length ?? 0}>
                        <List sx={{ width: '100%'}}>
                            {ficha.pulp_talents.map((item: Talentos) => {
                                return <ExpandableListItem listItemText={item.name}>
                                    <Typography>{item.desc}</Typography>
                                </ExpandableListItem>
                            })}
                        </List>
                    </DefaultEmpty>
                </Paper>
            </Grid>}
        </Grid>
    );
}