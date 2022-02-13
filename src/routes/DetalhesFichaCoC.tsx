import { Card, Col, Collapse, List, notification, Row, Skeleton, Slider, Space, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { FichaCOC } from '../components/models/FichaCOC';
import { withRouter } from '../components/routes/WithRouter';
import { CoCService } from '../components/services/CoCService';
import { UserOutlined } from '@ant-design/icons';
import CoCStats from '../ui/StatsCOC';
import Checkbox from 'antd/lib/checkbox/Checkbox';

export interface DetalhesFichaCoCState {
    loading: boolean,
    ficha?: FichaCOC
}

class DetalhesFichaCoC extends React.Component<any, DetalhesFichaCoCState> {

    state : DetalhesFichaCoCState = {
        loading: true,
        ficha: undefined
    }

    componentDidMount = () => {
        CoCService.getFicha(this.props.params.id).then(res => {
            this.setState({ loading: false, ficha: res.data });
        }).catch(err => {
            notification.error({
                message: "Não foi possível buscar detalhes da ficha!",
                description: err.response?.data?.detail ?? ""
            });
        });
    }

    render = () => {
        return (
            <Skeleton active loading={this.state.loading}>
                <Row justify='space-between' gutter={[16, 16]} align="middle">
                    <Col lg={{ span: 6, order: 1 }} md={{ span: 15, order: 1 }} sm={{ span: 17, order: 2 }} xs={{ span: 17, order: 2 }}>
                        <Card title={(this.state.ficha?.pulp_cthulhu ?? false) ? "Herói (PCoC)" : "Investigador"}>
                            <Space direction='vertical'>
                                <Space>
                                    <Typography.Text underline>Nome:</Typography.Text>
                                    { this.state.ficha?.nome_personagem ?? "" }
                                </Space>
                                <Space>
                                    <Typography.Text underline>Jogador:</Typography.Text>
                                    {this.state.ficha?.jogador.first_name ?? "Anon"}
                                </Space>
                                <Space>
                                    <Typography.Text underline>Ocupação:</Typography.Text>
                                </Space>
                                <Space>
                                    <Typography.Text underline>Idade:</Typography.Text>
                                    {this.state.ficha?.age ?? 0}
                                </Space>
                                <Space>
                                    <Typography.Text underline>Residência:</Typography.Text>
                                    {this.state.ficha?.residence ?? ""}
                                </Space>
                                <Space>
                                    <Typography.Text underline>Naturalidade:</Typography.Text>
                                    {this.state.ficha?.birthplace ?? ""}
                                </Space>
                                {(this.state.ficha?.pulp_cthulhu ?? false) && <Space>
                                    <Typography.Text underline>Arquétipo:</Typography.Text>
                                    {this.state.ficha?.pulp_archetype ?? ""}
                                </Space>}
                            </Space>
                        </Card>
                    </Col>
                    <Col xl={{ span: 12, order: 2 }} lg={{ span: 13, order: 2 }} md={{ span: 24, order: 3 }} sm={{ span: 24, order: 3 }} xs={{ span: 24, order: 3 }}>
                        <Card title="Características" headStyle={{ textAlign: "center" }}>
                            <Row gutter={[10, 16]} justify="space-between" align='middle'>
                                <CoCStats value={this.state.ficha?.strength ?? "0"} stat="STR"/>
                                <CoCStats value={this.state.ficha?.dexterity ?? "0"} stat="DEX"/>
                                <CoCStats value={this.state.ficha?.power ?? "0"} stat="POW"/>
                                <CoCStats value={this.state.ficha?.constitution ?? "0"} stat="CON"/>
                                <CoCStats value={this.state.ficha?.appearence ?? "0"} stat="APP"/>
                                <CoCStats value={this.state.ficha?.education ?? "0"} stat="EDU"/>
                                <CoCStats value={this.state.ficha?.size ?? "0"} stat="SIZ"/>
                                <CoCStats value={this.state.ficha?.inteligence ?? "0"} stat="INT"/>
                                <CoCStats fullRounded value={this.state.ficha?.move_rate ?? "0"} stat="Move Rate"/>
                            </Row>
                        </Card>
                    </Col>
                    <Col xl={{ span: 6, order: 3 }} lg={{ span: 5, order: 3 }} md={{ span: 9, order: 2 }} sm={{ span: 7, order: 1 }} xs={{ span: 7, order: 1 }} style= {{ textAlign: 'center' }}>
                        <Avatar icon={<UserOutlined />} size={{ xl: 180, lg: 160, md: 180, xs: 100, sm: 100 }} />
                    </Col>
                    <Col xl={{ span: 8, order: 4 }} lg={{ span: 8, order: 4 }} md={{ span: 24, order: 4 }} sm={{ span: 24, order: 4 }} xs={{ span: 24, order: 4 }}>
                        <Card title="HP">
                            <Space direction='vertical' style={{ width: "100%" }}>
                                <Space>
                                    <Typography.Title level={5}>MAX HP: {this.state.ficha?.max_hp ?? "0"}</Typography.Title>
                                    {(this.state.ficha?.hp ?? 0) === 0 && <Typography.Title level={5} style={{ color: this.state.ficha?.major_wound ? "red" : "black" }}>{this.state.ficha?.major_wound ? "Morrendo" : "Inconsciente"}</Typography.Title>}
                                </Space>
                                <Slider max={this.state.ficha?.max_hp ?? 0} value={this.state.ficha?.hp ?? 0} min={0}/>
                            </Space>
                        </Card>
                    </Col>
                    <Col xl={{ span: 16, order: 5 }} lg={{ span: 16, order: 5 }} md={{ span: 24, order: 5 }} sm={{ span: 24, order: 5 }} xs={{ span: 24, order: 5 }}>
                        <Card title="Sanidade">
                            <Space direction='vertical' style={{ width: "100%" }}>
                                <Space>
                                    <Typography.Title level={5}>MAX SAN: {this.state.ficha?.max_san ?? "0"}</Typography.Title>
                                    <Typography.Title level={5}>START SAN: {this.state.ficha?.start_san ?? "0"}</Typography.Title>
                                    {(this.state.ficha?.san ?? 0) === 0 && <Typography.Title level={5}>Insano</Typography.Title>}
                                </Space>
                                <Space direction='vertical'>
                                    <Checkbox checked={this.state.ficha?.temporary_insanity}>Insanidade temporária</Checkbox>
                                    <Checkbox checked={this.state.ficha?.indefinity_insanity}>Insanidade Indefinida</Checkbox>
                                </Space>
                                <Slider max={this.state.ficha?.max_san ?? 0} value={this.state.ficha?.san ?? 0} min={0}/>
                            </Space>
                        </Card>
                    </Col>
                    <Col xl={{ span: 16, order: 6 }} lg={{ span: 16, order: 6 }} md={{ span: 24, order: 6 }} sm={{ span: 24, order: 6 }} xs={{ span: 24, order: 6 }}>
                        <Card title="Sorte">
                            <Space direction='vertical' style={{ width: "100%" }}>
                                {(this.state.ficha?.luck ?? 0) === 0 && <Typography.Title level={5}>Sem sorte</Typography.Title>}
                                <Slider max={99} value={this.state.ficha?.luck ?? 0} min={0}/>
                            </Space>
                        </Card>
                    </Col>
                    <Col xl={{ span: 8, order: 7 }} lg={{ span: 8, order: 7 }} md={{ span: 24, order: 7 }} sm={{ span: 24, order: 7 }} xs={{ span: 24, order: 7 }}>
                        <Card title="MP">
                            <Space direction='vertical' style={{ width: "100%" }}>
                                <Typography.Title level={5}>MAX MP: {this.state.ficha?.max_mp ?? "0"}</Typography.Title>
                                <Slider max={this.state.ficha?.max_mp ?? 0} value={this.state.ficha?.mp ?? 0} min={0}/>
                            </Space>
                        </Card>
                    </Col>
                    <Col span={24} order={8}>
                        <Card title="Perícias" headStyle={{ textAlign: "center" }}>
                            <List 
                                dataSource={this.state.ficha?.get_skill_list_as_array ?? []}
                                grid={{ gutter: 5, xs: 1,
                                    sm: 1,
                                    md: 2,
                                    lg: 3,
                                    xl: 4,
                                    xxl: 4, }}
                                renderItem={(item: any) => (
                                        <List.Item>
                                            <CoCStats value={item.value} stat={item.name} improvcheck improvedCheck={item.improv}/>
                                        </List.Item>)
                                }/>
                        </Card>
                    </Col>
                    <Col span={18} order={9}>
                        <Card title="Armas" headStyle={{ textAlign: "center" }}>

                        </Card>
                    </Col>
                    <Col span={6} order={10}>
                        <Card title="Combate" headStyle={{ textAlign: "center" }}>
                            <CoCStats fullWidth fullRounded value={this.state.ficha?.bonus_dmg ?? "0"} stat="Bonus Damage"/>
                            <CoCStats fullWidth fullRounded value={this.state.ficha?.build ?? "0"} stat="Build"/>
                            <CoCStats fullWidth value={this.state.ficha?.dodge ?? "0"} stat="Dodge"/>
                        </Card>
                    </Col>
                    {this.state.ficha?.pulp_cthulhu && <Col span={24} order={11}>
                        <Card title="Talentos (PCoC)" headStyle={{ textAlign: "center" }}>
                            <Collapse>
                                {this.state.ficha.pulp_talents.map(item => {
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

}

export default withRouter(DetalhesFichaCoC);