import { Skeleton, Grid, Paper, Typography, Divider, Avatar, Slider, Chip, Box } from '@mui/material';
import { notification } from 'antd';
import { useEffect, useState } from 'react';
import { ArmasEmFicha, FichaCOC } from '../components/models/Ficha';
import { useQuery } from '../components/routes/WithRouter';
import { CoCService } from '../components/services/CoCService';
import { CoCStats } from '../ui/StatsCOC';

export function DetalhesFichaCoC() {

    const query = useQuery();
    const fichaId = query.get("pk") as unknown as number;
    const columns = [
        {
            title: "Arma",
            key: "arma_col",
            render: (record: ArmasEmFicha) => {
                return record.nickname ?? record.weapon.name
            }
        },
        {
            title: "Dano",
            dataIndex: ["weapon","damage"],
            key: "damage_col"
        },
        {
            title: "Ataques",
            key: "atk_col",
            render: (record: ArmasEmFicha) => {
                return record.weapon.attacks > 1 ? `1(${record.weapon.attacks})` : 1
            }
        }
    ]

    const [loading, setLoading] = useState(true);
    const [ficha, setFicha] = useState<FichaCOC | null>(null);


    useEffect(() => {
        setLoading(true);
        CoCService.getFicha(fichaId).then(res => {
            setFicha(res.data);
            setLoading(false);
        }).catch(err => {
            notification.error({
                message: "Não foi possível buscar detalhes da ficha!",
                description: err.response?.data?.detail ?? ""
            });
        });
    }, [fichaId])

    return loading ? <Skeleton variant='rectangular' animation='wave'/> : (
        <Grid container columns={24} spacing={2}>
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
            <Grid item order={{lg: 2, md: 3, sm: 3, xs: 3}} xl={12} lg={13} xs={24}>
                <Paper sx={{ padding: 2 }}>
                    <Divider textAlign='center'>
                        <Typography variant='h6' component="div">Características</Typography>
                    </Divider>
                    <Grid container item spacing={2} columns={12}>
                        <CoCStats span={{ lg: 4, md: 6, sm: 12 }} value={ficha?.strength ?? "0"} stat="STR"/>
                        <CoCStats span={{ lg: 4, md: 6, sm: 12 }} value={ficha?.dexterity ?? "0"} stat="DEX"/>
                        <CoCStats span={{ lg: 4, md: 6, sm: 12 }} value={ficha?.power ?? "0"} stat="POW"/>
                        <CoCStats span={{ lg: 4, md: 6, sm: 12 }} value={ficha?.constitution ?? "0"} stat="CON"/>
                        <CoCStats span={{ lg: 4, md: 6, sm: 12 }} value={ficha?.appearence ?? "0"} stat="APP"/>
                        <CoCStats span={{ lg: 4, md: 6, sm: 12 }} value={ficha?.education ?? "0"} stat="EDU"/>
                        <CoCStats span={{ lg: 4, md: 6, sm: 12 }} value={ficha?.size ?? "0"} stat="SIZ"/>
                        <CoCStats span={{ lg: 4, md: 6, sm: 12 }} value={ficha?.inteligence ?? "0"} stat="INT"/>
                        <CoCStats span={{ lg: 4, md: 6, sm: 12 }} fullRounded value={ficha?.move_rate ?? "0"} stat="Move Rate"/>
                    </Grid>
                </Paper>
            </Grid>
            <Grid item order={{lg: 3, md: 2, sm: 1, xs: 1}} xl={6} lg={5} md={9} xs={7}>
                <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
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
        </Grid>
    );

    //             <Col xl={{ span: 16, order: 5 }} lg={{ span: 16, order: 5 }} md={{ span: 24, order: 5 }} sm={{ span: 24, order: 5 }} xs={{ span: 24, order: 5 }}>
    //                 <Card title="Sanidade">
    //                     <Space direction='vertical' style={{ width: "100%" }}>
    //                         <Space>
    //                             <Typography.Title level={5}>MAX SAN: {ficha?.max_san ?? "0"}</Typography.Title>
    //                             <Typography.Title level={5}>START SAN: {ficha?.start_san ?? "0"}</Typography.Title>
    //                             {(ficha?.san ?? 0) === 0 && <Typography.Title level={5}>Insano</Typography.Title>}
    //                         </Space>
    //                         <Space direction='vertical'>
    //                             <Checkbox checked={ficha?.temporary_insanity}>Insanidade temporária</Checkbox>
    //                             <Checkbox checked={ficha?.indefinity_insanity}>Insanidade Indefinida</Checkbox>
    //                         </Space>
    //                         <Slider max={ficha?.max_san ?? 0} value={ficha?.san ?? 0} min={0}/>
    //                     </Space>
    //                 </Card>
    //             </Col>
    //             <Col xl={{ span: 16, order: 6 }} lg={{ span: 16, order: 6 }} md={{ span: 24, order: 6 }} sm={{ span: 24, order: 6 }} xs={{ span: 24, order: 6 }}>
    //                 <Card title="Sorte">
    //                     <Space direction='vertical' style={{ width: "100%" }}>
    //                         {(ficha?.luck ?? 0) === 0 && <Typography.Title level={5}>Sem sorte</Typography.Title>}
    //                         <Slider max={99} value={ficha?.luck ?? 0} min={0}/>
    //                     </Space>
    //                 </Card>
    //             </Col>
    //             <Col xl={{ span: 8, order: 7 }} lg={{ span: 8, order: 7 }} md={{ span: 24, order: 7 }} sm={{ span: 24, order: 7 }} xs={{ span: 24, order: 7 }}>
    //                 <Card title="MP">
    //                     <Space direction='vertical' style={{ width: "100%" }}>
    //                         <Typography.Title level={5}>MAX MP: {ficha?.max_mp ?? "0"}</Typography.Title>
    //                         <Slider max={ficha?.max_mp ?? 0} value={ficha?.mp ?? 0} min={0}/>
    //                     </Space>
    //                 </Card>
    //             </Col>
    //             <Col span={24} order={8}>
    //                 <Card title="Perícias" headStyle={{ textAlign: "center" }}>
    //                     <List 
    //                         dataSource={ficha?.skill_list ?? []}
    //                         grid={{ gutter: 5, xs: 1,
    //                             sm: 1,
    //                             md: 2,
    //                             lg: 3,
    //                             xl: 4,
    //                             xxl: 4, }}
    //                         renderItem={(item: any) => (
    //                                 <List.Item key={item.name}>
    //                                     <CoCStats value={item.value} stat={item.name} improvcheck improvedCheck={item.improv}/>
    //                                 </List.Item>)
    //                         }/>
    //                 </Card>
    //             </Col>
    //             <Col xs={{ span: 24, order: 9 }} sm={{ span: 24, order: 9 }} md={{ span: 24, order: 9 }} lg={{ span: 18, order: 9 }} xl={{ span: 18, order: 9 }}>
    //                 <Card title="Armas" headStyle={{ textAlign: "center" }}>
    //                     <Table rowKey={"id"} columns={columns} dataSource={ficha?.weapons ?? []} expandable={{
    //                         expandedRowRender: record => <Card title="Detalhes">
    //                             {record.weapon.is_melee && <Space direction='vertical'>
    //                                 <Typography.Text>Arma mano-a-mano</Typography.Text>
    //                                 <Typography.Text>Acerto normal: {record.normal_success_value}</Typography.Text>
    //                                 <Typography.Text>Acerto bom: {Math.floor(record.normal_success_value/2)}</Typography.Text>
    //                                 <Typography.Text>Acerto extremo: {Math.floor(record.normal_success_value/5)}</Typography.Text>
    //                             </Space>}
    //                             {!record.weapon.is_melee && <Space direction='vertical'>
    //                                 <Typography.Text>Acerto normal: {record.normal_success_value}</Typography.Text>
    //                                 <Typography.Text>Acerto bom: {Math.floor(record.normal_success_value/2)}</Typography.Text>
    //                                 <Typography.Text>Acerto extremo: {Math.floor(record.normal_success_value/5)}</Typography.Text>
    //                                 <Typography.Text>Tiros restantes: {record.rounds_left}</Typography.Text>
    //                                 <Typography.Text>Munição disponível: {`${record.ammo_left} (${record.total_ammo_left})`}</Typography.Text>
    //                             </Space>}
    //                         </Card>,
    //                     }}/>
    //                 </Card>
    //             </Col>
    //             <Col xs={{ span: 24, order: 10 }} sm={{ span: 24, order: 10 }} md={{ span: 24, order: 10 }} lg={{ span: 6, order: 10 }} xl={{ span: 6, order: 10 }}>
    //                 <Card title="Combate" headStyle={{ textAlign: "center" }}>
    //                     <Space direction='vertical' style={{ width: "100%" }}>
    //                         <CoCStats fullRounded value={ficha?.bonus_dmg ?? "0"} stat="Bonus Damage"/>
    //                         <CoCStats fullRounded value={ficha?.build ?? "0"} stat="Build"/>
    //                         <CoCStats value={ficha?.dodge ?? "0"} stat="Dodge"/>
    //                     </Space>
    //                 </Card>
    //             </Col>
    //             {ficha?.pulp_cthulhu && <Col span={24} order={11}>
    //                 <Card title="Talentos (PCoC)" headStyle={{ textAlign: "center" }}>
    //                     <Collapse>
    //                         {ficha.pulp_talents.map(item => {
    //                             return <Collapse.Panel key={item.id} showArrow={false} header={item.name}>
    //                                 <p>{item.desc}</p>
    //                             </Collapse.Panel>
    //                         })}
    //                     </Collapse>
    //                 </Card>
    //             </Col>}
    //         </Row>
    //     </Skeleton>
    // );

}