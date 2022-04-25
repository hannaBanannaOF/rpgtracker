import { Card, Col, Collapse, List, notification, Row, Skeleton, Slider, Space, Table, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useEffect, useState } from 'react';
import { ArmasEmFicha, FichaCOC } from '../components/models/FichaCOC';
import { useQuery } from '../components/routes/WithRouter';
import { CoCService } from '../components/services/CoCService';
import { UserOutlined } from '@ant-design/icons';
import { CoCStats } from '../ui/StatsCOC';
import Checkbox from 'antd/lib/checkbox/Checkbox';

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

    return (
        <Skeleton active loading={loading}>
            <Row justify='space-between' gutter={[16, 16]} align="middle">
                <Col lg={{ span: 6, order: 1 }} md={{ span: 15, order: 1 }} sm={{ span: 17, order: 2 }} xs={{ span: 17, order: 2 }}>
                    <Card title={(ficha?.pulp_cthulhu ?? false) ? "Herói (PCoC)" : "Investigador"}>
                        <Space direction='vertical'>
                            <Space>
                                <Typography.Text underline>Nome:</Typography.Text>
                                {ficha?.nome_personagem ?? ""}
                            </Space>
                            <Space>
                                <Typography.Text underline>Jogador:</Typography.Text>
                                {ficha?.jogador.first_name ?? "Anon"}
                            </Space>
                            <Space>
                                <Typography.Text underline>Ocupação:</Typography.Text>
                                {ficha?.ocupation.name}
                            </Space>
                            <Space>
                                <Typography.Text underline>Idade:</Typography.Text>
                                {ficha?.age ?? 0}
                            </Space>
                            <Space>
                                <Typography.Text underline>Residência:</Typography.Text>
                                {ficha?.residence ?? ""}
                            </Space>
                            <Space>
                                <Typography.Text underline>Naturalidade:</Typography.Text>
                                {ficha?.birthplace ?? ""}
                            </Space>
                            {(ficha?.pulp_cthulhu ?? false) && <Space>
                                <Typography.Text underline>Arquétipo:</Typography.Text>
                                {ficha?.pulp_archetype ?? ""}
                            </Space>}
                        </Space>
                    </Card>
                </Col>
                <Col xl={{ span: 12, order: 2 }} lg={{ span: 13, order: 2 }} md={{ span: 24, order: 3 }} sm={{ span: 24, order: 3 }} xs={{ span: 24, order: 3 }}>
                    <Card title="Características" headStyle={{ textAlign: "center" }}>
                        <Row gutter={[5, 5]}>
                            <Col xl={{ span:8 }} lg={{ span:12 }} md={{ span:12 }} sm={{ span:24 }} xs={{ span:24 }}>
                                <CoCStats value={ficha?.strength ?? "0"} stat="STR"/>
                            </Col>
                            <Col xl={{ span:8 }} lg={{ span:12 }} md={{ span:12 }} sm={{ span:24 }} xs={{ span:24 }}>
                                <CoCStats value={ficha?.dexterity ?? "0"} stat="DEX"/>
                            </Col>
                            <Col xl={{ span:8 }} lg={{ span:12 }} md={{ span:12 }} sm={{ span:24 }} xs={{ span:24 }}>
                                <CoCStats value={ficha?.power ?? "0"} stat="POW"/>
                            </Col>
                            <Col xl={{ span:8 }} lg={{ span:12 }} md={{ span:12 }} sm={{ span:24 }} xs={{ span:24 }}>
                                <CoCStats value={ficha?.constitution ?? "0"} stat="CON"/>
                            </Col>
                            <Col xl={{ span:8 }} lg={{ span:12 }} md={{ span:12 }} sm={{ span:24 }} xs={{ span:24 }}>
                                <CoCStats value={ficha?.appearence ?? "0"} stat="APP"/>
                            </Col>
                            <Col xl={{ span:8 }} lg={{ span:12 }} md={{ span:12 }} sm={{ span:24 }} xs={{ span:24 }}>
                                <CoCStats value={ficha?.education ?? "0"} stat="EDU"/>
                            </Col>
                            <Col xl={{ span:8 }} lg={{ span:12 }} md={{ span:12 }} sm={{ span:24 }} xs={{ span:24 }}>
                                <CoCStats value={ficha?.size ?? "0"} stat="SIZ"/>
                            </Col>
                            <Col xl={{ span:8 }} lg={{ span:12 }} md={{ span:12 }} sm={{ span:24 }} xs={{ span:24 }}>
                                <CoCStats value={ficha?.inteligence ?? "0"} stat="INT"/>
                            </Col>
                            <Col xl={{ span:8 }} lg={{ span:12 }} md={{ span:12 }} sm={{ span:24 }} xs={{ span:24 }}>
                                <CoCStats fullRounded value={ficha?.move_rate ?? "0"} stat="Move Rate"/>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col xl={{ span: 6, order: 3 }} lg={{ span: 5, order: 3 }} md={{ span: 9, order: 2 }} sm={{ span: 7, order: 1 }} xs={{ span: 7, order: 1 }} style= {{ textAlign: 'center' }}>
                    <Avatar icon={<UserOutlined />} size={{ xxl: 200, xl: 180, lg: 160, md: 180, xs: 100, sm: 100 }} />
                </Col>
                <Col xl={{ span: 8, order: 4 }} lg={{ span: 8, order: 4 }} md={{ span: 24, order: 4 }} sm={{ span: 24, order: 4 }} xs={{ span: 24, order: 4 }}>
                    <Card title="HP">
                        <Space direction='vertical' style={{ width: "100%" }}>
                            <Space>
                                <Typography.Title level={5}>MAX HP: {ficha?.max_hp ?? "0"}</Typography.Title>
                                {(ficha?.hp ?? 0) === 0 && <Typography.Title level={5} style={{ color: ficha?.major_wound ? "red" : "black" }}>{ficha?.major_wound ? "Morrendo" : "Inconsciente"}</Typography.Title>}
                            </Space>
                            <Slider max={ficha?.max_hp ?? 0} value={ficha?.hp ?? 0} min={0}/>
                        </Space>
                    </Card>
                </Col>
                <Col xl={{ span: 16, order: 5 }} lg={{ span: 16, order: 5 }} md={{ span: 24, order: 5 }} sm={{ span: 24, order: 5 }} xs={{ span: 24, order: 5 }}>
                    <Card title="Sanidade">
                        <Space direction='vertical' style={{ width: "100%" }}>
                            <Space>
                                <Typography.Title level={5}>MAX SAN: {ficha?.max_san ?? "0"}</Typography.Title>
                                <Typography.Title level={5}>START SAN: {ficha?.start_san ?? "0"}</Typography.Title>
                                {(ficha?.san ?? 0) === 0 && <Typography.Title level={5}>Insano</Typography.Title>}
                            </Space>
                            <Space direction='vertical'>
                                <Checkbox checked={ficha?.temporary_insanity}>Insanidade temporária</Checkbox>
                                <Checkbox checked={ficha?.indefinity_insanity}>Insanidade Indefinida</Checkbox>
                            </Space>
                            <Slider max={ficha?.max_san ?? 0} value={ficha?.san ?? 0} min={0}/>
                        </Space>
                    </Card>
                </Col>
                <Col xl={{ span: 16, order: 6 }} lg={{ span: 16, order: 6 }} md={{ span: 24, order: 6 }} sm={{ span: 24, order: 6 }} xs={{ span: 24, order: 6 }}>
                    <Card title="Sorte">
                        <Space direction='vertical' style={{ width: "100%" }}>
                            {(ficha?.luck ?? 0) === 0 && <Typography.Title level={5}>Sem sorte</Typography.Title>}
                            <Slider max={99} value={ficha?.luck ?? 0} min={0}/>
                        </Space>
                    </Card>
                </Col>
                <Col xl={{ span: 8, order: 7 }} lg={{ span: 8, order: 7 }} md={{ span: 24, order: 7 }} sm={{ span: 24, order: 7 }} xs={{ span: 24, order: 7 }}>
                    <Card title="MP">
                        <Space direction='vertical' style={{ width: "100%" }}>
                            <Typography.Title level={5}>MAX MP: {ficha?.max_mp ?? "0"}</Typography.Title>
                            <Slider max={ficha?.max_mp ?? 0} value={ficha?.mp ?? 0} min={0}/>
                        </Space>
                    </Card>
                </Col>
                <Col span={24} order={8}>
                    <Card title="Perícias" headStyle={{ textAlign: "center" }}>
                        <List 
                            dataSource={ficha?.skill_list ?? []}
                            grid={{ gutter: 5, xs: 1,
                                sm: 1,
                                md: 2,
                                lg: 3,
                                xl: 4,
                                xxl: 4, }}
                            renderItem={(item: any) => (
                                    <List.Item key={item.name}>
                                        <CoCStats value={item.value} stat={item.name} improvcheck improvedCheck={item.improv}/>
                                    </List.Item>)
                            }/>
                    </Card>
                </Col>
                <Col xs={{ span: 24, order: 9 }} sm={{ span: 24, order: 9 }} md={{ span: 24, order: 9 }} lg={{ span: 18, order: 9 }} xl={{ span: 18, order: 9 }}>
                    <Card title="Armas" headStyle={{ textAlign: "center" }}>
                        <Table rowKey={"id"} columns={columns} dataSource={ficha?.weapons ?? []} expandable={{
                            expandedRowRender: record => <Card title="Detalhes">
                                {record.weapon.is_melee && <Space direction='vertical'>
                                    <Typography.Text>Arma mano-a-mano</Typography.Text>
                                    <Typography.Text>Acerto normal: {record.normal_success_value}</Typography.Text>
                                    <Typography.Text>Acerto bom: {Math.floor(record.normal_success_value/2)}</Typography.Text>
                                    <Typography.Text>Acerto extremo: {Math.floor(record.normal_success_value/5)}</Typography.Text>
                                </Space>}
                                {!record.weapon.is_melee && <Space direction='vertical'>
                                    <Typography.Text>Acerto normal: {record.normal_success_value}</Typography.Text>
                                    <Typography.Text>Acerto bom: {Math.floor(record.normal_success_value/2)}</Typography.Text>
                                    <Typography.Text>Acerto extremo: {Math.floor(record.normal_success_value/5)}</Typography.Text>
                                    <Typography.Text>Tiros restantes: {record.rounds_left}</Typography.Text>
                                    <Typography.Text>Munição disponível: {`${record.ammo_left} (${record.total_ammo_left})`}</Typography.Text>
                                </Space>}
                            </Card>,
                        }}/>
                    </Card>
                </Col>
                <Col xs={{ span: 24, order: 10 }} sm={{ span: 24, order: 10 }} md={{ span: 24, order: 10 }} lg={{ span: 6, order: 10 }} xl={{ span: 6, order: 10 }}>
                    <Card title="Combate" headStyle={{ textAlign: "center" }}>
                        <Space direction='vertical' style={{ width: "100%" }}>
                            <CoCStats fullRounded value={ficha?.bonus_dmg ?? "0"} stat="Bonus Damage"/>
                            <CoCStats fullRounded value={ficha?.build ?? "0"} stat="Build"/>
                            <CoCStats value={ficha?.dodge ?? "0"} stat="Dodge"/>
                        </Space>
                    </Card>
                </Col>
                {ficha?.pulp_cthulhu && <Col span={24} order={11}>
                    <Card title="Talentos (PCoC)" headStyle={{ textAlign: "center" }}>
                        <Collapse>
                            {ficha.pulp_talents.map(item => {
                                return <Collapse.Panel key={item.id} showArrow={false} header={item.name}>
                                    <p>{item.desc}</p>
                                </Collapse.Panel>
                            })}
                        </Collapse>
                    </Card>
                </Col>}
            </Row>
        </Skeleton>
    );

}