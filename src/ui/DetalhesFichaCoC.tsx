import { Grid, Paper, Typography, Divider, Slider, Chip, Box, FormControlLabel, Checkbox, List, IconButton, Dialog, DialogTitle, DialogContent } from '@mui/material';
import React, { useState } from 'react';
import { CoCWeaponsInSheet, COCCharacterSheet, SkillCoC, PulpTalents } from '../components/models/CharacterSheet';
import { DefaultEmpty } from './DefaultEmpty';
import { CoCStats } from './StatsCOC';
import { InfoOutlined } from '@mui/icons-material';
import { ModalListItem } from './ModalListItem';

export interface DetalhesFichaCoCProps {
    ficha?: COCCharacterSheet | null;
}

export function DetalhesFichaCoC(props: DetalhesFichaCoCProps) {
    
    const [occupationDialogOpen, setOccupationDialogOpen] = useState(false);

    return props.ficha ? (
        <Grid container columns={24} spacing={2} sx={{ mb: 2 }}>
            <Grid item order={{lg: 1, md: 1, sm: 2, xs: 2}} xs={17} md={15} lg={6}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='left'>
                        <Typography variant='h6' component="div">{(props.ficha?.basicInfo.pulpCthulhu ?? false) ? "Herói (PCoC)" : "Investigador"}</Typography>
                    </Divider>
                    <div>
                        <Typography sx={{textDecoration: 'underline'}} display="inline">Nome:</Typography> {props.ficha?.basicInfo.characterName ?? "Noname"}
                    </div>
                    <div>
                        <Typography sx={{textDecoration: 'underline'}} display="inline">Jogador:</Typography> {props.ficha?.basicInfo.playerName ?? "Anon"}
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <div><Typography sx={{textDecoration: 'underline'}} display="inline">Ocupação:</Typography> {props.ficha?.occupation?.name ?? "Unoccupied"}</div>
                        {props.ficha?.occupation && props.ficha?.occupation!.description && <React.Fragment>
                            <IconButton onClick={() => {setOccupationDialogOpen(true);}}>
                                <InfoOutlined />
                            </IconButton>
                            <Dialog open={occupationDialogOpen} onClose={() => {setOccupationDialogOpen(false);}} fullWidth={true}>
                                <DialogTitle>{props.ficha?.occupation?.name}</DialogTitle>
                                <DialogContent>
                                    <Divider textAlign='left'>
                                        <Typography variant='button' >Descrição</Typography>
                                    </Divider>
                                    {props.ficha?.occupation?.description ?? ""}
                                    <Divider textAlign='left'>
                                        <Typography variant='button' >Contatos sugeridos</Typography>
                                    </Divider>
                                    {props.ficha?.occupation?.suggestedContacts ?? ""}
                                </DialogContent>
                            </Dialog>
                        </React.Fragment>}
                    </div>
                    <div>
                        <Typography sx={{textDecoration: 'underline'}} display="inline">Idade:</Typography> {props.ficha?.basicInfo.age ?? 0}
                    </div>
                    <div>
                        <Typography sx={{textDecoration: 'underline'}} display="inline">Residência:</Typography> {props.ficha?.basicInfo.residence ?? ""}
                    </div>
                    <div>
                        <Typography sx={{textDecoration: 'underline'}} display="inline">Naturalidade:</Typography> {props.ficha?.basicInfo.birthplace ?? ""}
                    </div>
                    {(props.ficha?.basicInfo.pulpCthulhu ?? false) &&<Typography><Typography sx={{textDecoration: 'underline'}} display="inline">Arquétipo:</Typography> {props.ficha?.basicInfo.pulpArchetype ?? ""}</Typography>}
                </Paper>
            </Grid>
            <Grid item order={{lg: 2, md: 3, sm: 3, xs: 3}} lg={13} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='center'>
                        <Typography variant='h6' component="div">Características</Typography>
                    </Divider>
                    <Grid container item spacing={2} columns={12}>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={props.ficha?.basicAttributes.strength ?? "0"} stat="STR"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={props.ficha?.basicAttributes.dexterity ?? "0"} stat="DEX"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={props.ficha?.basicAttributes.power ?? "0"} stat="POW"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={props.ficha?.basicAttributes.constitution ?? "0"} stat="CON"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={props.ficha?.basicAttributes.appearance ?? "0"} stat="APP"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={props.ficha?.basicAttributes.education ?? "0"} stat="EDU"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={props.ficha?.basicAttributes.size ?? "0"} stat="SIZ"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={props.ficha?.basicAttributes.intelligence ?? "0"} stat="INT"/>
                        <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} fullRounded value={props.ficha?.calculatedAttributes.moveRate ?? "0"} stat="Move Rate"/>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item order={{lg: 3, md: 2, sm: 1, xs: 1}} lg={5} md={9} xs={7}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                </Box>           
            </Grid>
            <Grid item order={4} lg={8} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='left'>
                        <Typography variant='h6' component="div">HP: {props.ficha?.calculatedAttributes.healthPoints ?? 0}</Typography>
                    </Divider>
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Typography variant="button" component="div">Max HP: {props.ficha?.calculatedAttributes.maximumHealthPoints ?? "0"}</Typography>
                        {(props.ficha?.calculatedAttributes.healthPoints ?? 0) === 0 && props.ficha?.calculatedAttributes.maximumHealthPoints && <Chip label="Morrendo" sx={{ ml: "auto" }} color="error"/>}
                        {(props.ficha?.calculatedAttributes.healthPoints ?? 0) === 0 && !props.ficha?.calculatedAttributes.maximumHealthPoints && <Chip label="Inconsciente" sx={{ ml: "auto" }}/>}
                    </Box>
                    <Slider
                        value={props.ficha?.calculatedAttributes.healthPoints ?? 0}
                        min={0}
                        max={props.ficha?.calculatedAttributes.maximumHealthPoints ?? 0}
                    />
                </Paper>
            </Grid>
            <Grid item order={5} lg={16} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='left'>
                        <Typography variant='h6' component="div">Sanidade: {props.ficha?.calculatedAttributes.sanity ?? 0}</Typography>
                    </Divider>
                    
                    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                        <Typography variant="button" component="div">MAX SAN: {props.ficha?.calculatedAttributes.maximumSanity ?? "0"}</Typography>
                        {(props.ficha?.calculatedAttributes.sanity ?? 0) === 0 && <Chip label="Insano" sx={{ ml: "auto" }}/>}
                    </Box>
                    <Typography variant="button" component="div">START SAN: {props.ficha?.calculatedAttributes.startingSanity ?? "0"}</Typography>
                    <FormControlLabel control={<Checkbox checked={props.ficha?.calculatedAttributes.temporaryInsanity} />} label="Insanidade temporária" />
                    <FormControlLabel control={<Checkbox checked={props.ficha?.calculatedAttributes.indefiniteInsanity} />} label="Insanidade indeterminada" />
                    <Slider
                        max={props.ficha?.calculatedAttributes.maximumSanity ?? 0} value={props.ficha?.calculatedAttributes.sanity ?? 0} min={0}
                    />
                </Paper>
            </Grid>
            <Grid item order={6} lg={16} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='left'>
                        <Typography variant='h6' component="div">Sorte: {props.ficha?.basicAttributes.luck ?? 0}</Typography>
                    </Divider>
                    {(props.ficha?.basicAttributes.luck ?? 0) === 0 && <Chip label="Sem sorte"/>}
                    <Slider
                        max={99} value={props.ficha?.basicAttributes.luck ?? 0} min={0}
                    />
                </Paper>
            </Grid>
            <Grid item order={7} lg={8} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='left'>
                        <Typography variant='h6' component="div">MP: {props.ficha?.calculatedAttributes.magicPoints ?? 0}</Typography>
                    </Divider>
                    <Typography variant="button" component="div">Max MP: {props.ficha?.calculatedAttributes.maximumMagicPoints ?? "0"}</Typography>
                    <Slider
                        max={props.ficha?.calculatedAttributes.maximumMagicPoints ?? 0} value={props.ficha?.calculatedAttributes.magicPoints ?? 0} min={0}
                    />
                </Paper>
            </Grid>
            <Grid item order={8} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='center'>
                        <Typography variant='h6' component="div">Perícias</Typography>
                    </Divider>
                    <Grid container spacing={2} columns={12}>
                        {(props.ficha?.skills ?? []).map((skill: SkillCoC) => {
                            return <CoCStats span={{ xl: 4, lg: 4, md: 6, sm: 12 }} value={skill.value} stat={skill.skillName} improvcheck improvedCheck={skill.improvementCheck}/>
                        })}
                    </Grid>
                </Paper>
            </Grid>
            <Grid item order={9} xs={24} lg={18}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='center'>
                        <Typography variant='h6' component="div">Armas</Typography>
                    </Divider>
                    <DefaultEmpty itens={props.ficha?.weapons.length ?? 0}>
                    <List sx={{ width: '100%'}}>
                            {props.ficha!.weapons.map((item: CoCWeaponsInSheet) => {
                                return <ModalListItem listItemText={item.nickname ?? item.weapon.name} dialogTitle={item.nickname ?? item.weapon.name}>
                                    <React.Fragment>
                                        <Divider textAlign='left'>
                                            <Typography variant='button'>Propriedades básicas</Typography>
                                        </Divider>
                                        <Typography>Dano: {item.weapon.damage}</Typography>
                                        <Typography>Ataques: {item.weapon.attacksPerRound > 1 ? `1(${item.weapon.attacksPerRound})` : 1}</Typography>
                                        <Divider textAlign='left'>
                                            <Typography variant='button'>Propriedades avançadas</Typography>
                                        </Divider>
                                        {item.weapon.isMelee && <React.Fragment>
                                           <Typography>Arma mano-a-mano</Typography>
                                           {/* <Typography>Acerto normal: {item.normal_success_value}</Typography>
                                           <Typography>Acerto bom: {Math.floor(item.normal_success_value/2)}</Typography>
                                           <Typography>Acerto extremo: {Math.floor(item.normal_success_value/5)}</Typography> */}
                                       </React.Fragment>}
                                       {!item.weapon.isMelee && <React.Fragment>
                                           {/* <Typography>Acerto normal: {item.normal_success_value}</Typography>
                                           <Typography>Acerto bom: {Math.floor(item.normal_success_value/2)}</Typography>
                                           <Typography>Acerto extremo: {Math.floor(item.normal_success_value/5)}</Typography> */}
                                           <Typography>Tiros restantes: {item.ammoLeft}</Typography>
                                           <Typography>Munição disponível: {`${item.roundsLeft} (${item.totalAmmoLeft})`}</Typography>
                                       </React.Fragment>}
                                    </React.Fragment>
                                </ModalListItem>
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
                        <CoCStats fullRounded value={props.ficha?.calculatedAttributes.bonusDamage ?? "0"} stat="Bonus Damage"/>
                        <CoCStats fullRounded value={props.ficha?.calculatedAttributes.build ?? "0"} stat="Build"/>
                        <CoCStats value={props.ficha?.calculatedAttributes.dodge ?? "0"} stat="Dodge"/>
                    </Grid>
                </Paper>
            </Grid>
            {props.ficha?.basicInfo.pulpCthulhu && <Grid item order={11} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='center'>
                        <Typography variant='h6' component="div">Talentos (PCoC)</Typography>
                    </Divider>
                    <DefaultEmpty itens={props.ficha.pulpTalents.length ?? 0}>
                        <List sx={{ width: '100%'}}>
                            {props.ficha.pulpTalents.map((item: PulpTalents) => {
                                return <ModalListItem listItemText={item.name} dialogTitle={item.name}>
                                    {item.description}
                                </ModalListItem>
                            })}
                        </List>
                    </DefaultEmpty>
                </Paper>
            </Grid>}
        </Grid>
    ) : <React.Fragment></React.Fragment>;
}